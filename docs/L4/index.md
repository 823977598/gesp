# GESP C++ 四级（L4 提高）知识点整理

> 来源：https://gesp.scirco.cn/L4/topics.html
> 共 22 个考点，涵盖指针、动态内存、引用、链表、排序算法等

---

## 一、指针（01–05）

### 01. 指针基础 — int* p; int* p = &x; 取地址 / 解引用

**概念**
- 指针是存储内存地址的变量
- `&` 取地址运算符，`*` 解引用运算符
- 指针可以指向变量，通过地址间接访问

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* p = &x;        // p 指向 x 的地址

    cout << "x 的值: " << x << endl;       // 42
    cout << "x 的地址: " << &x << endl;    // 地址
    cout << "p 的值: " << p << endl;        // 同 &x
    cout << "*p 的值: " << *p << endl;      // 42（解引用）

    *p = 100;           // 通过指针修改 x
    cout << "x = " << x << endl;            // 100

    // 空指针
    int* nullP = nullptr;

    // 指针的指针
    int** pp = &p;
    cout << **pp << endl;  // 100

    return 0;
}
```

**易错点**
- 未初始化的指针是野指针，访问会导致未定义行为
- `nullptr` 是空指针，不要解引用
- 指针本身也有地址：`&p`

---

### 02. 指针运算 — p+1 跨过 sizeof(T) 字节

**概念**
- 指针加减运算按类型大小移动
- `p+1` 移动 `sizeof(*p)` 个字节
- 两个指针相减得到元素个数

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;       // p 指向 arr[0]

    cout << *p << endl;     // 10
    cout << *(p+1) << endl; // 20（移动 4 字节）
    cout << *(p+2) << endl; // 30

    // 指针递增
    p++;                    // p 现在指向 arr[1]
    cout << *p << endl;     // 20

    // 指针相减
    int* start = arr;
    int* end = arr + 5;
    cout << "元素个数: " << end - start << endl;  // 5

    // 遍历数组
    for (int* p = arr; p < arr + 5; p++) {
        cout << *p << " ";
    }
    cout << endl;

    // sizeof 验证
    cout << "int 大小: " << sizeof(int) << endl;  // 4
    cout << "指针移动: " << (void*)(p+1) - (void*)p << " 字节" << endl;

    return 0;
}
```

**易错点**
- `p+1` 移动的字节数取决于指向类型
- `int*` 加 1 移动 4 字节，`char*` 加 1 移动 1 字节
- 指针比较需要在同一数组内才有意义

---

### 03. 指针与数组 — a[i] ⇔ *(a+i)

**概念**
- 数组名在多数情况下退化为首元素指针
- `a[i]` 等价于 `*(a+i)`
- 指针可以像数组一样用下标访问

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int* p = arr;       // 数组名退化为指针

    // 两种等价写法
    cout << arr[2] << endl;     // 3
    cout << *(arr + 2) << endl; // 3
    cout << p[2] << endl;       // 3（指针也可以用下标）
    cout << *(p + 2) << endl;   // 3

    // 遍历数组的三种方式
    // 方式1：下标
    for (int i = 0; i < 5; i++) cout << arr[i] << " ";

    // 方式2：指针
    for (int* p = arr; p < arr + 5; p++) cout << *p << " ";

    // 方式3：范围 for
    for (int x : arr) cout << x << " ";

    // 数组名的sizeof
    cout << sizeof(arr) << endl;    // 20（整个数组）
    cout << sizeof(p) << endl;      // 8（指针大小，64位系统）

    return 0;
}
```

**易错点**
- 数组名在 `sizeof` 和 `&` 运算时不会退化
- 数组传参后变成指针，丢失大小信息
- `p[i]` 和 `*(p+i)` 完全等价

---

### 04. 指针数组 — int* p[10]：10 个 int 指针

**概念**
- 指针数组是存储指针的数组
- 每个元素都是一个指针

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 指针数组：数组的每个元素都是指针
    int a = 1, b = 2, c = 3;
    int* p[3] = {&a, &b, &c};

    for (int i = 0; i < 3; i++) {
        cout << *p[i] << " ";  // 1 2 3
    }
    cout << endl;

    // 字符串数组（指针数组的经典用法）
    const char* fruits[] = {"apple", "banana", "cherry"};
    for (int i = 0; i < 3; i++) {
        cout << fruits[i] << endl;
    }

    // 指向数组的指针数组
    int arr1[] = {1, 2, 3};
    int arr2[] = {4, 5, 6};
    int* arrPtrs[] = {arr1, arr2};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << arrPtrs[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

**易错点**
- `int* p[10]` 是指针数组（10 个 int 指针）
- `int (*p)[10]` 是数组指针（指向 10 元数组）
- 两者含义完全不同

---

### 05. 数组指针 — int (*p)[10]：指向 10 元数组

**概念**
- 数组指针是指向整个数组的指针
- 加 1 移动整个数组的大小

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3][4] = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};

    // 数组指针：指向含4个int的数组
    int (*p)[4] = arr;  // p 指向第一行

    // 遍历二维数组
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << p[i][j] << "\t";  // 等价于 arr[i][j]
        }
        cout << endl;
    }

    // 指针移动
    cout << "第0行首元素: " << *p[0] << endl;     // 1
    cout << "第1行首元素: " << *p[1] << endl;     // 5
    cout << "第2行首元素: " << *p[2] << endl;     // 9

    // 数组指针作为函数参数
    // void printMatrix(int (*mat)[4], int rows) {
    //     for (int i = 0; i < rows; i++)
    //         for (int j = 0; j < 4; j++)
    //             cout << mat[i][j] << " ";
    // }

    return 0;
}
```

