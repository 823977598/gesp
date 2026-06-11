# GESP C++ 七级（L7 拔高）知识点整理

> 来源：https://gesp.scirco.cn/L7/topics.html
> 共 25 个考点，涵盖高级图论、高级数据结构、高级DP、字符串算法等

---

## 一、强连通分量与缩点（01–03）

### 01. 强连通分量 Tarjan — dfn/low + 栈

**概念**
- 有向图中，任意两点互相可达的极大子图称为强连通分量（SCC）
- Tarjan 算法用一次 DFS 求所有 SCC，O(V+E)

**代码模板**
```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

const int N = 10005;
vector<int> g[N];
int dfn[N], low[N], timer;
int scc[N], sccCnt;
bool inStack[N];
stack<int> st;

void tarjan(int u) {
    dfn[u] = low[u] = ++timer;
    st.push(u); inStack[u] = true;
    for (int v : g[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (dfn[u] == low[u]) {
        sccCnt++;
        while (true) {
            int x = st.top(); st.pop();
            inStack[x] = false;
            scc[x] = sccCnt;
            if (x == u) break;
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
    }
    for (int i = 1; i <= n; i++)
        if (!dfn[i]) tarjan(i);
    cout << "SCC数量: " << sccCnt << endl;
    return 0;
}
```

**易错点**
- `dfn` 是 DFS 序，`low` 是能回溯到的最早 DFS 序
- `dfn[u] == low[u]` 说明 u 是 SCC 的根
- 注意 `inStack` 标记，只有栈中的节点才能更新 `low`

---

### 02. Kosaraju — 正反两次 DFS

**概念**
- 第一次 DFS 求逆后序，第二次在反图上按逆序 DFS
- 比 Tarjan 更容易理解

**代码模板**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int N = 10005;
vector<int> g[N], rg[N];
bool vis[N];
int order[N], cnt;
int scc[N], sccCnt;

void dfs1(int u) {
    vis[u] = true;
    for (int v : g[u])
        if (!vis[v]) dfs1(v);
    order[++cnt] = u;  // 逆后序
}

void dfs2(int u) {
    vis[u] = true;
    scc[u] = sccCnt;
    for (int v : rg[u])
        if (!vis[v]) dfs2(v);
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        rg[v].push_back(u);  // 反图
    }
    for (int i = 1; i <= n; i++)
        if (!vis[i]) dfs1(i);
    fill(vis, vis+n+1, false);
    for (int i = n; i >= 1; i--)
        if (!vis[order[i]]) { sccCnt++; dfs2(order[i]); }
    return 0;
}
```

---

### 03. 缩点 — SCC 缩成 DAG

**概念**
- 将每个 SCC 缩成一个点，得到有向无环图（DAG）
- 可以在缩点后的 DAG 上做 DP

**代码模板**
```cpp
// 缩点（基于 Tarjan）
vector<int> ng[N];  // 缩点后的图
int val[N], sVal[N];  // 原点权值，缩点后权值

// 缩点后求最长路（DAG DP）
int dp[N];
int solve(int n) {
    int ans = 0;
    for (int i = sccCnt; i >= 1; i--) {
        dp[i] = sVal[i];
        for (int v : ng[i])
            dp[i] = max(dp[i], dp[v] + sVal[i]);
        ans = max(ans, dp[i]);
    }
    return ans;
}
```

**易错点**
- 缩点后是 DAG，可以拓扑排序
- 缩点后要注意边的方向
- 求 SCC 内部的权值之和

---

## 二、LCA 最近公共祖先（04–05, 07）

### 04. LCA 倍增 — fa[k][v] 父亲表

**概念**
- 预处理每个节点的 2^k 级祖先
- 查询 LCA 时先对齐深度，再一起跳

**代码模板**
```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

const int N = 100005, LOG = 17;
vector<int> g[N];
int fa[LOG][N], dep[N];

void dfs(int u, int p) {
    fa[0][u] = p;
    for (int i = 1; i < LOG; i++)
        fa[i][u] = fa[i-1][fa[i-1][u]];
    for (int v : g[u])
        if (v != p) { dep[v] = dep[u]+1; dfs(v, u); }
}

