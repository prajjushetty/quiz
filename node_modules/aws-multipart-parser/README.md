# aws-multipart-parser

## Introduction

Support of multipart/form-data requests is a relatively new feature for AWS, data from a form post shows through as event-body and while most server side frameworks have ready parsers for form data from requests, in a lambda function there may be a need to parse the event.body property manually.

This package is a fork from [myshenin/aws-lambda-multipart-parser](https://github.com/myshenin/aws-lambda-multipart-parser) as I found that the provided API did not work for data with binary file form data, and the parent didn't seem to be intensively maintained in the last few months, I've made minor API changes according to my needs and added types & documentation to make usage clearer for serverless users/typescript callers.

## Guide for use

1. Enable binary data types on your API gateway, and add `multipart/form-data` to the content-types list. If using serverless (recommended), use the plugin [serverless-apigw-binary](https://github.com/maciejtreder/serverless-apigw-binary) and modify your serverless.yml file accordingly

serverless.yml:

```
plugins:
 - serverless-apigw-binary

custom:
  apigwBinary:
    types:
      - 'multipart/form-data'
```

2. Now in your lambda function body

handler.js

```
import { parse } from 'aws-multipart-parser'

// ...

exports.myHandler = function(event, context, callback) {
    const formData = parse(event, true);

    // do stuff

    callback(null, "some success message");
}
```
