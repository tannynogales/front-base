export const environment = {
  paypalClientId:
    'AS_ickX92sOz3UrhKSdFu7nHE8RfNfnP-HuZQfBwI-_Q8l119DyMtohNSpqhsQpLQdtji8gGwTs5JAQT',
  //https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/
  paypalCurrency: 'EUR', //USD
  // strapi: 'https://roble-strapi.rj.r.appspot.com',
  // strapi: 'https://neges-strapi-production.up.railway.app',
  strapi: 'http://localhost:1337',
  strapiSiteID: 1,
  sessionExpirationTime: 15, // minutes

  productStateFilters: `filters[$or][0][status][$null]=true&filters[$or][1][status][$in][0]=created&filters[$or][1][status][$in][1]=approved&filters[$or][1][status][$in][2]=completed`,
};
