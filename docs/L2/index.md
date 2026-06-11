# GESP C++ 二级（L2 基础）知识点整理

> 来源：https://gesp.scirco.cn/L2/topics.html
> 共 20 个考点，涵盖函数、数组、字符串、递归等核心内容

---

## 一、函数（01–07）

### 01. 函数定义 — 返回值类型 / 函数名 / 形参 / 函数体

**概念**
- 函数是可复用的代码块，由返回值类型、函数名、参数列表、函数体组成
- 函数定义必须在调用之前（或有声明）

**代码模板**
```cpp
// 有返回值的函数
int max(int a, int b) {
    return a > b ? a : b;
}

// 带默认参数的函数
double circle(double r, double pi = 3.14159) {
    return 2 * pi * r;
}

// 多参数函数
int add(int a, int b, int c) {
    return a + b + c;
}

// 递归函数
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**函数结构**
```
返回值类型 函数名(参数列表) {
    函数体;
    return 返回值;
}
```

**易错点**
- 函数返回值类型必须与 `return` 语句类型匹配
- `main` 函数是程序入口，不能被其他函数调用
- 函数定义的顺序会影响编译（可用声明解决）

---

### 02. 函数声明 — 提前声明以解决调用顺序问题

**概念**
- 函数声明（原型）告诉编译器函数的签名，无需函数体
- 解决"先调用后定义"的编译错误

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 函数声明（原型）
int add(int a, int b);        // 声明
double average(double a, double b);

int main() {
    cout << add(3, 5) << endl;     // 可以调用
    cout << average(3.0, 5.0) << endl;
    return 0;
}

// 函数定义（在 main 之后）
int add(int a, int b) {            // 定义
    return a + b;
}

double average(double a, double b) {
    return (a + b) / 2.0;
}
```

**易错点**
- 声明时参数名可省略，类型不能省略：`int add(int, int);`
- 声明和定义的签名必须完全一致
- 推荐在头文件中声明，在源文件中定义

---

### 03. 值传递 — 实参 → 形参的拷贝

**概念**
- 函数参数默认是**值传递**：形参是实参的副本
- 修改形参**不影响**实参

**代码模板**
```cpp
// 值传递：修改形参不影响实参
void swap_wrong(int a, int b) {
    int t = a; a = b; b = t;  // 只交换了副本
}

void swap_correct(int& a, int& b) {  // 引用传递
    int t = a; a = b; b = t;  // 交换了原始值
}

int main() {
    int x = 3, y = 5;
    swap_wrong(x, y);     // x=3, y=5（没变）
    swap_correct(x, y);   // x=5, y=3（交换了）
    return 0;
}
```

**传递方式对比**
| 方式 | 语法 | 修改形参影响实参？ |
|:---:|:---|:---:|
| 值传递 | `void f(int a)` | 否 |
| 引用传递 | `void f(int& a)` | 是 |
| 指针传递 | `void f(int* a)` | 是 |

**易错点**
- 值传递只改变副本，不影响原变量
- 需要修改实参时用引用 `&` 或指针 `*`
- 传递大对象（如 `string`）时引用更高效

---

### 04. return — 返回值、提前结束函数

**概念**
- `return` 语句返回值给调用者
- 可以提前结束函数执行
- `void` 函数中可以使用不带值的 `return;`

**代码模板**
```cpp
// 返回值
int max(int a, int b) {
    return a > b ? a : b;
}

// 提前结束
void print_positive(int n) {
    if (n <= 0) return;    // 非正数直接返回
    cout << n << endl;     // 只打印正数
}

// 递归中的 return
int fib(int n) {
    if (n <= 1) return n;         // 终止条件
    return fib(n-1) + fib(n-2);   // 递推
}

// void 函数的 return
void sort_array(int a[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-1-i; j++)
            if (a[j] > a[j+1]) swap(a[j], a[j+1]);
    return;    // 可省略
}
```

