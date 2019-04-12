---
layout: Wiki
---

# الگوریتم $Dijkstra$
یک گراف جهت دار یا بدون جهت و وزن دار با $n$ راس و $m$ یال داریم که وزن تمام یال ها عددی مثبت است . همچنین یک راس شروع مانند $s$ هم داریم . می خواهیم کوتاه ترین مسیر از $S$ به هر راس دیگری را پیدا کنیم و این مسیر را نمایش بدهیم . کوتاه ترین مسیر در گراف وزن دار مسیری است که جمع وزن یال ها کمترین مقدار ممکن باشد . دقت کنید که ما برای حل این مساله نمی توانیم از $[BFS]$ استفاده کنیم چون گراف وزن دار است و وزنی که ما طی می کنیم مهم است نه تعداد یال ها .

# الگوریتم
این الگوریتم توسط $W.Dijkstra$ در سال ۱۹۵۹ مطرح شد . 
یک آرایه $d[]$ می سازیم که طول کوتاه ترین مسیر فعلی از $s$ به $v$ را در $d[v]$ نگه می داریم . در مقدار دهی اولیه $d[s] = 0$ است چون $s$ از خودش فاصله ایی ندارد و برای تمام رئوس دیگر مانند $v$ ، $d[v]$ بی نهایت است . در پیاده سازی منظور از بی نهایت ، عدد بزرگی است که تضمین می شود طول همه کوتاه ترین فاصله ها از آن کمتر است . به علاوه یک آرایه دیگر از نوع $boolean$ به نام $mark[]$ هم می سازیم که $mark[v]$ می گوید راس $v$ دیده شده یا نه و در ابتذا $mark$ تمام رئوس باید $False$ باشد . الگریتم دایسترا $n$ بار تکرار می شود و ر هر بار راس $v$ به عنوان راسی دیده نشده که $mark[v] = false$ و $d[v]$ کوچکترین مقدار را دارد انتخاب می شود پس واضح است که اولین بار راس $s$  انتخاب می شود . راس انتخاب شده $v$ را در نظر بگیرید ، $mark[v] = true$ می کنیم سپس از $v$ شروع می کنیم به $relax$ کردن . $relax$ کردن به این صورت انجام می شود که تمام یال های به صورت $(v , u)$ را در نظر می گیریم و به ازای هر راس $u$ ، این الگوریتم تلاش می کند تا مقدار $d[u]$ را بهتر کند . اگر وزن یال $(u , v)$ را $W$ در نظر بگیریم ، داریم : $d[u] = min(d[u] , d[v] + w)$ بعد از اینکه تمام یال های $(v , u)$ را به صورتی که گفتیم آپدیت کردیم ، یک مرحله به پایان می رسد . در آخر و بعد از $n$ مرحله تمام راس ها دیده شده اند و الگوریتم به پایان می رسد و ادعا می کنیم که به ازای هر راس $v$ ، $d[v]$ کوتاه ترین مسیر از $s$  به $v$ است . 
دقت کنید که اگر از راس $s$ نتوان به راس $v$ رسید مثلا دو راس در دو مولفه متفاوت باشند ، آنگاه $d[v]$ همان بی نهایت باقی می ماند . طبق توضیحی که راجع به ترتیب انتخاب شدن رئوس بر اساس $d$ آن ها دادیم واضح است رئوسی که نمی توان از $s$ به آن ها رسید ، در مراحل آخر الگوریتم انتخاب می شوند ولی هیچ اتفاق مفیدی روی $d[]$ آن ها نمی افتد . بنابراین می توان الگوریتم را به محض اینکه راس انتخاب شده $d$ بی نهایت داشت متوقف کنیم .  