**指针数组 vs 数组指针**
| 声明 | 含义 | 加1移动 |
|:---|:---|:---|
| `int* p[10]` | 指针数组（10个int指针） | 移动一个指针 |
| `int (*p)[10]` | 数组指针（指向10元数组） | 移动40字节 |

**易错点**
- `int (*p)[10]` 的括号不能省略
- 数组指针常用于传递二维数组
- 注意区分指针数组和数组指针

---

## 二、动态内存与引用（06–10）

### 06. 动态内存 new — 申请单个 / 数组，失败抛异常

**概念**
- `new` 在堆上动态分配内存
- 分配失败抛出 `std::bad_alloc` 异常

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 申请单个变量
    int* p = new int;       // 未初始化
    *p = 42;
    cout << *p << endl;     // 42

    // 申请并初始化
    int* q = new int(100);
    cout << *q << endl;     // 100

    // 申请数组
    int n = 5;
    int* arr = new int[n]();  // 初始化为0

    for (int i = 0; i < n; i++) {
        arr[i] = i * 10;
        cout << arr[i] << " ";
    }
    cout << endl;

    // 二维动态数组
    int rows = 3, cols = 4;
    int** matrix = new int*[rows];
    for (int i = 0; i < rows; i++) {
        matrix[i] = new int[cols]();
    }

    // 释放内存
    delete p;
    delete[] arr;

    for (int i = 0; i < rows; i++) {
        delete[] matrix[i];
    }
    delete[] matrix;

    return 0;
}
```

**易错点**
- `new` 失败时抛异常，不是返回 `nullptr`
- `new[]` 必须配 `delete[]`
- 不释放会导致内存泄漏

---

### 07. 动态内存 delete — new 配 delete、new[] 配 delete[]

**概念**
- `delete` 释放 `new` 分配的内存
- `delete[]` 释放 `new[]` 分配的数组
- 配对错误会导致未定义行为

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 正确配对
    int* p = new int(42);
    delete p;          // 正确：new 配 delete

    int* arr = new int[10];
    delete[] arr;      // 正确：new[] 配 delete[]

    // 错误配对（未定义行为）
    // int* p2 = new int;
    // delete[] p2;    // 错误！
    // int* arr2 = new int[10];
    // delete arr2;    // 错误！

    // 释放后置空
    int* ptr = new int(10);
    delete ptr;
    ptr = nullptr;     // 防止悬垂指针

    // 智能指针（C++11，更安全）
    // #include <memory>
    // auto sp = make_unique<int>(42);    // 自动释放
    // auto vp = make_unique<int[]>(10);  // 自动释放数组

    return 0;
}
```

