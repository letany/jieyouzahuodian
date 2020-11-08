//index.js
//获取应用实例
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '../../images/soyoung.png',
            'http://image.wufazhuce.com/FobG0-eXUBeF_TtQMLlDZmoF4MEP',
            'http://image.wufazhuce.com/FoRlKOVqzx0nLTlGV29sdOLhFDdA',
            'http://px1t7hoiz.bkt.clouddn.com/LeopardNamibia_ZH-CN9585068449_1920x1080.jpg',
            'http://px1t7hoiz.bkt.clouddn.com/aLeopardNamibia.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 3000,

        navItems: [
            {
                name: 'C',
                tablename: 'c',
                url: 'dishes',
                pic: 'http://px1t7hoiz.bkt.clouddn.com/c-mini-logo.png'

            },
            {
                name: 'Go',
                tablename: 'go',
                url: 'dishes',
                isSplot: true,
                pic: 'http://px1t7hoiz.bkt.clouddn.com/go128.png'
            },
            {
                name: 'C++',
                tablename: 'cpp',
                url: 'dishes',
                pic: 'http://px1t7hoiz.bkt.clouddn.com/cpp-mini-logo.png'
            },
            {
                name: 'MySQL',
                tablename: 'mysql',
                url: 'dishes',
                pic: 'http://px1t7hoiz.bkt.clouddn.com/mysql.jpg'
            },
            {
                name: 'Linux',
                tablename: 'linux',
                url: 'dishes',
                isSplot: true,
                pic: 'http://px1t7hoiz.bkt.clouddn.com/OS_Linux_256px.png'
            },
            {
                name: 'Python',
                url: 'dishes',
                tablename: 'python',
                pic: 'http://px1t7hoiz.bkt.clouddn.com/python.jpg'
            }
        ]
    },

    /**
     * 生命周期函数 -- 监听页面加载
     */
    onLoad: function () {

    }
})
