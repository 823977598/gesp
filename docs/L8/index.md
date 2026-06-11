# GESP C++ 八级（L8 顶级）知识点整理

> 来源：https://gesp.scirco.cn/L8/topics.html
> 共 31 个考点，涵盖高级字符串、高级数据结构、网络流、计算几何、多项式等

---

## 一、AC自动机与字符串匹配（01–02）

### 01. AC 自动机 — Trie + BFS 构造 fail

**概念**
- 在 Trie 上构建 fail 指针，实现多模式匹配
- 类似 KMP 的思路应用到 Trie 上

**代码模板**
```cpp
#include <iostream>
#include <queue>
#include <cstring>
using namespace std;

const int N = 10005*52;
int ch[N][26], fail[N], cnt[N], tot;

void insert(string& s) {
    int p = 0;
    for (char c : s) {
        int k = c-'a';
        if (!ch[p][k]) ch[p][k] = ++tot;
        p = ch[p][k];
    }
    cnt[p]++;
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (ch[0][i]) q.push(ch[0][i]);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (ch[u][i]) {
                fail[ch[u][i]] = ch[fail[u]][i];
                q.push(ch[u][i]);
            } else {
                ch[u][i] = ch[fail[u]][i];
            }
        }
    }
}

int query(string& s) {
    int p = 0, ans = 0;
    for (char c : s) {
        p = ch[p][c-'a'];
        for (int j = p; j && cnt[j] != -1; j = fail[j])
            ans += cnt[j], cnt[j] = -1;
    }
    return ans;
}
```

---

### 02. 多模式匹配 — 文本一次扫描

**概念**
- AC 自动机的核心应用
- 对文本串只扫描一次，匹配所有模式串

---

## 二、后缀数组与后缀自动机（03–07）

### 03. 后缀数组 SA — 倍增 O(n log n)

**代码模板**
```cpp
int sa[N], rnk[N], tmp[N], cnt[N];

void buildSA(string& s) {
    int n = s.size();
    for (int i = 0; i < n; i++) cnt[rnk[i]=s[i]]++;
    for (int i = 1; i < 256; i++) cnt[i] += cnt[i-1];
    for (int i = n-1; i >= 0; i--) sa[--cnt[rnk[i]]] = i;

    for (int k = 1; k < n; k <<= 1) {
        int p = 0;
        for (int i = n-k; i < n; i++) tmp[p++] = i;
        for (int i = 0; i < n; i++) if (sa[i] >= k) tmp[p++] = sa[i]-k;

        memset(cnt, 0, sizeof(int)*256);
        for (int i = 0; i < n; i++) cnt[rnk[tmp[i]]]++;
        for (int i = 1; i < 256; i++) cnt[i] += cnt[i-1];
        for (int i = n-1; i >= 0; i--) sa[--cnt[rnk[tmp[i]]]] = tmp[i];

        swap(rnk, tmp);
        rnk[sa[0]] = 0; p = 1;
        for (int i = 1; i < n; i++)
            rnk[sa[i]] = (tmp[sa[i]]==tmp[sa[i-1]] && tmp[sa[i]+k]==tmp[sa[i-1]+k]) ? p-1 : p++;
        if (p >= n) break;
    }
}
```

---

### 04. SA-IS 线性 — 线性 SA

**概念**
- O(n) 时间构建后缀数组
- 实现复杂，竞赛中较少使用

---

### 05. 后缀自动机 SAM — 在线增量构造

**代码模板**
```cpp
struct SAM {
    int len[N], link[N], ch[N][26], last, tot;
    void init() { last = tot = 1; }
    void extend(char c) {
        int cur = ++tot, p = last;
        len[cur] = len[last]+1;
        for (; p && !ch[p][c-'a']; p = link[p]) ch[p][c-'a'] = cur;
        if (!p) link[cur] = 1;
        else {
            int q = ch[p][c-'a'];
            if (len[p]+1 == len[q]) link[cur] = q;
            else {
                int clone = ++tot;
                len[clone] = len[p]+1;
                memcpy(ch[clone], ch[q], sizeof ch[q]);
                link[clone] = link[q];
                for (; p && ch[p][c-'a']==q; p = link[p]) ch[p][c-'a'] = clone;
                link[q] = link[cur] = clone;
            }
        }
        last = cur;
    }
};
```

