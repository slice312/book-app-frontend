#!/bin/sh

yarn
yarn build
aws s3 rm s3://book-app-frontend --recursive
aws s3 cp ./dist s3://book-app-frontend --recursive

