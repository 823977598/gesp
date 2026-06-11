# GESP C++ 一级（L1 入门）知识点整理

> 共 20 个考点，适合编程零基础入门学习

---

## 一、程序基础（01–04）

### 01. 程序骨架 — main 函数、return 0、注释

**概念**
- 每个 C++ 程序必须有且只有一个 `main` 函数，程序从 `main` 开始执行
- `return 0;` 表示程序正常结束
- 注释不会被编译器执行，用于说明代码含义

**代码模板**
```cpp
#include <iostream>      // 头文件：输入输出
using namespace std;     // 使用标准命名空间

int main() {
    cout << "Hello, World!" << endl;  // 输出一句话
    return 0;                         // 程序正常结束
}
```

**注释格式**
```cpp
// 这是单行注释

/* 这是
   多行注释 */
```

**易错点**
- `main` 函数不能省略，`int main()` 不能写成 `void main()`
- 每条语句以分号 `;` 结尾
- `#include` 和 `using` 语句末尾**不加**分号

---

### 02. 变量与声明 — int / long long / double / char / bool / string

**概念**
- 变量是存储数据的容器，使用前必须声明类型
- 不同类型占用不同内存空间

**常用数据类型**
| 类型 | 大小 | 范围 | 用途 |
|:---|:---:|:---|:---|
| `int` | 4字节 | 约 ±21亿 | 整数 |
| `long long` | 8字节 | 约 ±9×10¹⁸ | 大整数 |
| `double` | 8字节 | 约 ±1.7×10³⁰⁸ | 小数 |
| `char` | 1字节 | 0~255 | 单个字符 |
| `bool` | 1字节 | true/false | 逻辑值 |
| `string` | 动态 | - | 字符串 |

**代码模板**
```cpp
int a = 10;              // 整数
long long b = 1000000000LL;  // 大整数（加LL后缀）
double c = 3.14;         // 小数
char d = 'A';            // 字符（单引号）
bool e = true;           // 逻辑值
string f = "hello";      // 字符串（双引号）
```

**易错点**
- `char` 用**单引号**，`string` 用**双引号**
- `int` 范围不够时要用 `long long`
- 变量名不能以数字开头，不能用关键字（如 `int`, `class`）

---

### 03. 常量与字面量 — 字面量后缀、const 修饰、宏定义 #define

**概念**
- **字面量**：直接写在代码中的值，如 `10`, `3.14`, `'A'`
- **字面量后缀**：`L`(long), `LL`(long long), `f`(float), `U`(unsigned)
- **const 常量**：`const int N = 100;` 编译时常量，不能修改
- **宏定义**：`#define PI 3.14` 预处理时文本替换

**代码模板**
```cpp
// 字面量后缀
long long big = 1000000000LL;   // long long
float f = 3.14f;                // float

// const 常量（推荐）
const int MAX_N = 100;
const double PI = 3.14159;
// MAX_N = 200;  // 错误！const 不能修改

// 宏定义（不推荐，仅了解）
#define PI 3.14159
#define MAX_N 100
```

**易错点**
- `const` 定义的常量必须在声明时赋值
- `#define` 是文本替换，没有类型检查，容易出错
- 竞赛中常用 `const int N = 1e5 + 5;`

---

### 04. 输入输出 — cin / cout / scanf / printf / getline

**概念**
- `cin >>` 从标准输入读取，`cout <<` 向标准输出输出
- `scanf` / `printf` 是 C 风格输入输出，效率更高
- `getline` 可读取包含空格的一整行

**代码模板**
```cpp
// cin / cout（C++ 风格）
int a;
string s;
cin >> a >> s;          // 读入整数和字符串（遇空格停）
cout << a << " " << s << endl;

// 读入一行（含空格）
string line;
getline(cin, line);

// scanf / printf（C 风格，效率更高）
int a;
scanf("%d", &a);        // 注意：整数用 %d，字符用 %c
printf("%d\n", a);      // 注意：\\n 换行

// 字符串读入
char str[100];
scanf("%s", str);        // 遇空格停
```

**格式说明符**
| 类型 | scanf | printf |
|:---|:---:|:---:|
| int | `%d` | `%d` |
| long long | `%lld` | `%lld` |
| double | `%lf` | `%f` |
| char | `%c` | `%c` |
| string | `%s` | `%s` |

