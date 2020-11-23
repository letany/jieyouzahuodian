// 服务器域名
const baseUrl           = 'https://127.0.0.1:8080/';
// const baseUrl           = 'http://192.168.1.8:3003/';
// const baseUrl           = 'http://192.168.0.105:3003/';
// const baseUrl           = 'https://149.129.99.70:8080/';
// const baseUrl           = 'https://zmx.killf.info:8080/';

// 写评论接口
const commentUrl        = baseUrl + 'api/comment/write';

// 读评论接口
const getcommentUrl     = baseUrl + 'api/comment/get';

// 登录接口
const loginUrl          = baseUrl + 'login';

// c
const ckUrl             = baseUrl + 'api/c';

// c所有数据
const caUrl             = baseUrl + 'api/c/getC';

// 根据ID获取某种语言
const getByID           = baseUrl + 'api/get'
// 获取某种语言的所有数据
const getAllLanguage    = baseUrl + 'api/get/all'
// 获取某种语言的某个分类下所有数据
const getByCategory     =  baseUrl + 'api/get/category'

// 直接获取第三方服务器和数据库中的数据 - 乘法云 一家亲 account
const thirdToken = {
    "x-token": "AbwQAG8wTl14AEFRQUNRcXdlWkFZQkFBQUFBUnVxeUtoVFJ4V2xyd0FBQVFBQ1Fxd2VBaGNCQUFBQXNHb3J5YWhUUnhVeWp3QUHzr9r6PIgKaL08BiiRvfPjLZloDtFyoYZOmFhO1a0M4g8fL4j6xxCf9nCnkB7gFKCGDBqgw2twqwip3FglNAfO"
};

const thirdBaseUrl     = "https://crm.chengfayun.com/api/v1.0"
const accountUrl       = thirdBaseUrl + '/one/Account/query';

module.exports = {
    commentUrl        : commentUrl,
    loginUrl          : loginUrl,
    ckUrl             : ckUrl,
    caUrl             : caUrl,
    accountUrl        :	accountUrl,
    thirdToken        :	thirdToken,
    getcommentUrl     : getcommentUrl,
    getByID           : getByID,
    getAllLanguage    : getAllLanguage,
    getByCategory     : getByCategory
};