const language    = require('../dao/language');

module.exports = {
    /**
     * 根据tablename id 获取语言信息
     */
    getById: function(req, res, next) {

        const id = req.query.id;
        const tablename = req.query.tablename;

        if(!id) {
            res.json({
                result: -1,
                errmsg: '缺少请求参数字段id，请检查后重试'
            });
            return;
        }
        language.getById(tablename, id).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function (item) {
                    return {
                        id: item.id || '',
                        content: item.content || '',
                        title: item.title || '',
                        category: item.category || ''
                    }
                })
            })
        });
    },

    /**
     * 根据tablename category 获取语言信息
     */
    getByCategory: function(req, res, next) {

        const category  = req.query.category;
        const tablename = req.query.tablename;

        if(!category) {
            res.json({
                result: -1,
                errmsg: '缺少请求参数字段category，请检查后重试'
            });
            return;
        }
        language.getByCategory(tablename, category).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function (item) {
                    return {
                        id: item.id || '',
                        content: item.content || '',
                        title: item.title || '',
                        category: item.category || ''
                    }
                })
            })
        });
    },

    /**
     * 获取所有语言数据 - 在用
     */
    getAll: function(req, res, next) {
        const tablename = req.query.tablename;
        const pageNo    = req.query.pageNo;
        const pageSize  = req.query.pageSize;

        language.getAll(true, tablename, pageNo, pageSize)
        .then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        id: item.id || '',
                        content: item.content || '',
                        title: item.title || '',
                        category: item.category || ''
                    }  
                })
            })
        })
    }

}