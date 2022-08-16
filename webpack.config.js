const path = require("path");
const webpack = require("webpack");

const PATHS = {
    entryPoint: path.resolve(__dirname, 'src/lib/index.tsx'),
    bundles: path.resolve(__dirname, '_bundles'),
}

module.exports = {
    entry: {
        'my-lib': [PATHS.entryPoint],
        'my-lib.min': [PATHS.entryPoint]
    },
    output: {
        path: PATHS.bundles,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MyLib',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};