**易错点**
- 有返回值的函数必须有 `return` 语句
- `return` 后的代码不会执行
- `main` 函数的 `return 0;` 表示程序正常结束

---

### 05. void 函数 — 无返回值的函数

**概念**
- 返回类型为 `void` 的函数不返回值
- 用于执行操作而非计算结果

**代码模板**
```cpp
// 无返回值函数
void print_line(int n) {
    for (int i = 0; i < n; i++) cout << "-";
    cout << endl;
}

// 输出数组
void print_array(int a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;
}

// 交换两个数（引用传递）
void swap_vals(int& a, int& b) {
    int t = a; a = b; b = t;
}

// 填充数组
void fill_array(int a[], int n, int val) {
    for (int i = 0; i < n; i++) a[i] = val;
}

int main() {
    print_line(20);
    int arr[] = {3, 1, 4, 1, 5};
    print_array(arr, 5);
    swap_vals(arr[0], arr[1]);
    return 0;
}
```

**易错点**
- `void` 函数不能使用 `return 值;`
- `void` 函数可以使用 `return;` 提前结束
- `void` 函数的调用语句不能放在赋值语句右侧

---

### 06. 局部 / 全局 — 作用域：块内 / 文件内

**概念**
- **局部变量**：在函数或代码块内定义，只在块内有效
- **全局变量**：在所有函数外定义，所有函数可访问
- 同名局部变量会**遮蔽**全局变量

**代码模板**
```cpp
#include <iostream>
using namespace std;

int g = 100;  // 全局变量

void func1() {
    int a = 10;      // 局部变量
    cout << a << endl;   // 10
    cout << g << endl;   // 100（访问全局）
}

void func2() {
    int a = 20;      // 另一个局部变量，与 func1 的 a 无关
    int g = 200;     // 局部变量遮蔽全局 g
    cout << a << endl;   // 20
    cout << g << endl;   // 200（局部 g）
}

int main() {
    int a = 30;      // main 的局部变量
    func1();         // 输出 10, 100
    func2();         // 输出 20, 200
    cout << a << endl;   // 30
    cout << g << endl;   // 100（全局 g）
    return 0;
}
```

**作用域规则**
```
全局变量：整个文件
├─ main()
│   ├─ int a = 30;    ← main 的局部
│   └─ for (...) {    ← 代码块
│         int i = 0;  ← 块级局部
│     }
└─ func1()
    └─ int a = 10;    ← func1 的局部
```

**易错点**
- 局部变量在函数结束时销毁，全局变量程序结束才销毁
- 不推荐使用全局变量（破坏封装性）
- 避免局部变量与全局变量同名

---

### 07. static 静态 — 静态局部变量仅初始化一次

**概念**
- `static` 局部变量在第一次调用时初始化，之后保持上次的值
- 生命周期延长到程序结束
- 只在声明它的函数内可见

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 静态变量：只初始化一次，值会保留
void counter() {
    static int count = 0;  // 只在第一次调用时初始化
    count++;
    cout << "调用次数: " << count << endl;
}

// 用 static 实现累加器
int accumulator(int val) {
    static int sum = 0;    // 每次调用都保留上次的 sum
    sum += val;
    return sum;
}

int main() {
    counter();    // 输出: 调用次数: 1
    counter();    // 输出: 调用次数: 2
    counter();    // 输出: 调用次数: 3

    cout << accumulator(10) << endl;  // 10
    cout << accumulator(20) << endl;  // 30
    cout << accumulator(30) << endl;  // 60
    return 0;
}
```

**局部变量 vs 静态局部变量**
| 特性 | 普通局部变量 | 静态局部变量 |
|:---:|:---:|:---:|
| 初始化 | 每次调用都初始化 | 只初始化一次 |
| 值保留 | 函数结束即销毁 | 程序结束才销毁 |
| 作用域 | 块内 | 块内 |
| 默认值 | 未定义 | 0 |

**易错点**
- `static` 变量只初始化一次，不会重新赋初值
- 多次调用共享同一个 `static` 变量
- `static` 变量默认初始化为 0

---

## 二、数组（08–10, 15–16）

### 08. 一维数组 — 声明 / 初始化 / 遍历 / 下标从 0

**概念**
- 数组是相同类型元素的连续集合
- 下标从 **0** 开始，到 `n-1` 结束
- 数组大小必须在编译时确定（普通数组）

**代码模板**
```cpp
// 声明与初始化
int a[5];                          // 未初始化
int b[5] = {1, 2, 3, 4, 5};       // 完全初始化
int c[5] = {1, 2};                 // 部分初始化（其余为0）
int d[] = {1, 2, 3};               // 自动推断大小为3

