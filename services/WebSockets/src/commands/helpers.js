"use strict";
exports.__esModule = true;
exports.convertRequestToItem = void 0;
function convertRequestToItem(request) {
    return {
        userId: {
            S: request.userId
        },
        connectionId: {
            S: request.connectionId
        }
    };
}
exports.convertRequestToItem = convertRequestToItem;
//# sourceMappingURL=helpers.js.map