int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    for (int i = LOG-1; i >= 0; i--)
        if (dep[fa[i][u]] >= dep[v]) u = fa[i][u];
    if (u == v) return u;
    for (int i = LOG-1; i >= 0; i--)
        if (fa[i][u] != fa[i][v]) { u = fa[i][u]; v = fa[i][v]; }
    return fa[0][u];
}

int main() {
    int n, q;
    cin >> n >> q;
    for (int i = 1; i < n; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v); g[v].push_back(u);
    }
    dep[1] = 1; dfs(1, 0);
    while (q--) {
        int u, v; cin >> u >> v;
        cout << lca(u, v) << endl;
    }
    return 0;
}
```

---

### 05. LCA Tarjan — 离线 + 并查集

**代码模板**
```cpp
// 离线 Tarjan LCA（简化版）
vector<pair<int,int>> q[N];  // 查询
int ans[N], fa[N], vis[N];

int find(int x) { return fa[x]==x ? x : fa[x]=find(fa[x]); }

void tarjanLCA(int u, int p) {
    vis[u] = true;
    for (int v : g[u]) {
        if (v == p) continue;
        tarjanLCA(v, u);
        fa[find(v)] = u;  // 合并到父节点
    }
    for (auto [v, id] : q[u])
        if (vis[v]) ans[id] = find(v);
}
```

---

### 07. 树剖求 LCA — 沿重链跳

**代码模板**
```cpp
int top[N];  // 重链顶节点

int lca(int u, int v) {
    while (top[u] != top[v]) {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        u = fa[top[u]];
    }
    return dep[u] < dep[v] ? u : v;
}
```

---

## 三、树链剖分（06）

### 06. 树链剖分 — 重链 / 轻链

**概念**
- 将树分解为若干条重链，支持树上路径操作
- 配合线段树可以做区间修改/查询

**代码模板**
```cpp
const int N = 100005;
vector<int> g[N];
int fa[N], dep[N], sz[N], son[N], top[N], dfn[N], rnk[N], timer;

void dfs1(int u, int p) {
    fa[u] = p; dep[u] = dep[p]+1; sz[u] = 1;
    int maxSon = 0;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        if (sz[v] > maxSon) { maxSon = sz[v]; son[u] = v; }
    }
}

void dfs2(int u, int t) {
    top[u] = t; dfn[u] = ++timer; rnk[timer] = u;
    if (son[u]) dfs2(son[u], t);
    for (int v : g[u])
        if (v != fa[u] && v != son[u]) dfs2(v, v);
}

