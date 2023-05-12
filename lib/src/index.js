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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { readAsBlobFunction, readFileFunction } from "./node";
export function dynamicImport(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var awaitedAsString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, import_meta_resolve_result];
                case 1:
                    awaitedAsString = (_a.sent());
                    return [4 /*yield*/, import(awaitedAsString)];
                case 2: 
                // In theory we should convert `URL` to a string. But all environments accept `URL`.
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fileURL(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = URL.bind;
                    return [4 /*yield*/, import_meta_resolve_result];
                case 1: return [2 /*return*/, new (_a.apply(URL, [void 0, _b.sent(), "file://"]))()];
            }
        });
    });
}
function loadTextNode(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var readFile, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, readFileFunction()];
                case 1:
                    readFile = _b.sent();
                    _a = readFile;
                    return [4 /*yield*/, fileURL(import_meta_resolve_result)];
                case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent(), "utf-8"])];
            }
        });
    });
}
// Load JSON using either `fetch(…)` or `node:fs/promises`
export function loadText(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _a = fetch;
                    return [4 /*yield*/, import_meta_resolve_result];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_c.sent()])];
                case 2: return [2 /*return*/, (_c.sent()).text()];
                case 3:
                    _b = _c.sent();
                    return [2 /*return*/, loadTextNode(import_meta_resolve_result)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Load JSON using either `fetch(…)` or `node:fs/promises`
export function loadJSON(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 5]);
                    _a = fetch;
                    return [4 /*yield*/, import_meta_resolve_result];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_e.sent()])];
                case 2: return [2 /*return*/, (_e.sent()).json()];
                case 3:
                    _b = _e.sent();
                    _d = (_c = JSON).parse;
                    return [4 /*yield*/, loadTextNode(import_meta_resolve_result)];
                case 4: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function loadBlob(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, readAsBlob, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 7]);
                    _a = fetch;
                    return [4 /*yield*/, import_meta_resolve_result];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_e.sent()])];
                case 2: return [2 /*return*/, (_e.sent()).blob()];
                case 3:
                    _b = _e.sent();
                    return [4 /*yield*/, readAsBlobFunction()];
                case 4:
                    readAsBlob = _e.sent();
                    _c = readAsBlob;
                    _d = fileURL;
                    return [4 /*yield*/, import_meta_resolve_result];
                case 5: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                case 6: return [2 /*return*/, _c.apply(void 0, [_e.sent()])];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// This is a convenience function that just calls `(await loadBlob(…)).arrayBuffer()` (which is sufficiently compatible).
export function loadArrayBuffer(import_meta_resolve_result) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBlob(import_meta_resolve_result)];
                case 1: return [2 /*return*/, (_a.sent()).arrayBuffer()];
            }
        });
    });
}
