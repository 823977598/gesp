# GESP C++ 六级（L6 高级）知识点整理

> 来源：https://gesp.scirco.cn/L6/topics.html
> 共 34 个考点，按类别分组整理

---

## 一、STL 容器与数据结构（01–09）

### 01. STL vector — 动态数组、O(1) 随机访问

**概念**
- 动态数组，支持随机访问 `v[i]`，尾部 `push_back` / `pop_back` 均摊 O(1)
- 中间插入/删除 O(n)，迭代器可能失效

**代码模板**
```cpp
vector<int> v(10);           // 创建10个元素的vector
v.push_back(42);             // 尾部添加
v.pop_back();                // 尾部删除
v.size();                    // 元素个数
v.empty();                   // 是否为空
sort(v.begin(), v.end());    // 排序
v.erase(unique(v.begin(), v.end()), v.end()); // 去重（先排序）
```

**易错点**
- `push_back` 后迭代器可能失效，不要在遍历中 `push_back`
- `vector<bool>` 是特化版本，不完全等同于其他 vector

---

### 02. STL deque — 双端队列

**概念**
- 双端队列，头尾插入/删除均 O(1)，支持随机访问
- 内部由多块连续内存组成

**代码模板**
```cpp
deque<int> dq;
dq.push_front(1);            // 头部添加
dq.push_back(2);             // 尾部添加
dq.pop_front();              // 头部删除
dq.pop_back();               // 尾部删除
dq.front();                  // 首元素
dq.back();                   // 尾元素
dq[i];                       // 随机访问
```

**易错点**
- 迭代器在头尾操作后可能失效
- `deque` 的内存布局与 `vector` 不同，中间插入仍为 O(n)

---

### 03. STL stack / queue — 适配器

**概念**
- `stack`：后进先出（LIFO），只能访问栈顶
- `queue`：先进先出（FIFO），只能访问队首和队尾
- 两者都是容器适配器，默认底层容器分别为 `deque`

**代码模板**
```cpp
// stack
stack<int> st;
st.push(1); st.push(2);
st.top();                    // 返回栈顶（不弹出）
st.pop();                    // 弹出栈顶
st.empty(); st.size();

// queue
queue<int> q;
q.push(1); q.push(2);
q.front();                   // 返回队首（不弹出）
q.pop();                     // 弹出队首
q.back();                    // 返回队尾
```

**易错点**
- `stack` 没有 `front()`，`queue` 没有 `top()`
- 遍历时必须用临时变量保存后弹出

---

### 04. STL priority_queue — 堆、默认大根堆

**概念**
- 优先队列，底层为二叉堆（大根堆）
- 插入/删除 O(log n)，取最大值 O(1)

**代码模板**
```cpp
// 大根堆（默认）
priority_queue<int> pq;
pq.push(3); pq.push(1); pq.push(5);
pq.top();                    // 返回最大值 5
pq.pop();                    // 删除最大值

// 小根堆
priority_queue<int, vector<int>, greater<int>> min_pq;

// 自定义排序（大根堆存 pair）
priority_queue<pair<int,int>> pq; // 按 first 降序
```

**易错点**
- 默认是大根堆，不是小根堆
- 小根堆写法 `greater<int>` 容易写错
- `pair` 比较先比 `first` 再比 `second`

---

### 05. STL set / multiset — 红黑树、有序

**概念**
- 有序集合，底层红黑树，插入/查找/删除均 O(log n)
- `set` 元素唯一，`multiset` 允许重复
- 支持 `lower_bound`、`upper_bound` 等有序操作

**代码模板**
```cpp
set<int> s;
s.insert(3); s.insert(1); s.insert(5);
s.count(3);                  // 存在返回1，否则0
s.find(3);                   // 返回迭代器
s.erase(3);                  // 按值删除
s.lower_bound(3);            // >=3 的第一个位置
s.upper_bound(3);            // >3 的第一个位置

// multiset 可以有重复元素
multiset<int> ms;
ms.erase(ms.lower_bound(2), ms.upper_bound(2)); // 删除所有2
```

**易错点**
- `set::count` 只返回 0 或 1，不能用于计数
- `multiset::erase(val)` 会删除所有等于 val 的元素
- 用 `erase(find(val))` 只删除一个

---

### 06. STL map / multimap — 键值对、有序

