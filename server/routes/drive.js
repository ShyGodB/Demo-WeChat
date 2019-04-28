const Router = require('koa-router');
const drive = require('../lib/drive');
const router = new Router();


// 更行用户出行记录
router.post("/addTripRecord", async (ctx) => {
    const uploadedData = ctx.request.body;
    const userId = uploadedData.userId;
    const price = uploadedData.price;
    const amount = uploadedData.amount;
    const trip = uploadedData.trip;
    const cost = uploadedData.cost;
    const data = [userId, price, amount, trip, cost];
    console.log(data);
    const addTripRecordPromise = drive.addTripRecord(data);
    await addTripRecordPromise;
});

module.exports = router;
