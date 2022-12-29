#!/bin/bash

echo
echo 'Running dev initialization script...'
echo

# Open up docker socket for docker-in-docker as non-root
sudo chmod 777 /var/run/docker-host.sock

# Run npm & lerna installs
if ! [ -d './node_modules' ]; then
    # Do we still need this????
    # sudo apt install python2 -y
    # npm config set python python2
    npm i
    npm run bootstrap
else
    echo 'Existing repo setup... skipping npm & lerna setup.'
fi


# echo
# echo 'Building packages'

# echo
# echo 'Building Serverless-Offline'
# #TODO: npm script this
# cd submodules/serverless-offline
# npm i && npm run build
# cd ../..

echo
echo 'Restarting containers...'
# ensure services, sls, and vite dev client are started
npm run containers:restart

echo
echo -e Dev setup complete! "\xF0\x9f\x8d\xba"
