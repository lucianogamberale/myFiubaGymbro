#!/bin/bash

export NVM_DIR="/usr/local/share/nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm not found at $NVM_DIR/nvm.sh"
  exit 1
fi

nvm install node
nvm use node