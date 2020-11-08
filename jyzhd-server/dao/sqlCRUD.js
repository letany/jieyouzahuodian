// 用户相关的CRUD操作
const user = {
    queryById: 'select * from users where uid=?',
    add: 'insert into users set ?',
    hasUser: 'select count(*) as userCount from users where uid=?',
    update: 'update users set ? where uid=?'
};

// 评论相关的CRUD操作
const comment = {
    queryById: 'select * from comment where cmid=?',
    addComment: 'insert into comment (uid,uname,uavatar,crecordid,ctablename,ccontent) select uid,uname,uavatar,?,?,? from users where users.skey=?',
    queryComments: 'select * from comment where ctablename=? and crecordid=?'
};

// 接口凭据相关的CRUD操作
const access = {
    queryToken: 'select token from access'
};

// C语言相关的CRUD操作
const c = {
    queryById   : 'select * from c where id=?',
    queryAll    : 'select * from c'
};

// 各种语言的CRUD操作
const language = {
    queryById   : 'select * from ?? where id = ?',
    queryAll    : 'select * from ?? where 1 = 1',
    queryByCategory: 'select * from ?? where category = ?'
}


module.exports = {
    user,
    comment,
    access,
    c,
    language
}