**概念**
- 有序映射，键唯一（`multimap` 允许重复）
- 底层红黑树，查找/插入 O(log n)
- 键自动排序

**代码模板**
```cpp
map<string, int> mp;
mp["hello"] = 1;             // 插入/修改
mp.count("hello");           // 判断键是否存在
mp.find("hello");            // 查找
mp.erase("hello");           // 按键删除

// 遍历（按key升序）
for (auto& [k, v] : mp) {
    cout << k << ": " << v << endl;
}

// multimap
multimap<int, string> mm;
mm.insert({1, "a"});
mm.insert({1, "b"});
auto range = mm.equal_range(1); // 返回所有key=1的范围
```

**易错点**
- `mp[key]` 会自动插入默认值，不要用 `[]` 判断是否存在
- 遍历 map 的顺序是按 key 排序的，不是插入顺序

---

### 07. STL unordered_set / unordered_map — 哈希表、O(1) 期望

**概念**
- 基于哈希表的无序容器，查找/插入期望 O(1)
- 不保证元素顺序
- 最坏情况 O(n)（哈希冲突）

**代码模板**
```cpp
unordered_set<int> us;
us.insert(3);
us.count(3);                 // 存在返回1

unordered_map<string, int> um;
um["key"] = 1;
um.count("key");
um.find("key");

// 自定义哈希函数（解决冲突）
struct Hash {
    size_t operator()(const pair<int,int>& p) const {
        return p.first * 31 + p.second;
    }
};
unordered_set<pair<int,int>, Hash> us2;
```

**易错点**
- 迭代器在 `insert` 后可能失效
- 哈希冲突时性能退化为 O(n)
- 不能用于需要有序遍历的场景

---

### 08. STL pair / tuple — 元组、make_pair

**概念**
- `pair<T1,T2>`：二元组，`first` 和 `second`
- `tuple<T1,T2,...>`：多元组，支持任意类型
- 常用于排序、哈希容器的键

**代码模板**
```cpp
// pair
pair<int, string> p = {1, "hello"};
p.first; p.second;
make_pair(1, "hello");

// tuple
tuple<int, string, double> t = {1, "hello", 3.14};
get<0>(t);                   // 按索引访问
auto [a, b, c] = t;          // C++17 结构化绑定

// pair 默认按 first 升序，再按 second 升序
vector<pair<int,int>> v = {{3,1},{1,2},{3,0}};
sort(v.begin(), v.end());    // 结果：{1,2},{3,0},{3,1}
```

**易错点**
- `pair` 比较规则：先比 `first`，再比 `second`
- `tuple` 的 `get<>` 必须用编译期常量
- 结构化绑定需要 C++17

---

### 09. STL bitset — 位集合、内存紧凑

**概念**
- 固定位数的位集合，每位用 1 bit 存储
- 支持位运算（&, |, ^, ~, <<, >>）
- 常用于状态压缩、质数筛

**代码模板**
```cpp
bitset<1000> bs;             // 1000位的位集合
bs.set();                    // 全部置1
bs.reset();                  // 全部置0
bs.flip();                   // 全部取反
bs.set(5);                   // 第5位置1
bs.reset(3);                 // 第3位置0
bs[7];                       // 访问第7位（0/1）
bs.count();                  // 1的个数
bs.test(5);                  // 第5位是否为1

// 位运算
bitset<8> a("1010"), b("1100");
cout << (a & b) << endl;    // 1000
cout << (a | b) << endl;    // 1110
```

**易错点**
- `bitset` 的下标从 0 开始
- `count()` 返回 1 的个数，不是总位数
- 不能直接用 `cout << bs` 输出（需 `to_string()` 或 `to_ulong()`）

---

## 二、STL 算法（10–13）

### 10. sort / stable_sort — IntroSort / 归并

**概念**
- `sort`：基于 IntroSort（快排+堆排+插入排序），O(n log n) 平均
- `stable_sort`：稳定排序，相等元素保持原有相对顺序，O(n log n)
- 可通过自定义比较函数改变排序规则

**代码模板**
```cpp
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());                    // 升序
sort(v.begin(), v.end(), greater<int>());    // 降序

// 自定义比较函数
struct Student {
    string name; int score;
};
bool cmp(const Student& a, const Student& b) {
    return a.score > b.score;  // 按分数降序
}
sort(students.begin(), students.end(), cmp);

// lambda 表达式
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
```

