#!/bin/bash

if [[ -f config.json ]] ; then rm config.json ; fi

## then build the file one line at a time:

echo "{" >> config.json
echo "  \"clientId\": \"${clientId}\"" >> config.json
echo "}" >> config.json