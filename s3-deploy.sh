#!/bin/sh

yarn
yarn build
aws s3 cp ./dist s3://book-app-frontend --recursive

