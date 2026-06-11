# GESP C++ 三级（L3 进阶）知识点整理

> 共 20 个考点，涵盖结构体、文件操作、递归回溯、STL 算法等

---

## 一、结构体（01–04）

### 01. 二维数组 — 矩阵、网格存储

**概念**
- 二维数组用于存储矩阵、网格等二维数据
- `a[i][j]` 表示第 i 行第 j 列

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

    // 求对角线元素之和
    int sum1 = 0, sum2 = 0;  // 主对角线、副对角线
    for (int i = 0; i < 3; i++) {
        sum1 += a[i][i];
        sum2 += a[i][2-i];
    }

    // 矩阵转置
    int b[4][3];
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 4; j++)
            b[j][i] = a[i][j];

    // 二维数组传参（列数必须指定）
    // void func(int a[][4], int rows) { ... }
    return 0;
}
```

**易错点**
- 二维数组传参时列数必须固定
- 行优先存储：`a[0][0]`, `a[0][1]`, ..., `a[1][0]`, ...
- 注意边界判断，防止越界

---

### 02. 结构体 struct — 自定义复合类型

**概念**
- 结构体将不同类型的数据组合成一个整体
- 用 `struct` 关键字定义，用 `.` 访问成员

**代码模板**
```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// 定义结构体
struct Student {
    string name;
    int age;
    double score;
};

// 定义时创建变量
struct Point {
    int x, y;
} p1, p2;

// 结构体函数
void printStudent(const Student& s) {
    cout << "姓名: " << s.name
         << ", 年龄: " << s.age
         << ", 成绩: " << s.score << endl;
}

// 比较函数（用于排序）
bool cmpScore(const Student& a, const Student& b) {
    return a.score > b.score;  // 按成绩降序
}

int main() {
    // 创建和初始化
    Student s1 = {"张三", 15, 95.5};
    Student s2;
    s2.name = "李四";
    s2.age = 14;
    s2.score = 88.0;

    // 访问成员
    cout << s1.name << " " << s1.score << endl;

    // 结构体数组
    Student class1[3] = {
        {"王五", 16, 92.0},
        {"赵六", 15, 85.5},
        {"钱七", 14, 98.0}
    };

    // 排序
    sort(class1, class1+3, cmpScore);

    // 输出
    for (int i = 0; i < 3; i++)
        printStudent(class1[i]);

    return 0;
}
```

**易错点**
- 结构体定义末尾有分号 `;`
- 成员访问用 `.`（点运算符）
- 结构体可以作为函数参数（推荐传 `const` 引用）

---

### 03. 结构体指针 — 箭头运算符 ->

**概念**
- 指向结构体的指针，用 `->` 访问成员
- 函数传指针可以修改原始结构体

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Point {
    int x, y;
};

// 传指针（可以修改原始值）
void movePoint(Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

// 传引用（更推荐）
void movePointRef(Point& p, int dx, int dy) {
    p.x += dx;
    p.y += dy;
}

void printPoint(const Point* p) {
    cout << "(" << p->x << ", " << p->y << ")" << endl;
}

int main() {
    Point p = {3, 5};

    // 方式1：指针
    Point* ptr = &p;
    movePoint(ptr, 1, 2);
    printPoint(&p);          // (4, 7)

    // 方式2：引用
    movePointRef(p, 1, 2);
    cout << "(" << p.x << ", " << p.y << ")" << endl;  // (5, 9)

    // 动态分配结构体
    Point* dynamicP = new Point{10, 20};
    cout << dynamicP->x << ", " << dynamicP->y << endl;
    delete dynamicP;  // 释放内存

    return 0;
}
```

**易错点**
- `p->x` 等价于 `(*p).x`
- 指针可能为 `nullptr`，访问前要检查
- 动态分配的结构体要用 `delete` 释放

---

### 04. 结构体数组 — 批量存储同类对象

**概念**
- 结构体数组用于存储多个相同类型的结构体
- 常用于处理学生成绩、坐标点等批量数据

