# GESP C++ 五级（L5 中级）知识点整理

> 共 25 个考点，涵盖栈、队列、二叉树、BST、二分、DP、BFS/DFS、图存储

---

## 一、栈（01–02）

### 01. 顺序栈 — vector 模拟栈 / 固定数组

**概念**
- 栈是后进先出（LIFO）的数据结构
- 顺序栈用数组或 vector 实现

**代码模板**
```cpp
#include <iostream>
#include <vector>
using namespace std;

// 方式1：用 vector 模拟栈
vector<int> st;
st.push_back(x);    // push
st.pop_back();      // pop
int t = st.back();  // top
bool empty = st.empty();

// 方式2：用数组模拟栈
int stack[1000], top = -1;
void push(int x) { stack[++top] = x; }
void pop() { top--; }
int top_val() { return stack[top]; }
bool empty() { return top == -1; }

// 应用：括号匹配
bool isValid(string s) {
    vector<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push_back(c);
        } else {
            if (st.empty()) return false;
            char t = st.back(); st.pop_back();
            if (c == ')' && t != '(') return false;
            if (c == ']' && t != '[') return false;
            if (c == '}' && t != '{') return false;
        }
    }
    return st.empty();
}

int main() {
    cout << isValid("()[]{}") << endl;  // 1
    cout << isValid("(]") << endl;      // 0
    return 0;
}
```

**易错点**
- `top()` 返回栈顶但不弹出，`pop()` 弹出但不返回
- 空栈不能调用 `top()` 或 `pop()`
- vector 模拟栈更灵活，数组模拟栈更高效

---

### 02. 链式栈 — 链表头插 / 头删

**概念**
- 用链表实现栈，头插即 push，头删即 pop
- 无需预分配空间

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

struct LinkedStack {
    Node* top = nullptr;

    void push(int x) {
        Node* p = new Node{x, top};
        top = p;
    }

    void pop() {
        if (top) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }

    int topVal() {
        return top ? top->data : -1;
    }

    bool empty() {
        return top == nullptr;
    }

    // 析构时释放所有节点
    ~LinkedStack() {
        while (top) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }
};

int main() {
    LinkedStack st;
    st.push(10);
    st.push(20);
    st.push(30);

    while (!st.empty()) {
        cout << st.topVal() << " ";  // 30 20 10
        st.pop();
    }
    cout << endl;

    return 0;
}
```

**易错点**
- 链式栈无需考虑容量限制
- 删除节点后要 `delete` 释放内存
- 析构函数要释放所有剩余节点

---

## 二、队列（03–05）

### 03. 顺序队列 — 循环队列 / 假溢出

**概念**
- 用数组实现队列，front 和 rear 指针
- 循环队列解决假溢出问题

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct CircularQueue {
    int data[100];
    int front = 0, rear = 0;
    int capacity;

    CircularQueue(int cap) : capacity(cap) {}

    bool empty() { return front == rear; }

    bool full() { return (rear + 1) % capacity == front; }

    void push(int x) {
        if (full()) { cout << "队列满" << endl; return; }
        data[rear] = x;
        rear = (rear + 1) % capacity;
    }

    void pop() {
        if (empty()) { cout << "队列空" << endl; return; }
        front = (front + 1) % capacity;
    }

    int frontVal() { return data[front]; }

    int size() { return (rear - front + capacity) % capacity; }
};

int main() {
    CircularQueue q(5);  // 实际只能存4个元素
    q.push(10);
    q.push(20);
    q.push(30);

    while (!q.empty()) {
        cout << q.frontVal() << " ";  // 10 20 30
        q.pop();
    }
    cout << endl;

    return 0;
}
```

**循环队列要点**
```
判断空: front == rear
判断满: (rear + 1) % capacity == front
元素数: (rear - front + capacity) % capacity
```

**易错点**
- 循环队列浪费一个位置区分空和满
- 下标移动用取模运算
- `rear` 指向下一个可写位置

---

### 04. 链式队列 — front / rear 两指针

**概念**
- 用链表实现队列
- front 指向队首，rear 指向队尾

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

struct LinkedQueue {
    Node* front = nullptr;
    Node* rear = nullptr;

    void push(int x) {
        Node* p = new Node{x, nullptr};
        if (rear) rear->next = p;
        else front = p;  // 空队列
        rear = p;
    }

