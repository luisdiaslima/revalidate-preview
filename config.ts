import getConfig from 'next/config';

const env = process.env || {};

const { publicRuntimeConfig } = getConfig();

function getApiUrl() {
  return publicRuntimeConfig.react_app_domain || 'https://api.staging.v2.pedidopago.com.br';
}

function getStoreId() {
  return env.REACT_STORE_ID || '1';
}

function getDomainName() {
  return env.REACT_APP_DOMAIN;
}

export default {
  apiUrl: getApiUrl(),
  storeId: getStoreId(),
  appDomain: getDomainName(),
};
