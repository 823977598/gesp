import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GESP C++ 知识点',
  description: '中国计算机学会 GESP C++ 等级考试知识点整理 L1-L8',
  
  // 暗黑主题
  appearance: 'dark',
  
  // 基础 URL（GitHub Pages）
  base: '/gesp/',
  
  // 主题配置
  themeConfig: {
    // 网站标题
    siteTitle: 'GESP 知识点',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'L1 入门', link: '/L1/', items: [
        { text: '知识点', link: '/L1/' },
        { text: '代码模板', link: '/L1/snippets' },
      ]},
      { text: 'L2 基础', link: '/L2/' },
      { text: 'L3 进阶', link: '/L3/' },
      { text: 'L4 提高', link: '/L4/' },
      { text: 'L5 中级', link: '/L5/' },
      { text: 'L6 高级', link: '/L6/' },
      { text: 'L7 拔高', link: '/L7/' },
      { text: 'L8 顶级', link: '/L8/' },
    ],
    
    // 侧边栏
    sidebar: {
      '/L1/': [
        {
          text: 'L1 入门 (20个考点)',
          items: [
            { text: '程序基础', items: [
              { text: '01 程序骨架', link: '/L1/#01-程序骨架' },
              { text: '02 变量与声明', link: '/L1/#02-变量与声明' },
              { text: '03 常量与字面量', link: '/L1/#03-常量与字面量' },
              { text: '04 输入输出', link: '/L1/#04-输入输出' },
            ]},
            { text: '运算符', items: [
              { text: '05 算术运算符', link: '/L1/#05-算术运算符' },
              { text: '06 关系与逻辑', link: '/L1/#06-关系与逻辑' },
              { text: '07 位运算基础', link: '/L1/#07-位运算基础' },
              { text: '08 自增自减', link: '/L1/#08-自增自减' },
              { text: '09 赋值复合', link: '/L1/#09-赋值复合' },
            ]},
            { text: '程序结构', items: [
              { text: '10 顺序结构', link: '/L1/#10-顺序结构' },
              { text: '11 单/双分支', link: '/L1/#11-单双分支' },
              { text: '12 多分支 switch', link: '/L1/#12-多分支-switch' },
              { text: '13 while 循环', link: '/L1/#13-while-循环' },
              { text: '14 do-while 循环', link: '/L1/#14-do-while-循环' },
              { text: '15 for 循环', link: '/L1/#15-for-循环' },
              { text: '16 循环控制', link: '/L1/#16-循环控制' },
            ]},
            { text: '字符与类型', items: [
              { text: '17 字符与 ASCII', link: '/L1/#17-字符与-ascii' },
              { text: '18 类型转换', link: '/L1/#18-类型转换' },
            ]},
            { text: '库的使用', items: [
              { text: '19 头文件', link: '/L1/#19-头文件' },
              { text: '20 常用库函数', link: '/L1/#20-常用库函数' },
            ]},
          ]
        }
      ],
      '/L2/': [
        {
          text: 'L2 基础 (20个考点)',
          items: [
            { text: '函数', items: [
              { text: '01 函数定义', link: '/L2/#01-函数定义' },
              { text: '02 函数声明', link: '/L2/#02-函数声明' },
              { text: '03 值传递', link: '/L2/#03-值传递' },
              { text: '04 return', link: '/L2/#04-return' },
              { text: '05 void 函数', link: '/L2/#05-void-函数' },
              { text: '06 局部/全局', link: '/L2/#06-局部--全局' },
              { text: '07 static 静态', link: '/L2/#07-static-静态' },
            ]},
            { text: '数组', items: [
              { text: '08 一维数组', link: '/L2/#08-一维数组' },
              { text: '09 数组内存', link: '/L2/#09-数组内存' },
              { text: '10 字符数组', link: '/L2/#10-字符数组' },
            ]},
            { text: '字符串', items: [
              { text: '11 string 类', link: '/L2/#11-string-类' },
              { text: '12 字符串常用', link: '/L2/#12-字符串常用' },
            ]},
            { text: '递归', items: [
              { text: '13 函数递归', link: '/L2/#13-函数递归' },
              { text: '14 递归与栈', link: '/L2/#14-递归与栈' },
            ]},
            { text: '二维数组与嵌套循环', items: [
              { text: '15 二维数组', link: '/L2/#15-二维数组' },
              { text: '16 嵌套循环', link: '/L2/#16-嵌套循环' },
            ]},
            { text: '高级特性', items: [
              { text: '17 函数重载', link: '/L2/#17-函数重载' },
              { text: '18 默认参数', link: '/L2/#18-默认参数' },
              { text: '19 内联函数', link: '/L2/#19-内联函数' },
              { text: '20 命名空间', link: '/L2/#20-命名空间' },
            ]},
          ]
        }
      ],
      '/L3/': [
        {
          text: 'L3 进阶 (20个考点)',
          items: [
            { text: '结构体', items: [
              { text: '01 二维数组', link: '/L3/#01-二维数组' },
              { text: '02 结构体 struct', link: '/L3/#02-结构体-struct' },
              { text: '03 结构体指针', link: '/L3/#03-结构体指针' },
              { text: '04 结构体数组', link: '/L3/#04-结构体数组' },
            ]},
            { text: '枚举', items: [
              { text: '05 枚举 enum', link: '/L3/#05-枚举-enum' },
              { text: '06 强类型枚举', link: '/L3/#06-强类型枚举' },
            ]},
            { text: '递归进阶', items: [
              { text: '07 递归深入', link: '/L3/#07-递归深入' },
              { text: '08 递归回溯', link: '/L3/#08-递归回溯' },
            ]},
            { text: '文件操作', items: [
              { text: '09 文件打开 ifstream', link: '/L3/#09-文件打开-ifstream' },
              { text: '10 文件打开 ofstream', link: '/L3/#10-文件打开-ofstream' },
              { text: '11 fstream 双工', link: '/L3/#11-fstream-双工' },
            ]},
            { text: '字符串流', items: [
              { text: '12 getline 读行', link: '/L3/#12-getline-读行' },
              { text: '13 字符串流 sstream', link: '/L3/#13-字符串流-sstream' },
            ]},
            { text: 'STL 算法', items: [
              { text: '14 常用算法', link: '/L3/#14-常用算法' },
              { text: '15 lower_bound', link: '/L3/#15-lower_bound' },
              { text: '16 upper_bound', link: '/L3/#16-upper_bound' },
            ]},
            { text: '预处理', items: [
              { text: '17 宏定义 #define', link: '/L3/#17-宏定义-#define' },
              { text: '18 条件编译', link: '/L3/#18-条件编译' },
              { text: '19 头文件组织', link: '/L3/#19-头文件组织' },
              { text: '20 命名空间进阶', link: '/L3/#20-命名空间进阶' },
            ]},
          ]
        }
      ],
      '/L4/': [
        {
          text: 'L4 提高 (22个考点)',
          items: [
            { text: '指针', items: [
              { text: '01 指针基础', link: '/L4/#01-指针基础' },
              { text: '02 指针运算', link: '/L4/#02-指针运算' },
              { text: '03 指针与数组', link: '/L4/#03-指针与数组' },
              { text: '04 指针数组', link: '/L4/#04-指针数组' },
              { text: '05 数组指针', link: '/L4/#05-数组指针' },
            ]},
            { text: '动态内存与引用', items: [
              { text: '06 动态内存 new', link: '/L4/#06-动态内存-new' },
              { text: '07 动态内存 delete', link: '/L4/#07-动态内存-delete' },
              { text: '08 引用 reference', link: '/L4/#08-引用-reference' },
              { text: '09 引用 vs 指针', link: '/L4/#09-引用-vs-指针' },
              { text: '10 const 修饰', link: '/L4/#10-const-修饰' },
            ]},
            { text: '链表', items: [
              { text: '11 链表节点', link: '/L4/#11-链表节点' },
              { text: '12 链表头插', link: '/L4/#12-链表头插' },
              { text: '13 链表尾插', link: '/L4/#13-链表尾插' },
              { text: '14 链表删除', link: '/L4/#14-链表删除' },
              { text: '15 链表反转', link: '/L4/#15-链表反转' },
              { text: '16 双向链表', link: '/L4/#16-双向链表' },
              { text: '17 循环链表', link: '/L4/#17-循环链表' },
            ]},
            { text: '排序算法', items: [
              { text: '18 选择排序', link: '/L4/#18-选择排序' },
              { text: '19 插入排序', link: '/L4/#19-插入排序' },
              { text: '20 冒泡排序', link: '/L4/#20-冒泡排序' },
              { text: '21 快速排序', link: '/L4/#21-快速排序' },
            ]},
            { text: '复杂度', items: [
              { text: '22 时间复杂度', link: '/L4/#22-时间复杂度' },
            ]},
          ]
        }
      ],
      '/L5/': [
        {
          text: 'L5 中级 (25个考点)',
          items: [
            { text: '栈', items: [
              { text: '01 顺序栈', link: '/L5/#01-顺序栈' },
              { text: '02 链式栈', link: '/L5/#02-链式栈' },
            ]},
            { text: '队列', items: [
              { text: '03 顺序队列', link: '/L5/#03-顺序队列' },
              { text: '04 链式队列', link: '/L5/#04-链式队列' },
              { text: '05 双端队列 deque', link: '/L5/#05-双端队列-deque' },
            ]},
            { text: '二叉树', items: [
              { text: '06 二叉树节点', link: '/L5/#06-二叉树节点' },
              { text: '07 前序遍历', link: '/L5/#07-前序遍历' },
              { text: '08 中序遍历', link: '/L5/#08-中序遍历' },
              { text: '09 后序遍历', link: '/L5/#09-后序遍历' },
              { text: '10 层序遍历', link: '/L5/#10-层序遍历' },
              { text: '11 二叉搜索树 BST', link: '/L5/#11-二叉搜索树-bst' },
              { text: '12 BST 插入', link: '/L5/#12-bst-插入' },
              { text: '13 BST 查找', link: '/L5/#13-bst-查找' },
              { text: '14 BST 删除', link: '/L5/#14-bst-删除' },
            ]},
            { text: '二分查找', items: [
              { text: '15 二分查找', link: '/L5/#15-二分查找' },
              { text: '16 二分边界', link: '/L5/#16-二分边界' },
              { text: '17 lower_bound', link: '/L5/#17-lower_bound' },
              { text: '18 upper_bound', link: '/L5/#18-upper_bound' },
            ]},
            { text: '动态规划', items: [
              { text: '19 动态规划思想', link: '/L5/#19-动态规划思想' },
              { text: '20 记忆化搜索', link: '/L5/#20-记忆化搜索' },
              { text: '21 0-1 背包雏形', link: '/L5/#21-0-1-背包雏形' },
              { text: '22 完全背包', link: '/L5/#22-完全背包' },
            ]},
            { text: '图遍历与存储', items: [
              { text: '23 广度优先 BFS', link: '/L5/#23-广度优先-bfs' },
              { text: '24 深度优先 DFS', link: '/L5/#24-深度优先-dfs' },
              { text: '25 邻接表/邻接矩阵', link: '/L5/#25-邻接表--邻接矩阵' },
            ]},
          ]
        }
      ],
      '/L6/': [
        {
          text: 'L6 高级 (34个考点)',
          items: [
            { text: 'STL 容器', items: [
              { text: '01 STL vector', link: '/L6/#01-stl-vector' },
              { text: '02 STL deque', link: '/L6/#02-stl-deque' },
              { text: '03 STL stack/queue', link: '/L6/#03-stl-stack--queue' },
              { text: '04 STL priority_queue', link: '/L6/#04-stl-priority_queue' },
              { text: '05 STL set/multiset', link: '/L6/#05-stl-set--multiset' },
              { text: '06 STL map/multimap', link: '/L6/#06-stl-map--multimap' },
              { text: '07 STL unordered_set/map', link: '/L6/#07-stl-unordered_setmap' },
              { text: '08 STL pair/tuple', link: '/L6/#08-stl-pair--tuple' },
              { text: '09 STL bitset', link: '/L6/#09-stl-bitset' },
            ]},
            { text: 'STL 算法', items: [
              { text: '10 sort/stable_sort', link: '/L6/#10-sort--stable_sort' },
              { text: '11 lower_bound/upper_bound', link: '/L6/#11-lower_bound--upper_bound' },
              { text: '12 unique', link: '/L6/#12-unique' },
              { text: '13 next_permutation', link: '/L6/#13-next_permutation' },
            ]},
            { text: '复杂度与前缀和', items: [
              { text: '14 复杂度分析', link: '/L6/#14-复杂度分析' },
              { text: '15 前缀和', link: '/L6/#15-前缀和' },
              { text: '16 差分数组', link: '/L6/#16-差分数组' },
            ]},
            { text: '二分与离散化', items: [
              { text: '17 二分答案', link: '/L6/#17-二分答案' },
              { text: '18 离散化', link: '/L6/#18-离散化' },
            ]},
            { text: '动态规划', items: [
              { text: '19 LIS', link: '/L6/#19-lis' },
              { text: '20 LCS', link: '/L6/#20-lcs' },
              { text: '21 0-1背包/完全背包', link: '/L6/#21-0-1-背包--完全背包' },
            ]},
            { text: '图论', items: [
              { text: '22 图存储', link: '/L6/#22-图存储' },
              { text: '23 拓扑排序', link: '/L6/#23-拓扑排序' },
              { text: '24 Dijkstra', link: '/L6/#24-dijkstra' },
              { text: '25 Floyd', link: '/L6/#25-floyd' },
              { text: '26 SPFA', link: '/L6/#26-spfa' },
              { text: '27 Kruskal', link: '/L6/#27-kruskal' },
              { text: '28 Prim', link: '/L6/#28-prim' },
              { text: '29 并查集', link: '/L6/#29-并查集' },
            ]},
            { text: '单调数据结构', items: [
              { text: '30 单调栈', link: '/L6/#30-单调栈' },
              { text: '31 单调队列', link: '/L6/#31-单调队列' },
            ]},
            { text: '数论', items: [
              { text: '32 数学基础', link: '/L6/#32-数学基础' },
              { text: '33 快速幂', link: '/L6/#33-快速幂' },
              { text: '34 欧拉筛', link: '/L6/#34-欧拉筛' },
            ]},
          ]
        }
      ],
      '/L7/': [
        {
          text: 'L7 拔高 (25个考点)',
          items: [
            { text: '强连通分量', items: [
              { text: '01 Tarjan', link: '/L7/#01-强连通分量-tarjan' },
              { text: '02 Kosaraju', link: '/L7/#02-kosaraju' },
              { text: '03 缩点', link: '/L7/#03-缩点' },
            ]},
            { text: 'LCA', items: [
              { text: '04 LCA 倍增', link: '/L7/#04-lca-倍增' },
              { text: '05 LCA Tarjan', link: '/L7/#05-lca-tarjan' },
              { text: '07 树剖求 LCA', link: '/L7/#07-树剖求-lca' },
            ]},
            { text: '树链剖分', items: [
              { text: '06 树链剖分', link: '/L7/#06-树链剖分' },
            ]},
            { text: '线段树与树状数组', items: [
              { text: '08 线段树', link: '/L7/#08-线段树' },
              { text: '09 区间修改', link: '/L7/#09-区间修改' },
              { text: '10 树状数组 BIT', link: '/L7/#10-树状数组-bit' },
              { text: '11 BIT 求逆序对', link: '/L7/#11-bit-求逆序对' },
              { text: '12 二维 BIT', link: '/L7/#12-二维-bit' },
            ]},
            { text: 'DP', items: [
              { text: '13 区间 DP', link: '/L7/#13-区间-dp' },
              { text: '14 石子合并', link: '/L7/#14-石子合并' },
              { text: '15 括号匹配 DP', link: '/L7/#15-括号匹配-dp' },
              { text: '16 状压 DP', link: '/L7/#16-状压-dp' },
              { text: '17 TSP 状压', link: '/L7/#17-tsp-状压' },
            ]},
            { text: '字符串', items: [
              { text: '18 字符串哈希', link: '/L7/#18-字符串哈希' },
              { text: '19 双哈希', link: '/L7/#19-双哈希' },
              { text: '20 KMP', link: '/L7/#20-kmp' },
              { text: '21 Z 函数', link: '/L7/#21-z-函数' },
              { text: '22 字典树 Trie', link: '/L7/#22-字典树-trie' },
              { text: '23 01-Trie', link: '/L7/#23-01-trie' },
              { text: '24 后缀数组雏形', link: '/L7/#24-后缀数组雏形' },
            ]},
            { text: '区间最值', items: [
              { text: '25 RMQ', link: '/L7/#25-区间最值-rmq' },
            ]},
          ]
        }
      ],
      '/L8/': [
        {
          text: 'L8 顶级 (31个考点)',
          items: [
            { text: 'AC自动机', items: [
              { text: '01 AC 自动机', link: '/L8/#01-ac-自动机' },
              { text: '02 多模式匹配', link: '/L8/#02-多模式匹配' },
            ]},
            { text: '后缀数组/自动机', items: [
              { text: '03 后缀数组 SA', link: '/L8/#03-后缀数组-sa' },
              { text: '04 SA-IS', link: '/L8/#04-sa-is-线性' },
              { text: '05 后缀自动机 SAM', link: '/L8/#05-后缀自动机-sam' },
              { text: '06 SAM 节点性质', link: '/L8/#06-sam-节点性质' },
              { text: '07 SAM 子串计数', link: '/L8/#07-sam-子串计数' },
            ]},
            { text: '可持久化与分块', items: [
              { text: '08 树套树', link: '/L8/#08-树套树' },
              { text: '09 主席树', link: '/L8/#09-主席树' },
              { text: '10 可持久化 Trie', link: '/L8/#10-可持久化-trie' },
              { text: '11 分块', link: '/L8/#11-分块' },
              { text: '12 莫队算法', link: '/L8/#12-莫队算法' },
              { text: '13 莫队树上', link: '/L8/#13-莫队树上' },
              { text: '14 CDQ 分治', link: '/L8/#14-cdq-分治' },
              { text: '15 整体二分', link: '/L8/#15-整体二分' },
            ]},
            { text: '网络流与二分图', items: [
              { text: '16 网络流基础', link: '/L8/#16-网络流基础' },
              { text: '17 Dinic', link: '/L8/#17-dinic' },
              { text: '18 ISAP', link: '/L8/#18-isap' },
              { text: '19 费用流', link: '/L8/#19-费用流' },
              { text: '20 二分图匹配', link: '/L8/#20-二分图匹配' },
            ]},
            { text: '计算几何', items: [
              { text: '21-25 几何基础', link: '/L8/#21-25-凸包旋转卡壳半平面交三角剖分' },
            ]},
            { text: '多项式', items: [
              { text: '26 FFT', link: '/L8/#26-fft' },
              { text: '27 NTT', link: '/L8/#27-ntt' },
              { text: '28 多项式求逆', link: '/L8/#28-多项式求逆' },
              { text: '29 多项式开根', link: '/L8/#29-多项式开根' },
            ]},
            { text: '数论', items: [
              { text: '30 杜教筛', link: '/L8/#30-杜教筛' },
              { text: '31 BSGS', link: '/L8/#31-bsgs--扩展-bsgs' },
            ]},
          ]
        }
      ],
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xmbcgzs/gesp' }
    ],
    
    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2024-2026 熊猫编程工作室'
    },
    
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 大纲
    outline: {
      level: [2, 3],
      label: '目录'
    },
    
    // 上一页/下一页
    docFooter: {
      prev: '上一级',
      next: '下一级'
    },
    
    // 返回顶部
    returnToTopLabel: '返回顶部',
    
    // 侧边栏菜单
    sidebarMenuLabel: '菜单',
    
    // 深色模式切换
    darkModeSwitchLabel: '主题',
  }
})
