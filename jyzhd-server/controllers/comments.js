const Comments = require('../dao/comments');
const Pusher = require('./push');
const moment = require("moment")
module.exports = {
    /**
     * 根据用户skey标识，写评论
     */
    addCommentBySkey: function(req, res, next) {
        Comments.addCommentBySkey(req.body.skey, req.body.content, req.body.tablename, req.body.crecordid )
        .then(function(resData) {
            console.log(resData);

            if(resData && resData.insertId) {
                /**
                 * 推送评论消息
                 */
                // Pusher.pushMessageToUser(req);

                res.json({
                    result: 0,
                    errmsg: 'insert success!'
                });

            } else {
                
                res.json({
                    result: -2,
                    errmsg: '提交失败'
                });

            }
        })
        .catch(function(e) {

            res.json({
                result: -3,
                errmsg: '网络错误'
            })
            
        })
    },


    getCommentsBySkey: function(req, res, next) {
        return Comments.getCommentsBySkey(req.query.ctablename, req.query.crecordid)
        .then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        uname: item.uname || '',
                        uavatar: item.uavatar || '',
                        ccontent: item.ccontent || '',
                        created_at:moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')
                    }  
                })
            })
        });
    }
}