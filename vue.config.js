module.exports = {

    publicPath: './',
    devServer: {
        // 设置代理
        host: "0.0.0.0", 
        port: 8080,
        proxy: {
            "/kplapi": {
                target: "http://pos.xvo2o.com/kplapi", // 访问数据的计算机域名
                ws: true, // 是否启用websockets
                changOrigin: true ,//开启代理
                pathRewrite: {
                    '^/kplapi': ''//请求的时候使用这个api就可以
                }

            }
        }
    
    },
    configureWebpack : {
        performance: {
            hints:'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }


}