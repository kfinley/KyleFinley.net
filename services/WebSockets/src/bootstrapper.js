"use strict";
exports.__esModule = true;
require("reflect-metadata");
var inversify_props_1 = require("inversify-props");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var client_apigatewaymanagementapi_1 = require("@aws-sdk/client-apigatewaymanagementapi");
var src_1 = require("@kylefinley.net/aws-commands/src");
var commands_1 = require("./commands");
var src_2 = require("@kylefinley.net/github-commands/src");
var pingMessage_1 = require("./commands/pingMessage");
var src_3 = require("@kylefinley.net/github-commands/src");
function bootstrapper() {
    (0, src_1.bootstrapper)(inversify_props_1.container);
    (0, src_3.bootstrapper)(inversify_props_1.container);
    if (!inversify_props_1.container.isBound("DynamoDBClient")) {
        inversify_props_1.container.bind("DynamoDBClient")
            .toDynamicValue(function () { return new client_dynamodb_1.DynamoDBClient({
            endpoint: "http://kylefinley.dynamodb:8000"
        }); });
    }
    if (!inversify_props_1.container.isBound("ApiGatewayManagementApiClient")) {
        inversify_props_1.container.bind("ApiGatewayManagementApiClient")
            .toDynamicValue(function () { return new client_apigatewaymanagementapi_1.ApiGatewayManagementApiClient({
            endpoint: "http://kylefinley.sls:3001"
        }); });
    }
    addTransientIfNeeded(src_2.AuthorizeCommand, "AuthorizeCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.AuthorizeConnectionCommand, "AuthorizeConnectionCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.DeleteConnectionCommand, "DeleteConnectionCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.DeleteConnectionByUserIdCommand, "DeleteConnectionByUserIdCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.GetConnectionByUserIdCommand, "GetConnectionByUserIdCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.SendMessageCommand, "SendMessageCommand", inversify_props_1.container);
    addTransientIfNeeded(commands_1.SaveConnectionCommand, "SaveConnectionCommand", inversify_props_1.container);
    addTransientIfNeeded(pingMessage_1.PingMessageCommand, "PingMessageCommand", inversify_props_1.container);
}
exports["default"] = bootstrapper;
function addTransientIfNeeded(constructor, id, container) {
    if (!container.isBound(id)) {
        container.addTransient(constructor, id);
    }
}
//# sourceMappingURL=bootstrapper.js.map