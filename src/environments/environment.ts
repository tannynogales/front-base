export const environment = {
  paypalClientId:
    'AS_ickX92sOz3UrhKSdFu7nHE8RfNfnP-HuZQfBwI-_Q8l119DyMtohNSpqhsQpLQdtji8gGwTs5JAQT',
  paypalCurrency: 'EUR', //USD
  strapi: 'https://neges-strapi-production.up.railway.app',
  strapiSiteID: 1,
  sessionExpirationTime: 15, // minutes
  productStateFilters: `filters[$or][0][status][$null]=true&filters[$or][1][status][$in][0]=created&filters[$or][1][status][$in][1]=approved&filters[$or][1][status][$in][2]=completed`,
};
