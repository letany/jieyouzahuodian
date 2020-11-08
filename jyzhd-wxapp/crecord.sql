INSERT INTO `c` (`id`, `category`, `title`, `content`)
VALUES
  (4,'基础语法','for','# for的用法\n### 写法\nfor(int i = 0;i < 10;i++){printf("i= %d", i)\n}'),
  (5,'基础语法','Tokens','# Tokens的组成\n### 包含\n令牌可以是关键字、标识符、常量、字符串值，或者是一个符号。\nprintf("Hello, World! \n");这个里面就包含了5个token：printf、(、"Hello, World! \n"、)、;'),
  (6,'基础语法','分号;','# 分号的含义\n### 意义\n分号是语句结束符。也就是说，每个语句必须以分号结束。它表明一个逻辑实体的结束。'),
  (7,'基础语法','注释','# 注释的用法\n### 使用\n两种注释方式：单行注释//和多行注释/**/，多行注释也可以注释单行；但是，注释内不能嵌套注释，注释也不能出现在字符串或字符值中。'),
  (8,'基础语法','空格','# 空格的用法\n### 用法\n只包含空格的行，被称为空白行，可能带有注释，C 编译器会完全忽略它。\n在 C 中，空格用于描述空白符、制表符、换行符和注释。空格分隔语句的各个部分，让编译器能识别语句中的某个元素（比如 int）在哪里结束，下一个元素在哪里开始。\n ```int age;```int 和 age 之间必须至少有一个空格字符（通常是一个空白符），这样编译器才能够区分它们。\n```x = y + 2;``` x和=，或者=和y之间的空格字符不是必需的，但是为了增强可读性，您可以根据需要适当增加一些空格。'),
  (9,'基础语法','变量','# 变量的含义\n### 含义\n变量其实只不过是程序可操作的存储区的名称。C 中每个变量都有特定的类型，类型决定了变量存储的大小和布局，该范围内的值都可以存储在内存中，运算符可应用于变量上。'),
  (10,'基础语法','常量','# 常量的含义\n### 含义\n常量是固定值，在程序执行期间不会改变。这些固定的值，又叫做字面量。\n常量可以是任何的基本数据类型，比如整数常量、浮点常量、字符常量，或字符串字面值，也有枚举常量。\n常量就像是常规的变量，只不过常量的值在定义后不能进行修改。'),
  (11,'标准库','<assert.h>','# <assert.h>简介\n### 简介\nC 标准库的 assert.h头文件提供了一个名为 assert 的宏，它可用于验证程序做出的假设，并在假设为假时输出诊断消息。\n已定义的宏 assert 指向另一个宏 NDEBUG，宏 NDEBUG 不是 <assert.h> 的一部分。如果已在引用 <assert.h> 的源文件中定义 NDEBUG 为宏名称，则 assert 宏的定义如下：```#define assert(ignore) ((void)0)```'),
  (12,'标准库','<ctype.h>','# <ctype.h>简介\n### 简介\nC 标准库的 ctype.h 头文件提供了一些函数，可用于测试和映射字符。\n这些函数接受 int 作为参数，它的值必须是 EOF 或表示为一个无符号字符\n如果参数 c 满足描述的条件，则这些函数返回非零（true）。如果参数 c 不满足描述的条件，则这些函数返回零。'),
  (13,'标准库','<errno.h>','# <errno.h>简介\n### 简介\nC 标准库的 errno.h 头文件定义了整数变量 errno，它是通过系统调用设置的，在错误事件中的某些库函数表明了什么发生了错误。该宏扩展为类型为 int 的可更改的左值，因此它可以被一个程序读取和修改。\n在程序启动时，errno 设置为零，C 标准库中的特定函数修改它的值为一些非零值以表示某些类型的错误。您也可以在适当的时候修改它的值或重置为零。\nerrno.h 头文件定义了一系列表示不同错误代码的宏，这些宏应扩展为类型为 int 的整数常量表达式。'),
  (14,'标准库','<float.h>','# <float.h>简介\n### 简介\nC 标准库的 float.h 头文件包含了一组与浮点值相关的依赖于平台的常量。这些常量是由 ANSI C 提出的，这让程序更具有可移植性。'),
  (15,'标准库','<limits.h>','# <limits.h>简介\n### 简介\nlimits.h 头文件决定了各种变量类型的各种属性。定义在该头文件中的宏限制了各种变量类型（比如 char、int 和 long）的值。\n这些限制指定了变量不能存储任何超出这些限制的值，例如一个无符号可以存储的最大值是 255。'),
  (16,'标准库','<locale.h>','# <locale.h>简介\n### 简介\nlocale.h 头文件定义了特定地域的设置，比如日期格式和货币符号。'),
  (17,'标准库','<math.h>','# <math.h>简介\n### 简介\nmath.h 头文件定义了各种数学函数和一个宏。在这个库中所有可用的功能都带有一个 double 类型的参数，且都返回 double 类型的结果。'),
  (18,'标准库','<setjmp.h>','# <setjmp.h>简介\n### 简介\nsetjmp.h 头文件定义了宏 setjmp()、函数 longjmp() 和变量类型 jmp_buf，该变量类型会绕过正常的函数调用和返回规则。'),
  (19,'标准库','<signal.h>','# <signal.h>简介\n### 简介\nsignal.h 头文件定义了一个变量类型 sig_atomic_t、两个函数调用和一些宏来处理程序执行期间报告的不同信号。'),
  (20,'标准库','<stdio.h>','# <stdio.h>简介\n### 简介\nstdio .h 头文件定义了三个变量类型、一些宏和各种函数来执行输入和输出'),
  (21,'标准库','<stdlib.h>','# <stdlib.h>简介\n### 简介\nstdlib .h 头文件定义了四个变量类型、一些宏和各种通用工具函数。'),
  (22,'标准库','<string.h>','# <string.h>简介\n### 简介\nstring .h 头文件定义了一个变量类型、一个宏和各种操作字符数组的函数'),
  (23,'标准库','<time.h>','# <time.h>简介\n### 简介\nime.h 头文件定义了四个变量类型、两个宏和各种操作日期和时间的函数。'),
  (24,'基础语法','标识符','# 标示符的含义\n### 含义\nC 标识符是用来标识变量、函数，或任何其他用户自定义项目的名称。一个标识符以字母 A-Z 或 a-z 或下划线 _ 开始，后跟零个或多个字母、下划线和数字（0-9）。\nC 标识符内不允许出现标点字符，比如 @、$ 和 %\nC 是区分大小写的编程语言。')