**易错点**
- `sort` 不稳定，相等元素顺序可能改变
- 需要稳定排序时用 `stable_sort`
- 比较函数应返回 `bool`，不要返回 `int`

---

### 11. lower_bound / upper_bound — 有序区间二分

**概念**
- `lower_bound(first, last, val)`：返回第一个 `>= val` 的迭代器
- `upper_bound(first, last, val)`：返回第一个 `> val` 的迭代器
- 要求容器有序，复杂度 O(log n)

**代码模板**
```cpp
vector<int> v = {1, 2, 3, 4, 5};
auto it1 = lower_bound(v.begin(), v.end(), 3); // 指向3
auto it2 = upper_bound(v.begin(), v.end(), 3); // 指向4
int idx = it1 - v.begin();                     // 下标

// 计数：val 出现的次数
int cnt = upper_bound(v.begin(), v.end(), val)
        - lower_bound(v.begin(), v.end(), val);

// 有序数组中找第一个 >= val 的位置
int pos = lower_bound(v.begin(), v.end(), val) - v.begin();
```

**易错点**
- `lower_bound` 返回 `>=` 的位置，`upper_bound` 返回 `>` 的位置
- 要求序列有序，否则结果未定义
- 返回的是迭代器，需 `- begin()` 转下标

---

### 12. unique — 相邻去重、需先 sort

**概念**
- `unique` 移除相邻重复元素，返回去重后的尾迭代器
- 必须先 `sort` 才能实现"去重"效果
- 不真正删除元素，需配合 `erase`

**代码模板**
```cpp
vector<int> v = {3, 1, 3, 2, 1};
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3}

// 字符串去重
string s = "aabbc";
s.erase(unique(s.begin(), s.end()), s.end());
// s = "abc"
```

**易错点**
- 不先排序的话只去除相邻重复
- `unique` 返回的迭代器之后的元素未定义，必须 `erase`
- 返回值是迭代器，不是新长度

---

### 13. next_permutation — 字典序下一排列

**概念**
- 生成当前排列的下一个字典序排列
- 返回 `true` 表示成功，`false` 表示已是最后排列
- 可用 `prev_permutation` 生成上一个排列

**代码模板**
```cpp
vector<int> v = {1, 2, 3};
do {
    for (int x : v) cout << x << " ";
    cout << endl;
} while (next_permutation(v.begin(), v.end()));
// 输出所有6种排列

// 求全排列总数
sort(v.begin(), v.end());
int cnt = 0;
do { cnt++; } while (next_permutation(v.begin(), v.end()));
// cnt = 6
```

**易错点**
- 必须从已排序状态开始才能生成所有排列
- `next_permutation` 是原地修改，不是返回新排列
- 求第 k 个排列可以用康托展开

---

## 三、复杂度分析（14）

### 14. 复杂度分析 — 最坏 / 均摊 / 期望

**概念**
- **最坏复杂度**：所有输入中最慢的情况
- **均摊复杂度**：一系列操作的平均耗时（如 vector 的 push_back 均摊 O(1)）
- **期望复杂度**：随机算法的平均表现（如哈希表查找期望 O(1)）

**常见复杂度排序**
```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ)
```

**易错点**
- 均摊 O(1) 不代表每次都是 O(1)
- 期望 O(1) 不保证最坏 O(1)
- 分析时注意嵌套循环的复杂度是乘积关系

---

## 四、前缀和与差分（15–16）

### 15. 前缀和 — O(1) 区间求和

**概念**
- 预处理前缀和数组，支持 O(1) 查询任意区间和
- 二维前缀和可处理矩阵区间和

**代码模板**
```cpp
// 一维前缀和
int s[N];
for (int i = 1; i <= n; i++) s[i] = s[i-1] + a[i];
// 查询 [l, r] 的和
int sum = s[r] - s[l-1];

// 二维前缀和
int s[N][N];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];
// 查询左上 (x1,y1) 到右下 (x2,y2) 的和
int sum = s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1];
```

**易错点**
- 下标从 1 开始方便处理边界
- 二维前缀和的容斥原理：加、减、加
- 注意 int 溢出，数据大时用 `long long`

---

### 16. 差分数组 — O(1) 区间修改

**概念**
- 差分数组是前缀和的逆操作
- 支持 O(1) 区间加操作，最终 O(n) 还原原数组
- 常与前缀和结合使用

