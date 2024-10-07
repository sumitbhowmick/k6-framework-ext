
//Common variable including environment variable can be passed here
let commonProperty ={
  SYSTEM1_API_KEY: "System1APIKey",
  SYSTEM2_API_KEY: "System2APIKey",
  SYSTEM1_BASE_URL: "https://mybase1.dummy.com/",
  SYSTEM2_BASE_URL: "https://mybase2.dummy.com/",
};

//Script can have many alternative paths, mix of scenarios which can be controlled from the config options
let scriptOptions ={
  dummyjson :{
    startFrom :3
  }
};

//k6 options driving test execution config
let k6_options = {
  k6_OPTIONS: {
    scenarios: {
      load_test: {
        executor: 'ramping-vus',
        stages: [
          { target: 1, duration: '1s' },
          { target: 1, duration: '5m' },
          { target: 0, duration: '0s' },
        ],
        gracefulRampDown: '3m',
        gracefulStop: '5m',
      }
    },
    thresholds: {
      'http_req_failed{type:ClientFacing}': [
        {
          threshold: 'rate<0.01',
          abortOnFail: false,
          delayAbortEval: '5m'
        }
      ],
      'http_req_failed{type:Test}': [
        {
          threshold: 'rate<0.1', // 'count<100'
          abortOnFail: false, // boolean
        }
      ],
      //http_req_duration: [{ threshold: 'p(95)<500' }]
      http_req_duration: [
        { 
          threshold: 'p(95)<500' 
        }
      ]
    },
    ext: {
      loadimpact: {
        name: 'Dummy Test',
        distribution: {        
          ashburnDistribution: { loadZone: "amazon:us:ashburn", percent: 50 },
          sydneyDistribution1: { loadZone: "amazon:au:sydney", percent: 50 },
        }
      }
    } //Multizone execution on k6 cloud, ignored for local execution
  }
};

let configObject ={...commonProperty, ...scriptOptions, ...k6_options};

//Binding all configs and make them available in actual code
export function getConfig() {
    return configObject;
  
}

