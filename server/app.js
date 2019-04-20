const Koa = require('koa');
const path = require('path');
const json = require('koa-json');
const render = require('koa-ejs');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require("fs");

const app = new Koa();
const router = new Router();


app.use(json());
app.use(bodyParser());
app.use(require('koa-static')(__dirname));


//配置模版引擎
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layouts/layout',
    viewExt: 'html',
    cache: false,
    debug: false
});


router.get("/", async (ctx) => {
     await ctx.render("index");
});



app.use(router.routes()).use(router.allowedMethods);

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000");
});