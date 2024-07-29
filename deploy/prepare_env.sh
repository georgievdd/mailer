#!/bin/bash

IP=$(curl -s ifconfig.me)
echo "SERVER_HOST=$IP:8080" > .env
echo "DB_HOST=$IP" > .env
echo "SECRET=12345678" > .env
