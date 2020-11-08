var WxParse = require('../../../wxParse/wxParse.js');
const api = require('../../../config/config.js');

var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comment: "",
        commentList: [],
        commentLoading: true,
        content: '',
        article: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let _i = options.navIndex;
        let _ii = options.navII;
        // console.log("_i = ", _i);
        // console.log("_ii = ", _ii);

        let con = wx.getStorageSync('content');
        let cont = JSON.parse(con)
        console.log("con0= ", cont[_i][_ii].content);

        // WxParse.wxParse('article', 'html', cont[_i][_ii].content, that, 5);

        let article = app.towxml.toJson(
            cont[_i][_ii].content,               // `markdown`或`html`文本内容
            'html'              // `markdown`或`html`
        );
        
        that.setData({
            article: article
        })

        app.globalData.recordid = options.navID;

        // that.getByID(app.globalData.tablename, options.navID, (content) => {
        /**
        * WxParse.wxParse(bindName, type, data, target, imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */

        // WxParse.wxParse('article', 'md', content, that, 5);
        // })


        // that.getCByID(options.navID, (content) => {
        //   WxParse.wxParse('article', 'md', content, that, 5);
        // })

        wx.setNavigationBarTitle({
            title: options.navName
        })

        that.getPageData();

    },

    /**
     * 用户输入评论
     */
    inputComment: function (ev) {
        let that = this;
        that.setData({
            comment: ev.detail.value
        });
    },

    /**
     * 检查输入是否为空
     */
    checkEmpty: function (input) {
        return input === '';
    },

    /**
     *  检查用户是否输入了非法字符
     */
    checkIllegal: function (input) {
        let patern = /[`#^<>:"{}\/;'[\]]/;
        let _result = patern.test(input);
        return _result;
    },

    /**
     * 检查用户输入
     */
    checkUserInput: function () {
        /*
        * 检测用户输入
        * 1. 是否包含非法字符
        * 2. 是否为空
        * 3. 是否超出长度限制
        */
        let that = this;
        let comment = that.data.comment;
        let showToastFlag = false;
        let toastWording = '';

        if (that.checkEmpty(comment)) {
            showToastFlag = true;
            toastWording = '输入不能为空';
        } else if (that.checkIllegal(comment)) {
            showToastFlag = true;
            toastWording = '含有非法字符';
        } else if (comment.length > 140) {
            showToastFlag = true;
            toastWording = '长度超出限制';
        }

        if (showToastFlag) {
            that.showInfo(toastWording);
            return false;
        } else {
            return true;
        }
    },

    /**
     * 提交评论内容
     */
    submitComment: function (ev) {

        let that = this;

        console.log("ev=", ev);

        let formId = ev.detail.formId;

        if (that.checkUserInput()) {

            console.log('submit!');

            let requestData = {

                skey: app.getLoginFlag(),

                content: that.data.comment,

                tablename: app.globalData.tablename,

                crecordid: app.globalData.recordid

            };

            wx.request({

                url: api.commentUrl,

                method: 'POST',

                data: requestData,

                success: function (res) {
                    // 接口返回成功

                    if (res.data.result == 0) {

                        that.showInfo('评论成功', 'success', function () {

                            that.getPageData();

                            wx.setStorageSync('isFromBack', '1');

                        });
                    } else {
                        console.log("res.data", res.data);
                        that.showInfo(res.data.errmsg);
                    }

                },

                fail: function (error) {
                    that.showInfo('请求失败');
                }
            });
        }
    },

    /**
     *  封装 wx.showToast
     */
    showInfo: function (info, icon = 'none', callback = () => { }) {
        wx.showToast({
            title: info,
            icon: icon,
            duration: 1500,
            mask: true,
            success: callback
        });
    },

    // 获取评论列表
    getPageData: function () {

        let that = this;

        let requestData = {
            ctablename: app.globalData.tablename,
            crecordid: app.globalData.recordid
        };

        wx.request({

            url: api.getcommentUrl,

            method: 'GET',

            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },

            data: requestData,

            success: function (res) {
                if (res.data.result === 0) {

                    that.setData({
                        commentList: res.data.data || [],
                        comment: '',
                        commentLoading: false
                    });

                } else {
                    that.showInfo('返回数据异常');
                }
            },
            fail: function (error) {
                that.showInfo('请求失败');
            }
        });
    },

    // 获取C语言列表by id 
    getCByID: function (record_id, callback) {
        let that = this;
        app.getCByID(record_id, function (res) {

            callback(res.data[0].content)

        });
    },

    // 获取某种语言列表by id
    getByID: function (tablename, record_id, callback) {
        let that = this;
        app.getByID(tablename, record_id, function (res) {

            callback(res.data[0].content)

        });
    }

})