const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
            target:"http://129.153.52.184:8800",
            changeOrigin:true,
            pathRewrite:{
            "^/api":""
            }
        })
    )
}
