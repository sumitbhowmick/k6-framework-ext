# Performance Testing framework with K6
Performance Testing repository for API performance tests.

## Installation
1. Refer steps as per platform-
https://grafana.com/docs/k6/latest/set-up/install-k6/
2. Verify installation success
k6 version

## Test Configuration & Prerequisite
1. Create "environments" folder if not present. Ensure int.env or uat.env file present with correct values for the intended environment
2. Create "data" folder if not present. Ensure data file for intended script and intended environment is present.
3. Ensure the data file name is updated in the in import section of the script to run. 
import userfile from './data/<datafilename>.json';
4. In k6 script, options & stages specify the test configuration. target is the concurrent user & duration is test duration.
5. In webpack.config.js, update the "entry" field with the intended script name.
6. In respective project folder, run command to install node dependencies- npm install 

## Test Execution on local - example
1. Configure k6 test in config.js file
2. npm run int;  k6 run build/app.bundle.js

## Test Execution on K6 Cloud
Please note that every test executed on cloud has a financial impact by way of deduction of VU credit. 
Step 1-4 is one time activity.
1. Login to K6 cloud portal. https://app.k6.io/account/login
2. Navigate to suitable project.
3. Get token from Account Settings > API Token
4. Execute on local CLI.
k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
5. npm run int;  k6 cloud build/app.bundle.js

## Log Handling
1. To store logs in file in place of console.
npm run int; k6 run --log-output=file=./log/demotest.log ./build/app.bundle.js
New run log gets appended to specified log file.
2. To stop cloud logs on local console 
npm run int; k6 cloud --show-logs=false ./build/app.bundle.js

## Test Execution Monitoring
1. To monitor the test during local execution, k6 Web dashboard can be used for having a graphical view.
For powershell users on Windows-
$env:K6_WEB_DASHBOARD="true"; npm run int;  k6 run ./build/app.bundle.js
2. Browse URL: http://localhost:5665

