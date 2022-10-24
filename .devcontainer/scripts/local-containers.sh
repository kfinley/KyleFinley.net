#!/bin/bash

OPERATION=$1

if [ operation = '' ]; then

$OPERATION=start

fi

docker $OPERATION kylefinley.sls
docker $OPERATION kylefinley.web
# docker $OPERATION kylefinley.storybooks