    void pop() {
        if (!front) return;
        Node* temp = front;
        front = front->next;
        if (!front) rear = nullptr;  // 队列变空
        delete temp;
    }

    int frontVal() { return front ? front->data : -1; }
    bool empty() { return front == nullptr; }

    ~LinkedQueue() {
        while (front) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
    }
};

int main() {
    LinkedQueue q;
    q.push(1);
    q.push(2);
    q.push(3);

    while (!q.empty()) {
        cout << q.frontVal() << " ";  // 1 2 3
        q.pop();
    }
    cout << endl;

    return 0;
}
```

**易错点**
- 入队更新 `rear`，出队更新 `front`
- 队列变空时 `rear` 也要置空
- 空队列判断 `front == nullptr`

---

### 05. 双端队列 deque — STL 双端操作

**概念**
- `deque` 支持两端 O(1) 插入和删除
- STL 的 `deque` 是双端队列的实现

**代码模板**
```cpp
#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;

    // 双端操作
    dq.push_back(1);     // 尾部添加
    dq.push_front(0);    // 头部添加
    dq.push_back(2);     // 1 -> 2
    dq.push_front(-1);   // -1 -> 0 -> 1 -> 2

    cout << dq.front() << endl;  // -1
    cout << dq.back() << endl;   // 2

    dq.pop_front();      // 头部删除
    dq.pop_back();       // 尾部删除

    // 随机访问
    cout << dq[0] << endl;

    // 遍历
    for (int x : dq) cout << x << " ";
    cout << endl;

    // 用 deque 实现滑动窗口最大值
    deque<int> window;
    int arr[] = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;  // 窗口大小

    for (int i = 0; i < 8; i++) {
        // 移除超出窗口的元素
        while (!window.empty() && window.front() <= i - k)
            window.pop_front();
        // 维护单调递减
        while (!window.empty() && arr[window.back()] <= arr[i])
            window.pop_back();
        window.push_back(i);
        if (i >= k - 1) cout << arr[window.front()] << " ";
    }
    // 输出: 3 3 5 5 6 7

    return 0;
}
```

**易错点**
- `deque` 支持随机访问，但效率不如 `vector`
- `deque` 迭代器在插入后可能失效
- 两端都能操作，比 `vector` 和 `stack` 灵活

---

## 三、二叉树（06–14）

### 06. 二叉树节点 — data / left / right

**概念**
- 二叉树由节点组成，每个节点最多有两个子节点

**代码模板**
```cpp
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 创建示例二叉树
//       1
//      / \
//     2   3
//    / \
//   4   5
TreeNode* createTree() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    return root;
}

// 计算节点数
int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

// 计算树的高度
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}

int main() {
    TreeNode* root = createTree();
    cout << "节点数: " << countNodes(root) << endl;  // 5
    cout << "高度: " << height(root) << endl;        // 3
    return 0;
}
```

---

### 07. 前序遍历 — 根 左 右 (递归)

**概念**
- 先访问根节点，再递归左子树，最后递归右子树

**代码模板**
```cpp
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";  // 访问根
    preorder(root->left);      // 左子树
    preorder(root->right);     // 右子树
}
// 输出: 1 2 4 5 3
```

---

### 08. 中序遍历 — 左 根 右

**概念**
- 先递归左子树，再访问根节点，最后递归右子树
- BST 的中序遍历是有序的

**代码模板**
```cpp
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);       // 左子树
    cout << root->val << " ";  // 访问根
    inorder(root->right);      // 右子树
}
// 输出: 4 2 5 1 3
```

---

### 09. 后序遍历 — 左 右 根

**概念**
- 先递归左子树，再递归右子树，最后访问根节点
- 常用于计算目录大小等

**代码模板**
```cpp
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);     // 左子树
    postorder(root->right);    // 右子树
    cout << root->val << " ";  // 访问根
}
// 输出: 4 5 2 3 1
```

---

### 10. 层序遍历 — BFS 队列

**概念**
- 按层从左到右遍历，使用队列实现

**代码模板**
```cpp
#include <queue>
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* u = q.front(); q.pop();
        cout << u->val << " ";
        if (u->left) q.push(u->left);
        if (u->right) q.push(u->right);
    }
}
// 输出: 1 2 3 4 5