// 路径操作
void modifyPath(int u, int v, int val) {
    while (top[u] != top[v]) {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        // 对 top[u]~u 这段区间操作
        modify(1, dfn[top[u]], dfn[u], val);
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) swap(u, v);
    modify(1, dfn[u], dfn[v], val);
}
```

**易错点**
- 重儿子是子树最大的儿子
- `top` 是当前链的顶节点
- DFS 序是线段树的基础

---

## 四、线段树与树状数组（08–12）

### 08. 线段树 — 区间查询 / 单点修改

**代码模板**
```cpp
const int N = 100005;
struct SegTree {
    int sum[N*4];
    void build(int node, int l, int r, int a[]) {
        if (l == r) { sum[node] = a[l]; return; }
        int mid = (l+r)/2;
        build(node*2, l, mid, a);
        build(node*2+1, mid+1, r, a);
        sum[node] = sum[node*2] + sum[node*2+1];
    }
    void update(int node, int l, int r, int pos, int val) {
        if (l == r) { sum[node] += val; return; }
        int mid = (l+r)/2;
        if (pos <= mid) update(node*2, l, mid, pos, val);
        else update(node*2+1, mid+1, r, pos, val);
        sum[node] = sum[node*2] + sum[node*2+1];
    }
    int query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return sum[node];
        int mid = (l+r)/2, ans = 0;
        if (ql <= mid) ans += query(node*2, l, mid, ql, qr);
        if (qr > mid) ans += query(node*2+1, mid+1, r, ql, qr);
        return ans;
    }
};
```

---

### 09. 区间修改 — lazy 标记

**代码模板**
```cpp
struct LazySegTree {
    long long sum[N*4], lazy[N*4];
    void pushDown(int node, int l, int r) {
        if (lazy[node]) {
            int mid = (l+r)/2;
            sum[node*2] += lazy[node]*(mid-l+1);
            sum[node*2+1] += lazy[node]*(r-mid);
            lazy[node*2] += lazy[node];
            lazy[node*2+1] += lazy[node];
            lazy[node] = 0;
        }
    }
    void update(int node, int l, int r, int ql, int qr, int val) {
        if (ql <= l && r <= qr) {
            sum[node] += (long long)val*(r-l+1);
            lazy[node] += val;
            return;
        }
        pushDown(node, l, r);
        int mid = (l+r)/2;
        if (ql <= mid) update(node*2, l, mid, ql, qr, val);
        if (qr > mid) update(node*2+1, mid+1, r, ql, qr, val);
        sum[node] = sum[node*2] + sum[node*2+1];
    }
    long long query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return sum[node];
        pushDown(node, l, r);
        int mid = (l+r)/2;
        long long ans = 0;
        if (ql <= mid) ans += query(node*2, l, mid, ql, qr);
        if (qr > mid) ans += query(node*2+1, mid+1, r, ql, qr);
        return ans;
    }
};
```

---

### 10. 树状数组 BIT — lowbit 思想

**代码模板**
```cpp
int tree[N], n;
int lowbit(int x) { return x & (-x); }

void update(int i, int val) {
    for (; i <= n; i += lowbit(i)) tree[i] += val;
}

int query(int i) {
    int sum = 0;
    for (; i > 0; i -= lowbit(i)) sum += tree[i];
    return sum;
}

int query(int l, int r) { return query(r) - query(l-1); }
```

---

### 11. BIT 求逆序对

**代码模板**
```cpp
// 离散化 + BIT 求逆序对
long long invCount = 0;
for (int i = n-1; i >= 0; i--) {
    invCount += query(rnk[i]-1);  // 查询比 a[i] 小的已插入数量
    update(rnk[i], 1);
}
```

---

### 12. 二维 BIT

**代码模板**
```cpp
int tree[N][N];
void update(int x, int y, int val) {
    for (int i = x; i <= n; i += lowbit(i))
        for (int j = y; j <= m; j += lowbit(j))
            tree[i][j] += val;
}
int query(int x, int y) {
    int sum = 0;
    for (int i = x; i > 0; i -= lowbit(i))
        for (int j = y; j > 0; j -= lowbit(j))
            sum += tree[i][j];
    return sum;
}
```

---

## 五、区间DP与状压DP（13–17）

### 13. 区间 DP

**概念**
- 在区间 [l, r] 上做 DP，枚举分割点
- 适用于合并相邻元素的问题

**代码模板**
```cpp
// dp[i][j] = 合并 [i,j] 的最小代价
int dp[N][N];
for (int len = 2; len <= n; len++)
    for (int i = 1; i+len-1 <= n; i++) {
        int j = i+len-1;
        dp[i][j] = INF;
        for (int k = i; k < j; k++)
            dp[i][j] = min(dp[i][j], dp[i][k]+dp[k+1][j]+cost(i,j));
    }
```

---

### 14. 石子合并

**代码模板**
```cpp
// 环形石子合并
int a[N], s[N], dp[N][N];
for (int i = 1; i <= n; i++) s[i] = s[i-1]+a[i];
for (int len = 2; len <= n; len++)
    for (int i = 1; i+len-1 <= n; i++) {
        int j = i+len-1;
        dp[i][j] = INF;
        for (int k = i; k < j; k++)
            dp[i][j] = min(dp[i][j], dp[i][k]+dp[k+1][j]+s[j]-s[i-1]);
    }
