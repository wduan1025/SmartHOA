const routes = require("next-routes")();

routes
    .add("/hoa/:address/requests/new", "/hoa/requests/new")
    .add("/hoa/:address/requests", "/hoa/requests/index")
    .add("/hoa/new", "/hoa/show")
    .add("/hoa/:address","/hoa/show");
module.exports = routes;