**易错点**
- `cin >>` 读字符串遇空格停止，读整行用 `getline`
- `scanf` 变量前要加 `&`（取地址），`printf` 不用
- `cin` 和 `scanf` 不要混用，容易出错

---

## 二、运算符（05–09）

### 05. 算术运算符 — + - * / % 与整除 / 取模规则

**概念**
- `+` 加、`-` 减、`*` 乘、`/` 除、`%` 取模（求余）
- 两个整数相除结果仍是整数（截断小数部分）
- `%` 取模只能用于整数

**代码模板**
```cpp
int a = 7, b = 3;
cout << a + b << endl;   // 10（加）
cout << a - b << endl;   // 4（减）
cout << a * b << endl;   // 21（乘）
cout << a / b << endl;   // 2（整除，截断小数）
cout << a % b << endl;   // 1（取模，余数）

// 有小数参与时结果为小数
cout << 7.0 / 2 << endl; // 3.5

// 判断奇偶
if (n % 2 == 0) cout << "偶数";
else cout << "奇数";
```

**易错点**
- `7 / 2 = 3`（不是 3.5），整数除法截断
- `7 % 3 = 1`，取模结果的符号与被除数相同
- `-7 % 3 = -1`（不是 2）

---

### 06. 关系与逻辑 — == != < > <= >= 与 && || !

**概念**
- 关系运算符返回 `bool` 值（`true` 或 `false`）
- 逻辑运算符用于组合多个条件

**关系运算符**
| 运算符 | 含义 | 示例 |
|:---:|:---|:---|
| `==` | 等于 | `3 == 3` → `true` |
| `!=` | 不等于 | `3 != 4` → `true` |
| `<` | 小于 | `3 < 5` → `true` |
| `>` | 大于 | `3 > 5` → `false` |
| `<=` | 小于等于 | `3 <= 3` → `true` |
| `>=` | 大于等于 | `3 >= 5` → `false` |

**逻辑运算符**
| 运算符 | 含义 | 示例 |
|:---:|:---|:---|
| `&&` | 与（且） | `true && false` → `false` |
| `\|\|` | 或 | `true \|\| false` → `true` |
| `!` | 非（取反） | `!true` → `false` |

**代码模板**
```cpp
// 判断闰年
bool leap = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);

// 判断是否在范围内
if (a >= 1 && a <= 100) cout << "在范围内";

// 逻辑短路：&& 左边为 false 不算右边，|| 左边为 true 不算右边
int x = 0;
if (x != 0 && 10 / x > 2) { } // 不会除零
```

**易错点**
- `==` 是比较，`=` 是赋值，不要混淆
- `&&` 和 `||` 有短路效应
- `!` 优先级高于 `&&` 和 `||`

---

### 07. 位运算基础 — & | ^ ~ << >> 应用于整型

**概念**
- 位运算直接操作二进制位
- 常用于状态压缩、高效计算

**位运算符**
| 运算符 | 名称 | 规则 | 示例 |
|:---:|:---|:---|:---|
| `&` | 按位与 | 都1则1 | `5 & 3` = `0101 & 0011` = `0001` = 1 |
| `\|` | 按位或 | 有1则1 | `5 \| 3` = `0101 \| 0011` = `0111` = 7 |
| `^` | 按位异或 | 不同为1 | `5 ^ 3` = `0101 ^ 0011` = `0110` = 6 |
| `~` | 按位取反 | 0变1,1变0 | `~5` = ...1010 |
| `<<` | 左移 | 乘以2^n | `5 << 2` = 20 |
| `>>` | 右移 | 除以2^n | `20 >> 2` = 5 |

**代码模板**
```cpp
int a = 5, b = 3;  // a=0101, b=0011
cout << (a & b) << endl;   // 1（按位与）
cout << (a | b) << endl;   // 7（按位或）
cout << (a ^ b) << endl;   // 6（按位异或）
cout << (a << 2) << endl;  // 20（左移2位，即×4）
cout << (a >> 1) << endl;  // 2（右移1位，即÷2）

// 常用技巧
int x = 5;
if (x & 1) cout << "奇数";   // 判断奇偶
x = x ^ x;                    // 异或自身为0
int t = a ^ b ^ a;            // t = b（交换）
```