---

### 06. SAM 节点性质 — right 集 / 状态数

**概念**
- 每个节点代表一组 endpos 相同的子串
- 状态数 ≤ 2n-1

---

### 07. SAM 子串计数 — 按 len 倒序累加 right

**代码模板**
```cpp
// 每个子串出现次数
for (int i = tot; i >= 2; i--) cnt[link[i]] += cnt[i];
```

---

## 三、可持久化与分块（08–15）

### 08. 树套树 — 线段树套 BST

**概念**
- 外层线段树维护区间，内层 BST 维护值域
- 支持区间第 k 小、区间比 x 小的数等

---

### 09. 主席树 — 可持久化线段树

**代码模板**
```cpp
int rt[N], ls[N*40], rs[N*40], sum[N*40], tot;

int build(int l, int r) {
    int p = ++tot;
    if (l == r) { sum[p] = 0; return p; }
    int mid = (l+r)/2;
    ls[p] = build(l, mid);
    rs[p] = build(mid+1, r);
    return p;
}

int update(int pre, int l, int r, int pos) {
    int p = ++tot;
    ls[p] = ls[pre]; rs[p] = rs[pre]; sum[p] = sum[pre]+1;
    if (l == r) return p;
    int mid = (l+r)/2;
    if (pos <= mid) ls[p] = update(ls[pre], l, mid, pos);
    else rs[p] = update(rs[pre], mid+1, r, pos);
    return p;
}

int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l+r)/2, cnt = sum[ls[v]]-sum[ls[u]];
    if (k <= cnt) return query(ls[u], ls[v], l, mid, k);
    return query(rs[u], rs[v], mid+1, r, k-cnt);
}
```

---

### 10. 可持久化 Trie — 前缀版本

**代码模板**
```cpp
int tr[N*32][2], root[N], tot;

int insert(int pre, int x) {
    int p = ++tot, q = pre;
    for (int i = 30; i >= 0; i--) {
        int b = (x>>i)&1;
        tr[p][b] = ++tot; tr[p][b^1] = tr[q][b^1];
        p = tr[p][b]; q = tr[q][b];
    }
    return p;
}
```

---

### 11. 分块 — sqrt 分解

**概念**
- 将序列分成若干块，块内排序、块间暴力
- 时间复杂度 O(n√n)

**代码模板**
```cpp
int block, bel[N], a[N], bl[N], br[N];
vector<int> B[N];

void build(int n) {
    block = sqrt(n);
    for (int i = 1; i <= n; i++) {
        bel[i] = (i-1)/block+1;
        B[bel[i]].push_back(a[i]);
    }
    for (int i = 1; i <= bel[n]; i++) {
        sort(B[i].begin(), B[i].end());
        bl[i] = (i-1)*block+1;
        br[i] = min(i*block, n);
    }
}
```

---

### 12. 莫队算法 — 离线区间查询

**代码模板**
```cpp
int block = sqrt(n);
sort(qry, qry+q, [&](Query& a, Query& b) {
    return a.l/block != b.l/block ? a.l < b.l :
           (a.l/block&1 ? a.r > b.r : a.r < b.r);
});
```

---

### 13. 莫队树上 — 树上莫队

**概念**
- 将树上路径问题转化为序列上的莫队
- 使用欧拉序 + DFS 序

---

### 14. CDQ 分治 — 三维偏序

**代码模板**
```cpp
// 三维偏序 (a, b, c) 求满足 a'<a, b'<b, c'<c 的数量
void cdq(int l, int r) {
    if (l == r) return;
    int mid = (l+r)/2;
    cdq(l, mid); cdq(mid+1, r);
    sort(p+l, p+mid+1, cmp);
    sort(p+mid+1, p+r+1, cmp);
    // 用 BIT 维护 c 的前缀和
}
```

---

### 15. 整体二分 — 离线二分

**概念**
- 将多个查询一起二分答案
- 用数据结构维护当前值域内的修改和查询

---

## 四、网络流与二分图（16–20）

### 16. 网络流基础 — 最大流

**概念**
- 从源点 s 到汇点 t 的最大流量
- 增广路定理：最大流 = 最小割

---

