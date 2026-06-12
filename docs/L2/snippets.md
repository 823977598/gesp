# GESP C++ 二级代码模板

> 共 12 段高频代码模板

---

## 01. 两数最大值

```cpp
int max(int a, int b) { return a > b ? a : b; }
```

---

## 02. 数组求和

```cpp
int sum(int a[], int n) {
  int s = 0;
  for (int i = 0; i < n; i++) s += a[i];
  return s;
}
```

---

## 03. 反转字符串

```cpp
string r = string(s.rbegin(), s.rend());
```

---

## 04. 阶乘递归

```cpp
int f(int n) { return n <= 1 ? 1 : n * f(n-1); }
```

---

## 05. string 拼接

```cpp
string s = "Hello" + string(", ") + "World";
```

---

## 06. 子字符串

```cpp
string t = s.substr(pos, len);
```

---

## 07. 冒泡排序

```cpp
for (int i=0;i<n-1;i++)
  for (int j=0;j<n-1-i;j++)
    if (a[j]>a[j+1]) swap(a[j], a[j+1]);
```

---

## 08. 选择排序

```cpp
for (int i=0;i<n-1;i++) {
  int k = i;
  for (int j=i+1;j<n;j++) if (a[j]<a[k]) k=j;
  swap(a[i], a[k]);
}
```

---

## 09. 插入排序

```cpp
for (int i=1;i<n;i++) {
  int x = a[i], j = i-1;
  while (j>=0 && a[j]>x) a[j+1]=a[j], j--;
  a[j+1] = x;
}
```

---

## 10. 数组反转

```cpp
for (int i=0, j=n-1; i<j; i++, j--) swap(a[i], a[j]);
```

---

## 11. 字符统计

```cpp
int cnt[256] = {0};
for (char c : s) cnt[(unsigned char)c]++;
```

---

## 12. 斐波那契递归

```cpp
int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }
```