**易错点**
- 异或 `^` 不是幂运算
- `<<` `>>` 优先级低于算术运算符，必要时加括号
- 位运算只能用于整数类型

---

### 08. 自增自减 — i++ ++i i-- --i 前后置区别

**概念**
- `i++`（后置）：先使用当前值，再加1
- `++i`（前置）：先加1，再使用新值
- `--i` 和 `i--` 同理

**代码模板**
```cpp
int i = 5;
int a = i++;   // a=5, i=6（先赋值再自增）
int b = ++i;   // b=7, i=7（先自增再赋值）

// 在循环中区别不大
for (int i = 0; i < 10; i++) { }    // i++ 常用
for (int i = 0; i < 10; ++i) { }    // ++i 等效

// 但在复杂表达式中有区别
int x = 1;
int y = x++ + ++x;  // 未定义行为！不要这样写
```

**易错点**
- 单独使用时 `i++` 和 `++i` 效果相同
- 在表达式中使用时有区别，但应避免在同一变量上多次自增
- 循环中推荐用 `++i`（某些情况下效率略高）

---

### 09. 赋值复合 — = += -= *= /= %= 简写

**概念**
- 复合赋值运算符是简化写法
- `a += b` 等价于 `a = a + b`

**复合赋值运算符**
| 运算符 | 等价写法 | 示例 |
|:---:|:---|:---|
| `=` | 赋值 | `a = 5` |
| `+=` | 加后赋值 | `a += 3` → `a = a + 3` |
| `-=` | 减后赋值 | `a -= 3` → `a = a - 3` |
| `*=` | 乘后赋值 | `a *= 3` → `a = a * 3` |
| `/=` | 除后赋值 | `a /= 3` → `a = a / 3` |
| `%=` | 取模后赋值 | `a %= 3` → `a = a % 3` |

**代码模板**
```cpp
int a = 10;
a += 5;    // a = 15
a -= 3;    // a = 12
a *= 2;    // a = 24
a /= 4;    // a = 6
a %= 4;    // a = 2

// 实际应用：累加求和
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;  // 等价于 sum = sum + i;
}
// sum = 5050
```

**易错点**
- `a += b` 中间不能加空格写成 `a + = b`
- `*=` 不是指针运算
- 复合赋值比直接赋值更简洁，推荐使用

---

## 三、程序结构（10–16）

### 10. 顺序结构 — 语句自上而下执行

**概念**
- 程序按照代码书写顺序逐条执行
- 是最基本的程序结构

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    int sum = a + b;        // 第1步：求和
    int diff = a - b;       // 第2步：求差
    cout << sum << diff;    // 第3步：输出
    return 0;
}

// 三元运算符（条件表达式）
int m = a > b ? a : b;     // 取较大值
```

**易错点**
- 顺序结构是最简单的结构，不需要特殊语法
- 三元运算符 `条件 ? 值1 : 值2` 是 if-else 的简写

---

### 11. 单/双分支 — if / if-else / 嵌套 if

**概念**
- `if`：条件为 true 时执行
- `if-else`：条件为 true 执行 if 部分，否则执行 else 部分
- 可以嵌套使用

**代码模板**
```cpp
// 单分支
if (n > 0) {
    cout << "正数";
}

// 双分支
if (n % 2 == 0) {
    cout << "偶数";
} else {
    cout << "奇数";
}

// 嵌套 if
if (a > b) {
    if (a > c) cout << "a最大";
    else cout << "c最大";
} else {
    if (b > c) cout << "b最大";
    else cout << "c最大";
}

// 交换两个变量
int t = a; a = b; b = t;
```

**易错点**
- `if` 后面的条件必须用圆括号 `()`
- 没有花括号 `{}` 时，`if/else` 只控制紧随的一条语句
- 常见错误：`if (a = 5)` 写成了赋值而非比较

---

### 12. 多分支 switch — switch-case-default-break 配套

**概念**
- 适用于多个固定值的分支判断
- `case` 值必须是常量，不能是变量
- 每个 `case` 末尾要加 `break`，否则会"穿透"

**代码模板**
```cpp
int op;
cin >> op;
int result;