**代码模板**
```cpp
int diff[N] = {0};
// 区间 [l, r] 加 x
diff[l] += x;
diff[r+1] -= x;
// 还原原数组
for (int i = 1; i <= n; i++)
    a[i] = a[i-1] + diff[i];

// 二维差分（矩阵区间加）
void add(int x1, int y1, int x2, int y2, int v) {
    diff[x1][y1] += v;
    diff[x2+1][y1] -= v;
    diff[x1][y2+1] -= v;
    diff[x2+1][y2+1] += v;
}
```

**易错点**
- `diff[r+1]` 要确保下标不越界
- 多次区间操作后，最终结果需一次前缀和还原
- 二维差分的四个角操作容易搞错正负号

---

## 五、二分与离散化（17–18）

### 17. 二分答案 — 最大化最小 / 最小化最大

**概念**
- 将"求最优值"转化为"判定可行性"，再二分搜索
- 适用于答案具有单调性的问题

**代码模板**
```cpp
// 最大化最小
int lo = 0, hi = 1e9;
while (lo < hi) {
    int m = lo + (hi - lo + 1) / 2;  // 注意 +1 防止死循环
    if (ok(m)) lo = m;               // m 可行，答案在 [m, hi]
    else hi = m - 1;                 // m 不可行，答案在 [lo, m-1]
}

// 最小化最大
int lo = 0, hi = 1e9;
while (lo < hi) {
    int m = lo + (hi - lo) / 2;      // 不加1
    if (ok(m)) hi = m;               // m 可行，答案在 [lo, m]
    else lo = m + 1;                 // m 不可行，答案在 [m+1, hi]
}
```

**易错点**
- `lo + (hi - lo + 1) / 2` vs `lo + (hi - lo) / 2` 选择取决于搜索方向
- `ok()` 函数的单调性判断要准确
- 注意边界条件，避免死循环

---

### 18. 离散化 — 压缩到大坐标

**概念**
- 将大范围值映射到小范围连续编号
- 保持相对大小关系不变
- 常用于坐标范围大但实际点数少的场景

**代码模板**
```cpp
vector<int> v = {100, 50, 200, 50, 1000000};
vector<int> sorted_v = v;
sort(sorted_v.begin(), sorted_v.end());
sorted_v.erase(unique(sorted_v.begin(), sorted_v.end()), sorted_v.end());

// 获取离散化后的值
int discretize(int x) {
    return lower_bound(sorted_v.begin(), sorted_v.end(), x) - sorted_v.begin();
}

// v 中每个元素映射到 0, 1, 2, 3, 4
for (int& x : v) x = discretize(x);
// v = {0, 1, 2, 1, 3}
```

**易错点**
- 离散化后值从 0 或 1 开始，注意统一
- `lower_bound` 返回的是下标，即离散化后的值
- 如果需要值从 1 开始，可以 `+ 1`

---

## 六、动态规划（19–21）

### 19. LIS — 最长上升子序列

**概念**
- 在序列中找出最长的严格递增子序列
- O(n²) DP 或 O(n log n) 贪心 + 二分

**代码模板**
```cpp
// O(n²) DP
int dp[N];  // dp[i] 以 a[i] 结尾的 LIS 长度
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++)
        if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
}
int ans = *max_element(dp, dp + n);

// O(n log n) 贪心 + 二分
vector<int> d;  // d[i] 长度为 i+1 的 LIS 末尾最小值
for (int x : a) {
    auto it = lower_bound(d.begin(), d.end(), x);
    if (it == d.end()) d.push_back(x);
    else *it = x;
}
int ans = d.size();
```

**易错点**
- `lower_bound` 保证严格递增，`upper_bound` 允许非递减
- DP 方法的转移条件是 `a[j] < a[i]`（严格递增）
- 贪心方法中 `d` 数组不是 LIS 本身，只是长度

---

### 20. LCS — 最长公共子序列

**概念**
- 两个序列的最长公共子序列（不要求连续）
- 经典 O(nm) DP

**代码模板**
```cpp
// dp[i][j] = a[1..i] 和 b[1..j] 的 LCS 长度
int dp[N][N];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
int ans = dp[n][m];

// 空间优化（滚动数组）
int dp[2][N];
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) dp[i%2][j] = dp[(i-1)%2][j-1] + 1;
        else dp[i%2][j] = max(dp[(i-1)%2][j], dp[i%2][j-1]);
    }
```