**代码模板**
```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

// 按成绩降序排序
bool cmp(const Student& a, const Student& b) {
    return a.score > b.score;
}

int main() {
    // 声明结构体数组
    Student students[5] = {
        {"张三", 85},
        {"李四", 92},
        {"王五", 78},
        {"赵六", 95},
        {"钱七", 88}
    };

    // 计算平均分
    double avg = 0;
    for (int i = 0; i < 5; i++)
        avg += students[i].score;
    avg /= 5;
    cout << "平均分: " << avg << endl;

    // 排序
    sort(students, students+5, cmp);

    // 输出排名
    for (int i = 0; i < 5; i++) {
        cout << "第" << i+1 << "名: "
             << students[i].name
             << " " << students[i].score << "分" << endl;
    }

    // 查找最高分
    int maxIdx = 0;
    for (int i = 1; i < 5; i++)
        if (students[i].score > students[maxIdx].score)
            maxIdx = i;
    cout << "最高分: " << students[maxIdx].name << endl;

    return 0;
}
```

**易错点**
- 结构体数组的大小在编译时确定
- 排序需要自定义比较函数
- 访问成员：`students[i].name`

---

## 二、枚举（05–06）

### 05. 枚举 enum — 整型常量集合

**概念**
- 枚举定义一组命名的整型常量
- 默认从 0 开始递增
- 提高代码可读性

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 定义枚举
enum Direction {
    UP = 0,     // 显式赋值
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
};

// 默认递增
enum Color {
    RED,        // 0
    GREEN,      // 1
    BLUE        // 2
};

// 枚举用于 switch
void printDirection(Direction d) {
    switch (d) {
        case UP:    cout << "向上"; break;
        case DOWN:  cout << "向下"; break;
        case LEFT:  cout << "向左"; break;
        case RIGHT: cout << "向右"; break;
    }
}

int main() {
    Direction d = UP;
    cout << d << endl;  // 0

    // 枚举可以转换为整数
    int val = GREEN;
    cout << val << endl;  // 1

    // 用于数组下标
    int colorCount[3] = {10, 20, 15};
    cout << colorCount[RED] << endl;   // 10
    cout << colorCount[BLUE] << endl;  // 15

    return 0;
}
```

**易错点**
- 枚举值是整型常量，不是字符串
- 不同枚举类型的值可以赋给 `int`（C++ 风格枚举的缺陷）
- 枚举值默认从 0 开始，可以显式赋值

---

### 06. 强类型枚举 — enum class 防命名污染

**概念**
- `enum class` 是 C++11 引入的强类型枚举
- 不能隐式转换为 `int`，避免命名冲突
- 必须用 `枚举类型::枚举值` 访问

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 强类型枚举
enum class Direction {
    UP, DOWN, LEFT, RIGHT
};

enum class Color {
    RED, GREEN, BLUE
};

int main() {
    Direction d = Direction::UP;
    // int val = d;           // 错误！不能隐式转换
    int val = static_cast<int>(d);  // 正确：显式转换

    // 不能用整数直接赋值
    // d = 0;                 // 错误！
    d = Direction::DOWN;     // 正确

    // 用于 switch
    switch (d) {
        case Direction::UP:    cout << "上"; break;
        case Direction::DOWN:  cout << "下"; break;
        case Direction::LEFT:  cout << "左"; break;
        case Direction::RIGHT: cout << "右"; break;
    }
    cout << endl;

    // 不同枚举类型不能比较
    Color c = Color::RED;
    // if (d == c) { }        // 错误！类型不同

    // 可以用在类中
    enum class Season { SPRING, SUMMER, AUTUMN, WINTER };
    Season s = Season::SPRING;

    return 0;
}
```

**普通枚举 vs 强类型枚举**
| 特性 | `enum` | `enum class` |
|:---:|:---:|:---:|
| 命名空间 | 全局 | 枚举类型内部 |
| 隐式转换 | 可以转 `int` | 不可以 |
| 命名冲突 | 可能冲突 | 不会冲突 |
| 比较 | 不同枚举可比较 | 只能同类型比较 |

**易错点**
- `enum class` 必须用 `类型::值` 访问
- 不能隐式转换，需要 `static_cast`
- 推荐使用 `enum class` 避免命名冲突

---

## 三、递归进阶（07–08）

### 07. 递归深入 — 汉诺塔 / 阶乘 / 斐波那契

**概念**
- 递归是函数调用自身的编程技巧
- 必须有终止条件，否则无限递归

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 阶乘
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}

// 斐波那契数列
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// 汉诺塔
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << " -> " << to << endl;
        return;
    }
    hanoi(n-1, from, aux, to);      // 先把 n-1 个移到辅助柱
    cout << from << " -> " << to << endl;  // 移动最大盘
    hanoi(n-1, aux, to, from);      // 把 n-1 个移到目标柱
}