cout << dp[1][n] << endl;
```

---

### 15. 括号匹配 DP

**代码模板**
```cpp
// 最长合法括号子串
int dp[N];
for (int i = 1; i < n; i++) {
    if (s[i] == ')' && s[i-1] == '(')
        dp[i] = (i >= 2 ? dp[i-2] : 0) + 2;
    else if (s[i] == ')' && s[i-1] == ')' && s[i-dp[i-1]-1] == '(')
        dp[i] = dp[i-1] + 2 + (i-dp[i-1]-2 >= 0 ? dp[i-dp[i-1]-2] : 0);
}
```

---

### 16. 状压 DP — 位运算状态压缩

**代码模板**
```cpp
// n 皇后（位运算版）
int count = 0;
void solve(int row, int ld, int rd, int n) {
    if (row == n) { count++; return; }
    int avail = ~(row | ld | rd) & ((1<<n)-1);
    while (avail) {
        int p = avail & (-avail);
        avail -= p;
        solve(row|p, (ld|p)<<1, (rd|p)>>1, n);
    }
}
```

---

### 17. TSP 状压 — 旅行商问题

**代码模板**
```cpp
// TSP：从起点访问所有城市恰好一次再返回
int dp[1<<N][N], g[N][N];
int solve(int n) {
    memset(dp, 0x3f, sizeof dp);
    dp[1][0] = 0;  // 起点为 0
    for (int S = 1; S < (1<<n); S++)
        for (int u = 0; u < n; u++) {
            if (!(S & (1<<u))) continue;
            for (int v = 0; v < n; v++) {
                if (S & (1<<v)) continue;
                dp[S|(1<<v)][v] = min(dp[S|(1<<v)][v], dp[S][u]+g[u][v]);
            }
        }
    int ans = INF;
    for (int u = 0; u < n; u++)
        ans = min(ans, dp[(1<<n)-1][u]+g[u][0]);
    return ans;
}
```

---

## 六、字符串算法（18–24）

### 18. 字符串哈希

**代码模板**
```cpp
const long long B = 131, P = 1e9+7;
long long h[N], pw[N];

void init(string& s) {
    pw[0] = 1;
    for (int i = 1; i <= s.size(); i++) {
        h[i] = (h[i-1]*B + s[i-1]) % P;
        pw[i] = pw[i-1]*B % P;
    }
}

long long getHash(int l, int r) {  // 1-indexed
    return (h[r] - h[l-1]*pw[r-l+1] % P + P) % P;
}
```

---

### 19. 双哈希

**代码模板**
```cpp
struct DoubleHash {
    long long h1[N], h2[N];
    const long long B1=131, B2=137, P1=1e9+7, P2=1e9+9;
    void init(string& s) {
        h1[0] = h2[0] = 0;
        for (int i = 1; i <= s.size(); i++) {
            h1[i] = (h1[i-1]*B1+s[i-1])%P1;
            h2[i] = (h2[i-1]*B2+s[i-1])%P2;
        }
    }
    pair<long long,long long> get(int l, int r) {
        // 返回哈希值对
    }
};
```

---

### 20. KMP

**代码模板**
```cpp
int ne[N];  // next 数组
void getNext(string& p) {
    int m = p.size();
    ne[0] = -1;
    for (int i = 1, j = -1; i < m; i++) {
        while (j >= 0 && p[j+1] != p[i]) j = ne[j];
        if (p[j+1] == p[i]) j++;
        ne[i] = j;
    }
}

int kmp(string& s, string& p) {
    int n = s.size(), m = p.size();
    getNext(p);
    for (int i = 0, j = -1; i < n; i++) {
        while (j >= 0 && p[j+1] != s[i]) j = ne[j];
        if (p[j+1] == s[i]) j++;
        if (j == m-1) {
            cout << "匹配位置: " << i-m+1 << endl;
            j = ne[j];
        }
    }
}
```

---

### 21. Z 函数

**代码模板**
```cpp
vector<int> zFunction(string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    z[0] = n;
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = min(r-i, z[i-l]);
        while (i+z[i] < n && s[z[i]] == s[i+z[i]]) z[i]++;
        if (i+z[i] > r) { l = i; r = i+z[i]; }
    }
    return z;
}
```

---

### 22. 字典树 Trie

**代码模板**
```cpp
int ch[N][26], tot, cnt[N];

