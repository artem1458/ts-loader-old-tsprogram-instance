import path from 'path';
import myTransformer from "./myTransformer";

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
                        getCustomTransformers: (program: any) => ({
                            before: [myTransformer(program)],
                        }),
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
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 4000,
    },
};