**易错点**
- LCS 是子序列（不要求连续），LIS 是特殊形式
- 状态转移方程中 `a[i]==b[j]` 时从对角线转移
- 空间优化时注意奇偶行的交替

---

### 21. 0-1 背包 / 完全背包 — DP 经典

**概念**
- **0-1 背包**：每种物品最多选一次
- **完全背包**：每种物品可选无限次
- 都是 O(nW) 时间

**代码模板**
```cpp
// 0-1 背包
int dp[N];  // dp[j] 容量为 j 时的最大价值
for (int i = 1; i <= n; i++)
    for (int j = V; j >= w[i]; j--)  // 逆序遍历！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);

// 完全背包
int dp[N];
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= V; j++)  // 正序遍历！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);

// 多重背包（二进制优化）
// 将数量拆分为 1, 2, 4, 8, ... 的组合，转化为0-1背包
```

**易错点**
- 0-1 背包内层**逆序**遍历，完全背包**正序**遍历
- 逆序保证每个物品只用一次，正序允许重复使用
- 多重背包的二进制拆分是考点常考技巧

---

## 七、图论基础（22–23）

### 22. 图存储 — 邻接表 / 邻接矩阵

**概念**
- **邻接矩阵**：`g[i][j]` 表示 i→j 的边权，O(n²) 空间
- **邻接表**：每个顶点存一个邻居列表，O(n+m) 空间
- 无向图对称，有向图不对称

**代码模板**
```cpp
// 邻接矩阵
int g[N][N];
g[u][v] = w;               // 添加边

// 邻接表（vector）
vector<pair<int,int>> g[N]; // g[u] = {(v, w), ...}
g[u].push_back({v, w});    // 添加边 u→v 权为 w
for (auto [v, w] : g[u]) { // 遍历 u 的邻居
    // ...
}

// 链式前向星（竞赛常用）
int head[N], to[M], w[M], nxt[M], cnt;
void add(int u, int v, int ww) {
    to[++cnt] = v; w[cnt] = ww; nxt[cnt] = head[u]; head[u] = cnt;
}
```

**易错点**
- 邻接矩阵适合稠密图，邻接表适合稀疏图
- 无向图要加双向边
- 链式前向星的 `cnt` 从 1 开始

---

### 23. 拓扑排序 — Kahn / DFS

**概念**
- 对有向无环图（DAG）的顶点进行线性排序
- 使得所有有向边 u→v 中，u 排在 v 之前
- 可用于检测环

**代码模板**
```cpp
// Kahn 算法（BFS）
queue<int> q;
for (int i = 1; i <= n; i++) if (in[i] == 0) q.push(i);
vector<int> topo;
while (!q.empty()) {
    int u = q.front(); q.pop();
    topo.push_back(u);
    for (int v : g[u])
        if (--in[v] == 0) q.push(v);
}
if (topo.size() != n) cout << "有环！"; // 拓扑排序失败

// DFS 实现
int vis[N]; // 0=未访问, 1=访问中, 2=完成
bool dfs(int u) {
    vis[u] = 1;
    for (int v : g[u]) {
        if (vis[v] == 1) return false; // 发现环
        if (vis[v] == 0 && !dfs(v)) return false;
    }
    vis[u] = 2;
    topo.push_back(u); // 反向收集
    return true;
}
```

**易错点**
- 拓扑排序只适用于 DAG，有向无环图
- Kahn 算法可以检测环：最终排序结果数 < n 说明有环
- DFS 方法得到的是逆拓扑序，需要反转

---

## 八、最短路算法（24–26）

### 24. Dijkstra — 非负权最短路 O((V+E) log V)

**概念**
- 适用于**非负权**图的单源最短路
- 贪心 + 优先队列优化

**代码模板**
```cpp
// 朴素版 O(V²)
int dist[N]; bool vis[N];
memset(dist, 0x3f, sizeof dist);
dist[s] = 0;
for (int i = 1; i <= n; i++) {
    int u = -1;
    for (int j = 1; j <= n; j++)
        if (!vis[j] && (u == -1 || dist[j] < dist[u])) u = j;
    vis[u] = true;
    for (auto [v, w] : g[u])
        dist[v] = min(dist[v], dist[u] + w);
}

// 堆优化版 O((V+E) log V)
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
dist[s] = 0; pq.push({0, s});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue; // 已找到更短路径
    for (auto [v, w] : g[u])
        if (dist[v] > d + w) {
            dist[v] = d + w;
            pq.push({dist[v], v});
        }
}
```

