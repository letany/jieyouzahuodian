const $sqlQuery = require('./sqlCRUD').comment;
const _ = require('./query');

const comments = {
    getCommentsBySkey: function(ctablename, crecordid) {
        return _.query($sqlQuery.queryComments, [ctablename, crecordid]);
    },
    addCommentBySkey: function(skey, content, tablename, crecordid) {
        return _.query($sqlQuery.addComment, [crecordid, tablename, content, skey]);
    }
};
module.exports = comments;