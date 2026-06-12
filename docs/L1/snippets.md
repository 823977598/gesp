# GESP C++ 一级代码模板

> 来源：https://gesp.scirco.cn/L1/snippets.html
> 共 12 段高频代码模板

---

## 01. Hello World

```cpp
#include <iostream>
using namespace std;
int main() {
  cout << "Hello, World!" << endl;
  return 0;
}
```

---

## 02. 读入两个整数

```cpp
int a, b;
cin >> a >> b;
```

---

## 03. 判断奇偶

```cpp
if (n % 2 == 0) cout << "even";
else cout << "odd";
```

---

## 04. 1+2+...+n

```cpp
int s = 0;
for (int i = 1; i <= n; i++) s += i;
cout << s;
```

---

## 05. 求最大公约数

```cpp
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
```

---

## 06. 判断闰年

```cpp
bool leap = (y%4==0 && y%100!=0) || (y%400==0);
```

---

## 07. 数字反转

```cpp
int rev = 0;
while (x) { rev = rev*10 + x%10; x /= 10; }
```

---

## 08. 九九乘法表

```cpp
for (int i=1;i<=9;i++) {
  for (int j=1;j<=i;j++) cout << j<<"x"<<i<<"="<<i*j<<"\t";
  cout << endl;
}
```

---

## 09. switch-case

```cpp
switch (op) {
  case '+': r = a+b; break;
  case '-': r = a-b; break;
  default: cout << "err";
}
```

---

## 10. 求两数最大值

```cpp
int m = a > b ? a : b;
```

---

## 11. 交换两数（临时变量）

```cpp
int t = a; a = b; b = t;
```

---

## 12. 交换两数（无临时变量）

```cpp
a = a ^ b; b = a ^ b; a = a ^ b;
```