**内存泄漏示例**
```cpp
void leak() {
    int* p = new int(42);  // 函数结束时 p 被销毁
    // 但 new 分配的内存没有被 delete
    // 内存泄漏！
}

void noLeak() {
    int* p = new int(42);
    delete p;  // 正确释放
}
```

**易错点**
- `new` 配 `delete`，`new[]` 配 `delete[]`
- 释放后将指针置为 `nullptr`
- 重复释放（double free）会导致崩溃

---

### 08. 引用 reference — int& r = x; 绑定即别名

**概念**
- 引用是变量的别名，与原变量绑定
- 必须在声明时初始化
- 绑定后不能改绑其他变量

**代码模板**
```cpp
#include <iostream>
using namespace std;

void swap_vals(int& a, int& b) {
    int t = a; a = b; b = t;
}

void printInfo(const string& s) {  // const 引用避免拷贝
    cout << s << " 长度: " << s.length() << endl;
}

int main() {
    int x = 10;
    int& r = x;     // r 是 x 的别名

    cout << "x = " << x << endl;   // 10
    cout << "r = " << r << endl;   // 10

    r = 20;          // 修改 r 就是修改 x
    cout << "x = " << x << endl;   // 20

    // 引用作为函数参数（修改原值）
    int a = 3, b = 5;
    swap_vals(a, b);
    cout << "a=" << a << " b=" << b << endl;  // a=5 b=3

    // const 引用
    const int& cr = x;    // 只读引用
    // cr = 100;           // 错误！不能修改

    return 0;
}
```

**易错点**
- 引用必须初始化
- 引用绑定后不能改绑
- `const` 引用可以绑定字面量：`const int& r = 10;`

---

### 09. 引用 vs 指针 — 引用必须初始化、不可改绑

**概念**
- 引用是别名，指针是地址
- 引用更安全，指针更灵活

**对比**
| 特性 | 引用 | 指针 |
|:---|:---|:---|
| 初始化 | 必须初始化 | 可以后初始化 |
| 可否为空 | 不能为 null | 可以为 nullptr |
| 可否改绑 | 不能改绑 | 可以指向其他变量 |
| 访问方式 | 直接使用 | 需要 `*` 解引用 |
| 内存 | 可能无额外存储 | 占用指针大小 |

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 引用方式
void swapRef(int& a, int& b) {
    int t = a; a = b; b = t;
}

