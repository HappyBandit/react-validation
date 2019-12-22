module.exports = ( { config } ) => {
    config.module.rules.push( {
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve( 'babel-loader' ),
                options: {
                    presets: [ [ 'react-app', { flow: false, typescript: true } ] ],
                },
            },
            // Optional
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
        ],
    } );
    config.module.rules.push( {
        oneOf: [ {
            include: [ /node_modules\/bootstrap/ ],
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        }, {
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        localIdentName: '[folder]__[local]___[hash:base64:5]',
                        modules: true,
                        importLoaders: 1,
                    },
                },
                'sass-loader',
            ],
        } ],
        test: /\.scss$/,
    } );
    config.resolve.extensions.push( '.ts', '.tsx' );
    return config;
};