### 17. Dinic — 分层 + 阻塞流

**代码模板**
```cpp
struct Edge { int to, cap, rev; };
vector<Edge> g[N];
int level[N], iter[N];

void addEdge(int u, int v, int cap) {
    g[u].push_back({v, cap, (int)g[v].size()});
    g[v].push_back({u, 0, (int)g[u].size()-1});
}

void bfs(int s) {
    memset(level, -1, sizeof level);
    queue<int> q; q.push(s); level[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& e : g[u])
            if (e.cap > 0 && level[e.to] < 0) {
                level[e.to] = level[u]+1;
                q.push(e.to);
            }
    }
}

int dfs(int u, int t, int f) {
    if (u == t) return f;
    for (int& i = iter[u]; i < g[u].size(); i++) {
        Edge& e = g[u][i];
        if (e.cap > 0 && level[u] < level[e.to]) {
            int d = dfs(e.to, t, min(f, e.cap));
            if (d > 0) { e.cap -= d; g[e.to][e.rev].cap += d; return d; }
        }
    }
    return 0;
}

int maxFlow(int s, int t) {
    int flow = 0;
    while (true) {
        bfs(s); if (level[t] < 0) break;
        memset(iter, 0, sizeof iter);
        int d;
        while ((d = dfs(s, t, INT_MAX)) > 0) flow += d;
    }
    return flow;
}
```

---

### 18. ISAP — 改进的最短增广路

**代码模板**
```cpp
// ISAP（基于 Dinic 的优化）
int gap[N];
void bfs(int t) {
    memset(level, -1, sizeof level);
    queue<int> q; q.push(t); level[t] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        gap[level[u]]++;
        for (auto& e : g[u])
            if (level[e.to] < 0) { level[e.to] = level[u]+1; q.push(e.to); }
    }
}
```

---

### 19. 费用流 — 最小费用最大流

**代码模板**
```cpp
struct Edge { int to, cap, cost, rev; };
int dist[N], preV[N], preE[N], h[N]; // SPFA + 势

bool spfa(int s, int t) {
    memset(dist, 0x3f, sizeof dist);
    queue<int> q; q.push(s); dist[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < g[u].size(); i++) {
            auto& e = g[u][i];
            if (e.cap > 0 && dist[e.to] > dist[u]+e.cost+h[u]-h[e.to]) {
                dist[e.to] = dist[u]+e.cost+h[u]-h[e.to];
                preV[e.to] = u; preE[e.to] = i;
                q.push(e.to);
            }
        }
    }
    return dist[t] < 0x3f3f3f3f;
}
```

---

### 20. 二分图匹配 — 匈牙利算法

**代码模板**
```cpp
int match[N];
bool vis[N];
bool dfs(int u) {
    for (int v : g[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (match[v] == 0 || dfs(match[v])) {
            match[v] = u;
            return true;
        }
    }
    return false;
}
int hungarian() {
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        memset(vis, 0, sizeof vis);
        if (dfs(i)) ans++;
    }
    return ans;
}
```

---

## 五、计算几何（21–25）

### 21–25. 凸包、旋转卡壳、半平面交、三角剖分

**概念**
- **凸包**：包含所有点的最小凸多边形
- **旋转卡壳**：求凸包直径（最远点对）
- **半平面交**：多个半平面的交集（可行域）
- **三角剖分**：将多边形分解为三角形

**代码模板**
```cpp
// Graham 凸包
vector<Point> convexHull(vector<Point>& pts) {
    sort(pts.begin(), pts.end());
    vector<Point> hull;
    for (auto& p : pts) {
        while (hull.size() >= 2 && cross(hull[hull.size()-2], hull[hull.size()-1], p) <= 0)
            hull.pop_back();
        hull.push_back(p);
    }
    int k = hull.size();
    for (int i = pts.size()-2; i >= 0; i--) {
        while (hull.size() >= k+1 && cross(hull[hull.size()-2], hull[hull.size()-1], pts[i]) <= 0)
            hull.pop_back();
        hull.push_back(pts[i]);
    }
    hull.pop_back();
    return hull;
}

// 叉积
long long cross(Point a, Point b, Point c) {
    return (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
}
```

---

## 六、多项式（26–29）

### 26. FFT — 快速傅里叶变换

