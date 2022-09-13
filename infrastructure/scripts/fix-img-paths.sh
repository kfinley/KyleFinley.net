#!/bin/bash

echo 'Post Build Step'
echo 'Cleaning up image paths in markdown documents'

for file in packages/vue2-client/dist/assets/*; do
    sed -i 's/..\/..\/public\/img/\/img/g' $file
done
