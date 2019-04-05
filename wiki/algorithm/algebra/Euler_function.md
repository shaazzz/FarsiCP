---
layout: Wiki
---

# تابع فی اویلر 
تابع فی اویلر تعداد اعداد طبیعی در بازه $[1 , n]$ را که نسبت به $n$ اول هستند ، می شمارد . اگر $n$ یک عدد طبیعی مثبت باشد ، آنگاه 
$ \phi (n)$ برابر است با تعداد اعداد طبیعی مانند $k$ که $1 <= k <= n$ به طوری که $gcd(n , k) = 1$ باشد .(دقت کنید که فرض می کنیم ۱ نسبت به هر عدد دیگری اول است)
راجع به[بزرگترین مقسوم علیه مشترک]میتوانید بخوانید.

## محاسبه
می دانیم $ \phi(n) = n\Phi{p|n}1-\frac{1}{p} $ 

## پیاده سازی
این یک پیاده سازی با استفاده از تجزیه $n$ است در $O( \sqrt (n))$
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
## کاربردهای قضیه اویلر
مهم ترین ویژگی در تابع فی اویلر در قضیه اویلر مطرح می شود و به این صورت است که اگر $a , m$ نسبت به هم اول باشند ، داریم : $a^{ \phi (m)} \equiv 1 \mod m$
در حالت به خصوصی که $m$ اول باشد قضیه اویلر تبدیل می شود به قضیه فرمای کوچک که می گوید : $a^{m - 1} \equiv 1 \mod m$
قضیه اویلر و تابع فی اویلر در جاهای زیادی کاربرد دارند به عنوان مثال برای محاسبه [معکوس پیمانه ایی]()
* [SPOJ #4141 "Euler Totient Function"](https://www.spoj.com/problems/ETF/)
* [UVA #10179 "Irreducible Basic Fractions"](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1120)
* [UVA #10299 "Relatives"](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1240)
* [UVA #11327 "Enumerating Rational Numbers"](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2302)
* [TIMUS #1673 "Admission to Exam"](http://acm.timus.ru/problem.aspx?space=1&num=1673)
* [UVA 10990 - Another New Function](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1931)
* [Codechef - Golu and Sweetness](https://www.codechef.com/problems/COZIE)
* [SPOJ - LCM Sum](https://www.spoj.com/problems/LCMSUM/)
* [GYM - Simple Calculations (F)](http://codeforces.com/gym/100975)
* [UVA 13132 - Laser Mirrors](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=5043)
* [SPOJ - GCDEX](https://www.spoj.com/problems/GCDEX/)
* [UVA 12995 - Farey Sequence](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4878)
* [SPOJ - Totient in Permutation (easy)](https://www.spoj.com/problems/TIP1/)
* [LOJ - Mathematically Hard](http://lightoj.com/login_main.php?url=volume_showproblem.php?problem=1007)
* [SPOJ - Totient Extreme](https://www.spoj.com/problems/DCEPCA03/)
* [SPOJ - Playing with GCD](https://www.spoj.com/problems/NAJPWG/)
* [SPOJ - G Force](https://www.spoj.com/problems/DCEPC12G/)
* [SPOJ - Smallest Inverse Euler Totient Function](https://www.spoj.com/problems/INVPHI/)
* [Codeforces - Power Tower](http://codeforces.com/problemset/problem/906/D)

[بزرگترین مقسوم علیه مشترک]:euclid_gcd
[معکوس پیمانه ایی]:modular_inverse