// 遍历
for (int i = 0; i < 5; i++) {
    cout << a[i] << " ";
}

// 范围 for（C++11）
int arr[] = {10, 20, 30};
for (int x : arr) {
    cout << x << " ";
}

// 查找最大值
int max_val = a[0];
for (int i = 1; i < 5; i++)
    if (a[i] > max_val) max_val = a[i];

// 选择排序
for (int i = 0; i < n-1; i++) {
    int k = i;
    for (int j = i+1; j < n; j++)
        if (a[j] < a[k]) k = j;
    swap(a[i], a[k]);
}
```

**易错点**
- 数组下标从 0 开始，`a[5]` 的合法下标是 0~4
- 数组越界访问会导致未定义行为
- 数组名代表数组首地址，不是变量

---

### 09. 数组内存 — 连续存储、大小 = 元素数 × sizeof(T)

**概念**
- 数组在内存中连续存储
- 可以用 `sizeof` 计算数组总大小
- 数组名在多数情况下会退化为指针

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int a[10];
    cout << "数组大小: " << sizeof(a) << " 字节" << endl;     // 40
    cout << "元素个数: " << sizeof(a) / sizeof(a[0]) << endl; // 10
    cout << "单个元素: " << sizeof(a[0]) << " 字节" << endl;  // 4

    // 数组地址
    cout << "首元素地址: " << &a[0] << endl;
    cout << "数组名: " << a << endl;  // 两者相同

    // 数组传参后退化为指针
    // void func(int arr[]) {
    //     cout << sizeof(arr);  // 指针大小，不是数组大小！
    // }
    return 0;
}
```

**内存布局**
```
a[0]  a[1]  a[2]  a[3]  a[4]
┌─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  ← 连续存储
└─────┴─────┴─────┴─────┴─────┘
0x100 0x104 0x108 0x10C 0x110   ← 地址递增（int=4字节）
```

**易错点**
- `sizeof(数组名)` 返回整个数组的大小
- 数组传参后变成指针，`sizeof` 返回指针大小
- 计算元素个数用 `sizeof(a) / sizeof(a[0])`

---

### 10. 字符数组 — C 风格字符串、'\0' 终止

**概念**
- 字符数组以 `'\0'`（空字符）作为字符串结束标志
- `'\0'` 的 ASCII 值为 0
- 字符串长度不包含 `'\0'`

**代码模板**
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    // 字符数组
    char s1[] = "Hello";              // 自动加 '\0'，长度6
    char s2[] = {'H','e','l','l','o','\0'};  // 等效写法
    char s3[10] = "Hi";              // 剩余填 '\0'

    // 输出字符串
    cout << s1 << endl;               // Hello

    // 字符串长度（不含 '\0'）
    cout << strlen(s1) << endl;       // 5

    // 字符串复制
    char dest[20];
    strcpy(dest, s1);                 // dest = "Hello"

    // 字符串连接
    char str1[20] = "Hello";
    strcat(str1, " World");           // str1 = "Hello World"

    // 字符串比较
    int cmp = strcmp("abc", "abd");   // < 0

    // 遍历字符
    for (int i = 0; s1[i] != '\0'; i++) {
        cout << s1[i];
    }

    // 用 string 类更安全
    string s = "Hello";
    cout << s.length() << endl;       // 5
    return 0;
}
```

**易错点**
- `char s[] = "Hi"` 实际占用 3 字节（含 `\0`）
- `strlen` 返回字符个数，`sizeof` 返回内存大小
- 不要用 `==` 比较字符串，用 `strcmp`
- 推荐用 `string` 类代替字符数组

---

### 15. 二维数组 — 矩阵存储、行列遍历

**概念**
- 二维数组是数组的数组，用于表示矩阵
- `a[i][j]` 表示第 i 行第 j 列的元素

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 声明与初始化
    int a[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // 按行遍历
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << a[i][j] << "\t";
        }
        cout << endl;
    }

    // 求矩阵转置
    int b[4][3];
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 4; j++)
            b[j][i] = a[i][j];

    // 对角线元素之和
    int sum = 0;
    for (int i = 0; i < 3; i++)
        sum += a[i][i];    // 主对角线

    // 二维数组传参
    // void func(int a[][4], int rows) { ... }
    return 0;
}
```