// 按层分组输出
vector<vector<int>> levelOrderGrouped(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* u = q.front(); q.pop();
            level.push_back(u->val);
            if (u->left) q.push(u->left);
            if (u->right) q.push(u->right);
        }
        result.push_back(level);
    }
    return result;
}
```

---

### 11. 二叉搜索树 BST — 左 < 根 < 右

**概念**
- 左子树所有节点 < 根 < 右子树所有节点
- 中序遍历结果是有序的

---

### 12. BST 插入 — O(h) 递降到叶

**代码模板**
```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else if (val > root->val)
        root->right = insert(root->right, val);
    return root;
}
```

---

### 13. BST 查找 — O(h)

**代码模板**
```cpp
TreeNode* search(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}
```

---

### 14. BST 删除 — 三情况：无子 / 单子 / 双子

**代码模板**
```cpp
TreeNode* deleteNode(TreeNode* root, int val) {
    if (!root) return nullptr;
    if (val < root->val) {
        root->left = deleteNode(root->left, val);
    } else if (val > root->val) {
        root->right = deleteNode(root->right, val);
    } else {
        // 找到要删除的节点
        if (!root->left) return root->right;      // 无左子或无子
        if (!root->right) return root->left;       // 无右子
        // 有两个子节点：找中序后继
        TreeNode* successor = root->right;
        while (successor->left) successor = successor->left;
        root->val = successor->val;
        root->right = deleteNode(root->right, successor->val);
    }
    return root;
}
```

**删除三种情况**
```
1. 无子节点：直接删除
2. 一个子节点：用子节点替代
3. 两个子节点：用中序后继替代，再删后继
```

---

## 四、二分查找（15–18）

### 15. 二分查找 — O(log n) 前提有序

**代码模板**
```cpp
int binarySearch(int a[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (a[m] == target) return m;
        else if (a[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
```

---

### 16. 二分边界 — 左闭右闭 / 左闭右开

**左闭右闭 `[l, r]`**
```cpp
while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] < target) l = m + 1;
    else r = m - 1;
}
// l 是第一个 >= target 的位置
```

**左闭右开 `[l, r)`**
```cpp
while (l < r) {
    int m = l + (r - l) / 2;
    if (a[m] < target) l = m + 1;
    else r = m;
}
// l 是第一个 >= target 的位置
```

---

### 17. lower_bound — 下界 ≥ x

**代码模板**
```cpp
int lower_bound(int a[], int n, int x) {
    int l = 0, r = n;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (a[m] < x) l = m + 1;
        else r = m;
    }
    return l;
}
```

---

### 18. upper_bound — 上界 > x

**代码模板**
```cpp
int upper_bound(int a[], int n, int x) {
    int l = 0, r = n;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (a[m] <= x) l = m + 1;
        else r = m;
    }
    return l;
}
```

**lower_bound vs upper_bound**
| 函数 | 条件 | 返回 |
|:---|:---|:---|
| `lower_bound` | `a[m] < x` | 第一个 `>= x` |
| `upper_bound` | `a[m] <= x` | 第一个 `> x` |
| 计数 | `upper - lower` | `x` 出现次数 |

---

## 五、动态规划（19–22）

### 19. 动态规划思想 — 状态 / 转移 / 边界

**概念**
- **状态**：定义子问题
- **转移**：状态之间的递推关系
- **边界**：初始条件

**代码模板**
```cpp
// 斐波那契数列
int fib(int n) {
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;  // 边界
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];  // 转移
    return dp[n];
}

// 爬楼梯（每次1或2步）
int climbStairs(int n) {
    vector<int> dp(n + 1);
    dp[0] = 1; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
```

**DP 解题步骤**
```
1. 定义状态：dp[i] 表示什么？
2. 写出转移方程：dp[i] 如何由子问题得到？
3. 确定边界：dp[0], dp[1] 等初始值
4. 确定遍历顺序：确保计算 dp[i] 时子问题已解决
```

---

### 20. 记忆化搜索 — 递归 + 数组缓存

**代码模板**
```cpp
#include <iostream>
#include <cstring>
using namespace std;

long long f[100];
fill(f, f+100, -1);

long long F(int n) {
    if (n < 2) return n;
    if (f[n] != -1) return f[n];  // 已计算过
    return f[n] = F(n-1) + F(n-2);  // 缓存结果
}

int main() {
    cout << F(50) << endl;  // 12586269025
    return 0;
}
```

---

### 21. 0-1 背包雏形 — 每件最多选一次

**代码模板**
```cpp
// dp[j] = 容量为j时的最大价值
int dp[N] = {0};
for (int i = 1; i <= n; i++)
    for (int j = V; j >= w[i]; j--)  // 逆序！
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
```

---

### 22. 完全背包 — 每件可选无限次

**代码模板**
```cpp
int dp[N] = {0};
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= V; j++)  // 正序！
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
```

**0-1背包 vs 完全背包**
| 背包类型 | 遍历顺序 | 物品使用 |
|:---:|:---:|:---:|
| 0-1背包 | 逆序 | 最多1次 |
| 完全背包 | 正序 | 无限次 |

---

## 六、图遍历与存储（23–25）

### 23. 广度优先 BFS — 队列 + 层次

**代码模板**
```cpp
#include <queue>
#include <vector>
using namespace std;

