#!/bin/sh

export BUCKET_NAME=$1
export AWS_ACCESS_KEY_ID=$2
export AWS_SECRET_ACCESS_KEY=$3
export AWS_REGION=$4
export ACL=$5


if [ -z "${BUCKET_NAME}" ] || [ -z "${AWS_ACCESS_KEY_ID}" ] || [ -z "${AWS_SECRET_ACCESS_KEY}" ] || [ -z "${AWS_REGION}" ] || [ -z "${ACL}" ]
then
    echo "Insufficient or improperly configured input for this Github Action"
    exit 1
else
    aws s3api create-bucket \
        --bucket $BUCKET_NAME \
        --region $AWS_REGION \
        --create-bucket-configuration LocationConstraint=$AWS_REGION \
        --acl $ACL

    if [ $? -eq 0 ]; then
        echo "Bucket \`${BUCKET_NAME}\` created successfully!"
    else
        echo "There was a problem creating bucket \`${BUCKET_NAME}\`, please read the logs above this message."
        exit 1
    fi
fi