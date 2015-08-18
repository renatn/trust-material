# trust-material
TRUST Online client in Material Design

## How to build

- npm install
- grunt build
- grunt server

Open in browser http://localhost:9001

## Fix grunt-connect-proxy task

Edit file node_modules/grunt-connect-proxy/tasks/connect_proxy.js

Add line: 	changeOrigin: proxyOption.changeOrigin,

## Screenshots

![](trust-material-login.png) ![](trust-material-dashboard.png)