// 图的 BFS
vector<int> g[N];  // 邻接表
bool vis[N];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : g[u]) {
            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }
}

// 最短路径（无权图）
int dist[N];
void bfsShortest(int start) {
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}
```

---

### 24. 深度优先 DFS — 栈 / 递归

**代码模板**
```cpp
#include <vector>
using namespace std;

vector<int> g[N];
bool vis[N];

// 递归实现
void dfs(int u) {
    vis[u] = true;
    cout << u << " ";
    for (int v : g[u]) {
        if (!vis[v]) dfs(v);
    }
}

// 栈实现
void dfsStack(int start) {
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (vis[u]) continue;
        vis[u] = true;
        cout << u << " ";
        for (int v : g[u]) {
            if (!vis[v]) st.push(v);
        }
    }
}
```

**BFS vs DFS**
| 特性 | BFS | DFS |
|:---|:---|:---|
| 数据结构 | 队列 | 栈/递归 |
| 遍历顺序 | 层次 | 深度优先 |
| 最短路径 | ✓（无权图） | ✗ |
| 空间 | O(宽度) | O(深度) |

---

### 25. 邻接表 / 邻接矩阵 — 图的两大存储

**代码模板**
```cpp
// 邻接矩阵
int g[N][N];
g[u][v] = w;  // 添加边

// 邻接表（推荐）
vector<int> g[N];
g[u].push_back(v);  // 添加边
for (int v : g[u]) { /* 遍历邻居 */ }

// 邻接表（带权值）
vector<pair<int,int>> g[N];
g[u].push_back({v, w});
for (auto [v, w] : g[u]) { /* v是邻居, w是权值 */ }
```

**对比**
| 特性 | 邻接矩阵 | 邻接表 |
|:---|:---|:---|
| 空间 | O(V²) | O(V+E) |
| 判断边存在 | O(1) | O(度) |
| 遍历邻居 | O(V) | O(度) |
| 适用场景 | 稠密图 | 稀疏图 |

---

## 附录：GESP L5 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 顺序栈 | vector/数组模拟 |
| 02 | 链式栈 | 链表头插/头删 |
| 03 | 顺序队列 | 循环队列/假溢出 |
| 04 | 链式队列 | front/rear指针 |
| 05 | 双端队列 deque | STL双端操作 |
| 06 | 二叉树节点 | data/left/right |
| 07 | 前序遍历 | 根左右 |
| 08 | 中序遍历 | 左根右 |
| 09 | 后序遍历 | 左右根 |
| 10 | 层序遍历 | BFS队列 |
| 11 | 二叉搜索树 BST | 左<根<右 |
| 12 | BST 插入 | O(h)递降到叶 |
| 13 | BST 查找 | O(h) |
| 14 | BST 删除 | 无子/单子/双子 |
| 15 | 二分查找 | O(log n)有序 |
| 16 | 二分边界 | 左闭右闭/左闭右开 |
| 17 | lower_bound | 下界≥x |
| 18 | upper_bound | 上界>x |
| 19 | 动态规划思想 | 状态/转移/边界 |
| 20 | 记忆化搜索 | 递归+数组缓存 |
| 21 | 0-1 背包雏形 | 每件最多选一次 |
| 22 | 完全背包 | 每件可选无限次 |
| 23 | 广度优先 BFS | 队列+层次 |
| 24 | 深度优先 DFS | 栈/递归 |
| 25 | 邻接表/邻接矩阵 | 图的存储 |

---

