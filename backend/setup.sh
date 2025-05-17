#!/bin/bash

cd backend

# Install dependencies for the backend
pip3 install --user -r requirements.txt
alembic upgrade head

cd ..