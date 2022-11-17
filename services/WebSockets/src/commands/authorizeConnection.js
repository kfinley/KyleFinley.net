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
exports.AuthorizeConnectionCommand = void 0;
var inversify_props_1 = require("inversify-props");
var generatePolicy = function (principalId, effect, resource) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var policyDocument = {};
        // default version
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var statement = {};
        // default action
        statement.Action = 'execute-api:Invoke';
        statement.Effect = effect;
        statement.Resource = resource;
        policyDocument.Statement[0] = statement;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};
var generateAllow = function (principalId, resource) { return generatePolicy(principalId, 'Allow', resource); };
var generateDeny = function (principalId, resource) { return generatePolicy(principalId, 'Deny', resource); };
var generateAuthResponse = function (authResponse, resource) {
    if (authResponse && authResponse.username && authResponse.authorized) {
        return generateAllow(authResponse.username, resource == undefined ? '$connect' : resource);
    }
    return generateDeny(authResponse.username, resource == undefined ? '$connect' : resource);
};
var AuthorizeConnectionCommand = /** @class */ (function () {
    function AuthorizeConnectionCommand() {
    }
    AuthorizeConnectionCommand.prototype.runAsync = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var authResult, authRequest, authResponse, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        authResult = void 0, authRequest = {
                            oauth: {
                                clientId: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID,
                                clientSecret: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET //TODO: DEAL WITH THIS
                            },
                            code: params.code
                        };
                        return [4 /*yield*/, this.authorizeCommand.runAsync(authRequest)];
                    case 1:
                        authResult = _a.sent();
                        //console.log(authResult);
                        if (authResult && authResult.data !== undefined) {
                            authResponse = generateAuthResponse(authResult, params.resource ? params.resource : "*");
                            // thought about publishing SNS message here but the connection isn't established yet so it should fail.
                            // test it later to see..
                            authResponse.context = {
                                access_token: authResult.data.access_token
                            };
                            // console.log(authResponse);
                            return [2 /*return*/, {
                                    authResponse: authResponse,
                                    success: authResponse.policyDocument.Statement[0].Effect == 'Allow'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, inversify_props_1.Inject)("AuthorizeCommand")
    ], AuthorizeConnectionCommand.prototype, "authorizeCommand");
    return AuthorizeConnectionCommand;
}());
exports.AuthorizeConnectionCommand = AuthorizeConnectionCommand;
//# sourceMappingURL=authorizeConnection.js.map