// 递归求幂
long long power(long long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long long half = power(base, exp/2);
        return half * half;
    }
    return base * power(base, exp-1);
}

// 递归求字符串长度
int strLen(const char* s) {
    if (*s == '\0') return 0;
    return 1 + strLen(s + 1);
}

int main() {
    cout << "5! = " << factorial(5) << endl;    // 120
    cout << "fib(10) = " << fib(10) << endl;    // 55
    cout << "2^10 = " << power(2, 10) << endl;  // 1024

    cout << "汉诺塔 (3盘):" << endl;
    hanoi(3, 'A', 'C', 'B');

    cout << "Hello长度: " << strLen("Hello") << endl;  // 5
    return 0;
}
```

**易错点**
- 递归必须有终止条件
- 每次递归必须更接近终止条件
- 斐波那契的朴素递归是 O(2^n)，效率很低

---

### 08. 递归回溯 — 枚举所有可能

**概念**
- 回溯法通过递归枚举所有可能的解
- 在发现当前路径不可行时"回退"
- 常用于排列、组合、子集等问题

**代码模板**
```cpp
#include <iostream>
#include <vector>
using namespace std;

// 全排列
vector<vector<int>> result;
void permute(vector<int>& nums, int start) {
    if (start == nums.size()) {
        result.push_back(nums);
        return;
    }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);   // 选择
        permute(nums, start + 1);     // 递归
        swap(nums[start], nums[i]);   // 回溯（撤销选择）
    }
}

// 子集
vector<vector<int>> subsets;
void subsetsHelper(vector<int>& nums, int start, vector<int>& current) {
    subsets.push_back(current);           // 加入当前子集
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);       // 选择
        subsetsHelper(nums, i + 1, current);  // 递归
        current.pop_back();               // 回溯
    }
}

// N 皇后问题（简化版：求解数量）
int count = 0;
bool check(int row, int col, vector<int>& queens) {
    for (int i = 0; i < row; i++) {
        if (queens[i] == col || abs(queens[i]-col) == abs(i-row))
            return false;
    }
    return true;
}
void solveNQueens(int n, int row, vector<int>& queens) {
    if (row == n) { count++; return; }
    for (int col = 0; col < n; col++) {
        if (check(row, col, queens)) {
            queens[row] = col;
            solveNQueens(n, row + 1, queens);
        }
    }
}

int main() {
    // 全排列
    vector<int> nums = {1, 2, 3};
    permute(nums, 0);
    for (auto& p : result) {
        for (int x : p) cout << x << " ";
        cout << endl;
    }

    // 子集
    vector<int> current;
    vector<int> nums2 = {1, 2, 3};
    subsetsHelper(nums2, 0, current);
    for (auto& s : subsets) {
        cout << "{ ";
        for (int x : s) cout << x << " ";
        cout << "}" << endl;
    }

    // 4皇后
    vector<int> queens(4);
    solveNQueens(4, 0, queens);
    cout << "4皇后解数: " << count << endl;  // 2

    return 0;
}
```

**回溯框架**
```
void backtrack(当前状态) {
    if (满足结束条件) {
        记录解;
        return;
    }
    for (每个选择) {
        做出选择;
        backtrack(新状态);  // 递归
        撤销选择;          // 回溯
    }
}
```

**易错点**
- 回溯的关键是"选择-递归-撤销"
- 不要忘记回溯（撤销选择）
- 剪枝可以大幅提高效率

---

## 四、文件操作（09–11）

### 09. 文件打开 ifstream — 读模式默认

**概念**
- `ifstream` 用于从文件读取数据
- 默认以读模式打开

**代码模板**
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // 打开文件
    ifstream fin("input.txt");

    // 检查是否成功打开
    if (!fin.is_open()) {
        cout << "无法打开文件" << endl;
        return 1;
    }

    // 读取数据
    int n;
    fin >> n;  // 读入一个整数

    string line;
    while (getline(fin, line)) {  // 按行读取
        cout << line << endl;
    }

    // 读取到数组
    int arr[100], cnt = 0;
    while (fin >> arr[cnt]) cnt++;

    // 关闭文件（ifstream 析构时自动关闭）
    fin.close();
    return 0;
}
```

**易错点**
- 打开后要检查 `is_open()`
- `>>` 遇空格/换行停止，`getline` 按行读取
- 文件路径在 Windows 用 `\\` 或 `/`

