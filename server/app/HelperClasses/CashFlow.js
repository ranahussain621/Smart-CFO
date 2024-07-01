const axios = require('axios')
this.ping = function(token, realmId) {
    var ApiUrl = 'https://sandbox-quickbooks.api.intuit.com/v3/company/' + realmId + '/reports/CashFlow?minorversion=65';
    axios({
        method: 'get',
        url: ApiUrl,
        headers: {
            'Accept': 'Application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(apiResponse => {
        const products = apiResponse.data
        return products
    }).catch(error => {
        if (error.response) {
            return "response error"
        } else if (error.request) {
            return "request error"
        } else {
            return error.message;
        }
        return error.toJSON()
    })
}