**内存布局（3×4矩阵）**
```
a[0][0] a[0][1] a[0][2] a[0][3]  ← 第0行
a[1][0] a[1][1] a[1][2] a[1][3]  ← 第1行
a[2][0] a[2][1] a[2][2] a[2][3]  ← 第2行
```

**易错点**
- 二维数组传参时**列数必须指定**
- `a[i][j]` 的存储顺序是行优先
- 数组初始化时可以用嵌套花括号

---

### 16. 嵌套循环 — 九九表 / 矩阵

**概念**
- 循环中嵌套循环，内层循环每次完整执行
- 用于处理二维数据、矩阵运算等

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 九九乘法表
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i*j << "\t";
        }
        cout << endl;
    }

    // 输出星号三角形
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }

    // 矩阵加法
    int a[2][2] = {{1,2},{3,4}};
    int b[2][2] = {{5,6},{7,8}};
    int c[2][2];
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            c[i][j] = a[i][j] + b[i][j];

    // 嵌套循环的时间复杂度：O(n²)
    for (int i = 0; i < n; i++)        // 执行 n 次
        for (int j = 0; j < n; j++)    // 每次执行 n 次
            cout << i * n + j << endl; // 共 n² 次
    return 0;
}
```

**常见嵌套循环模式**
```
// 矩形
for (i) for (j) ...

// 三角形
for (i) for (j=0; j<=i; j++) ...

// 倒三角形
for (i) for (j=0; j<n-i; j++) ...

// 菱形（分两部分）
for (i) for (j) ...   // 上半部分
for (i) for (j) ...   // 下半部分
```

**易错点**
- 嵌套循环的总次数是各层循环次数的乘积
- 内层循环变量不要与外层同名
- 注意循环边界，防止多输出或少输出

---

## 三、字符串（11–12）

### 11. string 类 — #include &lt;string&gt;、运算符 +

**概念**
- `string` 是 C++ 标准库的字符串类
- 支持 `+` 连接、`==` 比较、`<<` 输出等运算符
- 比字符数组更安全、更方便

**代码模板**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // 创建字符串
    string s1 = "Hello";
    string s2("World");
    string s3(5, 'a');           // "aaaaa"

    // 连接
    string s4 = s1 + " " + s2;  // "Hello World"

    // 比较
    if (s1 == s2) cout << "相等";
    if (s1 < s2) cout << "s1 < s2";

    // 访问字符
    cout << s1[0] << endl;       // 'H'
    s1[0] = 'h';                 // "hello"

    // 长度
    cout << s1.length() << endl; // 5

    // 输入输出
    string s;
    cin >> s;                     // 读入一个单词
    getline(cin, s);              // 读入一行

    // 遍历
    for (int i = 0; i < s.length(); i++) {
        cout << s[i];
    }
    for (char c : s) {           // 范围 for
        cout << c;
    }
    return 0;
}
```

**易错点**
- 需要 `#include &lt;string&gt;`
- `string` 可以用 `+` 连接，字符数组不能
- `cin >> s` 遇空格停止，读整行用 `getline`
- `string` 不需要手动管理内存

