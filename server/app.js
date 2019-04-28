const Koa = require('koa');
const path = require('path');
const sql = require('./lib/sql');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const router = new Router();
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

router.post("/addUser", async (ctx) => {
    const user = ctx.request.body;
    const userInfo = user.userInfo;
    // console.log(userInfo);
    const data = [userInfo.nickName, userInfo.gender, userInfo.avatarUrl, userInfo.city, userInfo.country, userInfo.province];
    // console.log(data);    
    const addUserPromise = sql.addUser(data);
    await addUserPromise;
    ctx.body = {msg: "成功"};
});

router.get("/getAllUser", async (ctx) => {
    const listAllUserPromise = sql.listAllUser();
    const userInfoArray = await listAllUserPromise;
    // console.log(userInfoArray);
    ctx.body = userInfoArray;
});

router.get("/getUser", async (ctx) => {
    const data = 1;
    const getUserPromise = sql.getUser(data);
    const userInfo = await getUserPromise;
    // console.log(userInfo);
    ctx.body = userInfo;
});

router.post('/updateUser', async (ctx) => {
    const data = ctx.request.body;
    const id = data[0];
    const name = data[1];
    switch(name) {
	case 'price':
	    const price = data[2];
	    const data1 =  [price, id];
	    const updatePricePromise = sql.updatePrice(data1);
	    await updatePricePromise;
	    ctx.body = {msg: '成功'};    
	    break;
	case 'spend':
	    const spend = data[2];
            const data2 =  [spend, id];
            const updateCarSpendPromise = sql.updateCarSpend(data2);
            await updateCarSpendPromise;
            ctx.body = {msg: '成功'};
            break;
    }
});



app.use(router.routes()).use(router.allowedMethods);

app.listen(8080, () => {
    console.log("Server is running at http://127.0.0.1:8080");
});
