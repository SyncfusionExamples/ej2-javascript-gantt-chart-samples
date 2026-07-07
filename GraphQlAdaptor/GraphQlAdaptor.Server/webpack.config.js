const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/resolvers.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(gql|graphql)/,
                use: 'graphql-tag/loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    target: 'node'
};
