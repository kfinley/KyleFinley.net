"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DeleteConnectionCommand = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var inversify_props_1 = require("inversify-props");
var CONNECTION_TABLE = process.env.WEBSOCKETS_CONNECTION_TABLE;
var DeleteConnectionCommand = /** @class */ (function () {
    function DeleteConnectionCommand() {
    }
    DeleteConnectionCommand.prototype.runAsync = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, connectionId, response_1, item, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = params.userId, connectionId = params.connectionId;
                        if (!(!userId || !connectionId)) return [3 /*break*/, 2];
                        console.log('Looking up userId');
                        return [4 /*yield*/, this.ddbClient.send(new client_dynamodb_1.ScanCommand({
                                TableName: CONNECTION_TABLE,
                                ExpressionAttributeValues: {
                                    ':connectionId': { S: params.connectionId }
                                },
                                ProjectionExpression: 'userId, connectionId',
                                FilterExpression: 'connectionId = :connectionId'
                            }))];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.$metadata.httpStatusCode !== 200) {
                            throw new Error("Unexpected response in DeleteConnection");
                        }
                        if (response_1.Items) {
                            item = response_1.Items[0];
                            userId = item.userId.S;
                            connectionId = item.connectionId.S;
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false
                                }];
                        }
                        _a.label = 2;
                    case 2:
                        console.log('Deleting user connection');
                        return [4 /*yield*/, this.ddbClient.send(new client_dynamodb_1.DeleteItemCommand({
                                TableName: CONNECTION_TABLE,
                                Key: {
                                    userId: {
                                        S: userId
                                    },
                                    connectionId: {
                                        S: connectionId
                                    }
                                }
                            }))];
                    case 3:
                        response = _a.sent();
                        if (response.$metadata.httpStatusCode !== 200) {
                            throw new Error("Unexpected response in DeleteConnection");
                        }
                        console.log('deleted websocket connection');
                        return [2 /*return*/, {
                                success: true
                            }];
                }
            });
        });
    };
    __decorate([
        (0, inversify_props_1.Inject)("DynamoDBClient")
    ], DeleteConnectionCommand.prototype, "ddbClient");
    return DeleteConnectionCommand;
}());
exports.DeleteConnectionCommand = DeleteConnectionCommand;
//# sourceMappingURL=deleteConnection.js.map