---

### 10. 文件打开 ofstream — 写模式默认清空

**概念**
- `ofstream` 用于向文件写入数据
- 默认写模式会**清空**原文件内容

**代码模板**
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // 写入文件（默认清空）
    ofstream fout("output.txt");

    if (!fout.is_open()) {
        cout << "无法创建文件" << endl;
        return 1;
    }

    // 写入数据
    fout << "Hello, World!" << endl;
    fout << 42 << " " << 3.14 << endl;

    // 写入数组
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; i++)
        fout << arr[i] << " ";

    fout.close();

    // 追加模式（不清空）
    ofstream fout2("output.txt", ios::app);
    fout2 << "\n追加的内容" << endl;
    fout2.close();

    return 0;
}
```

**打开模式**
| 模式 | 含义 |
|:---:|:---|
| `ios::out` | 写模式（默认，清空） |
| `ios::app` | 追加模式 |
| `ios::trunc` | 截断（清空） |
| `ios::in` | 读模式 |

**易错点**
- `ofstream` 默认会清空文件
- 追加要用 `ios::app`
- 写入后记得 `close()`

---

### 11. fstream 双工 — 可读可写

**概念**
- `fstream` 既可以读又可以写
- 需要指定打开模式

**代码模板**
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // 读写模式
    fstream fs("data.txt", ios::in | ios::out);

    if (!fs.is_open()) {
        // 文件不存在则创建
        fs.open("data.txt", ios::in | ios::out | ios::trunc);
    }

    // 写入数据
    fs << "Alice 95" << endl;
    fs << "Bob 87" << endl;

    // 回到文件开头
    fs.seekg(0, ios::beg);

    // 读取数据
    string name;
    int score;
    while (fs >> name >> score) {
        cout << name << ": " << score << endl;
    }

    fs.close();

    // 修改文件中的特定内容
    fstream fs2("data.txt", ios::in | ios::out);
    fs2.seekp(0);  // 移动写指针到开头
    fs2 << "Charlie 92";  // 覆盖前几个字符
    fs2.close();

    return 0;
}
```

**易错点**
- `fstream` 需要指定 `ios::in | ios::out`
- `seekg` 移动读指针，`seekp` 移动写指针
- 同时读写时注意指针位置

---

## 五、字符串流与getline（12–13）

### 12. getline 读行 — 按行读取

**概念**
- `getline(cin, line)` 从标准输入读取一行
- `getline(fin, line)` 从文件读取一行
- 可以指定分隔符

**代码模板**
```cpp
#include <iostream>
#include <string>
#include <fstream>
using namespace std;

int main() {
    // 从 cin 读取一行
    string line;
    cout << "请输入一行: ";
    getline(cin, line);
    cout << "你输入了: " << line << endl;

    // 读取整段文本
    string paragraph;
    cout << "输入多行（输入 end 结束）:" << endl;
    while (getline(cin, line) && line != "end") {
        paragraph += line + "\n";
    }

    // 从文件逐行读取
    ifstream fin("input.txt");
    while (getline(fin, line)) {
        cout << line << endl;
    }
    fin.close();

    // 指定分隔符
    string data = "one,two,three";
    string token;
    // 手动分割（不用 getline）
    // 或者用 stringstream

    // 处理含空格的输入
    string fullLine;
    getline(cin, fullLine);  // 读入 "Hello World"
    cout << fullLine << endl;

    return 0;
}
```

**易错点**
- `getline` 会丢弃换行符
- `cin >> x` 后再 `getline` 会读到残留的换行符，需要 `cin.ignore()`
- `getline` 的第三个参数可自定义分隔符

---

### 13. 字符串流 sstream — 分割 / 类型转换

**概念**
- `stringstream` 用于字符串和数值之间的转换
- 可以像流一样操作字符串

**代码模板**
```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // 字符串分割
    string csv = "apple,banana,cherry";
    stringstream ss(csv);
    string token;
    while (getline(ss, token, ',')) {
        cout << token << endl;
    }

    // 数字转字符串
    stringstream converter;
    converter << 42;
    string numStr = converter.str();
    cout << "数字: " << numStr << endl;

    // 字符串转数字
    string str = "12345";
    stringstream ss2(str);
    int num;
    ss2 >> num;
    cout << "数值: " << num << endl;

    // 更简单的方式
    string s1 = to_string(123);      // 数字转字符串
    int n = stoi("456");             // 字符串转整数
    double d = stod("3.14");         // 字符串转浮点数

    // 按空格分割字符串
    string sentence = "Hello World from C++";
    stringstream ss3(sentence);
    string word;
    vector<string> words;
    while (ss3 >> word) {
        words.push_back(word);
    }
    for (auto& w : words) cout << w << endl;

    // 拼接字符串
    stringstream ss4;
    ss4 << "Score: " << 95 << ", Name: " << "Alice";
    string result = ss4.str();
    cout << result << endl;

    return 0;
}
```

