// End points
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

export const XSRF_TOKEN: any = {
  AUTH: 'X-XSRF-TOKEN',
  COMP: 'X-XSRF-TOKEN',
  CONTACT: 'X-XSRF-TOKEN',
  CURRENCY: 'X-XSRF-TOKEN',
  UNIT: 'X-XSRF-TOKEN',
  FREQUENCY: 'X-XSRF-TOKEN',
  CONTRACT: 'X-XSRF-TOKEN',
  OFFER: 'X-XSRF-TOKEN',
  FILE: 'X-XSRF-TOKEN',
  CONTRACT_ITEM: 'X-XSRF-TOKEN',
  URL_PDF: 'X-XSRF-TOKEN',
};

export const XSRF_COOKIE: any = {
  AUTH: 'XSRF-TOKEN',
  COMP: 'XSRF-TOKEN',
  CONTACT: 'XSRF-TOKEN',
  CURRENCY: 'XSRF-TOKEN',
  UNIT: 'XSRF-TOKEN',
  FREQUENCY: 'XSRF-TOKEN',
  CONTRACT: 'XSRF-TOKEN',
  OFFER: 'XSRF-TOKEN',
  FILE: 'XSRF-TOKEN',
  CONTRACT_ITEM: 'XSRF-TOKEN',
  URL_PDF: 'XSRF-TOKEN',
};

export const ENDPOINT: any = {
  AUTH: {
    VALIDATE: '/auth/validate-jwt',
    CLEAN: '/auth/clean',
    CSRF: '/auth/csrf',
    PUBLIC_KEY: '/auth/pkey',
    LOGIN: '/auth/jwe',
  },
  COMP: {
    UPDATE: '/company/update',
    LIST: '/company/list',
    SEV_DESK_TOKEN: '/company/token/sev-desk',
  },
  CONTACT: {
    ADD: '/contact/add',
    LIST: '/contact/list',
    UPDATE: '/contact/update',
    DELETE: '/contact/delete',
  },
  CURRENCY: {
    ADD: '/currency/add',
    LIST: '/currency/list',
    DELETE: '/currency/delete',
  },
  COUNTRY: {
    ADD: '/country/add',
    LIST: '/country/list',
    DELETE: '/country/delete',
  },
  UNIT: {
    ADD: '/unit/add',
    LIST: '/unit/list',
    DELETE: '/unit/delete',
  },
  FREQUENCY: {
    ADD: '/frequency/add',
    LIST: '/frequency/list',
    DELETE: '/frequency/delete',
  },
  CONTRACT: {
    ADD: '/contract/add',
    LIST: '/contract/list',
    UPDATE: '/contract/update',
    DELETE: '/contract/delete',
  },
  OFFER: {
    ADD: '/offer/add',
    LIST: '/offer/list',
    UPDATE: '/offer/update',
    DELETE: '/offer/delete',
    SINGLE: '/offer/single',
    PDF: '/offer/pdf',
  },
  CONTRACT_ITEM: {
    ADD_TO_OFFER: '/contract-item/add/offer',
    LIST_OFFER: '/contract-item/list/offer',
    DELETE: '/contract-item/delete',
    ADD_LIST: '/contract-item/add/list'
  },
  FILE: {
    UPLOAD_FILE: '/file/upload',
    DOWNLOAD_FILE: '/file/download',
    DELETE_FILE: '/file/delete',
  },
  URL_PDF: {
    CONVERT: '/url-pdf/convert',
  },
  SEV_DESK: {
    CONTACT: '/sev-desk/Contact',
  },
};