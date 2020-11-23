const express   = require('express');
const c      = require('../controllers/c');
const router    = express.Router();

/** 
 * @desc    获取
 * @method  {*请求方法} GET
 */
router.get('/', function (req, res, next) {
    const reqType = req.query.id;
    if(reqType === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数id字段，请检查后重试'
        });
        return;
    }
    if(parseInt(reqType) === 1) {
        c.getCById(req, res, next);
    } else {
        c.getCById(req, res, next);
    }
});

/** 
 * @desc    获取所有数据
 * @method  {*请求方法} GET
 */
router.get('/getC', function (req, res, next) {
    const reqType = req.query.is_all;
    if(reqType === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数is_all字段，请检查后重试'
        });
        return;
    }
    if(parseInt(reqType) === 1) {   // 获取
        c.getAllC(req, res, next);
    } else {
        c.getCById(req, res, next);
    }
});

module.exports = router;