switch (op) {
    case 1:
        result = a + b;
        break;
    case 2:
        result = a - b;
        break;
    case 3:
        result = a * b;
        break;
    case 4:
        if (b != 0) result = a / b;
        else cout << "除零错误";
        break;
    default:
        cout << "无效操作";
        break;
}

// 穿透现象（利用 break 缺失合并分支）
switch (grade) {
    case 'A':
    case 'B':
    case 'C':
        cout << "及格";
        break;
    case 'D':
    case 'F':
        cout << "不及格";
        break;
}
```

**易错点**
- `case` 后必须是**常量表达式**，不能是变量
- 忘记 `break` 会导致穿透到下一个 case
- `default` 可选，放在最后处理

---

### 13. while 循环 — 先判后执行、死循环条件

**概念**
- 先判断条件，条件为 true 时执行循环体
- 如果条件一开始就是 false，循环体一次都不执行

**代码模板**
```cpp
// 求 1+2+...+n
int n, sum = 0, i = 1;
cin >> n;
while (i <= n) {
    sum += i;
    i++;
}
cout << sum;

// 数字反转
int x, rev = 0;
cin >> x;
while (x > 0) {
    rev = rev * 10 + x % 10;
    x /= 10;
}
cout << rev;

// ⚠️ 死循环（永远不停）
while (true) { }
while (1) { }
```

**易错点**
- 循环体中必须有改变条件的语句，否则死循环
- `while (n)` 等价于 `while (n != 0)`
- 注意循环变量的初始化位置

---

### 14. do-while 循环 — 至少执行一次的循环

**概念**
- 先执行循环体，再判断条件
- 循环体**至少执行一次**

**代码模板**
```cpp
// 至少读入一次
int n;
do {
    cin >> n;
} while (n <= 0);  // 输入非正数时重新输入

// 猜数字游戏（至少猜一次）
int guess;
do {
    cout << "猜一个数: ";
    cin >> guess;
    if (guess > answer) cout << "太大了\n";
    else if (guess < answer) cout << "太小了\n";
} while (guess != answer);
cout << "猜对了！";
```

**易错点**
- `do-while` 末尾有**分号** `;`
- 与 `while` 的区别：至少执行一次
- 适合"先做再说"的场景

---

### 15. for 循环 — 三段式：初始化 / 条件 / 步进

**概念**
- `for (初始化; 条件; 步进)` 三段式循环
- 执行顺序：初始化 → 判断条件 → 循环体 → 步进 → 判断条件...

**代码模板**
```cpp
// 基本用法：求 1+2+...+100
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
// sum = 5050

// 输出乘法口诀表
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        cout << j << "x" << i << "=" << i * j << "\t";
    }
    cout << endl;
}

// 步进可以是任意表达式
for (int i = 0; i < 100; i += 2) { }  // 偶数
for (int i = 10; i > 0; i--) { }      // 倒序
```

**易错点**
- `for` 的三部分都可以省略，但分号不能省
- `for (int i = 0; ...)` 中 `i` 的作用域仅在循环内
- 嵌套循环中内层变量名不要与外层冲突

---

### 16. 循环控制 — break 跳出 / continue 跳过本轮

**概念**
- `break`：跳出**整个**循环（只跳出最内层）
- `continue`：跳过**本轮**循环体，直接进入下一轮

**代码模板**
```cpp
// break：找到第一个能被7整除的数
for (int i = 1; i <= 100; i++) {
    if (i % 7 == 0) {
        cout << i;
        break;  // 找到后立即退出循环
    }
}

// continue：输出1~10中不能被3整除的数
for (int i = 1; i <= 10; i++) {
    if (i % 3 == 0) continue;  // 跳过3的倍数
    cout << i << " ";
}
// 输出：1 2 4 5 7 8 10