---

### 12. 字符串常用 — length / size / substr / find / replace

**概念**
- `string` 类提供了丰富的成员函数
- 常用操作：获取长度、子串、查找、替换

**代码模板**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";

    // 长度
    cout << s.length() << endl;   // 13（length 和 size 等效）
    cout << s.size() << endl;     // 13

    // 子串
    string sub = s.substr(0, 5);  // "Hello"（从位置0取5个）
    string sub2 = s.substr(7);    // "World!"（从位置7到末尾）

    // 查找
    int pos = s.find("World");    // 7（首次出现位置）
    int pos2 = s.find("xyz");     // string::npos（未找到）

    // 替换
    s.replace(7, 5, "C++");       // 从位置7替换5个字符
    cout << s << endl;            // "Hello, C++!"

    // 插入和删除
    s.insert(5, " Beautiful");    // 在位置5插入
    s.erase(5, 10);               // 从位置5删除10个字符

    // 判断为空
    if (s.empty()) cout << "空字符串";

    // 字符串反转
    string rev = string(s.rbegin(), s.rend());

    // 数字转字符串
    string num_str = to_string(123);    // "123"
    int num = stoi("456");              // 456
    return 0;
}
```

**常用函数速查**
| 函数 | 功能 | 示例 |
|:---|:---|:---|
| `length()` / `size()` | 字符串长度 | `s.length()` |
| `substr(pos, len)` | 获取子串 | `s.substr(0, 3)` |
| `find(str)` | 查找子串位置 | `s.find("abc")` |
| `replace(pos, len, str)` | 替换子串 | `s.replace(0, 2, "XY")` |
| `insert(pos, str)` | 插入字符串 | `s.insert(0, "Hi")` |
| `erase(pos, len)` | 删除子串 | `s.erase(1, 3)` |
| `empty()` | 判断是否为空 | `s.empty()` |
| `append(str)` | 追加字符串 | `s.append("!")` |

**易错点**
- `substr(pos, len)` 的第二个参数是**长度**不是结束位置
- `find` 找不到返回 `string::npos`
- `replace` 会改变原字符串

---

## 四、递归（13–14）

### 13. 函数递归 — 自调用 + 终止条件

**概念**
- 递归是函数调用自身的编程技巧
- 必须有**终止条件**（基准情况），否则无限递归

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 阶乘
int factorial(int n) {
    if (n <= 1) return 1;           // 终止条件
    return n * factorial(n - 1);    // 递推
}
// factorial(5) = 5*4*3*2*1 = 120

// 斐波那契数列
int fib(int n) {
    if (n <= 1) return n;           // 终止条件
    return fib(n-1) + fib(n-2);     // 递推
}
// fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, ...

// 求数组和
int array_sum(int a[], int n) {
    if (n == 0) return 0;           // 终止条件
    return a[n-1] + array_sum(a, n-1);  // 递推
}

// 汉诺塔
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << " -> " << to << endl;
        return;
    }
    hanoi(n-1, from, aux, to);
    cout << from << " -> " << to << endl;
    hanoi(n-1, aux, to, from);
}

int main() {
    cout << factorial(5) << endl;    // 120
    cout << fib(10) << endl;         // 55
    int arr[] = {1, 2, 3, 4, 5};
    cout << array_sum(arr, 5) << endl; // 15
    hanoi(3, 'A', 'C', 'B');
    return 0;
}
```

**递归要素**
```
1. 终止条件（Base Case）：不再递归的情况
2. 递推关系（Recursive Case）：问题规模缩小
3. 朝终止条件前进：每次递归必须更接近终止条件
```

**易错点**
- 没有终止条件会导致栈溢出
- 递归不是循环，每次调用有独立的局部变量
- 递归效率通常不如循环（有函数调用开销）

---

### 14. 递归与栈 — 递归深度过大会爆栈