**易错点**
- Dijkstra **不能**处理负权边
- `if (d > dist[u]) continue;` 是关键优化，不加会 TLE
- 朴素版适合稠密图，堆优化适合稀疏图

---

### 25. Floyd — 全源最短路 O(V³)

**概念**
- 求所有顶点对之间的最短路
- 可处理负权边，可检测负环
- 实现简单，但复杂度高

**代码模板**
```cpp
int d[N][N];
// 初始化：d[i][j] = 边权，无边则 INF
memset(d, 0x3f, sizeof d);
for (int i = 1; i <= n; i++) d[i][i] = 0;

// Floyd
for (int k = 1; k <= n; k++)
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);

// 检测负环
bool hasNegCycle = false;
for (int i = 1; i <= n; i++)
    if (d[i][i] < 0) hasNegCycle = true;
```

**易错点**
- `k` 必须在最外层循环
- 初始化时 `d[i][i] = 0`，无边设为 `INF`
- `INF` 取值要足够大，但加法不能溢出（一般用 `0x3f3f3f3f`）

---

### 26. SPFA — Bellman-Ford 队列优化

**概念**
- Bellman-Ford 的队列优化版本
- 可处理负权边，可检测负环
- 平均 O(E)，最坏 O(VE)

**代码模板**
```cpp
int dist[N]; bool inq[N];
memset(dist, 0x3f, sizeof dist);
dist[s] = 0;
queue<int> q; q.push(s); inq[s] = true;
while (!q.empty()) {
    int u = q.front(); q.pop(); inq[u] = false;
    for (auto [v, w] : g[u])
        if (dist[v] > dist[u] + w) {
            dist[v] = dist[u] + w;
            if (!inq[v]) { q.push(v); inq[v] = true; }
        }
}

// 检测负环：统计入队次数
int cnt[N];
bool hasNegCycle = false;
// ...（SPFA过程中 cnt[v]++，若 cnt[v] > n 则有负环）
```

**易错点**
- SPFA 在特殊图上可能退化为 O(VE)
- 入队标记 `inq` 防止重复入队
- 检测负环需额外记录入队次数

---

## 九、最小生成树（27–28）

### 27. Kruskal — 并查集 + 边排序

**概念**
- 贪心算法，按边权排序依次加入不形成环的边
- 时间复杂度 O(E log E)
- 适合稀疏图

**代码模板**
```cpp
struct Edge { int u, v, w; };
vector<Edge> edges;
sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
    return a.w < b.w;
});

int fa[N];
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }

int mst() {
    for (int i = 1; i <= n; i++) fa[i] = i;
    int ans = 0, cnt = 0;
    for (auto& [u, v, w] : edges) {
        int fu = find(u), fv = find(v);
        if (fu != fv) {
            fa[fu] = fv;
            ans += w;
            if (++cnt == n - 1) break;
        }
    }
    return ans; // 返回最小生成树总权值
}
```

**易错点**
- Kruskal 要先排序边，时间复杂度主要在排序
- 并查集用于判断是否形成环
- 加入 n-1 条边即可停止

---

### 28. Prim — 点集合 + 最小边

**概念**
- 从一个顶点开始，每次加入连接已选集合与未选集合的最小边
- 时间复杂度 O(V²)（朴素）或 O(E log V)（堆优化）
- 适合稠密图

**代码模板**
```cpp
int key[N]; bool vis[N];
memset(key, 0x3f, sizeof key);
key[1] = 0; // 从顶点1开始

priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
pq.push({0, 1});
int ans = 0;
while (!pq.empty()) {
    auto [w, u] = pq.top(); pq.pop();
    if (vis[u]) continue;
    vis[u] = true; ans += w;
    for (auto [v, wv] : g[u])
        if (!vis[v] && wv < key[v]) {
            key[v] = wv;
            pq.push({wv, v});
        }
}
```

**易错点**
- Prim 类似 Dijkstra，但比较的是边权而非路径和
- 朴素版 O(V²) 适合稠密图
- 注意 `vis` 标记防止重复加入

