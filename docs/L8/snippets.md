# GESP C++ 八级代码模板

> 共 12 段高频代码模板

---

## 01. Dinic 模板

```cpp
struct E{int to; ll cap; int rev;};
vector<E> g[MAXN];
void add(int u,int v,ll c){ g[u].push_back({v,c,(int)g[v].size()}); g[v].push_back({u,0,(int)g[u].size()-1}); }
bool bfs() { /* level 图 */ }
ll dfs(int u, ll f) {
  if (u==T) return f; ll ret=0;
  for (int& i=cur[u]; i<g[u].size(); i++) {
    E& e = g[u][i];
    if (e.cap && lev[e.to]==lev[u]+1) {
      ll p = dfs(e.to, min(f, e.cap));
      e.cap -= p; g[e.to][e.rev].cap += p; f -= p; ret += p;
      if (!f) break;
    }
  } return ret;
}
```

---

## 02. Andrew 凸包

```cpp
sort(p,p+n,cmp);
for (int i=0;i<n;i++) { while (t>=2 && cross(st[t-2],st[t-1],p[i])<=0) t--; st[t++]=p[i]; }
int k=t; for (int i=n-2;i>=0;i--) { while (t>k && cross(st[t-2],st[t-1],p[i])<=0) t--; st[t++]=p[i]; }
```

---

## 03. NTT 多项式乘法

```cpp
void ntt(vector<int>& a, bool inv) { /* iterative Cooley-Tukey with 998244353 */ }
```

---

## 04. 莫队算法

```cpp
block = (int)sqrt(n);
sort(qry.begin(), qry.end(), [&](A,B){
  return A.l/block != B.l/block ? A.l<B.l : (A.l/block&1 ? A.r>B.r : A.r<B.r);
});
```

---

## 05. 主席树查询

```cpp
// 插入 x 后在 [l,r] 上二分
```

---

## 06. SAM 增量构造

```cpp
int sam_sz=1, last=1;
void extend(int c) {
  int p=last, np=++sam_sz; len[np]=len[p]+1;
  while (p && !ch[p][c]) { ch[p][c]=np; p=link[p]; }
  if (!p) link[np]=1;
  else { int q=ch[p][c];
    if (len[p]+1==len[q]) link[np]=q;
    else { int clone=++sam_sz; len[clone]=len[p]+1; ch[clone]=ch[q]; link[clone]=link[q];
      while (p && ch[p][c]==q) { ch[p][c]=clone; p=link[p]; }
      link[q]=link[np]=clone;
    }
  } last = np;
}
```

---

## 07. FFT 卷积

```cpp
vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
fft(fa); fft(fb);
for (i) fa[i] *= fb[i]; ifft(fa);
```

---

## 08. 凸包旋转卡壳

```cpp
// 枚举 i 找最远 j，递推移动
```

---

## 09. 树剖 + 线段树

```cpp
// 树剖序将子树 / 路径转成区间，套线段树
```

---

## 10. 匈牙利匹配

```cpp
int match[N]; bool vis[N];
bool dfs(int u) { for (int v : g[u]) if (!vis[v]) { vis[v]=1; if (!match[v] || dfs(match[v])) { match[v]=u; return true; } } return false; }
```

---

## 11. BSGS

```cpp
// 求解 a^x ≡ b (mod p)
```

---

## 12. 整体二分

```cpp
// 多询问离线：使用树状数组 / BIT + 二分
```