**概念**
- 递归调用使用系统栈存储每次调用的局部变量和返回地址
- 递归深度过大（通常几万次）会导致栈溢出

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 深度递归可能爆栈
void deep_recursion(int n) {
    if (n == 0) return;
    deep_recursion(n - 1);
}

// 改用循环避免爆栈
void safe_loop(int n) {
    while (n > 0) {
        n--;
    }
}

// 尾递归优化（编译器可能优化为循环）
int factorial_tail(int n, int acc = 1) {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, acc * n);  // 尾递归
}

// 递归转循环示例：斐波那契
int fib_loop(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    // deep_recursion(1000000);  // 可能爆栈！
    cout << factorial_tail(10) << endl;   // 3628800
    cout << fib_loop(40) << endl;         // 102334155
    return 0;
}
```

**栈溢出示意图**
```
调用栈：
┌─────────────┐
│ f(3)        │ ← 栈顶
├─────────────┤
│ f(2)        │
├─────────────┤
│ f(1)        │ ← 终止条件
└─────────────┘
递归深度 = 参数值
深度过大 → 栈空间耗尽 → 程序崩溃
```

**易错点**
- 递归深度一般不超过 10000~100000（取决于系统）
- 高级递归可用迭代（循环）替代
- 尾递归（return 语句直接调用自身）可被编译器优化

---

## 五、高级特性（17–20）

### 17. 函数重载 — 同名不同参

**概念**
- 同一个函数名可以有多个版本，参数列表不同
- 编译器根据参数类型和数量自动选择匹配的版本
- 返回类型不同不能构成重载

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 重载：同名不同参
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

string add(string a, string b) {
    return a + b;
}

int main() {
    cout << add(3, 5) << endl;          // 8（调用 int 版本）
    cout << add(3.14, 2.72) << endl;    // 5.86（调用 double 版本）
    cout << add(1, 2, 3) << endl;       // 6（调用三参数版本）
    cout << add(string("Hi"), string("!")) << endl;  // Hi!
    return 0;
}
```

**重载匹配规则**
```
1. 精确匹配：参数类型完全一致
2. 提升匹配：char → int, float → double
3. 标准转换：int → double
4. 用户定义转换：自定义类型转换
5. 不匹配：编译错误
```

**易错点**
- 重载靠**参数列表**区分，不是靠返回类型
- `int add(int, int)` 和 `double add(int, int)` 不能重载
- 默认参数可能导致重载歧义

---

### 18. 默认参数 — 从右往左连续提供

**概念**
- 函数参数可以有默认值，调用时可省略
- 默认参数必须从**右往左**连续提供

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 默认参数（从右往左）
void print(string s, int times = 1, char sep = '\n') {
    for (int i = 0; i < times; i++)
        cout << s << sep;
}

// 带默认参数的函数
int power(int base, int exp = 2) {  // 默认平方
    int result = 1;
    for (int i = 0; i < exp; i++)
        result *= base;
    return result;
}

// 声明和定义中的默认参数
void func(int a, int b = 10, int c = 20);  // 声明
void func(int a, int b, int c) {            // 定义（不写默认值）
    cout << a + b + c << endl;
}

int main() {
    print("Hello");              // 输出1次
    print("Hi", 3);              // 输出3次
    print("Hey", 2, ' ');        // 输出2次，空格分隔

    cout << power(5) << endl;    // 25（5的平方）
    cout << power(2, 10) << endl; // 1024
    return 0;
}
```

**易错点**
- 默认参数必须从右往左连续，不能跳跃
- 声明和定义都有默认参数时，只在声明中写
- 函数调用时，有默认值的参数可以从末尾开始省略

---

### 19. 内联函数 — inline 关键字、空间换时间

**概念**
- `inline` 建议编译器将函数体**内联展开**，避免函数调用开销
- 适用于简短、频繁调用的函数
- 是空间换时间的策略

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 内联函数
inline int max_val(int a, int b) {
    return a > b ? a : b;
}

inline int square(int x) {
    return x * x;
}

inline bool is_even(int n) {
    return n % 2 == 0;
}

// 编译器可能展开为：
// cout << max_val(3, 5) << endl;
// 等价于：
// cout << (3 > 5 ? 3 : 5) << endl;

int main() {
    cout << max_val(3, 5) << endl;    // 5
    cout << square(4) << endl;         // 16
    cout << is_even(7) << endl;        // 0 (false)
    return 0;
}
```

