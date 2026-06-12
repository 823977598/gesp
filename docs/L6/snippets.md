# GESP C++ 六级代码模板

> 共 15 段高频代码模板

---

## 01. vector 去重

```cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
```

---

## 02. Dijkstra

```cpp
priority_queue<pair<int,int>> pq;
dist[s]=0; pq.push({0,s});
while (!pq.empty()) {
  auto [d,u]=pq.top(); pq.pop();
  for (auto [v,w]: g[u])
    if (dist[v]>d+w) { dist[v]=d+w; pq.push({dist[v],v}); }
}
```

---

## 03. 并查集

```cpp
int f[N];
int find(int x){ return f[x]==x?x:f[x]=find(f[x]); }
void uni(int a,int b){ a=find(a); b=find(b); if(a!=b) f[a]=b; }
```

---

## 04. 01 背包

```cpp
for (int i=1;i<=n;i++)
  for (int j=V;j>=w[i];j--)
    dp[j]=max(dp[j], dp[j-w[i]]+v[i]);
```

---

## 05. LIS O(n log n)

```cpp
vector<int> d; for (int x:a) {
  auto it = lower_bound(d.begin(), d.end(), x);
  if (it==d.end()) d.push_back(x); else *it = x;
}
```

---

## 06. 前缀和查询

```cpp
for (int i=1;i<=n;i++) s[i]=s[i-1]+a[i];
int sum(l,r) = s[r] - s[l-1];
```

---

## 07. 差分区间加

```cpp
diff[l]+=x; diff[r+1]-=x;
for (int i=1;i<=n;i++) a[i]=a[i-1]+diff[i];
```

---

## 08. Kruskal

```cpp
sort(e.begin(), e.end());
for (auto& eg : e) if (uni(eg.u, eg.v)) ans += eg.w;
```

---

## 09. 拓扑排序 Kahn

```cpp
queue<int> q; for (int i=1;i<=n;i++) if (in[i]==0) q.push(i);
while (!q.empty()) { int u=q.front(); q.pop();
  for (int v:g[u]) if (--in[v]==0) q.push(v);
}
```

---

## 10. Floyd

```cpp
for (int k=1;k<=n;k++)
  for (int i=1;i<=n;i++)
    for (int j=1;j<=n;j++)
      d[i][j]=min(d[i][j], d[i][k]+d[k][j]);
```

---

## 11. 单调栈 Next Greater

```cpp
stack<int> st;
for (int i=0;i<n;i++) {
  while (!st.empty() && a[st.top()]<a[i]) { nxt[st.top()]=i; st.pop(); }
  st.push(i);
}
```

---

## 12. GCD

```cpp
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
```

---

## 13. 快速幂

```cpp
long long qpow(long long a, long long n, long long m) {
  long long r=1; a%=m;
  while (n) { if (n&1) r=r*a%m; a=a*a%m; n>>=1; }
  return r;
}
```

---

## 14. 欧拉筛

```cpp
vector<int> p; bool vis[N];
for (int i=2;i<=n;i++) {
  if (!vis[i]) p.push_back(i);
  for (int j=0;j<p.size() && i*p[j]<=n;j++) {
    vis[i*p[j]]=1;
    if (i%p[j]==0) break;
  }
}
```

---

## 15. 二分答案模板

```cpp
int lo=0, hi=1e9;
while (lo<hi) {
  int m=lo+(hi-lo+1)/2;
  if (ok(m)) lo=m; else hi=m-1;
}
```
