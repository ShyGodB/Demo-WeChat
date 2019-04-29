const Router = require('koa-router');
const router = new Router();
const axios = require('axios');

// 请求主页
router.get("/", async (ctx) => {
    await ctx.render("index");
});



router.post("/onLogin", async (ctx) => {
    const code = ctx.request.body.code;
    console.log(code);
    let data;
    const appId = 'wxd769fd7ca8895e6e';
    const appSecret = '6a91717350ce071f0a0477d097fde800';
    const aCode = 'authorization_code';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=${aCode}`;
    axios.get(url)
 	.then(response => {
	     console.log(response.data.url);
   	     console.log(response.data.explanation);
	     data = response;
 	 })
 	 .catch(error => {
    	     console.log(error);
 	 });   
    ctx.body = data; 
});


router.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxd769fd7ca8895e6e&secret=6a91717350ce071f0a0477d097fde800&js_code=JSCODE&grant_type=authorization_code", async (ctx) => {
    const data = ctx.request.body;
    console.log(data);
    ctx.body = {msg: '111'};
});


module.exports = router;
