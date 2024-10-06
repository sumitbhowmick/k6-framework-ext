# Performance Testing framework with K6
Performance Testing repository for API performance tests.

## Installation
1. Refer steps as per platform-
https://grafana.com/docs/k6/latest/set-up/install-k6/
2. Verify installation success
k6 version
3. Ensure a stable version of node is installed.

## Test Configuration & Prerequisite
1. Run command to install node dependencies for the project - npm install
2. Configure k6 test in config.js file. 
options & stages specify the test configuration. target is the concurrent user & duration is test duration.
3. In webpack.config.js, update the "entry" field with the intended script name.

## Test Execution on local - example
1. Configure k6 test in config.js file
2. npm run int;  k6 run build/app.bundle.js

## Test Execution on K6 Cloud
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
New run log gets appended to specified log file. Change the logfile name to keep logs seperate for separate runs.
2. To stop cloud logs on local console 
npm run int; k6 cloud --show-logs=false ./build/app.bundle.js

## Test Execution Monitoring
1. To monitor the test during local execution, k6 Web dashboard can be used for having a graphical view.
For powershell users on Windows-
$env:K6_WEB_DASHBOARD="true"; npm run int;  k6 run ./build/app.bundle.js
2. Browse URL: http://localhost:5665
