const Router = require('koa-router');
const user = require('../lib/user');
const router = new Router();



// 新增用户
router.post("/addUser", async (ctx) => {
    const user = ctx.request.body;
    const userInfo = user.userInfo;
    // console.log(userInfo);
    const data = [userInfo.nickName, userInfo.gender, userInfo.avatarUrl, userInfo.city, userInfo.country, userInfo.province];
    // console.log(data);
    const addUserPromise = user.addUser(data);
    await addUserPromise;
    ctx.body = {msg: "成功"};
});

// 获取所有用户信息
router.post("/listAllUser", async (ctx) => {
    const listAllUserPromise = user.listAllUser();
    const userInfoArray = await listAllUserPromise;
    // console.log(userInfoArray);
    ctx.body = userInfoArray;
});

// 获取单个用户信息
router.post("/getUser", async (ctx) => {
    const id = ctx.request.body.id;
    const getUserPromise = user.getUser(id);
    const userInfo = await getUserPromise;
    // console.log(userInfo);
    ctx.body = userInfo;
});

// 更新用户信息
router.post('/updateUser', async (ctx) => {
    const data = ctx.request.body;
    const id = data[0];
    const name = data[1];
    switch(name) {
	case 'price':
	    const price = data[2];
	    const data1 =  [price, id];
	    const updatePricePromise = user.updatePrice(data1);
	    await updatePricePromise;
	    ctx.body = {msg: '成功'};
	    break;
	case 'spend':
	    const spend = data[2];
        const data2 =  [spend, id];
        const updateCarSpendPromise = user.updateCarSpend(data2);
        await updateCarSpendPromise;
        ctx.body = {msg: '成功'};
        break;
    }
});

module.exports = router;