// break 在嵌套循环中只跳出最内层
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;  // 只跳出内层 j 循环
    }
    cout << "i=" << i << " ";  // 会执行
}
```

**易错点**
- `break` 只跳出**一层**循环，不是所有循环
- `continue` 跳过的是**当前轮**，不是退出循环
- `break` 在 `switch` 中用于终止 case

---

## 四、字符与类型（17–18）

### 17. 字符与 ASCII — '0'=48、'A'=65、'a'=97

**概念**
- 字符在内存中以 ASCII 码值存储（整数）
- 字符和整数可以互相转换

**常用 ASCII 值**
| 字符 | ASCII 值 | 说明 |
|:---:|:---:|:---|
| `'0'` | 48 | 数字0 |
| `'9'` | 57 | 数字9 |
| `'A'` | 65 | 大写A |
| `'Z'` | 90 | 大写Z |
| `'a'` | 97 | 小写a |
| `'z'` | 122 | 小写z |
| `' '` | 32 | 空格 |
| `'\n'` | 10 | 换行 |

**代码模板**
```cpp
// 字符转数字
char ch = '7';
int num = ch - '0';        // num = 7

// 数字转字符
int n = 7;
char ch = n + '0';         // ch = '7'

// 大小写转换
char upper = 'a' - 32;     // upper = 'A'
char lower = 'A' + 32;     // lower = 'a'
// 或者
char lower = toupper('a');  // 需要 <cctype>
char upper = tolower('A');

// 遍历字符
for (char ch = 'A'; ch <= 'Z'; ch++) {
    cout << ch << " ";
}

// 判断字符类型
if (ch >= '0' && ch <= '9') cout << "数字";
if (ch >= 'A' && ch <= 'Z') cout << "大写字母";
if (ch >= 'a' && ch <= 'z') cout << "小写字母";
```

**易错点**
- `'0'` 的 ASCII 值是 48，不是 0
- 大写转小写 `+32`，小写转大写 `-32`
- `'0'` 到 `'9'` 是连续的，可以直接用 `ch - '0'` 转数字

---

### 18. 类型转换 — 隐式 / 强制 (int)x / static_cast

**概念**
- **隐式转换**：编译器自动进行（如 `int` + `double` → `double`）
- **强制转换**：程序员手动指定（如 `(int)3.14` → `3`）
- **static_cast**：C++ 推荐的类型转换方式

**类型转换规则**
```
char → int → long long → float → double
                    ↑ 小类型自动转大类型
```

**代码模板**
```cpp
// 隐式转换
int a = 5;
double b = a;           // int → double，自动转换

double x = 3.9;
int y = x;              // double → int，截断为 3（隐式）

// 强制转换（C 风格）
int n = (int)3.9;       // n = 3（截断，不是四舍五入）
double d = (double)5;   // d = 5.0

// static_cast（C++ 推荐）
int m = static_cast<int>(3.9);  // m = 3
double e = static_cast<double>(5);  // e = 5.0

// 整数除法中的转换
cout << 7 / 2 << endl;        // 3（整数除法）
cout << 7.0 / 2 << endl;      // 3.5（有小数参与）
cout << (double)7 / 2 << endl; // 3.5
```

**易错点**
- `double` 转 `int` 是**截断**，不是四舍五入
- `int` 转 `double` 是安全的，`double` 转 `int` 可能丢失精度
- 整数除法 `7 / 2 = 3`，不是 3.5

---

## 五、库的使用（19–20）

### 19. 头文件 — #include &lt;iostream&gt; &lt;cstdio&gt; &lt;cmath&gt;

**概念**
- 头文件提供各种功能的函数和类
- `#include` 在程序编译前将头文件内容插入

**常用头文件**
| 头文件 | 功能 | 常用内容 |
|:---|:---|:---|
| `&lt;iostream&gt;` | 输入输出 | `cin`, `cout`, `endl` |
| `&lt;cstdio&gt;` | C风格输入输出 | `scanf`, `printf` |
| `&lt;cmath&gt;` | 数学函数 | `abs`, `sqrt`, `pow`, `sin` |
| `&lt;algorithm&gt;` | 算法 | `sort`, `max`, `min`, `swap` |
| `&lt;string&gt;` | 字符串 | `string`, `getline` |
| `&lt;cstring&gt;` | 字符数组 | `strlen`, `strcpy` |
| `&lt;cstdlib&gt;` | 通用工具 | `rand`, `srand`, `system` |
| `&lt;climits&gt;` | 整数限制 | `INT_MAX`, `INT_MIN` |

