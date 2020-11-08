const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'qwer_456',
    database: 'wxjy',
    port: 3306
}

// 创建数据库连接池
const pool = mysql.createPool(config);
// 进行CRUD操作
const crud = {
    query: function (sqlString, params) {
        // 返回一个promise，成功后执行函数体中的程序
        return new Promise( (resolve, reject) => {
            pool.getConnection( function (err, connection) {
                if(err){
                    // 将错误的值返回给回调函数作为参数
                    reject(err);
                }else{
                    connection.query(sqlString, params, (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            // 将查询结果的值返回给回调函数作为参数
                            resolve(rows);
                            // console.log("rows:", rows);
                        }
                        // 释放连接
                        connection.release();
                    })
                }
            })
        })
    }
}

// sql语句CRUD
// set 只支持单条数据的插入；values 可以进行批量插入；  
// set ?  中的?可以是对象，对象中包含字段:值
const _sql = {
    queryAll: 'select * from ?? where 1=1 limit 10',
    queryByID: 'select * from ?? where id = ? limit 10',
    insert: 'insert into ?? (id, name, content) values (?,?,?)',
    add: 'insert into ?? set ?',
    update: 'update ?? set ? where id = ?'
}

// call mysql function
const call_func = {
    getByID : function(table, id) {
        return crud.query(_sql.queryByID, [table, id]);
    },
    add_to : function(table, obj){
        return crud.query(_sql.add, [table, obj]);
    }
}

const insertObj = {
    id: 4,
    category: '基础语法',
    title: 'test_insert',
    content: '# insert one record sucessfully'
}

// test connection
// const conn = mysql.createConnection(config);
// conn.connect();
// conn.query('select * from c', function (err, result){
//     if (err) {
//         console.log("err: ", err.message);
//     }
//     console.log("this solution is: ", result);
// })
// console.log("test")
// conn.end();

// test pool
// call_func.add_to('c', insertObj);
call_func.getByID('c', 1).then((value)=>{
    console.log(value)
});

function timeout(ms){
    return new Promise( (resolve, reject) => {
        console.log("timeout")
        setTimeout(resolve, ms, {key:1000});
    });
}
timeout(1000).then((value) => {
    console.log(value)
})

let promise = new Promise( function(resolve, reject){
    console.log("Promise");
    // resolve('2');
    reject('1');
});

promise.then((value)=>{
    timeout(1500).then((value) => {
        console.log(value)
    })
    console.log(value);
    console.log("resolved");
});
console.log('Hi!!!')
timeout(1500).then((value) => {
    console.log(value)
})