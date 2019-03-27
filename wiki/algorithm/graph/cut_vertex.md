---
layout: Wiki
---

# پیدا کردن راس های برشی از o(n + m)
یک گراف جهت دار داریم و می خواهیم دنبال راس های برشی آن بگردیم . راس های برشی درگراف ، راس هایی هستند که اگر آن راس را (به همراه تمام یال های متصل به آن ) از گراف پاک کنیم ، گراف ناهمبند بشود یا به عبارتی دیگر به تعداد مولفه های ناهمبندی آن اضافه شود.
الگوریتمی که در این جا توضیح داده می شود با استفاده از [DFS] است و Order(n + m) که n تعداد رئوس و m تعداد یال های گراف است.

## الگوریتم
یک راس دلخواه مانند k از گراف برداشته ، آن را ریشه می نامیم و از آن [DFS] میزنیم . به fact پایین که اثبات آن هم آسان است دقت کنید :
فرض کنید درون [DFS] هستیم و یال فعلی (u , v) است که u , v != k هستند . اگر نه راس u و نه هیچ کدام از راس های زیر درخت آن به v و اجداد v  یال عقب رو(back edge) نداشته باشند ، آنگاه راس v  یک راس برشی است.
حال اگر v = k  باشد ، v  یک راس برشی است اگر و تنها اگر این راس بیش از یک بچه در درخت DFS داشته باشد . پس حال باید یاد بگیریم که این fact  رو چگونه برای هر راس بررسی کنیم . بریای این کار نیاز داریم تا از starting time که در [DFS] راجع به آن مطالعه کردیم ، استفاده کنیم.
آرایه tin[v] رو زمان ورود به راس v  تعریف میکنیم و یک آرایه دیگر به نام low[v] که با استفاده از آن fact بالا رو برای راس v چک میکنیم ، در نظر میگیریم.low[v] مینیموم مقدار 3  عدد می باشد : 
1. tin[v] -> زمان ورود به راس v
2. tin[p] -> به ازای هر راسی مانند p که از طریق یال عقب رو (back edge)(v , p) به راس v وصل است.
3. low[t] -> به ازای هر راسی مانند t که در درخت DFS  مستقیم به راس v  وصل است و بچه آن است و نه جدش.
در این صورت یک  back edge  از راس v یا یکی از نسل هایش (راس هایی که در زیردرخت آن هستند) به یکی از اجداد v  وصل است اگر و تنها اگر راس v  بچه ای مانند u  داشته باشد کهlow[u] < tin[v] باشد و اگر low[u] = tin[v] باشد ، آنگاه این back edge  مستقیما به خود راس v وصل است . بنابراین راس v برشی است اگر و تنها اگر low[u] >= tin[v] باشد . 

## پیاده سازی
```C++
int n; // number of nodes
vector<vector<int>> adj; // adjacency list of graph

vector<bool> visited;
vector<int> tin, low;
int timer;

void dfs(int v, int p = -1) 
{
    visited[v] = true;
    tin[v] = low[v] = timer++;
    int children=0;
    for (int to : adj[v]) 
    {
        if (to == p) continue;
        if (visited[to]) 
        {
            low[v] = min(low[v], tin[to]);
        }
        else 
        {
            dfs(to, v);
            low[v] = min(low[v], low[to]);
            if (low[to] >= tin[v] && p!=-1)
                IS_CUTPOINT(v);
            ++children;
        }
    }
    if(p == -1 && children > 1)
        IS_CUTPOINT(v);
}

void find_cutpoints() 
{
    timer = 0;
    visited.assign(n, false);
    tin.assign(n, -1);
    low.assign(n, -1);
    for (int i = 0; i < n; ++i) 
    {
        if (!visited[i])
            dfs (i);
    }
}
```
هر یال در درخت DFS  3  حالت می تواند داشته باشد : 
1. back edge  به یکی از اجداد باشد .
2. یال درختی باشد (در [DFS] میتوانید راجع به آن مطالعه کنید)
3. یالی باشد که به بابای(parent) یک راس برمیگردد.
* mark[u] = false -> این یال ، یک یال درختی است. 
* mark[u] = true && u != parent -> این یال یک  back edge  به یکی از اجداد است.
* u = parent -> این یال به parent راس برمیگردد.

# مسائل تمرینی
*[UVA #10199 "Tourist Guide"](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=13&page=show_problem&problem=1140)
*[UVA #315 "Network"](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=5&page=show_problem&problem=251)
*[SPOJ - Submerging Islands](https://www.spoj.com/problems/SUBMERGE/)

[DFS]:DFS