**常用函数**
| 函数 | 功能 |
|:---|:---|
| `str()` | 获取/设置字符串内容 |
| `clear()` | 清除错误标志 |
| `seekg(0)` | 重置读指针 |
| `>>` | 从流中提取数据 |
| `<<` | 向流中插入数据 |

**易错点**
- 用 `str()` 获取最终字符串
- 用完后要 `clear()` 或重新创建对象
- `getline(ss, token, ',')` 可自定义分隔符

---

## 六、STL 算法（14–16）

### 14. 常用算法 — sort / swap / reverse / min / max

**概念**
- `&lt;algorithm&gt;` 头文件提供大量通用算法
- 这些算法可以用于数组、vector 等容器

**代码模板**
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int a[] = {5, 3, 1, 4, 2};

    // sort：排序
    sort(a, a+5);                    // 升序
    sort(a, a+5, greater<int>());    // 降序

    // swap：交换
    int x = 10, y = 20;
    swap(x, y);

    // reverse：反转
    int b[] = {1, 2, 3, 4, 5};
    reverse(b, b+5);                 // {5, 4, 3, 2, 1}

    // min / max：最小最大值
    cout << min(3, 5) << endl;       // 3
    cout << max(3, 5) << endl;       // 5

    // min_element / max_element
    int c[] = {3, 1, 4, 1, 5, 9};
    int minVal = *min_element(c, c+6);
    int maxVal = *max_element(c, c+6);

    // find：查找
    int* pos = find(a, a+5, 4);
    if (pos != a+5) cout << "找到: " << pos - a << endl;

    // count：计数
    int cnt = count(a, a+5, 4);

    // fill：填充
    int d[5];
    fill(d, d+5, 0);

    // 用于 vector
    vector<int> v = {5, 3, 1, 4, 2};
    sort(v.begin(), v.end());
    reverse(v.begin(), v.end());

    return 0;
}
```

**常用算法速查**
| 算法 | 功能 | 用法 |
|:---|:---|:---|
| `sort` | 排序 | `sort(a, a+n)` |
| `swap` | 交换 | `swap(a, b)` |
| `reverse` | 反转 | `reverse(a, a+n)` |
| `min` / `max` | 最小/大值 | `min(a, b)` |
| `find` | 查找 | `find(a, a+n, val)` |
| `count` | 计数 | `count(a, a+n, val)` |
| `fill` | 填充 | `fill(a, a+n, val)` |

**易错点**
- `sort` 默认升序，降序用 `greater<int>()`
- `min_element` 返回迭代器/指针，要用 `*` 取值
- 这些算法都在 `&lt;algorithm&gt;` 中

---

### 15. lower_bound — 有序区间二分下界

**概念**
- 在**有序**区间中查找第一个**不小于** `val` 的位置
- 时间复杂度 O(log n)

**代码模板**
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int a[] = {1, 2, 3, 4, 5, 6};

    // lower_bound：第一个 >= val 的位置
    auto it = lower_bound(a, a+6, 4);
    int pos = it - a;  // 3（下标）
    cout << "第一个 >= 4 的位置: " << pos << endl;

    // 在 vector 中使用
    vector<int> v = {10, 20, 30, 40, 50};
    auto vit = lower_bound(v.begin(), v.end(), 25);
    cout << "第一个 >= 25 的位置: " << vit - v.begin() << endl;  // 2

    // 计算 val 出现的次数
    int b[] = {1, 2, 2, 2, 3, 4};
    int cnt = lower_bound(b, b+6, 3) - lower_bound(b, b+6, 2);
    cout << "2 出现了 " << cnt << " 次" << endl;  // 3

    // 判断 val 是否存在
    bool exists = (lower_bound(a, a+6, 4) != a+6) && (*lower_bound(a, a+6, 4) == 4);

    return 0;
}
```

