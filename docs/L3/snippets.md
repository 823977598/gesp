# GESP C++ 三级代码模板

> 共 12 段高频代码模板

---

## 01. 结构体定义

```cpp
struct Point { int x, y; };
```

---

## 02. 结构体排序

```cpp
sort(p, p+n, [](Point a, Point b){ return a.x < b.x; });
```

---

## 03. 斐波那契递归

```cpp
int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }
```

---

## 04. 读文件全部行

```cpp
ifstream fin("in.txt");
string line;
while (getline(fin, line)) cout << line;
```

---

## 05. 写文件

```cpp
ofstream fout("out.txt");
fout << "hello" << endl;
```

---

## 06. 汉诺塔

```cpp
void hanoi(int n, char a, char b, char c) {
  if (n == 1) { cout << a << "->" << c << ' '; return; }
  hanoi(n-1, a, c, b);
  cout << a << "->" << c << ' ';
  hanoi(n-1, b, a, c);
}
```

---

## 07. sort 降序

```cpp
sort(a, a+n, greater<int>());
```

---

## 08. sstream 分割

```cpp
stringstream ss(s); string t;
while (ss >> t) cout << t << endl;
```

---

## 09. 杨辉三角

```cpp
for (int i=0;i<n;i++) {
  a[i][0] = a[i][i] = 1;
  for (int j=1;j<i;j++) a[i][j] = a[i-1][j-1] + a[i-1][j];
}
```

---

## 10. 矩阵加法

```cpp
for (int i=0;i<n;i++) for (int j=0;j<m;j++) c[i][j] = a[i][j] + b[i][j];
```

---

## 11. 字符计数

```cpp
int cnt[128] = {0};
for (char c : s) cnt[c]++;
```

---

## 12. 下界查找

```cpp
auto it = lower_bound(a, a+n, x);
int pos = it - a; // 第一个 ≥x 的位置
```
