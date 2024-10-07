import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';
import { sleep } from 'k6';
import { vu, scenario } from 'k6/execution';
import { SharedArray } from 'k6/data';
import { Counter } from 'k6/metrics';
import { AuthTokenManager } from './support/getConfig.js';
import {configGlobal} from './support/getConfig.js';
import { getConfig } from './config.js';
import Logger from './support/loggerjreeves.js';
import {getProductNames} from './support/products.js'
import { lodashTest } from './support/lodashUtil.js';

const logLevel = Logger.INFO;//ERROR>WARN>INFO>DEBUG>TRACE

const config = getConfig()

const data = new SharedArray('userArray', function () {
  const f = JSON.parse(open('../data/users.json'));
  return f;
});

const startFrom = config.dummyjson.startFrom ;

export const options = config.k6_OPTIONS

const THINK_TIME = 5 //5
const PACING_TIME = 30 //30
const loginTokenCounter = new Counter('TrxnCount_Login_Access_Token');

export default function dummyjson() {

  sleep(1)
  const id = vu.idInTest % data.length+startFrom;//1 user 1 value. no change on iteration
  const { username, password } = data[id - 1];//normal load test
  console.log(`Start execution: ${username}, iterationId=${scenario.iterationInTest}`);
  //console.log(`Start execution: index: ${walletindex}, walletAddress: ${l1walletaddress}, iterationId=${scenario.iterationInTest}`);
  
  Logger.useDefaults({
    defaultLevel: logLevel,
    formatter: function (messages, context) {
      messages.unshift(new Date().toUTCString().substring(17), username, `iter${scenario.iterationInInstance}`);
    },
  });

  let runOptionsObj = config.dummyjson
  globalThis.runOptionsObj = runOptionsObj
  let configObj = configGlobal.getConfig(params)
  globalThis.productList = configObj.productList
  
  const tokenManager = AuthTokenManager.getInstance();
  const token = tokenManager.getAuthToken(username,password);
  loginTokenCounter.add(1);

  let params = {
    headers: {
    "Authorization": "Bearer "+token,
    },
    tags: { type: 'ClientFacing' }
  };
  //Logger.info("Bearer:",token)
  const baseUrl = process.env.BASE_URL

  let res = http.get(`${baseUrl}user/me`, params)
  let name = res.json("{id, firstName, lastName}")
  Logger.info(`Authenticated User Name: ${JSON.stringify(name)}`)
  sleep(THINK_TIME)

  //Fetch random array of products using Global Config
  let randomProductCount = randomIntBetween(2,6)
  let randomProductList = getProductNames(randomProductCount)
  Logger.info(`Randomly selected ${randomProductCount} products:`,randomProductList)

  lodashTest()

  sleep(PACING_TIME)
    
}
