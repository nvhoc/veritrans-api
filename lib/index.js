// =============================================================================
// ,,,,,,,,, ,,,
// ,,,,,,,, ,,,  Copyright:
// ,,,     ,,,          This source is subject to the Designveloper JSC
// ,,,    ,,,           All using or modify must have permission from us.
// ,,,   ,,,            http://designveloper.com
// ,,,,,,,,
// ,,,,,,,       Name:  DSVScriptTemplate
//
// Purpose:
//          Describe the purpose of the script [short version]
// Class:
//          one ; two ; three
// Functions:
//          one ; two ; three
// Called From:
//          (script) any
// Author:
//          hocnguyen
// Notes:
//          Additional information [long version]
// Changelog:
//          2/3/16 - hocnguyen - Init first revision.
// =============================================================================
var Buffer = require('buffer');
var httpreq = require('httpreq');
var HttpAgent = require('agentkeepalive');
var keepaliveAgent = new HttpAgent({keepAlive: true});
var base_url = {
    'dev': 'https://api.sandbox.veritrans.co.id/v2',
    'prod': 'https://api.sandbox.veritrans.co.id/v2'
};
var options = {
    env: 'dev',
    key: 'OTQ5NjBlY2UtOTUxMy00MjY1LTljZjItNjdhNGRhMzMwMjEzOg==',
    header: {
        'content-type': 'application/json',
        'accept': 'application/json',
    }
};
/*
 * Constructor module
 * @params env,key
 */
Veritrans = function (opt) {
    //change with default
    for (var key in opt) {
        options[key] = opt[key];
    }
    //init
    this.BASE_URL = base_url[options.env];
    this.HEADER = options.header;
    var buffer = new Buffer(options.key);
    this.HEADER.Authorization = 'Basic ' + buffer.toString('base64');

};

Veritrans.prototype.doAction = function (action, data, cb) {
    var url = "";
    if (['charge', 'capture'].indexOf(action))
        url = this.BASE_URL + '/' + action;
    else
        url = this.BASE_URL + '/' + data.order_id + '/' + action;
    httpreq.post(url, {
        headers: {
            'Connection': 'keep-alive',
            'Authorization': this.HEADER.Authorization,
            'Content-Type': this.HEADER['content-type'],
            'Accept': this.HEADER['accept']
        },
        body: data,
        agent: keepaliveAgent
    }, cb);
};

module.export = Veritrans;