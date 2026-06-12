# GESP C++ 五级代码模板

> 共 12 段高频代码模板

---

## 01. 手写栈

```cpp
vector<int> st;
st.push_back(x);  // push
st.pop_back();    // pop
int t = st.back(); // top
```

---

## 02. 手写队列

```cpp
queue<int> q; q.push(x); q.pop();
int f = q.front();
```

---

## 03. 二分查找

```cpp
int l=0, r=n-1;
while (l <= r) {
  int m = l + (r-l)/2;
  if (a[m]==t) return m;
  else if (a[m]<t) l=m+1; else r=m-1;
}
```

---

## 04. BFS 模板

```cpp
queue<int> q; q.push(s); vis[s]=1;
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : g[u]) if (!vis[v]) { vis[v]=1; q.push(v); }
}
```

---

## 05. DP 爬楼梯

```cpp
vector<int> dp(n+1); dp[0]=dp[1]=1;
for (int i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];
```

---

## 06. 树前序

```cpp
void pre(Node* r) { if(!r) return; cout<<r->val; pre(r->l); pre(r->r); }
```

---

## 07. 树中序

```cpp
void in(Node* r) { if(!r) return; in(r->l); cout<<r->val; in(r->r); }
```

---

## 08. 树后序

```cpp
void post(Node* r) { if(!r) return; post(r->l); post(r->r); cout<<r->val; }
```

---

## 09. 树层序

```cpp
queue<Node*> q; q.push(root);
while (!q.empty()) {
  Node* u = q.front(); q.pop();
  cout << u->val << ' ';
  if (u->l) q.push(u->l);
  if (u->r) q.push(u->r);
}
```

---

## 10. 0-1 背包

```cpp
for (int i=1;i<=n;i++)
  for (int j=V;j>=w[i];j--)
    dp[j]=max(dp[j], dp[j-w[i]]+v[i]);
```

---

## 11. 完全背包

```cpp
for (int i=1;i<=n;i++)
  for (int j=w[i];j<=V;j++)
    dp[j]=max(dp[j], dp[j-w[i]]+v[i]);
```

---

## 12. 记忆化斐波那契

```cpp
long long f[100]; fill(f, f+100, -1);
long long F(int n) { if (n<2) return n; if (f[n]!=-1) return f[n]; return f[n]=F(n-1)+F(n-2); }
```
