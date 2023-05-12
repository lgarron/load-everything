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
// Mangled so that bundlers don't try to inline the source.
var fs_promises_mangled = "node:f-s/promises";
var fs_promises_unmangled = function () { return fs_promises_mangled.replace(/-/g, ""); };
// Mangled so that bundlers don't try to inline the source.
var fs_mangled = "node:f-s";
var fs_unmangled = function () { return fs_mangled.replace(/-/g, ""); };
/** In theory, it is not necesary to cache the import, as JavaScript runtimes
 * should do that foes us. However, I've seen JavaScript runtimes crash if you
 * try to call `import(…)` too many times, so we implement a cached lazy import.
 *
 * Note that we can't use a static import, as we only want to try to import as a
 * fallback for lack of `fetch(…)` support.
 *
 * Also note that we could use the `...` spread operator to pass arguments on to
 * `readFile`, but I'd like to avoid assuming ES features we don't strictly need. */
var fs_promises_cached;
export function readFileFunction() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(fs_promises_cached !== null && fs_promises_cached !== void 0)) return [3 /*break*/, 1];
                    _a = fs_promises_cached;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, import(/* vite-ignore */ fs_promises_unmangled())];
                case 2:
                    _a = (fs_promises_cached = _b.sent());
                    _b.label = 3;
                case 3:
                    _a;
                    return [4 /*yield*/, fs_promises_cached];
                case 4: return [2 /*return*/, (_b.sent()).readFile];
            }
        });
    });
}
var fs_cached;
export function readAsBlobFunction() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs_cached !== null && fs_cached !== void 0 ? fs_cached : (fs_cached = import(/* vite-ignore */ fs_unmangled()));
                    return [4 /*yield*/, fs_cached];
                case 1: return [2 /*return*/, (_a.sent()).openAsBlob];
            }
        });
    });
}
