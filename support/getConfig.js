import http from 'k6/http';
import encoding from 'k6/encoding';
import { sleep, check } from 'k6';
import Logger from './loggerjreeves.js';
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';

const baseUrl = process.env.BASE_URL

export let configGlobal = (function () {
  "use strict";
  const instance ={};
  function Singleton() { 
  }

  Singleton.getConfig = function (params) {
    if (Object.keys(instance).length > 0){
      return instance
    }
    else{
      let res = http.get(`${baseUrl}products?limit=0`,params);
      if (res.status!=200){
        Logger.error(`All Products API Error: ${JSON.stringify(res.body, null, "  ")}`)
      }
      Logger.info(`All Products API Response: ${JSON.stringify(res.body, null, "  ")}`)
      expect(res.status, 'All Products API status code').to.equal(200);
      let productList = JSON.parse(res.body)
      instance.productList = productList

      return instance;
    }      
  }
  return Singleton;
}());

export class AuthTokenManager {
  constructor() {
    this.token = null;
    this.username = null;
    this.expirationTime = null;
  }

  // Singleton instance
  static getInstance() {
    if (!AuthTokenManager.instance) {
      AuthTokenManager.instance = new AuthTokenManager();
    } else {
      console.log("Accessed existing AuthTokenManager instance")
    }
    return AuthTokenManager.instance;
  }

  // Fetch Auth token based on conditions  
  getAuthToken(username,password) {
    // Check if the token exists and is not expired
    if (this.token && this.expirationTime > Date.now() && this.username==username) {
      return this.token;
    }

    // Fetch a fresh token
    const freshToken = this.fetchFreshToken(username,password);
    const freshTokenObj = JSON.parse(freshToken)
    // Update the token and its expiration time
    this.token = freshTokenObj.accessToken;
    this.username = freshTokenObj.username
    this.refreshToken = freshTokenObj.refreshToken;
    const tokenParts = freshTokenObj.accessToken.split('.')
    const decodedToken = JSON.parse(encoding.b64decode(tokenParts[1].toString(), 'rawstd', 's'))    
    this.expirationTime = new Date(decodedToken.exp*1000);
    
    return this.token;
  }
  
  // Helper function to fetch a fresh Auth token
  fetchFreshToken(username,password) {
    let loginPayload = JSON.stringify({
      "username": username, 
      "password": password,
      "expiresInMins": 2
    })
    let params = {
      headers: {
         'Content-Type': 'application/json',
       },
    }
    console.log("fresh token generated")
    let res = http.post(`${baseUrl}auth/login`,loginPayload,params);
    if (res.status!=200){
      Logger.error(`Login Error: ${JSON.stringify(res.body, null, "  ")}`)
    } else{
      //Logger.info(`Login Result:${JSON.stringify(res.body, null, "  ")}`)  
    }
    return res.body
  }
}