**易错点**
- 要求数组**有序**
- 返回的是迭代器/指针，需 `- begin()` 转下标
- `lower_bound` 返回第一个 `>=` 的位置

---

### 16. upper_bound — 有序区间二分上界

**概念**
- 在**有序**区间中查找第一个**大于** `val` 的位置
- 时间复杂度 O(log n)

**代码模板**
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int a[] = {1, 2, 3, 3, 3, 4, 5};

    // upper_bound：第一个 > val 的位置
    auto it = upper_bound(a, a+7, 3);
    int pos = it - a;  // 5
    cout << "第一个 > 3 的位置: " << pos << endl;

    // lower_bound 和 upper_bound 的区别
    int lo = lower_bound(a, a+7, 3) - a;  // 第一个 >= 3 的位置: 2
    int hi = upper_bound(a, a+7, 3) - a;  // 第一个 > 3 的位置: 5
    cout << "3 出现在 [" << lo << ", " << hi << ")" << endl;

    // 计数：val 出现的次数
    int cnt = upper_bound(a, a+7, 3) - lower_bound(a, a+7, 3);
    cout << "3 出现了 " << cnt << " 次" << endl;  // 3

    // 在 vector 中使用
    vector<int> v = {10, 20, 30, 40, 50};
    auto vit = upper_bound(v.begin(), v.end(), 30);
    cout << "第一个 > 30 的位置: " << vit - v.begin() << endl;  // 3

    return 0;
}
```

**lower_bound vs upper_bound**
| 函数 | 含义 | 查找条件 |
|:---|:---|:---|
| `lower_bound` | 第一个不小于 val 的位置 | `>= val` |
| `upper_bound` | 第一个大于 val 的位置 | `> val` |
| 计数 | `upper - lower` | `val` 出现次数 |

**易错点**
- 要求数组**有序**
- `lower_bound` 返回 `>= val`，`upper_bound` 返回 `> val`
- 计数用 `upper - lower`

---

## 七、预处理与模块化（17–20）

### 17. 宏定义 #define — 文本替换，无类型检查

**概念**
- `#define` 是预处理指令，进行简单的文本替换
- 没有类型检查，容易出错
- 推荐用 `const` 和 `inline` 替代

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 简单宏
#define PI 3.14159
#define MAX_N 100

// 带参数的宏（容易出错）
#define SQUARE(x) ((x) * (x))      // 注意括号！
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// 错误写法（没有括号）
#define BAD_SQUARE(x) x * x        // BAD_SQUARE(3+1) = 7，不是 16

// 更好的替代：const 和 inline
const double PI_CONST = 3.14159;
inline double square(double x) { return x * x; }

int main() {
    cout << PI << endl;
    cout << SQUARE(3) << endl;      // 9
    cout << SQUARE(3+1) << endl;    // 16（正确）
    // cout << BAD_SQUARE(3+1) << endl;  // 7（错误！）

    // 条件编译调试
    #define DEBUG
    #ifdef DEBUG
        cout << "调试信息" << endl;
    #endif

    return 0;
}
```

**易错点**
- 宏只是文本替换，没有类型检查
- 带参数的宏每个参数都要加括号
- 推荐用 `const` 代替简单宏，用 `inline` 代替函数宏

---

### 18. 条件编译 — #ifdef / #ifndef / #pragma once

**概念**
- 条件编译根据条件决定是否编译某段代码
- 常用于防止头文件重复包含

**代码模板**
```cpp
// 头文件保护（方式1：传统）
#ifndef MY_HEADER_H
#define MY_HEADER_H

// 头文件内容
void func();
int add(int a, int b);

#endif

// 头文件保护（方式2：C++11）
#pragma once

// 头文件内容
void func2();

// 条件编译
#define PLATFORM_WINDOWS

int main() {
    // 根据平台选择代码
    #ifdef PLATFORM_WINDOWS
        cout << "Windows 平台" << endl;
    #elif defined(PLATFORM_LINUX)
        cout << "Linux 平台" << endl;
    #else
        cout << "未知平台" << endl;
    #endif

    // 调试代码（发布时关闭）
    #ifdef DEBUG
        cout << "调试模式" << endl;
    #endif

    return 0;
}
```

**条件编译指令**
| 指令 | 功能 |
|:---|:---|
| `#ifdef MACRO` | 如果定义了 MACRO |
| `#ifndef MACRO` | 如果未定义 MACRO |
| `#if expr` | 如果 expr 为真 |
| `#elif` | 否则如果 |
| `#else` | 否则 |
| `#endif` | 结束条件编译 |

