// spack doesn"t support ESM config 😢

const { config } = require("@swc/core/spack");

module.exports = config({
    entry: {
        "entry": __dirname + "/../../test/entry.js",
    },
    output: {
        path: __dirname + "/../../dist/test-swcpack"
    },
    module: {},
});
