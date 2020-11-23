//app.js
const api = require('./config/config.js');
const Towxml = require('/towxml/main'); 
App({
    onLaunch: function () {
        let that = this;
        that.checkLoginStatus()
    },
    
    towxml: new Towxml(),

    // 获取用户信息
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },

    // 检查本地 storage 中是否有登录态标识
    checkLoginStatus: function () {
        let that = this;
        let loginFlag = wx.getStorageSync('loginFlag');
        if (loginFlag) {
            // 检查 session_key 是否过期
            wx.checkSession({
                // session_key 有效(为过期)
                success: function () {
                    // 直接从Storage中获取用户信息
                    let userStorageInfo = wx.getStorageSync('userInfo');
                    if (userStorageInfo) {
                        that.globalData.userInfo = JSON.parse(userStorageInfo);
                    } else {
                        that.showInfo('缓存信息缺失');
                        console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失');
                    }
                },
                // session_key 过期
                fail: function () {
                    // session_key过期
                    that.doLogin();
                }
            });
        } else {
            // 无登录态
            console.log("storage中没有登录标示")
            that.doLogin();
        }
    },

    // 登录动作
    doLogin: function (callback = () => { }) {
        let that = this;
        wx.login({
            success: function (loginRes) {
                if (loginRes.code) {
                    /* 
                     * @desc: 获取用户信息 期望数据如下 
                     *
                     * @param: userInfo       [Object]
                     * @param: rawData        [String]
                     * @param: signature      [String]
                     * @param: encryptedData  [String]
                     * @param: iv             [String]
                     **/
                    wx.getUserInfo({
                        withCredentials: true, // 非必填, 默认为true
                        success: function (infoRes) {
                            console.log(infoRes, '>>>getuserinfo')
                            // 请求服务端的登录接口
                            wx.request({
                                url: api.loginUrl,
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded',
                                    'cache-control': 'no-cache',
                                },
                                data: {
                                    code: loginRes.code,                    // 临时登录凭证
                                    rawData: infoRes.rawData,               // 用户非敏感信息
                                    signature: infoRes.signature,           // 签名
                                    encryptedData: infoRes.encryptedData,   // 用户敏感信息
                                    iv: infoRes.iv                          // 解密算法的向量
                                },
                                success: function (res) {
                                    console.log('请求服务端程序成功');
                                    res = res.data;
                                    console.log(res, "<<<请求的数据是")
                                    if (res.result == 0) {
                                        that.globalData.userInfo = res.userInfo;
                                        console.log(that.globalData.userInfo, "global")
                                        wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                                        wx.setStorageSync('loginFlag', res.skey);

                                        callback();
                                    } else {
                                        that.showInfo(res.errmsg);
                                    }
                                },
                                fail: function (error) {
                                    // 调用服务端登录接口失败
                                    that.showInfo('调用接口失败');
                                    console.log(error);
                                }
                            });
                        },
                        fail: function (error) {
                            // 获取 userInfo 失败，去检查是否未开启权限
                            wx.hideLoading();
                            that.checkUserInfoPermission();
                        }
                    });

                } else {
                    // 获取 code 失败
                    that.showInfo('登录失败');
                    console.log('调用wx.login获取code失败');
                }
            },

            fail: function (error) {
                console.log("dologin fail")
                // 调用 wx.login 接口失败
                that.showInfo('接口调用失败');
                console.log(error);
            }
        });
    },

    // 检查用户信息授权设置
    checkUserInfoPermission: function (callback = () => { }) {
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.openSetting({
                        success: function (authSetting) {
                            console.log(authSetting)
                        }
                    });
                }
            },
            fail: function (error) {
                console.log(error);
            }
        });
    },

    // 获取用户登录标示 供全局调用
    getLoginFlag: function () {
        return wx.getStorageSync('loginFlag');
    },

    // 封装 wx.showToast 方法
    showInfo: function (info = 'error', icon = 'none') {
        wx.showToast({
            title: info,
            icon: icon,
            duration: 1500,
            mask: true
        });
    },

    // 获取所有C语言列表
    getC: function (callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.caUrl,

            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },

            data: {
                is_all: 1
            },
            success: function (res) {

                res = res.data;
                callback(res);

            },

            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 根据ID获取某个C语言列表
    getCByID: function (rid, callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.caUrl,
            data: {
                is_all: 0,
                id: rid
            },
            success: function (res) {
                res = res.data;
                callback(res);
            },

            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 获取account
    getAccount: function (callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.accountUrl,

            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },

            data: {
            },
            header: api.thirdToken,
            success: function (res) {

                res = res.data;
                callback(res);

            },

            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 获取某个语言的所有记录
    getAllLanguage: function (tablename, pageNo, pageSize, callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.getAllLanguage,

            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },

            data: {
                is_all: 1,
                tablename: tablename,
                pageNo: pageNo,
                pageSize: pageSize
            },

            success: function (res) {
                res = res.data;
                callback(res);
            },

            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 根据ID获取某个语言列表
    getByID: function (tablename, id, callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.getByID,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            data: {
                is_all: 0,
                tablename: tablename,
                id: id
            },
            success: function (res) {
                res = res.data;
                callback(res);
            },
            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 根据category获取某个语言列表
    getByCategory: function (tablename, category, callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.getByCategory,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            data: {
                tablename: tablename,
                category: category
            },
            success: function (res) {
                res = res.data;
                callback(res);
            },
            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // 根据ID获取某个语言列表
    getByID: function (tablename, id, callback) {
        let that = this;
        // 请求服务端的登录接口
        wx.request({
            url: api.getByID,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            data: {
                tablename: tablename,
                id: id
            },
            success: function (res) {
                res = res.data;
                callback(res);
            },
            fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
            }
        });
    },

    // app全局数据
    globalData: {
        userInfo: null,
        tablename: '',
        recordid: 0
    }
})