void insert(string s) {
    int p = 0;
    for (char c : s) {
        int k = c-'a';
        if (!ch[p][k]) ch[p][k] = ++tot;
        p = ch[p][k];
    }
    cnt[p]++;
}

int query(string s) {
    int p = 0;
    for (char c : s) {
        int k = c-'a';
        if (!ch[p][k]) return 0;
        p = ch[p][k];
    }
    return cnt[p];
}
```

---

### 23. 01-Trie — 异或最大值

**代码模板**
```cpp
int trie[N*32][2], tot;
void insert(int x) {
    int p = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (x>>i)&1;
        if (!trie[p][b]) trie[p][b] = ++tot;
        p = trie[p][b];
    }
}
int queryMax(int x) {
    int p = 0, ans = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (x>>i)&1;
        if (trie[p][b^1]) { ans |= (1<<i); p = trie[p][b^1]; }
        else p = trie[p][b];
    }
    return ans;
}
```

---

### 24. 后缀数组雏形

**代码模板**
```cpp
int sa[N], rnk[N], tmp[N];
void buildSA(string& s) {
    int n = s.size();
    for (int i = 0; i < n; i++) { sa[i] = i; rnk[i] = s[i]; }
    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rnk[a] != rnk[b]) return rnk[a] < rnk[b];
            int ra = a+k<n ? rnk[a+k] : -1;
            int rb = b+k<n ? rnk[b+k] : -1;
            return ra < rb;
        };
        sort(sa, sa+n, cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1],sa[i]) ? 1 : 0);
        for (int i = 0; i < n; i++) rnk[i] = tmp[i];
    }
}
```

---

## 七、区间最值（25）

### 25. 区间最值 RMQ — Sparse Table

**代码模板**
```cpp
int st[N][LOG], a[N];

void build(int n) {
    for (int i = 0; i < n; i++) st[i][0] = a[i];
    for (int j = 1; (1<<j) <= n; j++)
        for (int i = 0; i+(1<<j)-1 < n; i++)
            st[i][j] = max(st[i][j-1], st[i+(1<<(j-1))][j-1]);
}

int query(int l, int r) {
    int k = __lg(r-l+1);
    return max(st[l][k], st[r-(1<<k)+1][k]);
}
```

---

## 附录：GESP L7 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | 强连通分量 Tarjan | dfn/low + 栈 |
| 02 | Kosaraju | 正反两次 DFS |
| 03 | 缩点 | SCC → DAG |
| 04 | LCA 倍增 | fa[k][v] 父亲表 |
| 05 | LCA Tarjan | 离线 + 并查集 |
| 06 | 树链剖分 | 重链/轻链 |
| 07 | 树剖求 LCA | 沿重链跳 |
| 08 | 线段树 | 区间查询/单点修改 |
| 09 | 区间修改 | lazy 标记 |
| 10 | 树状数组 BIT | lowbit 思想 |
| 11 | BIT 求逆序对 | 离散化+BIT |
| 12 | 二维 BIT | 二维前缀和 |
| 13 | 区间 DP | 枚举分割点 |
| 14 | 石子合并 | 经典区间 DP |
| 15 | 括号匹配 DP | 最长合法子串 |
| 16 | 状压 DP | 位运算状态压缩 |
| 17 | TSP 状压 | 旅行商问题 |
| 18 | 字符串哈希 | 多项式哈希 |
| 19 | 双哈希 | 降低冲突 |
| 20 | KMP | 字符串匹配 |
| 21 | Z 函数 | 最长公共前缀 |
| 22 | 字典树 Trie | 前缀树 |
| 23 | 01-Trie | 异或最大值 |
| 24 | 后缀数组雏形 | 后缀排序 |
| 25 | 区间最值 RMQ | Sparse Table |

---

> ⚠️ 注意：原网站（gesp.scirco.cn）的代码模板存在严重错位问题（代码与标题不匹配）。本文件已修正为每个考点对应的正确代码模板。
