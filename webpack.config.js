module.exports = {
    entry: './scripts/main.js',
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                loader: 'file-loader?name=dist/images/[hash].[ext]',
            }

        ]
    }
};