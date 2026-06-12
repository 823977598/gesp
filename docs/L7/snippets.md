# GESP C++ 七级代码模板

> 共 15 段高频代码模板

---

## 01. 线段树建树

```cpp
void build(int p, int l, int r) {
  if (l==r) { t[p]=a[l]; return; }
  int m=(l+r)/2; build(2*p,l,m); build(2*p+1,m+1,r);
  t[p]=t[2*p]+t[2*p+1];
}
```

---

## 02. KMP next 数组

```cpp
vector<int> pi(n);
for (int i=1;i<n;i++) { int j=pi[i-1];
  while (j>0 && s[i]!=s[j]) j=pi[j-1];
  if (s[i]==s[j]) j++; pi[i]=j;
}
```

---

## 03. 树状数组 update

```cpp
void add(int i, int x) { for (; i<=N; i+=i&-i) bit[i] += x; }
```

---

## 04. 树状数组 query

```cpp
int sum(int i) { int s=0; for (; i>0; i-=i&-i) s+=bit[i]; return s; }
```

---

## 05. Tarjan SCC

```cpp
void dfs(int u) {
  dfn[u]=low[u]=++cnt; st.push(u);
  for (int v:g[u])
    if (!dfn[v]) { dfs(v); low[u]=min(low[u],low[v]); }
    else if (ins[v]) low[u]=min(low[u],dfn[v]);
  if (low[u]==dfn[u]) { /* pop st until u, form a SCC */ }
}
```

---

## 06. LCA 倍增

```cpp
int lca(int u,int v){
  if (dep[u]<dep[v]) swap(u,v);
  for (int k=LOG;k>=0;k--) if (dep[u]-(1<<k)>=dep[v]) u=fa[u][k];
  if (u==v) return u;
  for (int k=LOG;k>=0;k--) if (fa[u][k]!=fa[v][k]) u=fa[u][k], v=fa[v][k];
  return fa[u][0];
}
```

---

## 07. 树链剖分求 LCA

```cpp
while (top[u]!=top[v]) { if (dep[top[u]]<dep[top[v]]) swap(u,v); u=fa[top[u]]; }
return dep[u]<dep[v] ? u : v;
```

---

## 08. 区间 DP 戳气球

```cpp
// dp[l][r] = max coins when bursting balloons in (l,r)
```

---

## 09. 状压 DP TSP

```cpp
// dp[mask][i] = min cost, mask 含起点和 i
```

---

## 10. 字典树插入

```cpp
void ins(string s) {
  int p=0;
  for (char c : s) {
    int k = c-'a';
    if (!ch[p][k]) ch[p][k] = ++tot;
    p = ch[p][k];
  }
  cnt[p]++;
}
```

---

## 11. 01-Trie 最大异或

```cpp
insert(x), for (int k=31;k>=0;k--) p = (x>>k)&1 ? ch[p][0] : ch[p][1];
```

---

## 12. Z 函数

```cpp
vector<int> z(n); int l=0,r=0;
for (int i=1;i<n;i++) {
  if (i<=r) z[i] = min(r-i+1, z[i-l]);
  while (i+z[i]<n && s[z[i]]==s[i+z[i]]) z[i]++;
  if (i+z[i]-1 > r) { l=i; r=i+z[i]-1; }
}
```

---

## 13. 区间最值 ST

```cpp
st[k][i] = max(st[k-1][i], st[k-1][i+2^(k-1)]); // O(1) RMQ
```

---

## 14. 后缀数组倍增

```cpp
// 第一次按单字符排序，每次按 (rank[i], rank[i+k]) 排序
```

---

## 15. 二维前缀和

```cpp
s[i][j] = a[i][j] + s[i-1][j] + s[i][j-1] - s[i-1][j-1];
sum(x1,y1,x2,y2) = s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1];
```