# اثبات
برای این کار دو مجموعه $A , B$ را در نظر می گیریم . در ابتدا تنها راس $s$ که $mark[s] = true$ است و فاصله اش هم صفر اس ت را در $A$ قرار می دهیم و این فاصله را یک حدس می نامیم . می دانیم که حدس راس $s$ قطعی است چون $s$ از خودش هیچ فاصله ایی ندارد . حال می خواهیم برای همه راس هایی که در $B$ قرار دارند یک حدس زده و وقتی حدس شان قطعی شد آن ها را در $A$ می گذاریم (همان طور که گفته شد ممکن است حدس بعضی از رئوس بی نهایت باشد ) بعد راسی از $B$ انتخاب می کنیم که از $s$ کوتاه ترین فاصله را دارد ، فرض می کنیم این فاصله $d$ باشد و راسی هم که این فاصله را دارد $t$ باشد . می خواهیم ثابت کنیم این راس حدسش قطعی است و آن را در $A$ بیاندازیم . چون فاصله ایی کمتر از $d$ در بین همسایه های $s$ وجود ندارد پس یعنی راه دیگری برای کوتاه تر کردن فاصله $s$ تا $t$ وجود ندارد چون اگر داشت یعنی کوچکتر از $d$ می شد که این با فرض تناقض دارد . پس حدس راس 4 $t$ قطعی شده و آن را در $A$ می اندازیم . سپس حدس تمام راس های $t$ را آپدیت می کنیم . دقت کنید که تنها حدس همسایه های $t$ ممکن است کمتر شود . سپس این مراحل را دوباره تکرار می کنیم یعنی کمترین فاصله یا حدس را در $B$ پیدا کرده و وقتی حدسش قطعی شد آن را در $A$ می اندازیم . 
حال می خواهیم ثابت کنیم که چرا حدس رئوسی که در $A$ هستند قطعی است . فرض می کنیم حدس راس $v$ کمترین باشد ولی قطعی نباشد پس یعنی مسیر دیگری وجود دارد که فاصله $v$ را کوتاه تر می کند . پس یعنی راسی مانند $a$ وجود دارد که وقتی از $s$ به $a$ برویم و از $a$ به $v$ برویم فاصله $v$ کمتر می شود و این یعنی حدس $a$ کمتر از حدس $t$ بوده که این تناقض دارد چون ما در هر مرحله کوچکترین حدس را انتخاب می کردیم . 

# نمایش کوتاه ترین مسیر
بعضی وقت ها علاوه بر مقدار کوتاه ترین مسیر ، نمایش مسیری هم که طی می شود را می خواهیم . برای این کار آرایه ایی ز اجداد یک راس مانند $p[]$ در نظر می گیریم که به ازای هر راس $v != s$ ، $p[v]$ شامل جد راس $v$ (راس قبلی) در کوتاه ترین مسیر از $s$ به $v$ خواهد بود . حال می خواهیم از این $fact$ استفاده کنیم که اگر راس $v$ در کوتاه ترین مسیر از $s$ به $v$ را حذف کنیم ، آنگاه مسیری داریم که به $p[v]$ ختم می شود و این مسیر کوتاه ترین مسیر از $s$ به $p[v]$ نیز هست . حال از این آرایه اجداد می توان برای نکه داشتن کوتاه ترین مسیر به هر راسی استفاده کرد . به عنوان مثال اگر بخواهیم کوتاه ترین مسیر به $v$ را نمایش بدهیم باید به طور متداول جد راس فغلی را پیدا کنیم تا زمانی که به $s$ برسیم ولی این آرایه برعکس هست و باید آن را $reverse$ کرد . بنابراین داریم : 
$ Path = (s , ... , p[p[p[v]]] , p[p[v]] , p[v] , v)$
ساختن چنین آرایه ایی بسیار ساده است به این صورت که به ازای هر راس $relax$ کردن از راس $v$ به راس $u$ که $d[u]$ کمتر بشود ، $p[u]$ را آپدیت می کنیم : $p[u] = v$