**代码模板**
```cpp
#include <iostream>    // cin, cout
#include <cmath>       // sqrt, pow, abs
#include <algorithm>   // sort, max, min, swap
#include <string>      // string, getline
#include <climits>     // INT_MAX, INT_MIN

using namespace std;

int main() {
    cout << INT_MAX << endl;    // 输出 int 最大值
    cout << sqrt(16.0) << endl; // 4.0
    return 0;
}
```

**易错点**
- 头文件名用**尖括号** `<>`，自己写的文件用**双引号** `""`
- `using namespace std;` 可以省略写 `std::` 前缀
- 头文件末尾**不加分号**

---

### 20. 常用库函数 — abs / max / min / swap / sqrt / pow

**概念**
- 标准库提供大量现成函数，避免重复造轮子
- 使用前需包含对应头文件

**常用函数**
| 函数 | 头文件 | 功能 | 示例 |
|:---|:---:|:---|:---|
| `abs(x)` | `&lt;cmath&gt;` | 绝对值 | `abs(-5)` → 5 |
| `max(a,b)` | `&lt;algorithm&gt;` | 较大值 | `max(3,5)` → 5 |
| `min(a,b)` | `&lt;algorithm&gt;` | 较小值 | `min(3,5)` → 3 |
| `swap(a,b)` | `&lt;algorithm&gt;` | 交换两值 | `swap(a,b)` |
| `sqrt(x)` | `&lt;cmath&gt;` | 平方根 | `sqrt(16.0)` → 4.0 |
| `pow(a,b)` | `&lt;cmath&gt;` | 幂运算 | `pow(2,3)` → 8.0 |
| `round(x)` | `&lt;cmath&gt;` | 四舍五入 | `round(3.5)` → 4.0 |
| `floor(x)` | `&lt;cmath&gt;` | 向下取整 | `floor(3.7)` → 3.0 |

**代码模板**
```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    cout << abs(-5) << endl;       // 5
    cout << max(3, 5) << endl;     // 5
    cout << min(3, 5) << endl;     // 3
    
    int a = 3, b = 5;
    swap(a, b);                    // a=5, b=3
    
    cout << sqrt(16.0) << endl;    // 4.0
    cout << pow(2, 10) << endl;    // 1024.0
    cout << round(3.5) << endl;    // 4.0
    
    // 判断闰年（综合运用）
    int y;
    cin >> y;
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
        cout << "闰年";
    else
        cout << "平年";
    
    return 0;
}
```

**易错点**
- `abs()` 对整数和浮点数都可用，但需注意头文件
- `max` / `min` 需要 `&lt;algorithm&gt;`，不是 `&lt;cmath&gt;`
- `pow` 返回 `double`，转 `int` 需要强制转换
- `sqrt` 参数和返回值都是 `double`

---

## 附录：GESP L1 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 程序骨架 | main函数、return 0、注释 |
| 02 | 变量与声明 | int/long long/double/char/bool/string |
| 03 | 常量与字面量 | 字面量后缀、const、#define |
| 04 | 输入输出 | cin/cout/scanf/printf/getline |
| 05 | 算术运算符 | + - * / %、整除、取模 |
| 06 | 关系与逻辑 | == != < > <= >= && \|\| ! |
| 07 | 位运算基础 | & \| ^ ~ << >> |
| 08 | 自增自减 | i++ ++i 前后置区别 |
| 09 | 赋值复合 | = += -= *= /= %= |
| 10 | 顺序结构 | 自上而下执行 |
| 11 | 单/双分支 | if / if-else / 嵌套 |
| 12 | 多分支 switch | switch-case-default-break |
| 13 | while 循环 | 先判后执行 |
| 14 | do-while 循环 | 至少执行一次 |
| 15 | for 循环 | 初始化/条件/步进 |
| 16 | 循环控制 | break / continue |
| 17 | 字符与 ASCII | '0'=48 'A'=65 'a'=97 |
| 18 | 类型转换 | 隐式/强制/static_cast |
| 19 | 头文件 | #include 与常用库 |
| 20 | 常用库函数 | abs/max/min/swap/sqrt/pow |

---

