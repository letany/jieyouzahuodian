const c    = require('../dao/c');

module.exports = {
    
    getCById: function(req, res, next) {
        const id = req.query.id;
        if(!id) {
            res.json({
                result: -1,
                errmsg: '缺少请求参数字段id，请检查后重试'
            });
            return;
        }
        c.getCInfo(false, id).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function (item) {
                    return {
                        id: item.id || '',
                        content: item.content || '',
                        title: item.title || '',
                        category:item.category || ''
                    }
                })
            })
        });
    },
    /**
     * 获取所有数据
     */
    getAllC: function(req, res, next) {
        c.getCInfo(true).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        id: item.id || '',
                        content: item.content || '',
                        title: item.title || '',
                        category:item.category || ''
                    }  
                })
            })
        })
    }

}