const api = require('../../../config/config.js');
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        hidden: false,
        curNav: 0,
        curName: '基础语法',
        curIndex: 0,
        navList: [
            {
                id: 0,
                name: '基础语法'
            },
            {
                id: 1,
                name: '执行命令'
            },
            {
                id: 2,
                name: '标准库'
            },
            {
                id: 3,
                name: '建议'
            }
        ],
        ListArr: [
            []
        ],
        pic: '',
        pageNo: 1,
        pageSize: 10,
        hasMoreData: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;

        // 标题名称 - 页面展示名称
        wx.setNavigationBarTitle({
            title: options.navName
        });

        // 给全局变量 表名 赋值
        app.globalData.tablename = options.navTable;
        // 把传进来的图片地址 给列表也使用
        that.setData({
            pic: `../${options.navPic}`
        })
        that.getAllLanguage();
    },

    loadingChange: function () {
        let that = this;
        setTimeout(() => {
            that.setData({
                hidden: true
            })
        }, 1000)
    },

    // event对象中包含两个对象，分别是currentTarget和target，
    selectNav: function (event) {
        let that = this;
        let id = event.currentTarget.dataset.id;
        let name = event.currentTarget.dataset.name;

        that.setData({
            curNav: id,
            curName: name,
            curIndex: id
        });
    },

    // 获取C语言列表
    getC: function () {
        let that = this;
        app.getC(function (res) {
            that.setData({
                ListArr: [
                    res.data
                ]
            })
        });
    },

    // 获取某语言列表
    getAllLanguage: function () {
        let that = this;
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];

        wx.removeStorageSync('content');

        // console.log("app.globalData.tablename", app.globalData.tablename)

        app.getAllLanguage(app.globalData.tablename, that.data.pageNo, that.data.pageSize, function (res) {
            for (var item of res.data) {
                arr1.push(item)
                // if (item.category == that.data.navList[0].name) {
                //     arr1.push(item);
                // } else if (item.category == that.data.navList[1].name) {
                //     arr2.push(item);
                // } else if (item.category == that.data.navList[2].name) {
                //     arr3.push(item);
                // } else if (item.category == that.data.navList[3].name) {
                //     arr4.push(item);
                // }
            }
            // arr.push(arr1, arr2, arr3, arr4)
            arr.push(arr1)
            wx.setStorageSync('content', JSON.stringify(arr));
            // console.log("arr = ", arr);

            that.setData({
                ListArr: arr
            })

        });
    },

    // 获取某语言某个类别列表
    getByCategory: function (tablename, category) {
        let that = this;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr = [];

        app.getByCategory(tablename, category, function (res) {
            for (var item of res.data) {
                if (item.category == that.data.navList[0].name) {
                    arr1.push(item);
                } else if (item.category == that.data.navList[1].name) {
                    arr2.push(item);
                } else if (item.category == that.data.navList[2].name) {
                    arr3.push(item);
                } else if (item.category == that.data.navList[3].name) {
                    arr4.push(item);
                }
            }
            arr.push(arr1, arr2, arr3, arr4);
            that.setData({
                ListArr: arr
            })
        });
    },

    logBtn: function (options) {
        wx.switchTab({
            url: '../../logs/logs',
        })
    },

    // 下拉刷新
    onPullDownRefresh: function () {
        let that = this;
    },

    // 页面上拉触底事件（上拉加载更多）
    onReachBottom: function () {
        let that = this;
    }
})
