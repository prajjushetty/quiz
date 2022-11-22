'use strict';

const { Capi } = require('@tencent-sdk/capi');

async function isRealNameVerified({ secretId, secretKey, token }) {
  const hostType = process.env.SERVERLESS_TENCENT_NET_TYPE || 'outer';
  let host = 'account.tencentcloudapi.com';
  if (hostType === 'inner') {
    host = 'account.internal.tencentcloudapi.com';
  }
  const client = new Capi({
    debug: false,
    host,
    version: '2018-12-25',
    region: 'ap-guangzhou',
    secretId,
    secretKey,
    token,
    serviceType: 'account',
  });
  try {
    const { Response } = await client.request({
      action: 'GetAuthStatus',
    });
    return Number(Response.Status) === 3;
  } catch (e) {
    console.log(e);
    // no op
  }
  return false;
}

module.exports = isRealNameVerified;
