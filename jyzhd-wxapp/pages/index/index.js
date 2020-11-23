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
            '../../images/LeopardNamibia.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 3000,

        navItems: [
            {
                name: 'C',
                tablename: 'c',
                url: 'list',
                pic: '../../images/c-mini-logo.png'

            },
            {
                name: 'Go',
                tablename: 'go',
                url: 'list',
                isSplot: true,
                pic: '../../images/go128.png'
            },
            {
                name: 'C++',
                tablename: 'cpp',
                url: 'list',
                pic: '../../images/cpp-mini-logo.png'
            },
            {
                name: 'MySQL',
                tablename: 'mysql',
                url: 'list',
                pic: '../../images/mysql.jpg'
            },
            {
                name: 'Linux',
                tablename: 'linux',
                url: 'list',
                isSplot: true,
                pic: '../../images/OS_Linux_256px.png'
            },
            {
                name: 'Python',
                url: 'list',
                tablename: 'python',
                pic: '../../images/python_256px.png'
            }
        ]
    }
})
