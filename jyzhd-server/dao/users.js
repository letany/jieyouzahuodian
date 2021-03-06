const moment = require('moment');
const _      = require('./query');
const $sqlQuery = require('./sqlCRUD').user;

const user = {
    saveUserInfo: function (userInfo, session_key, skey) {
        const uid = userInfo.openId,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time = create_time;
        const insertObj = {
            'uid': uid,
            'create_time': create_time,
            'uname': userInfo.nickName,
            'ugender': userInfo.gender,
            'uaddress': userInfo.province+','+userInfo.country,
            'update_time': update_time,
            'skey': skey,
            'sessionkey': session_key,
            'uavatar': userInfo.avatarUrl
        };
        const updateObj = {
            'uname': userInfo.nickName,
            'ugender': userInfo.gender,
            'uaddress': userInfo.province + ',' + userInfo.country,
            'update_time': update_time,
            'skey': skey,
            'sessionkey': session_key,
            'uavatar': userInfo.avatarUrl
        };
        return _.query($sqlQuery.hasUser, uid)
            .then(function(res) {
                if (res && res[0] && res[0].userCount) {         // 已经有此用户，则更新用户信息
                    return _.query($sqlQuery.update, [updateObj, uid])
                } else {                        // 否则，添加此用户
                    return _.query($sqlQuery.add, insertObj)
                }
            })
            .then(function () {
                const resUserObj = Object.assign({}, userInfo, {});
                delete resUserObj.openId && delete resUserObj.watermark;
                return {
                    userInfo: resUserObj,
                    skey: skey
                }
            })
            .catch(function(e) {
                console.log('save userInfo error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    }
};

module.exports = user;