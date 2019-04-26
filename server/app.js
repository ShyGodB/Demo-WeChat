const Koa = require('koa');
const path = require('path');
const sql = require('./lib/sql');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();



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

router.post("/index", async (ctx) => {
    const data = ctx.request.body;
    console.log(data);
    ctx.body = {msg: "成功"};
})

router.post("/user", async (ctx) => {
    const userInfo = ctx.request.body;
    console.log(userInfo);
    const data = [userInfo.nickname, userInfo.gender, userInfo.avatarUrl, userInfo.city, userInfo.country, userInfo.province];
    const addUserPromise = sql.addUser(data);
    await addUserPromise;
    ctx.body = {msg: "成功"};
});

app.use(router.routes()).use(router.allowedMethods);

app.listen(8080, () => {
    console.log("Server is running at http://127.0.0.1:8080");
});