---

## 十、并查集（29）

### 29. 并查集 — 路径压缩 + 按秩合并

**概念**
- 处理不相交集合的合并与查询
- 路径压缩 + 按秩合并后，单次操作近似 O(α(n))（阿克曼函数反函数）

**代码模板**
```cpp
int fa[N], rank_[N];

void init(int n) {
    for (int i = 1; i <= n; i++) { fa[i] = i; rank_[i] = 1; }
}

int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]); // 路径压缩
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (rank_[a] < rank_[b]) swap(a, b);
    fa[b] = a;                   // 按秩合并
    if (rank_[a] == rank_[b]) rank_[a]++;
    return true;
}

bool same(int a, int b) { return find(a) == find(b); }
```

**易错点**
- 路径压缩 `fa[x] = find(fa[x])` 是核心优化
- 按秩合并防止退化为链
- `fa` 数组初始化为自身 `fa[i] = i`

---

## 十一、单调数据结构（30–31）

### 30. 单调栈 — Next Greater Element

**概念**
- 维护一个单调递增/递减的栈
- 用于求每个元素左边/右边第一个更大/更小的元素
- 每个元素最多入栈出栈各一次，O(n)

**代码模板**
```cpp
// 求每个元素右边第一个更大的元素
vector<int> nxt(n, -1);
stack<int> st;
for (int i = 0; i < n; i++) {
    while (!st.empty() && a[st.top()] < a[i]) {
        nxt[st.top()] = i;  // a[i] 是 a[st.top()] 右边第一个更大的
        st.pop();
    }
    st.push(i);
}

// 求每个元素左边第一个更小的元素
vector<int> pre(n, -1);
for (int i = n-1; i >= 0; i--) {
    while (!st.empty() && a[st.top()] > a[i]) {
        pre[st.top()] = i;
        st.pop();
    }
    st.push(i);
}
```

**易错点**
- 栈里存下标而非值，方便定位
- 注意比较符号的方向（`<` 或 `>`）
- 出栈条件决定是求"第一个更大"还是"第一个更小"

---

### 31. 单调队列 — 滑动窗口最值

**概念**
- 维护一个单调的双端队列
- 求滑动窗口中的最大/最小值
- O(n) 时间复杂度

**代码模板**
```cpp
// 滑动窗口最小值
deque<int> dq;
for (int i = 0; i < n; i++) {
    while (!dq.empty() && dq.front() <= i - k) dq.pop_front();  // 移除过期元素
    while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();  // 维护单调性
    dq.push_back(i);
    if (i >= k - 1) ans[i - k + 1] = a[dq.front()];
}

// 滑动窗口最大值（把 >= 改成 <=）
deque<int> dq;
for (int i = 0; i < n; i++) {
    while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
    while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
    dq.push_back(i);
    if (i >= k - 1) ans[i - k + 1] = a[dq.front()];
}
```

**易错点**
- 队列头是当前窗口的最值
- 过期判断用下标差，不用值
- 最小值用 `>=` 出队，最大值用 `<=` 出队

---

## 十二、数论基础（32–34）

### 32. 数学基础 — 质数 / GCD / 模运算

**概念**
- **质数**：大于1且只能被1和自身整除的数
- **GCD**：最大公约数，`gcd(a,b) = gcd(b, a%b)`
- **模运算**：`(a+b)%m = (a%m+b%m)%m`

**代码模板**
```cpp
// GCD（辗转相除法）
int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }
int lcm(int a, int b) { return a / gcd(a, b) * b; }

// 判断质数
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

// 质因数分解
vector<int> factorize(int n) {
    vector<int> factors;
    for (int i = 2; i * i <= n; i++)
        while (n % i == 0) { factors.push_back(i); n /= i; }
    if (n > 1) factors.push_back(n);
    return factors;
}
```

**易错点**
- `gcd(0, a) = a`
- 判断质数只需试到 `√n`
- 模运算加减乘可以拆分，除法需用逆元

---

### 33. 快速幂 — O(log n) 求 a^b mod p

**概念**
- 利用二进制分解，将幂运算降为 O(log n)
- 广泛用于模幂运算、矩阵快速幂