// 指针方式
void swapPtr(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

int main() {
    int x = 1, y = 2;

    swapRef(x, y);       // 传引用
    cout << x << " " << y << endl;  // 2 1

    swapPtr(&x, &y);     // 传指针
    cout << x << " " << y << endl;  // 1 2

    // 指针可以为空，引用不能为空
    int* nullP = nullptr;
    // int& nullR;        // 编译错误：引用必须初始化

    // 指针可以改指向
    int a = 10, b = 20;
    int* p = &a;
    p = &b;              // 可以改指向

    // 引用不能改绑
    int& r = a;
    // r = b;            // 这是赋值，不是改绑！

    return 0;
}
```

**选择建议**
- 大多数情况用 `const` 引用（安全、高效）
- 需要表示"可能为空"时用指针
- 需要动态分配内存时用指针

---

### 10. const 修饰 — const int* / int* const / const int* const

**概念**
- `const` 修饰指针有三种形式
- 修饰的是 `const` 左边的内容

**三种形式**
```cpp
int x = 10, y = 20;

// 1. 指向常量的指针（不能通过指针修改值）
const int* p1 = &x;
// *p1 = 100;    // 错误！不能修改值
p1 = &y;        // 可以改指向

// 2. 常量指针（不能改指向）
int* const p2 = &x;
*p2 = 100;      // 可以修改值
// p2 = &y;     // 错误！不能改指向

// 3. 指向常量的常量指针（都不能改）
const int* const p3 = &x;
// *p3 = 100;   // 错误！
// p3 = &y;     // 错误！
```

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 函数参数中的 const
void printArray(const int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
        // arr[i] = 0;  // 错误！不能修改
    }
    cout << endl;
}

// const 引用参数（最常用）
string concatenate(const string& a, const string& b) {
    return a + b;  // 不拷贝，高效
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printArray(arr, 5);

    string s1 = "Hello", s2 = " World";
    cout << concatenate(s1, s2) << endl;

    // const 成员变量
    const int MAX = 100;
    // MAX = 200;  // 错误！

    return 0;
}
```

**记忆口诀**
```
const 在 * 左边：值不能改（指向常量）
const 在 * 右边：指向不能改（常量指针）
const 在 * 两边：都不能改
```

**易错点**
- `const` 修饰的是左边的内容（没有左边则修饰右边）
- 函数参数用 `const T&` 既安全又高效
- `const` 可以去除，非 `const` 不能自动转为 `const`

---

## 三、链表（11–17）

### 11. 链表节点 — struct Node{ T data; Node* next; }

**概念**
- 链表由节点组成，每个节点包含数据和指向下一节点的指针
- 动态增删，无需连续内存

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 定义链表节点
struct Node {
    int data;
    Node* next;
};

// 创建节点
Node* createNode(int val) {
    Node* p = new Node{val, nullptr};
    return p;
}

// 打印链表
void printList(Node* head) {
    Node* p = head;
    while (p != nullptr) {
        cout << p->data << " -> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

// 求链表长度
int getLength(Node* head) {
    int len = 0;
    Node* p = head;
    while (p != nullptr) {
        len++;
        p = p->next;
    }
    return len;
}

int main() {
    Node* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);

    printList(head);       // 1 -> 2 -> 3 -> NULL
    cout << "长度: " << getLength(head) << endl;  // 3

    return 0;
}
```

**链表结构图**
```
head
  │
  ▼
┌───┬───┐   ┌───┬───┐   ┌───┬───┐
│ 1 │ ──┼──▶│ 2 │ ──┼──▶│ 3 │NULL│
└───┴───┘   └───┴───┘   └───┴───┘
 data next   data next   data next
```

**易错点**
- 遍历时要用临时指针，否则会丢失链表
- 删除节点时要先保存前驱节点
- 注意空链表（`head == nullptr`）的情况

---

### 12. 链表头插 — O(1) 插入

**概念**
- 头插法在链表头部插入新节点
- 时间复杂度 O(1)

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// 头插法
Node* insertHead(Node* head, int val) {
    Node* p = new Node{val, head};
    return p;  // 新节点成为新的 head
}

// 用头插法创建链表（顺序与输入相反）
Node* createList(int arr[], int n) {
    Node* head = nullptr;
    for (int i = 0; i < n; i++) {
        head = insertHead(head, arr[i]);
    }
    return head;
}

void printList(Node* head) {
    Node* p = head;
    while (p) {
        cout << p->data << " -> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    Node* head = createList(arr, 5);
    printList(head);  // 5 -> 4 -> 3 -> 2 -> 1 -> NULL

    head = insertHead(head, 0);
    printList(head);  // 0 -> 5 -> 4 -> 3 -> 2 -> 1 -> NULL

    return 0;
}
```

**头插过程**
```
插入前: head -> [2] -> [3] -> NULL

插入 1:
1. 创建新节点: [1] -> NULL
2. 新节点指向原head: [1] -> [2] -> [3] -> NULL
3. head 指向新节点: head -> [1] -> [2] -> [3] -> NULL
```

**易错点**
- 头插后新节点成为新的 head
- 插入顺序与结果顺序相反
- 别忘记处理空链表的情况

---

### 13. 链表尾插 — 需 tail 指针或遍历

**概念**
- 尾插法在链表末尾插入新节点
- 需要遍历或维护尾指针，时间复杂度 O(n)

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// 尾插法（遍历）
Node* insertTail(Node* head, int val) {
    Node* newNode = new Node{val, nullptr};
    if (head == nullptr) return newNode;

    Node* p = head;
    while (p->next != nullptr) {
        p = p->next;
    }
    p->next = newNode;
    return head;
}

// 尾插法（维护尾指针）
void insertTailWithTail(Node*& head, Node*& tail, int val) {
    Node* newNode = new Node{val, nullptr};
    if (head == nullptr) {
        head = tail = newNode;
    } else {
        tail->next = newNode;
        tail = newNode;
    }
}

// 用尾插法创建链表（顺序与输入相同）
Node* createList(int arr[], int n) {
    Node* head = nullptr;
    for (int i = 0; i < n; i++) {
        head = insertTail(head, arr[i]);
    }
    return head;
}

void printList(Node* head) {
    Node* p = head;
    while (p) {
        cout << p->data << " -> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    Node* head = createList(arr, 5);
    printList(head);  // 1 -> 2 -> 3 -> 4 -> 5 -> NULL

    head = insertTail(head, 6);
    printList(head);  // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL

    return 0;
}
```

**易错点**
- 尾插需要遍历到末尾，时间复杂度 O(n)
- 维护尾指针可以优化到 O(1)
- 空链表时新节点直接成为 head

---

### 14. 链表删除 — 找前驱 + free / delete

**概念**
- 删除节点需要找到前驱节点
- 删除后要释放内存

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// 删除指定值的节点
Node* deleteNode(Node* head, int val) {
    // 处理头节点
    if (head && head->data == val) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return head;
    }

    // 查找要删除节点的前驱
    Node* prev = head;
    while (prev && prev->next && prev->next->data != val) {
        prev = prev->next;
    }

    if (prev && prev->next) {
        Node* temp = prev->next;
        prev->next = temp->next;
        delete temp;
    }

    return head;
}

// 删除所有匹配的节点
Node* deleteAll(Node* head, int val) {
    Node dummy{0, head};  // 虚拟头节点
    Node* prev = &dummy;
    Node* curr = head;

    while (curr) {
        if (curr->data == val) {
            Node* temp = curr;
            prev->next = curr->next;
            curr = curr->next;
            delete temp;
        } else {
            prev = curr;
            curr = curr->next;
        }
    }

    return dummy.next;
}

void printList(Node* head) {
    Node* p = head;
    while (p) {
        cout << p->data << " -> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

int main() {
    Node* head = new Node{1, new Node{2, new Node{3, new Node{2, nullptr}}}};
    printList(head);  // 1 -> 2 -> 3 -> 2 -> NULL

    head = deleteNode(head, 2);
    printList(head);  // 1 -> 3 -> 2 -> NULL（只删第一个2）

    head = deleteAll(head, 2);
    printList(head);  // 1 -> 3 -> NULL（删除所有2）

    return 0;
}
```

**删除过程**
```
删除节点2:
1. 找前驱: 1 -> [2] -> 3
2. 修改指针: 1 -> 3
3. 释放: delete [2]
```

**易错点**
- 删除头节点需要特殊处理
- 删除后要 `delete` 释放内存
- 使用虚拟头节点可以简化代码

---

### 15. 链表反转 — 三指针 / 头插法

**概念**
- 反转链表改变每个节点的 next 指向
- 常用三指针法或头插法

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// 方法1：三指针法
Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    Node* next = nullptr;

    while (curr) {
        next = curr->next;    // 保存下一个
        curr->next = prev;    // 反转指针
        prev = curr;          // prev 前进
        curr = next;          // curr 前进
    }

    return prev;  // prev 是新的 head
}

// 方法2：头插法
Node* reverseList2(Node* head) {
    Node* newHead = nullptr;
    Node* curr = head;

    while (curr) {
        Node* next = curr->next;
        curr->next = newHead;  // 头插
        newHead = curr;
        curr = next;
    }

    return newHead;
}

// 方法3：递归
Node* reverseList3(Node* head) {
    if (!head || !head->next) return head;
    Node* newHead = reverseList3(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}

void printList(Node* head) {
    Node* p = head;
    while (p) {
        cout << p->data << " -> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

int main() {
    Node* head = new Node{1, new Node{2, new Node{3, nullptr}}};
    printList(head);  // 1 -> 2 -> 3 -> NULL

    head = reverseList(head);
    printList(head);  // 3 -> 2 -> 1 -> NULL

    return 0;
}
```

**三指针法过程**
```
初始: prev=NULL, curr=1, next=2

第1步: 1->NULL, prev=1, curr=2
第2步: 2->1, prev=2, curr=3
第3步: 3->2, prev=3, curr=NULL

结果: 3->2->1->NULL
```

**易错点**
- 反转时必须先保存 `next`，否则会丢失后续节点
- 最终返回 `prev` 作为新 head
- 递归方法要注意设置 `head->next = nullptr`

---

### 16. 双向链表 — prev / next 两指针

**概念**
- 每个节点有 `prev` 和 `next` 两个指针
- 可以双向遍历

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct DNode {
    int data;
    DNode* prev;
    DNode* next;
};

// 头插
DNode* insertHead(DNode* head, int val) {
    DNode* p = new DNode{val, nullptr, head};
    if (head) head->prev = p;
    return p;
}

// 尾插
DNode* insertTail(DNode* head, int val) {
    DNode* newNode = new DNode{val, nullptr, nullptr};
    if (!head) return newNode;

    DNode* p = head;
    while (p->next) p = p->next;
    p->next = newNode;
    newNode->prev = p;
    return head;
}

// 删除节点
DNode* deleteNode(DNode* head, int val) {
    DNode* p = head;
    while (p) {
        if (p->data == val) {
            if (p->prev) p->prev->next = p->next;
            else head = p->next;  // 删除头节点

            if (p->next) p->next->prev = p->prev;

            delete p;
            return head;
        }
        p = p->next;
    }
    return head;
}

// 正向打印
void printForward(DNode* head) {
    DNode* p = head;
    while (p) {
        cout << p->data << " <-> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

// 反向打印
void printBackward(DNode* tail) {
    DNode* p = tail;
    while (p) {
        cout << p->data << " <-> ";
        p = p->prev;
    }
    cout << "NULL" << endl;
}

int main() {
    DNode* head = nullptr;
    head = insertTail(head, 1);
    head = insertTail(head, 2);
    head = insertTail(head, 3);
    printForward(head);  // 1 <-> 2 <-> 3 <-> NULL

    head = deleteNode(head, 2);
    printForward(head);  // 1 <-> 3 <-> NULL

    return 0;
}
```

**易错点**
- 双向链表删除时要修改两个方向的指针
- 注意处理头尾节点的特殊情况
- 空间换时间，每个节点多一个指针

---

### 17. 循环链表 — 尾指头

**概念**
- 尾节点的 next 指向头节点
- 形成一个环，可以循环遍历

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// 创建循环链表
Node* createCircularList(int n) {
    if (n <= 0) return nullptr;
    Node* head = new Node{1, nullptr};
    Node* tail = head;

    for (int i = 2; i <= n; i++) {
        tail->next = new Node{i, nullptr};
        tail = tail->next;
    }
    tail->next = head;  // 尾指向头

    return head;
}

// 打印循环链表（限制次数防止死循环）
void printCircular(Node* head, int maxPrint = 10) {
    if (!head) return;
    Node* p = head;
    int count = 0;
    do {
        cout << p->data << " -> ";
        p = p->next;
        count++;
    } while (p != head && count < maxPrint);
    cout << "(回到" << head->data << ")" << endl;
}

// 约瑟夫环问题
int josephus(int n, int k) {
    Node* head = createCircularList(n);
    Node* prev = nullptr;
    Node* curr = head;

    // 找到第 k-1 个节点
    for (int i = 1; i < k; i++) {
        prev = curr;
        curr = curr->next;
    }

    // 删除节点直到只剩一个
    while (curr->next != curr) {
        // 删除 curr
        prev->next = curr->next;
        delete curr;
        curr = prev->next;

        // 移动 k-1 步
        for (int i = 1; i < k; i++) {
            prev = curr;
            curr = curr->next;
        }
    }

    int result = curr->data;
    delete curr;
    return result;
}

int main() {
    Node* head = createCircularList(5);
    printCircular(head);  // 1 -> 2 -> 3 -> 4 -> 5 -> (回到1)

    cout << "约瑟夫环(5,3): " << josephus(5, 3) << endl;  // 4

    return 0;
}
```

**易错点**
- 循环链表遍历用 `do-while` 更方便
- 注意防止死循环（要判断是否回到起点）
- 约瑟夫环是经典应用

---

## 四、排序算法（18–21）

### 18. 选择排序 — O(n²) 稳定否视实现

**概念**
- 每次从未排序部分选最小（或最大）放到已排序末尾
- 时间复杂度 O(n²)，空间 O(1)

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 选择排序（升序）
void selectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) {
                minIdx = j;
            }
        }
        swap(a[i], a[minIdx]);
    }
}

void printArray(int a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;

    cout << "排序前: ";
    printArray(arr, n);

    selectionSort(arr, n);

    cout << "排序后: ";
    printArray(arr, n);  // 11 12 22 25 64

    return 0;
}
```

**排序过程**
```
[64, 25, 12, 22, 11]
 找到11，与64交换
[11, 25, 12, 22, 64]
 找到12，与25交换
[11, 12, 25, 22, 64]
 找到22，与25交换
[11, 12, 22, 25, 64]
 完成
```

**易错点**
- 选择排序不稳定（交换可能改变相等元素顺序）
- 比较次数固定为 n(n-1)/2
- 交换次数最多 n-1 次

---

### 19. 插入排序 — O(n²) 稳定

**概念**
- 将每个元素插入到已排序部分的正确位置
- 类似整理扑克牌
- 时间复杂度 O(n²)，空间 O(1)，稳定

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 插入排序（升序）
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}

void printArray(int a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = 5;

    cout << "排序前: ";
    printArray(arr, n);

    insertionSort(arr, n);

    cout << "排序后: ";
    printArray(arr, n);  // 5 6 11 12 13

    return 0;
}
```

**排序过程**
```
[12, 11, 13, 5, 6]
 11 插入到 12 前面
[11, 12, 13, 5, 6]
 13 已在正确位置
[11, 12, 13, 5, 6]
 5 插入到最前面
[5, 11, 12, 13, 6]
 6 插入到 5 后面
[5, 6, 11, 12, 13]
```

**易错点**
- 插入排序是**稳定**排序
- 最好情况 O(n)（已排序），最坏 O(n²)
- 适合小规模或基本有序的数据

---

### 20. 冒泡排序 — O(n²) 稳定

**概念**
- 相邻元素两两比较，将大的往后冒
- 时间复杂度 O(n²)，空间 O(1)，稳定

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 冒泡排序（升序）
void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // 优化：无交换说明已有序
    }
}

void printArray(int a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {5, 3, 8, 4, 2};
    int n = 5;

    cout << "排序前: ";
    printArray(arr, n);

    bubbleSort(arr, n);

    cout << "排序后: ";
    printArray(arr, n);  // 2 3 4 5 8

    return 0;
}
```

**排序过程**
```
[5, 3, 8, 4, 2]
第1轮: [3,5,4,2,8] (8冒到最后)
第2轮: [3,4,2,5,8] (5冒到倒数第二)
第3轮: [3,2,4,5,8] (4冒到倒数第三)
第4轮: [2,3,4,5,8] (完成)
```

**易错点**
- 冒泡排序是**稳定**排序
- `swapped` 优化可以提前结束
- 每轮确定一个最大值的位置

---

### 21. 快速排序 — O(n log n) 分治

**概念**
- 分治思想：选基准、分区、递归
- 平均 O(n log n)，最坏 O(n²)，不稳定

**代码模板**
```cpp
#include <iostream>
using namespace std;

// 分区函数
int partition(int a[], int l, int r) {
    int pivot = a[l];  // 选第一个元素为基准
    int i = l, j = r;

    while (i < j) {
        while (i < j && a[j] >= pivot) j--;
        a[i] = a[j];
        while (i < j && a[i] <= pivot) i++;
        a[j] = a[i];
    }
    a[i] = pivot;
    return i;
}

// 快速排序
void quickSort(int a[], int l, int r) {
    if (l >= r) return;
    int pos = partition(a, l, r);
    quickSort(a, l, pos - 1);
    quickSort(a, pos + 1, r);
}

void printArray(int a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = 6;

    cout << "排序前: ";
    printArray(arr, n);

    quickSort(arr, 0, n - 1);

    cout << "排序后: ";
    printArray(arr, n);  // 1 5 7 8 9 10

    return 0;
}
```

**分区过程**
```
[10, 7, 8, 9, 1, 5]  pivot=10
j从右找<10: [5, 7, 8, 9, 1, 5] -> [5, 7, 8, 9, 1, 10]
i从左找>10: 无
分区结果: [5, 7, 8, 9, 1, 10] (pivot在位置5)

递归左半: [5, 7, 8, 9, 1]
递归右半: 无
```

**易错点**
- 快排不稳定（分区改变相等元素顺序）
- 最坏情况（已排序）退化为 O(n²)
- 可以用随机选基准优化

---

## 五、时间复杂度（22）

### 22. 时间复杂度 — O(1)/O(log n)/O(n)/O(n log n)/O(n²)

**概念**
- 描述算法执行时间随输入规模增长的趋势
- 忽略常数和低阶项

**常见复杂度**
| 复杂度 | 名称 | 示例 |
|:---:|:---|:---|
| O(1) | 常数 | 数组下标访问 |
| O(log n) | 对数 | 二分查找 |
| O(n) | 线性 | 遍历数组 |
| O(n log n) | 线性对数 | 归并排序 |
| O(n²) | 平方 | 冒泡排序 |
| O(2^n) | 指数 | 暴力枚举子集 |

**代码模板**
```cpp
#include <iostream>
using namespace std;

// O(1) - 常数
int getFirst(int a[]) {
    return a[0];  // 一次操作
}

// O(log n) - 对数
int binarySearch(int a[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] == target) return mid;
        else if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// O(n) - 线性
int linearSearch(int a[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (a[i] == target) return i;
    return -1;
}

// O(n log n) - 线性对数
// 快速排序、归并排序

// O(n²) - 平方
void bubbleSort(int a[], int n) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j+1]) swap(a[j], a[j+1]);
}

int main() {
    // 复杂度比较
    int n = 1000000;
    cout << "n = " << n << endl;
    cout << "O(1): 1 次操作" << endl;
    cout << "O(log n): ~20 次操作" << endl;
    cout << "O(n): " << n << " 次操作" << endl;
    cout << "O(n log n): ~20000000 次操作" << endl;
    cout << "O(n²): " << (long long)n*n << " 次操作（太慢！）" << endl;

    return 0;
}
```

**复杂度分析技巧**
```cpp
// 单循环 → O(n)
for (int i = 0; i < n; i++) { ... }

// 嵌套循环 → O(n²)
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { ... }

// 二分 → O(log n)
while (lo < hi) {
    int mid = (lo + hi) / 2;
    ...
}

// 递归 → 看递归树深度和每层工作量
int fib(int n) { return n < 2 ? n : fib(n-1)+fib(n-2); }
// O(2^n) 指数级！
```

**易错点**
- O(n²) 不一定是恰好 n² 次，是"量级"
- 常数因子在 O 记法中忽略
- 最坏、平均、最好复杂度可能不同

---

## 附录：GESP L4 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 指针基础 | 取地址&、解引用* |
| 02 | 指针运算 | p+1跨sizeof字节 |
| 03 | 指针与数组 | a[i] ⇔ *(a+i) |
| 04 | 指针数组 | int* p[10] |
| 05 | 数组指针 | int (*p)[10] |
| 06 | 动态内存 new | 申请堆内存 |
| 07 | 动态内存 delete | 释放内存 |
| 08 | 引用 reference | 别名、必须初始化 |
| 09 | 引用 vs 指针 | 安全 vs 灵活 |
| 10 | const 修饰 | 指针/常量保护 |
| 11 | 链表节点 | data + next |
| 12 | 链表头插 | O(1)插入 |
| 13 | 链表尾插 | 需遍历或tail |
| 14 | 链表删除 | 找前驱+delete |
| 15 | 链表反转 | 三指针/头插/递归 |
| 16 | 双向链表 | prev + next |
| 17 | 循环链表 | 尾指头 |
| 18 | 选择排序 | O(n²)不稳定 |
| 19 | 插入排序 | O(n²)稳定 |
| 20 | 冒泡排序 | O(n²)稳定 |
| 21 | 快速排序 | O(n log n)分治 |
| 22 | 时间复杂度 | 增长趋势分析 |

---

> ⚠️ 注意：原网站（gesp.scirco.cn）的代码模板存在严重错位问题（代码与标题不匹配）。本文件已修正为每个考点对应的正确代码模板。
