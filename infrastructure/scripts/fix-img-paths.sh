#!/bin/bash

echo 'Post Build Step'
echo 'Cleaning up image paths in markdown documents'

for file in packages/vue2-client/dist/assets/*; do
    sed -i 's/..\/..\/public\/img/\/img/g' $file
done

for file in packages/vue2-client/dist/assets/*; do
    sed -i 's/..\/..\/..\/..\/..\/media/https:\/\/d2f9ju3ov86hvq.cloudfront.net/g' $file
done

for file in packages/vue2-client/dist/assets/*; do
    sed -i 's/..\/..\/..\/..\/media/https:\/\/d2f9ju3ov86hvq.cloudfront.net/g' $file
done