**概念**
- O(n log n) 多项式乘法
- 利用单位根的性质

---

### 27. NTT — 数论变换

**概念**
- FFT 的模数版本，避免浮点误差
- 使用原根代替单位根

---

### 28. 多项式求逆 — Newton 迭代

**代码模板**
```cpp
// Newton 迭代求逆
void polyInv(int* a, int* b, int n) {
    if (n == 1) { b[0] = qpow(a[0], mod-2); return; }
    polyInv(a, b, (n+1)/2);
    // 迭代: b = b*(2-a*b) mod x^n
}
```

---

### 29. 多项式开根 — Newton 迭代

**概念**
- 类似求逆，迭代公式不同
- 需要二次剩余

---

## 七、数论（30–31）

### 30. 杜教筛 — 亚线性筛

**概念**
- 求积性函数的前缀和
- 时间复杂度 O(n^{2/3})

**代码模板**
```cpp
// 杜教筛求 φ(i) 的前缀和
unordered_map<long long, long long> mp;
long long S(long long n) {
    if (n < N) return pre[n];  // 预处理的前缀和
    if (mp.count(n)) return mp[n];
    long long ans = n*(n+1)/2;
    for (long long l = 2, r; l <= n; l = r+1) {
        r = n/(n/l);
        ans -= (r-l+1)*S(n/l);
    }
    return mp[n] = ans;
}
```

---

### 31. BSGS / 扩展 BSGS — 离散对数

**概念**
- Baby-Step Giant-Step 求 a^x ≡ b (mod p)
- 适用于 p 为质数

**代码模板**
```cpp
// BSGS 求 a^x ≡ b (mod p)
long long bsgs(long long a, long long b, long long p) {
    a %= p; b %= p;
    if (b == 1) return 0;
    int m = ceil(sqrt(p));
    unordered_map<long long, long long> mp;
    long long pw = 1;
    for (int i = 0; i < m; i++) { mp[pw*b%p] = i; pw = pw*a%p; }
    long long base = pw;
    for (int i = 1; i <= m; i++) {
        if (mp.count(base)) return (long long)i*m - mp[base];
        base = base*a%p;
    }
    return -1;
}
```

---

## 附录：GESP L8 考点速查表

| 编号 | 考点 | 关键词 |
|:---:|:---|:---|
| 01 | AC 自动机 | Trie + BFS fail |
| 02 | 多模式匹配 | 文本一次扫描 |
| 03 | 后缀数组 SA | 倍增 O(n log n) |
| 04 | SA-IS 线性 | 线性 SA |
| 05 | 后缀自动机 SAM | 在线增量构造 |
| 06 | SAM 节点性质 | right 集 |
| 07 | SAM 子串计数 | len 倒序累加 |
| 08 | 树套树 | 线段树套 BST |
| 09 | 主席树 | 可持久化线段树 |
| 10 | 可持久化 Trie | 前缀版本 |
| 11 | 分块 | sqrt 分解 |
| 12 | 莫队算法 | 离线区间查询 |
| 13 | 莫队树上 | 欧拉序莫队 |
| 14 | CDQ 分治 | 三维偏序 |
| 15 | 整体二分 | 离线二分 |
| 16 | 网络流基础 | 最大流 |
| 17 | Dinic | 分层+阻塞流 |
| 18 | ISAP | 改进增广路 |
| 19 | 费用流 | 最小费用最大流 |
| 20 | 二分图匹配 | 匈牙利算法 |
| 21 | 计算几何 | 基础 |
| 22 | 凸包 | Graham scan |
| 23 | 旋转卡壳 | 最远点对 |
| 24 | 半平面交 | 可行域 |
| 25 | 三角剖分 | Delaunay |
| 26 | FFT | 快速傅里叶变换 |
| 27 | NTT | 数论变换 |
| 28 | 多项式求逆 | Newton 迭代 |
| 29 | 多项式开根 | Newton 迭代 |
| 30 | 杜教筛 | 亚线性筛 |
| 31 | BSGS / 扩展 BSGS | 离散对数 |

---

> ⚠️ 注意：原网站（gesp.scirco.cn）的代码模板存在严重错位问题（代码与标题不匹配）。本文件已修正为每个考点对应的正确代码模板。
