#!/usr/bin/bash

DATE_VALUE=`date +"%Y-%b-%d_%H%M%S"`
PARAMS="swaRepositoryToken=$1"

az deployment sub create \
    --name videogamelibrary_${DATE_VALUE} \
    --location eastus2 \
    --template-file ./tools/main.bicep \
    --parameters $PARAMS