# پیاده سازی
```C++
#include <iostream>
#include <vector>
#include <set>

using namespace std;

typedef long long ll;

const int maxx = 1e5 + 20;

vector <pair<int , int> > adj[maxx];
set <pair<long long , int> > st; // <Fasele , Shomare raas>

ll INF = 1e15 + 20;
ll dist [maxx];
ll par [maxx];
bool mark[maxx];

void show (int v)
{
	if (par[v] != -1)
		show(par[v]);
	cout << v + 1 << " ";	
}

int main()
{
	ios::sync_with_stdio(false);
	
	int n , m;
	cin >> n >> m;
	int s , t; // mikhahim as raas S be raas T beravim betori ke in masir kutahtarin bashad
	cin >> s >> t;
	s--;
	t--;
	
	for (int i = 0 ; i < m ; i++)
	{
		int u , v , w;
		cin >> u >> v >> w;
		
		u--;
		v--;
		adj[u].push_back(make_pair(v , w));
		adj[v].push_back(make_pair(u , w));
	}
	
	for (int i = 0 ; i < n ; i++)
	{
		dist[i] = INF;
	}
	
	dist[s] = 0;
	par[s] = -1;
	st.insert(make_pair(dist[s] , s));
	
	while (!st.empty())
	{
		int u = st.begin() -> second;
		st.erase(st.begin());
		
		mark[u] = true;
		for (int i = 0 ; i < adj[u].size() ; i++)
		{
			int v = adj[u][i].first;
			int w = adj[u][i].second;
			if (mark[v])
			{
				continue;
			}
			if (dist[u] + w < dist[v])
			{
				st.erase(make_pair(dist[v] , v));
				par[v] = u;
				dist[v] = dist[u] + w;
				st.insert(make_pair(dist[v] , v));
			}
		}
	}
	cout << dist[t] << "\n";
	show(t);
}
```

# مسائل تمرینی 
*[Timus - Ivan's Car](http://acm.timus.ru/problem.aspx?space=1&num=1930)
*[Timus - Sightseeing Trip](http://acm.timus.ru/problem.aspx?space=1&num=1004)
*[SPOJ - SHPATH](https://www.spoj.com/problems/SHPATH/)
*[Codeforces - Dijkstra?](http://codeforces.com/problemset/problem/20/C)
*[Codeforces - Shortest Path](http://codeforces.com/problemset/problem/59/E)
*[Codeforces - Jzzhu and Cities](http://codeforces.com/problemset/problem/449/B)
*[Codeforces - The Classic Problem](http://codeforces.com/problemset/problem/464/E)
*[Codeforces - President and Roads](http://codeforces.com/problemset/problem/567/E)
*[Codeforces - Complete The Graph](http://codeforces.com/problemset/problem/715/B)
*[TopCoder - SkiResorts](https://community.topcoder.com/stat?c=problem_statement&pm=12468)
*[TopCoder - MaliciousPath](https://community.topcoder.com/stat?c=problem_statement&pm=13596)
*[SPOJ - Ada and Trip](https://www.spoj.com/problems/ADATRIP/)
*[LA - 3850 - Here We Go(relians) Again](https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1851)

*[GYM - Destination Unknown (D)](http://codeforces.com/gym/100625)
*[UVA 12950 - Even Obsession](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=4829)
*[GYM - Journey to Grece (A)](http://codeforces.com/gym/100753)
*[UVA 13030 - Brain Fry](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=866&page=show_problem&problem=4918)

*[UVA 1027 - Toll](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=3468)
*[UVA 11377 - Airport Setup](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=2372)
*[Codeforces - Dynamic Shortest Path](http://codeforces.com/problemset/problem/843/D)
*[UVA 11813 - Shopping](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2913)
*[UVA 11833 - Route Change](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=226&page=show_problem&problem=2933)

*[SPOJ - Easy Dijkstra Problem](https://www.spoj.com/problems/EZDIJKST/en/)
*[LA - 2819 - Cave Raider](https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=820)
*[UVA 12144 - Almost Shortest Path](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=3296)
*[UVA 12047 - Highest Paid Toll](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3198)
*[UVA 11514 - Batman](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=2509)
*[Codeforces - Team Rocket Rises Again](http://codeforces.com/contest/757/problem/F)
*[UVA - 11338 - Minefield](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2313)
*[UVA 11374 - Airport Express](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2369)
*[UVA 11097 - Poor My Problem](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2038)
*[UVA 13172 - The music teacher](UVA 13172 - The music teacher)
*[Codeforces - Dirty Arkady's Kitchen](http://codeforces.com/contest/827/problem/F)
*[SPOJ - Delivery Route](https://www.spoj.com/problems/DELIVER/)
*[SPOJ - Costly Chess](https://www.spoj.com/problems/CCHESS/)

[BFS] : BFS
