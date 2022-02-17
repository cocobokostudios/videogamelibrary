#!/usr/bin/bash
DATE_VALUE=`date +"%Y-%b-%d_%H%M%S"`
az deployment sub create --template-file ./tools/main.bicep --location eastus2 --name videogamelibrary_${DATE_VALUE}