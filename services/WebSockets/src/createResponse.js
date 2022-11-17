"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.createResponse = void 0;
function createResponse(event, statusCode, body) {
    var response = {
        statusCode: statusCode,
        body: body
    };
    if (event.requestContext.eventType === 'CONNECT') {
        return __assign(__assign({}, response), { headers: {
                'Sec-WebSocket-Protocol': event.headers['Sec-WebSocket-Protocol']
            } });
    }
    return response;
}
exports.createResponse = createResponse;
;
//# sourceMappingURL=createResponse.js.map