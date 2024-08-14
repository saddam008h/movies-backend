"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//develpment or production
let client_path = '';
if (process.env.NODE_ENV === 'production') {
    client_path = process.env.CLIENT_PATH_PROD;
}
else {
    client_path = process.env.CLIENT_PATH_DEV;
}
exports.default = client_path;
//# sourceMappingURL=clientPath.js.map