---
layout: Wiki
---

# تابع فی اویلر 
تابع فی اویلر تعداد اعداد طبیعی در بازه $[1 , n]$ را که نسبت به $n$ اول هستند ، می شمارد . اگر $n$ یک عدد طبیعی مثبت باشد ، آنگاه 
$ \phi (n)$ برابر است با تعداد اعداد طبیعی مانند $k$ که $1 <= k <= n$ به طوری که $gcd(n , k) = 1$ باشد .(دقت کنید که فرض می کنیم ۱ نسبت به هر عدد دیگری اول است)
راجع به[بزرگترین مقسوم علیه مشترک]میتوانید بخوانید.

# ویژگی ها
ویژگی هایی که برای تابع فی اویلر در زیر گفته شده برای محاسبه $ \phi (n)$ به ازای هر عدد کافی است :
$1.$ اگر $p$ عددی اول باشد ، آنگاه $gcd(p , q) = 1$ به ازای تمام $q$ هایی که $1 <= q < p$ هستند . پس :
$ \phi (p) = p - 1$
$2.$ اگر $p$ عددی اول باشد و $K >= 1$ باشد آنگاه دقیقا $p^{k} / p$ عدد بین ۱ تا $p^{k}$ هستند که بر $p$ بخش پذیر هستند . پس داریم :
$ \phi (p^{k - 1}) = p^{k} - p^{k - 1}$
$3.$ اگر $a , b$ نسبت به هم اول باشند ، آنگاه :  $ \phi (ab) = \phi (a) . \phi (b) $
اثبات این بخش زیاد بدیهی نیست و باید با قضیه باقی مانده چینی $[Chinese remainder theorem](https://cp-algorithms.com/algebra/chinese-remainder-theorem.html)$ آن را اثبات کرد . این قضیه تضمین می کند که
به ازای هر $x , y$ که  & 0 <= x < a , 0 <= y < b& هستند ، وجود دارد $0 <= z < ab$ که z  \equiv x \mod a , z  \equiv y \mod b$ . اگر بخواهیم
ثابت کنیم که $z$ نسبت به $a , b$ اول است باید نشان دهیم که $x$ نسبت به $a& و $y$ نسبت به $b$ اول هستند و این قضیه دوطرفه است .
بنابراین تعداد اعدادی که نسبت به $ab$ اول هستند برابر است با ضرب تعداد اعدادی که نسبت به $a$ اول هستند در تعداد اعدادی که نسبت به &b& اول هستند.
$4.$ اگر $a , b$ نسبت به هم اول نباشند ، آنگاه : $ \phi (ab) = \phi (a) . \phi (b) . (d / \phi (d))$ که $gcd(a , b) = d$
بنابراین ما می توانیم از ۳تا ویژگی های بالا استفاده کنیم و $ \phi (n)$ را با استفاده از عوامل اول $n$ حساب کنیم .
اگر $ n = p(1)^{a(1)} . p(2)^{a(2)}. ... . p(k)^{a(k)} &که $p(i)$ عامل $i$ام اول $n$ است آنگاه :
$ \phi (n) = \phi (p(1)^{a(1)}) . \phi (p(2)^{a(2)}) . ... . \phi (p(k)^{a(k)}) = (p(1)^{a(1)} - p(1)^{a(1)-1}) . (p(2)^{a(2)} - p(2)^{a(2)-1}) . ... . (p(k)^{a(k)} - p(k)^{a(k)-1})
= p(1)^{a(1)}(1 - 1/p(1)) . p(2)^{a(2)}(1 - 1/p(2)) . ... .p(k)^{a(k)}(1 - 1/p(k)) = n . (1 - 1/p(1)) . (1 - 1\p(2)) . ... .(1 - 1/p(k))

# پیاده سازی
این یک پیاده سازی با استفاده از تجزیه $n$ است در $Order( \sqrt (n))&
```C++
int phi(int n) 
{
    int result = n;
    for (int i = 2; i * i <= n; i++) 
    {
        if(n % i == 0) 
        {
            while(n % i == 0)
                n /= i;
            result -= result / i;
        }
    }
    if(n > 1)
        result -= result / n;
    return result;
}

```
# کاربردهای قضیه اویلر
مهم ترین ویژگی در تابع فی اویلر در قضیه اویلر مطرح می شود و به این صورت است که اگر $a , m$ نسبت به هم اول باشند ، داریم : $a^{ \phi (m)} \equiv 1 \mod m$
در حالت به خصوصی که $m$ اول باشد قضیه اویلر تبدیل می شود به قضیه فرمای کوچک که می گوید : $a^{m - 1} \equiv 1 \mod m$
قضیه اویلر و تابع فی اویلر در جاهای زیادی کاربرد دارند به عنوان مثال برای محاسبه [معکوس پیمانه ایی]()
*[SPOJ #4141 "Euler Totient Function"](https://www.spoj.com/problems/ETF/)
*[UVA #10179 "Irreducible Basic Fractions"](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1120)
*[UVA #10299 "Relatives"](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1240)
*[UVA #11327 "Enumerating Rational Numbers"](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2302)
*[TIMUS #1673 "Admission to Exam"](http://acm.timus.ru/problem.aspx?space=1&num=1673)
*[UVA 10990 - Another New Function](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1931)
*[Codechef - Golu and Sweetness](https://www.codechef.com/problems/COZIE)
*[SPOJ - LCM Sum](https://www.spoj.com/problems/LCMSUM/)
*[GYM - Simple Calculations (F)](http://codeforces.com/gym/100975)
*[UVA 13132 - Laser Mirrors](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=5043)
*[SPOJ - GCDEX](https://www.spoj.com/problems/GCDEX/)
*[UVA 12995 - Farey Sequence](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4878)
*[SPOJ - Totient in Permutation (easy)](https://www.spoj.com/problems/TIP1/)
*[LOJ - Mathematically Hard](http://lightoj.com/login_main.php?url=volume_showproblem.php?problem=1007)
*[SPOJ - Totient Extreme](https://www.spoj.com/problems/DCEPCA03/)
*[SPOJ - Playing with GCD](https://www.spoj.com/problems/NAJPWG/)
*[SPOJ - G Force](https://www.spoj.com/problems/DCEPC12G/)
*[SPOJ - Smallest Inverse Euler Totient Function](https://www.spoj.com/problems/INVPHI/)
*[Codeforces - Power Tower](http://codeforces.com/problemset/problem/906/D)

[بزرگترین مقسوم علیه مشترک]:euclid_gcd
[معکوس پیمانه ایی]:modular_inverse
