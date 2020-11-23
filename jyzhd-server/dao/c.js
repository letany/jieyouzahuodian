const $sqlQuery = require('./sqlCRUD').c;
const _ = require('./query');

const c = {
    getContentById: function (id) {
        return _.query($sqlQuery.queryById, [id]);
    },

    getCInfo: function (is_all, id) {
        if (is_all) {
            return _.query($sqlQuery.queryAll, []) 
        } else {
            return _.query($sqlQuery.queryById, [id]);
        }
    }
};
module.exports = c;