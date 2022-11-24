#!/bin/bash

# This script cleans up compiled js files from the build:lambdas npm script.

find packages/**/src/ -maxdepth 3 -type f -name '*.js' -delete
find infrastructure/bin/ -maxdepth 1 -type f -name '*.js' -delete
find infrastructure/bin/ -maxdepth 1 -type f -name '*.d.ts' -delete
find infrastructure/lib/ -maxdepth 1 -type f -name '*.js' -delete
find infrastructure/lib/ -maxdepth 1 -type f -name '*.d.ts' -delete
find infrastructure/test/ -maxdepth 1 -type f -name '*.js' -delete
find infrastructure/test/ -maxdepth 1 -type f -name '*.d.ts' -delete