**内联 vs 普通函数**
| 特性 | 普通函数 | 内联函数 |
|:---:|:---:|:---:|
| 调用方式 | 跳转执行 | 代码展开 |
| 函数调用开销 | 有 | 无 |
| 代码大小 | 小 | 大（重复展开） |
| 适用场景 | 较长函数 | 简短函数 |

**易错点**
- `inline` 只是建议，编译器可以忽略
- 递归函数通常不会被内联
- 过度使用内联会导致代码膨胀

---

### 20. 命名空间 — namespace std; 避免命名冲突

**概念**
- 命名空间用于组织代码，避免名称冲突
- `std` 是 C++ 标准库的命名空间
- `using namespace std;` 可以省略 `std::` 前缀

**代码模板**
```cpp
#include <iostream>
#include <string>
using namespace std;

// 自定义命名空间
namespace Math {
    const double PI = 3.14159265;

    double circle_area(double r) {
        return PI * r * r;
    }

    double circle_circumference(double r) {
        return 2 * PI * r;
    }
}

namespace Utils {
    void print_line(int n = 40) {
        for (int i = 0; i < n; i++) cout << "-";
        cout << endl;
    }
}

int main() {
    // 使用自定义命名空间
    cout << Math::PI << endl;
    cout << Math::circle_area(5.0) << endl;
    Utils::print_line();

    // 使用 std 命名空间
    string s = "Hello";     // 省略了 std::
    cout << s << endl;

    // 完整写法
    std::cout << std::endl;
    return 0;
}
```

**命名空间用法**
```cpp
// 方式1：完整限定名
std::cout << "Hello" << std::endl;

// 方式2：using 声明（推荐）
using std::cout;
using std::endl;
cout << "Hello" << endl;

// 方式3：using 指令（不推荐用于大型项目）
using namespace std;
cout << "Hello" << endl;
```

**易错点**
- `using namespace std;` 在大项目中可能引起名称冲突
- 推荐在头文件中用 `using` 声明，不用 `using namespace`
- 自定义命名空间可以避免与库函数冲突

---

## 附录：GESP L2 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 函数定义 | 返回值类型/函数名/形参/函数体 |
| 02 | 函数声明 | 原型、解决调用顺序 |
| 03 | 值传递 | 形参是实参的副本 |
| 04 | return | 返回值、提前结束 |
| 05 | void 函数 | 无返回值 |
| 06 | 局部 / 全局 | 作用域：块内 / 文件内 |
| 07 | static 静态 | 只初始化一次、值保留 |
| 08 | 一维数组 | 声明/初始化/遍历/下标从0 |
| 09 | 数组内存 | 连续存储、sizeof |
| 10 | 字符数组 | C风格字符串、'\0'终止 |
| 11 | string 类 | 运算符+、更安全 |
| 12 | 字符串常用 | length/substr/find/replace |
| 13 | 函数递归 | 自调用+终止条件 |
| 14 | 递归与栈 | 深度过大爆栈 |
| 15 | 二维数组 | 矩阵、行列遍历 |
| 16 | 嵌套循环 | 九九表/矩阵 |
| 17 | 函数重载 | 同名不同参 |
| 18 | 默认参数 | 从右往左连续 |
| 19 | 内联函数 | inline、空间换时间 |
| 20 | 命名空间 | namespace、避免冲突 |

---

> ⚠️ 注意：原网站（gesp.scirco.cn）的代码模板存在严重错位问题（代码与标题不匹配）。本文件已修正为每个考点对应的正确代码模板。
