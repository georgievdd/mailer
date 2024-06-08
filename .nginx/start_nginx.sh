#!/bin/sh

envsubst '${LISTEN_PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

nginx -g 'daemon off;'