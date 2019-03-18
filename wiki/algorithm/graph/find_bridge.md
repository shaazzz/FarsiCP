---
layout: Wiki
---

# پیدا کردن یال برشی از (O(n+m
یک گراف بدون جهت داریم و می خواهیم یال های برشی این گراف را پیدا کنیم . یال هاای برشی در گراف یال هایی هستند که اگر آن یال ها را از گراف برداریم (پاک کنیم) ، گراف ناهمبند می شود. به عبارتی دیگر به تعداد مولفه های همبندی گراف اضافه خواهد شد.
اگر بخواهیم مساله را مدل سازی کنیم می توانیم بگوییم که در نقشه یک شهری رو داریم که با جاده به هم وصل شده اند و ما دنبال جاده های مهم این شهر می گردیم . جاده هایی که اگر آن ها را خراب کنیم ، دیگر نتوان به یک سری از شهر ها رسید. ( این مساله را می توان با الگوریتم Flow نیز حل کرد)
الگوریتمی که می خواهیم برای پیدا کردن یال های برشی ارائه دهیم بر پایه [DFS] است و (Order(n+m است که n تعداد رئوس و m تعداد یال های گراف است.

## الگوریتم 
یک راس دلخواه مانند k برداشته ، نام آن را ریشه می گذاریم و از آن [DFS] می زنیم.
به fact اشاره شده در پایین دقت کنید ( اثبات آن آسان است) :
فرض کنید درون [DFS] هستیم. یال (u,v) برشی است اگر و تنها اگر نه راس u و نه هیچ کدام از نسل های (بچه های) u هیچ یال عقب رویی (back edge) به خود راس v و اجداد v نداشته باشند.
یعنی یالی در زیر درخت v وحود نداشته باشد که به راسی بالاتر از v یا خود v وصل باشد‌
این بدان معنا است که هیچ مسیری از v به u به جز یال (u,v) وجود ندارد .
حال ما باید یاد بگیریم این fact را برای هر راس به طور جداگانه بررسی کنیم. برای همین از starting time که در بخش [DFS] راجع به آن مطالعه کردیم، استفاده می کنیم.
پس [tin[v زمان ورود به راس v است و یک آرایه به نام low می گیریم که fact بالا رو برای هر راسی مانند v چک می کند.[low[v مینیموم مقدار ۳ عدد است.

$$low[v] = \min \begin{cases} tin[v] \\\\ tin[p]& \text{ for all }p\text{ for which }(v, p)\text{ is a back edge} \\\ low[to]& \text{ for all }to\text{ for which }(v, to)\text{ is a tree edge} \end{cases}$$

## پیاده سازی
برای پیاده سازی نیاز داریم تا سه چیز رو تشخیص بدیم :   
1. وقتی که در درخت [DFS] به سمت پایین می رویم.   
2. وقتی که یک back edge به سمت بالا پیدا می کنیم.   
3. وقتی که به پدر (parent) یک راس برمی گردیم. 

* visited [to] = false -> این یال جزوی از درخت [DFS] است
* visited [to] = true && to != parent -> این یال یک back edge به یکی از اجداد است
* to = parent -> یال به سمت parent در درخت [DFS] برگشته است
برای پیاده سازی از الگوریتم [DFS] استفاده می کنیم برای اینکه برای هر راس پدرش رو پیدا و fix کنیم.

```C++
int n; // number of nodes
vector<vector<int>> adj; // adjacency list of graph

vector<bool> visited;
vector<int> tin, low;
int timer;

void dfs(int v, int p = -1) {
    visited[v] = true;
    tin[v] = low[v] = timer++;
    for (int to : adj[v]) {
        if (to == p) continue;
        if (visited[to]) {
            low[v] = min(low[v], tin[to]);
        } else {
            dfs(to, v);
            low[v] = min(low[v], low[to]);
            if (low[to] > tin[v])
                IS_BRIDGE(v, to);
        }
    }
}

void find_bridges() {
    timer = 0;
    visited.assign(n, false);
    tin.assign(n, -1);
    low.assign(n, -1);
    for (int i = 0; i < n; ++i) {
        if (!visited[i])
            dfs(i);
    }
}
```

مهم ترین تابع در این کد تابع ()find_bridges است که مقدار دهی اولیه و همچنین الگوریتم DFS برای هر مولفه همبندی در این تابع اجرا می شود.
! توجه : این پیاده سازی برای گراف هایی که یال چند گانه دارند ، درست کار نمی کند و این واضح است که این یال ها هم نمی توانند جواب باشند و تابع ()IS_BRIDGE چک می کند که یالی که قرار است برشی باشد، چند گانه است یا نه و اگر نبود، آن را نمایش می دهد.

## مسائل تمرینی

- [UVA #796 "Critical Links"](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=737) [سختی: کم]
- [UVA #610 "Street Directions"](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=551) [سختی: متوسط]
- [Case of the Computer Network (Codeforces Round #310 Div. 1 E)](http://codeforces.com/problemset/problem/555/E) [سختی: زیاد]
* [UVA 12363 - Hedge Mazes](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=3785)
* [UVA 315 - Network](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=251)
* [GYM - Computer Network (J)](http://codeforces.com/gym/100114)
* [SPOJ - King Graffs Defense](http://www.spoj.com/problems/GRAFFDEF/)
* [SPOJ - Critical Edges](http://www.spoj.com/problems/EC_P/)
* [Codeforces - Break Up](http://codeforces.com/contest/700/problem/C)
* [Codeforces - Tourist Reform](http://codeforces.com/contest/732/problem/F)

[DFS]:DFS
