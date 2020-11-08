const _ = require('./query');
const $sqlQuery = require('./sqlCRUD').language;

const language = {

    getById: function (tablename, id) {
        return _.query($sqlQuery.queryById, [tablename, id]);
    },
    
    getByCategory: function (tablename, category) {
        return _.query($sqlQuery.queryByCategory, [tablename, category]);
    },

    getAll: function (is_all, tablename, pageNo, pageSize, id) {

        // console.log("tablename", tablename);
        // tablename = "c";
        // const _sql = $sqlQuery.queryAll + " limit " + (pageNo-1)*pageSize + "," + pageSize;
        const _sql = $sqlQuery.queryAll + " limit " + pageSize + " offset " + (pageNo-1)*pageSize

        // const _sql = $sqlQuery.queryAll + " limit " + limit
        // const _sql = $sqlQuery.queryAll
        // console.log("_sql=", _sql)
        if (is_all) {
            // console.log(_.query($sqlQuery.queryAll, [tablename]))
            return _.query(_sql, [tablename]) 
        } else {
            return _.query($sqlQuery.queryById, [tablename, id]);
        }
    }

};
module.exports = language;