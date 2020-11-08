const express   = require('express');
const router    = express.Router();
const language  = require('../controllers/language');

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
        language.getById(req, res, next);
    } else {
        language.getById(req, res, next);
    }
});


/** 
 * @desc    获取分类
 * @method  {*请求方法} GET
 */
router.get('/category', function (req, res, next) {

    const reqType = req.query.category;
    
    if(reqType === undefined) {

        res.json({
            result: -1,
            errmsg: '缺少请求参数id字段，请检查后重试'
        });
        return;
    }

    if(parseInt(reqType) === 1) {
        language.getByCategory(req, res, next);
    } else {
        language.getByCategory(req, res, next);
    }
});


/** 
 * @desc    获取所有数据
 * @method  {*请求方法} GET
 */
router.get('/all', function (req, res, next) {

    const reqType = req.query.is_all;
    
    if(reqType === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数is_all字段，请检查后重试'
        });
        return;
    }

    if(parseInt(reqType) === 1) {   // 获取
        language.getAll(req, res, next);
    } else {
        language.getById(req, res, next);
    }
});

module.exports = router;
