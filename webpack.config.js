module.exports = {
    entry: {
        main: './scripts/main.js'

    },
    output: {
        path: './dist/',
        filename: '[name].bundle.js'
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
                loader: 'file-loader?name=../images/[hash].[ext]',
            }

        ]
    }
};