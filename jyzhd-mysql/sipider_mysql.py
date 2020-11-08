from urllib import request
from bs4 import BeautifulSoup
import pymysql
# fix ERROR :urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:777)>
# use behind
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

def get_innerhtml(data):
    return data[data.find(">") + 1 : data.rfind("</")]

# 1.通过模拟浏览器请求端请求到数据
# 2.进行数据分析--DOM
# 3.存储到mysql

# 获取数据
def get_data(url, index):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    }
    req = request.Request(url, headers=headers)
    response = request.urlopen(req)
    if response.getcode() == 200:
        data = response.read()
        data = str(data, encoding="utf-8")
        parse_data(data, index)

# 处理数据
def parse_data(html, index):
    result = []
    bs = BeautifulSoup(html, "lxml")
    # 分析页面结构 id = content 是包含所有内容的模块
    content = bs.find(id='content')
    title = ''
    try:
        title = content.find("h1").get_text(strip=True)
    except AttributeError:
        title = 'title'
        print("there is no title")

    for a in content.findAll('a'):
        del a['href']
    content = content
    code_tags = content.find_all(class_='example_code')
    for cd in code_tags:
        new_div_tag = bs.new_tag('pre')
        cd.wrap(new_div_tag)
    content = content.prettify()
    content = content.replace('<table class="reference">', '<table border="1">')
    content = content.replace('<a', '<span')
    content = content.replace('</a>', '</span>')
    content = get_innerhtml(content)

    row = {
        'content' : content,
        'title'   : title
    }

    result.append(row)
    save_to_mysql(result, index)


# 存储数据到MySQL
def save_to_mysql(data, index):
    config = {
        'host': '127.0.0.1',
        'port': 3306,
        'user': 'root',
        'password': 'qwer_456',
        'database': 'wxjy'
    }
    conn = pymysql.connect(**config)
    cursor = conn.cursor()

    sql = [
        '''insert into c (category, title, content) values ('基础语法', %(title)s, %(content)s)''',
        '''insert into go (category, title, content) values ('基础语法', %(title)s, %(content)s)''',
        '''insert into cpp (category, title, content) values ('基础语法', %(title)s, %(content)s)''',
        '''insert into mysql (category, title, content) values ('基础语法', %(title)s, %(content)s)''',
        '''insert into linux (category, title, content) values ('基础语法', %(title)s, %(content)s)''',
        '''insert into python (category, title, content) values ('基础语法', %(title)s, %(content)s)'''
    ]
    try:
        cursor.executemany(sql[index], data)
        conn.commit()
    except:
        conn.rollback()

    cursor.close()
    conn.close()

# 获取网页左侧的列表
def get_list(url, index):

    # url = "https://www.runoob.com/go/go-tutorial.html"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
    }
    req = request.Request(url, headers=headers)
    response = request.urlopen(req)
    if response.getcode() == 200:
        data = response.read()
        data = str(data, encoding="utf-8")
    bs = BeautifulSoup(data, "lxml")
    content = bs.find(id='leftcolumn')
    list = content.find_all(target="_top")
    len_s = len(list)
    count = 0
    for l in list:
        count += 1
        furl = l['href']
        fix  = "/python3/"
        if fix in furl:
            url = 'https://www.runoob.com' + furl
        else:
            url = 'https://www.runoob.com/python3/' + furl
        print('正在抓取' + str(count) + '/' + str(len_s)+'条')
        get_data(url, index)

def main():
    _domain = "https://www.runoob.com"
    _kind = [
        '/cprogramming/c-tutorial.html',
        '/go/go-tutorial.html',
        '/cplusplus/cpp-tutorial.html',
        '/mysql/mysql-tutorial.html',
        '/linux/linux-tutorial.html',
        '/python3/python3-tutorial.html'
    ]
    _count = 0
    for k in _kind:
        _url = _domain + k
        get_list(_url, _count)
        print('========第=========' + str(_count) + '==========组=========done==')
        _count += 1

if __name__ == "__main__":
    main()
    print("All Done oh yeah ^_^")
        