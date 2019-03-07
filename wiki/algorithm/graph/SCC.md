---
layout: Wiki
---
# مولفه های قویا همبند و گراف آن
## تعاریف
به شما یک گراف جهت دار $G$ با $n$ راس و $m$ یال داده شده است.  
**مولفه قویا همبند**
مجموعه ای از رئوس است که هر دو عضو از آن از یک دیگر قابل دسترسی اند. به عبارت دیگر به ازای هر
$ u,v \in C $:  
$ u \mapsto v , v \mapsto u $  
علامت $ \mapsto $
به معنای قابل دسترس بودن است. یعنی وجود یک مسیر از راس اول به راس دوم.  

بدیهیست که مولفه های قویا همبند با یک دیگر اشتراک ندارند. پس می توان گراف را به مولفه های قویا همبند افراز کرد.
ما گراف $G^{SCC}$
را تعریف می کنیم گرافی که به ازای هر مولفه قویا همبند در گراف $G$
یک راس دارد و یک یال جهت دار بین رئوس متناظر با مولفه های $C_i , C_j$
وجود دارد اگر و تنها اگر دو راس $u \in C_i , v \in C_j$
باشند که $(u,v) \in E$  

مهم ترین ویژگی گراف مولفه های قویا همبند **بدون دور** بودن است. سعی کنید این ویژگی را ثابت کنید.  

الگوریتمی که در ادامه می آید، تمام مولفه های قویا همبند را استخراج می کند.
ساخت $G^{SCC}$ بعد از آن ساده است.  

## توضیح الگوریتم

الگوریتم زیر مستقلا توسط کساراجو و شریر در ۱۹۷۹ ساخته شده است.
این الگوریتم بر اساس دو سری [جستجوی عمق اول] کار می کند. پس زمان اجرایی آن $O(n+m)$
است.  

#### گام اول
در گام اول ما با دنباله ای از [dfs]
ها کل گراف را پیمایش می کنیم. از هر راس شروع کرده و روی راس های دیده نشده [dfs]
می زنیم. برای هر راس، ما زمان خروج $tout_v$
را نگه می داریم. این مقادیر نقش کلیدی در ادامه الگوریتم خواهند داشت.

## پیاده سازی
```C++
vector < vector<int> > g, gr;
vector<bool> used;
vector<int> order, component;

void dfs1 (int v) {
    used[v] = true;
    for (size_t i=0; i<g[v].size(); ++i)
        if (!used[ g[v][i] ])
            dfs1 (g[v][i]);
    order.push_back (v);
}

void dfs2 (int v) {
    used[v] = true;
    component.push_back (v);
    for (size_t i=0; i<gr[v].size(); ++i)
        if (!used[ gr[v][i] ])
            dfs2 (gr[v][i]);
}

int main() {
    int n;
    ... reading n ...
    for (;;) {
        int a, b;
        ... reading next edge (a,b) ...
        g[a].push_back (b);
        gr[b].push_back (a);
    }

    used.assign (n, false);
    for (int i=0; i<n; ++i)
        if (!used[i])
            dfs1 (i);
    used.assign (n, false);
    for (int i=0; i<n; ++i) {
        int v = order[n-1-i];
        if (!used[v]) {
            dfs2 (v);
            ... printing next component ...
            component.clear();
        }
    }
}
```
در این جا $g$ گراف ماست، $gr$
گراف با یال های برعکس است. تابع $dfs1$ [dfs]
را روی گراف $G$ و $dfs2$ روی گراف برعکس $G^T$ این کار را انجام می دهد.
تابع $dfs1$ آرایه $order$ را با رئوس به ترتیب زیاد شدن زمان خروجشان پر می کند.
تابع $dfs2$ در هر بار اجرا شدن مولفه قویا همبند بعدی را پیدا می کند.

## مسائل تمرینی

* [SPOJ - Submerging Islands](http://www.spoj.com/problems/SUBMERGE/)
* [SPOJ - Good Travels](http://www.spoj.com/problems/GOODA/)
* [SPOJ - Lego](http://www.spoj.com/problems/LEGO/)
* [Codechef - Chef and Round Run](https://www.codechef.com/AUG16/problems/CHEFRRUN)
* [Dev Skills - A Song of Fire and Ice](https://devskill.com/CodingProblems/ViewProblem/79)
* [UVA - 11838 - Come and Go](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2938)
* [UVA 247 - Calling Circles](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=183)
* [UVA 13057 - Prove Them All](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4955)
* [UVA 12645 - Water Supply](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4393)
* [UVA 11770 - Lighting Away](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2870)
* [UVA 12926 - Trouble in Terrorist Town](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=862&page=show_problem&problem=4805)
* [UVA 11324 - The Largest Clique](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2299)
* [UVA 11709 - Trust groups](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2756)
* [UVA 12745 - Wishmaster](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4598)
* [SPOJ - True Friends](http://www.spoj.com/problems/TFRIENDS/)
* [SPOJ - Capital City](http://www.spoj.com/problems/CAPCITY/)
* [Codeforces - Scheme](http://codeforces.com/contest/22/problem/E)
* [SPOJ - Ada and Panels](http://www.spoj.com/problems/ADAPANEL/)

[dfs](DFS)
[جستجوی عمق اول](DFS)
