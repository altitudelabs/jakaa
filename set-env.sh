#!/bin/bash

echo "Attempting to set Node version to what is mentioned in .nvmrc"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use
