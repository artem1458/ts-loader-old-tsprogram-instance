import path from 'path';

module.exports = {
    context: __dirname,
    entry: './index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        compiler: 'ttypescript'
                    },
                }],
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'webpack_bundled.js',
        path: path.resolve(__dirname, 'lib'),
    },
    devServer: {
        static: path.join(__dirname, 'lib'),
        port: 4000,
    },
};