**代码模板**
```cpp
// 快速幂
long long qpow(long long a, long long n, long long p) {
    long long r = 1; a %= p;
    while (n) {
        if (n & 1) r = r * a % p;
        a = a * a % p;
        n >>= 1;
    }
    return r;
}

// 矩阵快速幂
struct Mat {
    long long a[2][2];
};
Mat mul(Mat A, Mat B, long long p) {
    Mat C = {{{0}}};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % p;
    return C;
}
Mat qpow(Mat A, long long n, long long p) {
    Mat R = {{{1,0},{0,1}}}; // 单位矩阵
    while (n) {
        if (n & 1) R = mul(R, A, p);
        A = mul(A, A, p);
        n >>= 1;
    }
    return R;
}
```

**易错点**
- `r` 初始值为 1（乘法单位元），不是 0
- `a % p` 要在循环前做一次，防止溢出
- 矩阵快速幂的单位矩阵是对角线为 1

---

### 34. 欧拉筛 — O(n) 质数筛

**概念**
- 线性时间内筛出所有质数
- 每个合数只被其最小质因子筛掉一次
- 时间 O(n)，空间 O(n)

**代码模板**
```cpp
vector<int> primes;
bool vis[N];

void euler_sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) primes.push_back(i);  // i 是质数
        for (int j = 0; j < (int)primes.size() && i * primes[j] <= n; j++) {
            vis[i * primes[j]] = 1;        // 用最小质因子筛
            if (i % primes[j] == 0) break; // 关键：每个数只筛一次
        }
    }
}

// 欧拉函数 φ(n)：1~n 中与 n 互质的数的个数
int phi[N];
void euler_phi(int n) {
    for (int i = 2; i <= n; i++) phi[i] = i;
    for (int i = 2; i <= n; i++) {
        if (phi[i] == i) { // i 是质数
            for (int j = i; j <= n; j += i)
                phi[j] = phi[j] / i * (i - 1);
        }
    }
}
```

**易错点**
- `i % primes[j] == 0` 时必须 `break`，否则会重复筛
- 欧拉筛的核心是"每个合数只被最小质因子筛"
- `phi[j] = phi[j] / i * (i - 1)` 先除后乘防溢出

---

## 附录：GESP L6 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | STL vector | 动态数组、随机访问 |
| 02 | STL deque | 双端队列 |
| 03 | STL stack / queue | 适配器、LIFO / FIFO |
| 04 | STL priority_queue | 堆、大根堆、小根堆 |
| 05 | STL set / multiset | 红黑树、有序集合 |
| 06 | STL map / multimap | 键值对、有序映射 |
| 07 | STL unordered_set/map | 哈希表、O(1)期望 |
| 08 | STL pair / tuple | 元组、make_pair |
| 09 | STL bitset | 位集合、内存紧凑 |
| 10 | sort / stable_sort | IntroSort、归并排序 |
| 11 | lower_bound / upper_bound | 有序二分 |
| 12 | unique | 相邻去重 |
| 13 | next_permutation | 字典序排列 |
| 14 | 复杂度分析 | 最坏/均摊/期望 |
| 15 | 前缀和 | O(1)区间求和 |
| 16 | 差分数组 | O(1)区间修改 |
| 17 | 二分答案 | 最大化最小/最小化最大 |
| 18 | 离散化 | 压缩坐标 |
| 19 | LIS | 最长上升子序列 |
| 20 | LCS | 最长公共子序列 |
| 21 | 0-1背包/完全背包 | DP经典 |
| 22 | 图存储 | 邻接表/邻接矩阵 |
| 23 | 拓扑排序 | Kahn/DFS |
| 24 | Dijkstra | 非负权最短路 |
| 25 | Floyd | 全源最短路 |
| 26 | SPFA | Bellman-Ford优化 |
| 27 | Kruskal | 并查集+边排序 |
| 28 | Prim | 点集合+最小边 |
| 29 | 并查集 | 路径压缩+按秩合并 |
| 30 | 单调栈 | Next Greater Element |
| 31 | 单调队列 | 滑动窗口最值 |
| 32 | 数学基础 | 质数/GCD/模运算 |
| 33 | 快速幂 | O(log n)模幂 |
| 34 | 欧拉筛 | O(n)质数筛 |

---

> ⚠️ 注意：原网站（gesp.scirco.cn）的代码模板存在严重错位问题（代码与标题不匹配）。本文件已修正为每个考点对应的正确代码模板。
