#!/bin/bash

docker-compose -f docker-compose.yml up -d db

docker-compose -f docker-compose.yml up --build backend