---
layout: Wiki
---

# غربال اراتوستن برای یافتن اعداد اول

غربال اراتستن الگوریتمی برای پیدا کردن تمام اعداد اول بین $[1,n]$ در $Order(nloglogn)$  میباشد. این الگوریتم بسیار ساده است: به این صورت که در ابتدا تمام اعداد بین 2 تا $n$ را مینویسیم. سپس تمام مضارب 2 را که اعدادی مرکب هستند، خط میزنیم و میدانیم که عدد 2 اولین عدد اول است. دقت کنید که مضرب عدد $x$، عددی است بزرگتر از $x$ که بر $x$ بخش پذیر است. سپس عدد بعدی که خط نخورده است، انتخاب کرده و تمام مضارب آن را هم خط میزنیم. در این مثال عدد بعدی 3 است و این بدین معناست که 3 هم عدد اول است. عدد بعدی که خط نخورده، 5 است. پس این هم یک عدد اول است و بعد از آن تمام مضارب عدد 5 را خط میزنیم و همین کار را ادامه میدهیم تا زمانی که تمام اعداد از 2 تا $n$ یا به عنوان عدد اول شناخته شوند یا خط خورده باشند و اعدادی مرکب باشند. در واقع ایده ای که پشت این الگوریتم است بدین شرح است که، عددی اول است که بر هیچ کدام از اعداد اول کوچکترش بخش پذیر نباشد و در واقع خط نخورده باشد. چون اعدادی که خط خورده اند بر حداقل یکی از اعداد اول کوچکتر از خودشان  بخش پذیر هستند. بنابراین اگر به عددی رسیدیم که خط نخورده بود، اول است. زیرا بر هیچکدام از اعداد اول قبل از خودش بخش پذیر نبوده است.

```C++
int n;
vector<char> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i <= n; i++) {
    if (is_prime[i] && (long long)i * i <= n) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```    
در این کد ابتدا تمام اعداد به جز صفر و یک، به عنوان اعدادی اول فرض میشوند و بعد از آن شروع میکنیم به غربال کردن اعداد مرکب بین 2 تا $n$.  اگر عدد فعلی $i$ عددی اول باشد، تمام مضارب $i$ با شروع از $i^2$ به عنوان اعدادی مرکب خط میخورند. برای این از $i^2$ شروع میکنیم به خط زدن مضارب $i$، چون تمام مضارب $i$ که از خود آن کوچکترند به طور حتمی دارای عامل اولی بوده اند که از $i$ کوچکتر بوده است و توسط آن عامل، خط خورده اند.
    
از آنجایی که $i^2$ به راحتی میتواند از `int` بیرون بزند، از `long long` استفاده میکنیم.
    
پیاده سازی غربال اراتستن به این صورت $O(n)$ از memory استفاده میکند و در $O(nloglogn)$ اجرا میشود.

**یک بهینه سازی متفاوت دیگر از غربال اراتستن**

بزرگترین مشکل این الگوریتم این است که چندین بار روی memory پیش می رود که این باعث میشود که عدد ثابتی که در $O(nloglogn)$ پنهان شده، بیشتر و بزرگتر شود و همچنین باعث میشود برای $n$ های بزرگ memory کم بیاید.

**غربال تا رسیدن به ریشه**

واضح است برای پیدا کردن اعداد اول تا $n$ کافی است با استفاده از اعداد اولی که از $ \sqrt n$ بیشتر نیست، غربال کنیم.
 
این بهینه سازی تاثیری در پیچیدگی زمانی ندارد. در عوض با توجه به دلیل بالا به یک تقریب بهتر با $nlnln \sqrt n + O(n)$ میرسیم و تعداد بارهایی که این عملیات انجام میشود، کاهش چشمگیری پیدا میکند.

### پیاده سازی
```C++
int n;
vector<char> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= n; i++) {
    if (is_prime[i]) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```

**غربال کردن تنها با استفاده از اعداد فرد**

از آنجایی که تمام اعداد زوج به جز 2، عددی مرکب هستند پس ما دیگر اعداد زوج را چک نمیکنیم که اول باشند و این عملیات ها را تنها روی اعداد فرد انجام میدهیم.

این عمل باعث میشود memory مورد نیاز  و تعداد بارهایی که عملیات غربال انجام میشود تقریبا نصف شود.

## پیاده سازی با بیت ست
غربال می تواند با بیت ست پیاده شود که مموری اش $ \frac{n}{8} $ است اما زمان اجرای آن به دلیل نیاز به عملیات های بیتی برای هر تغییر اندکی بیشتر است.
اگر $n$ جوری باشد که نمی توانید $n$ بایت مموری بگیرید از این روش استفاده کنید.

## پیاده سازی با بلاک های رادیکالی
در زیر یک پیاده سازی با بلاک های رادیکالی وجود دارد که مموری آن به اندازه تعداد اعداد اول پیدا شده است و
مموری ای که الگوریتم از آن استفاده می کند $O(\sqrt{n})$ است پس از لحاظ کش و زمان اجرا خیلی بهتر است.
### پیاده سازی
```C++
int count_primes(int n) {
    const int S = 10000;

    vector<int> primes;
    int nsqrt = sqrt(n);
    vector<char> is_prime(nsqrt + 1, true);
    for (int i = 2; i <= nsqrt; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            for (int j = i * i; j <= nsqrt; j += i)
                is_prime[j] = false;
        }
    }

    int result = 0;
    vector<char> block(S);
    for (int k = 0; k * S <= n; k++) {
        fill(block.begin(), block.end(), true);
        int start = k * S;
        for (int p : primes) {
            int start_idx = (start + p - 1) / p;
            int j = max(start_idx, p) * p - start;
            for (; j < S; j += p)
                block[j] = false;
        }
        if (k == 0)
            block[0] = block[1] = false;
        for (int i = 0; i < S && start + i <= n; i++) {
            if (block[i])
                result++;
        }
    }
    return result;
}
```

## مسائل تمرینی

* [SPOJ - Printing Some Primes](http://www.spoj.com/problems/TDPRIMES/)
* [SPOJ - A Conjecture of Paul Erdos](http://www.spoj.com/problems/HS08PAUL/)
* [SPOJ - Primal Fear](http://www.spoj.com/problems/VECTAR8/)
* [SPOJ - Primes Triangle (I)](http://www.spoj.com/problems/PTRI/)
* [Codeforces - Almost Prime](http://codeforces.com/contest/26/problem/A)
* [Codeforces - Sherlock And His Girlfriend](http://codeforces.com/contest/776/problem/B)
* [SPOJ - Namit in Trouble](http://www.spoj.com/problems/NGIRL/)
* [SPOJ - Bazinga!](http://www.spoj.com/problems/DCEPC505/)
* [Project Euler - Prime pair connection](https://www.hackerrank.com/contests/projecteuler/challenges/euler134)
* [SPOJ - N-Factorful](http://www.spoj.com/problems/NFACTOR/)
* [SPOJ - Binary Sequence of Prime Numbers](http://www.spoj.com/problems/BSPRIME/)
* [UVA 11353 - A Different Kind of Sorting](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2338)
* [SPOJ - Printing some primes (hard)](http://www.spoj.com/problems/PRIMES2/)
* [Codeforces - Nodbach Problem](https://codeforces.com/problemset/problem/17/A)
* [Codefoces - Colliders](https://codeforces.com/problemset/problem/154/B)