**易错点**
- `#ifndef` 用于防止头文件重复包含
- `#pragma once` 更简洁但非标准（所有主流编译器都支持）
- 条件编译在预处理阶段处理

---

### 19. 头文件组织 — 声明放 .h、定义放 .cpp

**概念**
- 头文件（.h）放声明，源文件（.cpp）放定义
- 避免重复定义，提高编译效率

**代码模板**
```cpp
// ====== math_utils.h ======
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// 函数声明
int add(int a, int b);
int multiply(int a, int b);
double average(int a, int b);

// 结构体定义
struct Point {
    double x, y;
};

// 常量定义（const 在头文件中安全）
const double PI = 3.14159;

#endif

// ====== math_utils.cpp ======
#include "math_utils.h"

// 函数定义
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

double average(int a, int b) {
    return (a + b) / 2.0;
}

// ====== main.cpp ======
#include <iostream>
#include "math_utils.h"
using namespace std;

int main() {
    cout << add(3, 5) << endl;
    Point p = {1.0, 2.0};
    return 0;
}
```

**易错点**
- 头文件要加保护（`#ifndef` 或 `#pragma once`）
- `const` 变量可以定义在头文件中（默认内部链接）
- `#define` 常量不适合放在头文件中

---

### 20. 命名空间进阶 — using 声明、命名别名

**概念**
- `using` 声明引入特定名称，避免全写 `std::`
- 命名空间别名简化长名称

**代码模板**
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// 命名空间别名
namespace very_long_namespace_name {
    void func() { cout << "hello" << endl; }
}

namespace short = very_long_namespace_name;  // 别名

// 自定义命名空间
namespace Math {
    const double PI = 3.14159;

    double circleArea(double r) {
        return PI * r * r;
    }

    namespace Advanced {
        double gaussian(double x, double mu, double sigma) {
            return exp(-0.5 * pow((x - mu) / sigma, 2));
        }
    }
}

// using 声明（推荐方式）
using std::cout;
using std::endl;
using std::string;

int main() {
    // 使用别名
    short::func();

    // 使用嵌套命名空间
    cout << Math::PI << endl;
    cout << Math::circleArea(5.0) << endl;
    cout << Math::Advanced::gaussian(0, 0, 1) << endl;

    // using 声明的效果
    cout << "Hello" << endl;  // 不用写 std::
    string s = "World";
    cout << s << endl;

    // using 指令（不推荐在头文件中使用）
    // using namespace std;  // 可能引起命名冲突

    return 0;
}
```

**using 的三种方式**
```cpp
// 方式1：using 指令（引入整个命名空间）
using namespace std;      // 不推荐在头文件中

// 方式2：using 声明（引入特定名称）
using std::cout;          // 推荐
using std::endl;

// 方式3：命名空间别名
namespace fs = std::filesystem;  // C++17
```

**易错点**
- 不要在头文件中使用 `using namespace std;`
- `using` 声明比 `using namespace` 更安全
- 命名空间可以嵌套

---

## 附录：GESP L3 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 二维数组 | 矩阵、网格存储 |
| 02 | 结构体 struct | 自定义复合类型 |
| 03 | 结构体指针 | 箭头运算符 -> |
| 04 | 结构体数组 | 批量存储同类对象 |
| 05 | 枚举 enum | 整型常量集合 |
| 06 | 强类型枚举 | enum class 防污染 |
| 07 | 递归深入 | 汉诺塔/阶乘/斐波那契 |
| 08 | 递归回溯 | 枚举所有可能 |
| 09 | 文件打开 ifstream | 读模式默认 |
| 10 | 文件打开 ofstream | 写模式默认清空 |
| 11 | fstream 双工 | 可读可写 |
| 12 | getline 读行 | 按行读取 |
| 13 | 字符串流 sstream | 分割/类型转换 |
| 14 | 常用算法 | sort/swap/reverse/min/max |
| 15 | lower_bound | 有序二分下界 |
| 16 | upper_bound | 有序二分上界 |
| 17 | 宏定义 #define | 文本替换、无类型检查 |
| 18 | 条件编译 | #ifdef/#ifndef/#pragma once |
| 19 | 头文件组织 | 声明.h、定义.cpp |
| 20 | 命名空间进阶 | using 声明、别名 |

---

