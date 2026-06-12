# GESP C++ 四级代码模板

> 共 12 段高频代码模板

---

## 01. 指针交换两值

```cpp
void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }
```

---

## 02. 引用交换两值

```cpp
void swap(int& a, int& b) { int t = a; a = b; b = t; }
```

---

## 03. 链表头插

```cpp
Node* p = new Node{x, head};
head = p;
```

---

## 04. 快速排序 partition

```cpp
int p = a[l], i = l, j = r;
while (i < j) {
  while (i<j && a[j]>=p) j--;
  a[i] = a[j];
  while (i<j && a[i]<=p) i++;
  a[j] = a[i];
}
a[i] = p;
```

---

## 05. 数组最大值

```cpp
int m = *max_element(a, a+n);
```

---

## 06. new 申请数组

```cpp
int* p = new int[n]();
// ...
delete[] p;
```

---

## 07. 数组反转

```cpp
for (int i=0,j=n-1; i<j; i++,j--) swap(a[i],a[j]);
```

---

## 08. 插入排序

```cpp
for (int i=1;i<n;i++) {
  int x=a[i],j=i-1;
  while (j>=0 && a[j]>x) a[j+1]=a[j], j--;
  a[j+1]=x;
}
```

---

## 09. 链表遍历

```cpp
for (Node* p=head; p; p=p->next) cout << p->data << ' ';
```

---

## 10. 链表查找

```cpp
Node* find(Node* h, int x) {
  for (Node* p=h; p; p=p->next) if (p->data==x) return p;
  return nullptr;
}
```

---

## 11. 双向链表头插

```cpp
Node* p = new Node{x, nullptr, head};
if (head) head->prev = p;
head = p;
```

---

## 12. 完整快排

```cpp
void qs(int a[], int l, int r) {
  if (l >= r) return;
  int p = a[l], i = l, j = r;
  while (i < j) { while (i<j && a[j]>=p) j--; a[i]=a[j];
    while (i<j && a[i]<=p) i++; a[j]=a[i]; }
  a[i]=p; qs(a,l,i-1); qs(a,i+1,r);
}
```
