const path = require('path');
module.exports = {
    entry: './src/main.ts',
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'pingu.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        sqlite3: 'commonjs sqlite3',
    },
};