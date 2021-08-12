#!/bin/bash

# npm install -g serverless

if [[ -e .env ]];then
  export $(egrep -v '^#' .env | xargs)
fi

serverless deploy -v