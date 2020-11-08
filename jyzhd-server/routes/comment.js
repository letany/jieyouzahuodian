const express   = require('express');
const router    = express.Router();
const Comment   = require('../controllers/comments');
/**
 *  @desc 写评论
 *  @method {*请求方法} POST
 */
router.post('/write', function (req, res, next) {
    const skey = req.body.skey;
    const content = req.body.content;
    const crecordid = parseInt(req.body.crecordid);

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    if(content === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数content字段，请检查后重试'
        });
        return;
    }

    if (crecordid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数bookid字段，请检查后重试'
        });
        return;
    }

    Comment.addCommentBySkey(req, res, next);
});

/**
 *  @desc  读取评论
 *  @method {*请求方法} GET
 */
router.get('/get', function (req, res, next) {
    Comment.getCommentsBySkey(req, res, next)
    // Comment.addCommentBySkey(req, res, next);
});

module.exports = router;