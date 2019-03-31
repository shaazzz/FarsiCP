---
layout: Wiki
---

# پیدا کردن عوامل اول یک عدد
در اینجا راجع به چند الگوریتم برای پیدا کردن عوامل اول یک عدد می خوانیم که هرکدام بسته به ورودی که می گیرند ، سریع یا کند اجرا میشوند . دقت کنید اگر عددی که می خواهیم مقسوم علیه هایش را پیدا کنیم اول باشد ، بیشتر الگوریتم ها خیلی کند اجرا می شوند . پس بهتراست قبل از اینکه بخواهیم عدد رو تجزیه کنیم ، ببینیم اول هست یا نه!
# تقسیم کردن $(Trial division)$
این راه راحت ترین الگوریتم برای پیدا کردن عوامل اول است . می توان این الگوریتم رو به این صورت توضیح داد که ما عدد $n$ رو بر هر مقسوم  علیه ممکنی مانند $d$ تقسیم می کنیم و توجه داشته باشید که این غیر ممکن است که عوامل اول یک عدد مرکب مانند $n$ بزرگ تر از $ \sqrt n$ باشند . بنابراین ما فقط نیاز داریم مقسوم علیه هایی مانند $d$ را چک کنیم که $2 <= d <= \sqrt n$ باشند و این تمام اول $n$ را در $Order(\sqrt n)$ به ما می دهد.
کوچکترین مقسوم علیه باید اول باشد . سپس عدد $n$ را تا جایی که بر این عامل بخش پذیر باشد ، تقسیم می کنیم . (این یعنی توان عامل اول $d$ بزرگتر از ۱ است)اگر هیچ عددی در بازه $[2 , \sqrt n]$ بر $n$ بخش پذیر نبود یعنی خود عدد $n$ عددی اول است.
```C++
vector<long long> trial_division1(long long n) 
{
    vector<long long> factorization;
    for (long long d = 2; d * d <= n; d++) 
    {
        while (n % d == 0) 
        {
            factorization.push_back(d);
            n /= d;
        }
    }
    if (n > 1)
        factorization.push_back(n);
    return factorization;
}
```
می توانیم بک بهینه سازی برای این الگوریتم ارائه بدهیم به این صورت که ابتدا چک کنیم که عدد زوج هست یا نه و توان عامل ۲ آن چند است. از آنجایی که می دانیم تنها عدد اول زوج ۲ است پس بعد از اینکه توان عامل ۲ در عدد را پیدا کردیم دیگر لازم نیست که اعداد زوج بین $[3 , \sqrt n]$ را چک کنیم . بنابراین تعداد اعدادی که باید چک کنیم ، تقریبا نصف  می شود.
```C++
vector<long long> trial_division2(long long n) 
{
    vector<long long> factorization;
    while (n % 2 == 0)
    {
        factorization.push_back(2);
        n /= 2;
    }
    for (long long d = 3; d * d <= n; d += 2) 
    {
        while (n % d == 0) 
        {
            factorization.push_back(d);
            n /= d;
        }
    }
    if (n > 1)
        factorization.push_back(n);
    return factorization;
}
```
ما می توانیم این روش را گسترش دهیم به این صورت که اگر عدد $n$ بر ۳ بخش پذیر نبود ، آنگاه می توانیم از چک کردن مضارب ۳ هم صرفه نظر کنیم . بنابراین فقط نیاز داریم تا اعداد ۵ ، ۷ ، ۱۱ ، ۱۳ ، ۱۷ ، ۲۳ ... را چک کنیم . اگر به الگویی که این اعداد دارند ، نگاه کنیم متوجه می شویم که باقی مانده این اعداد بر ۶ یا ۱ است یا ۵ . پس اگر ما فقط این اعداد رو چک کنیم آنکاه تعدادشان تقریبا ۳۳٪ مقدار قبل می شود . حتی باز هم می توانیم جلوتر پیش برویم تا اعداد کمتری چک کنیم . این کد در ابتدا بخش پذیری عدد $n$ بر ۲ و ۳ و ۵ را چک کرده و بعد اعداد اول بین $[7 , \sqrt n]$ را چک میکند .
```C++
vector<long long> trial_division2(long long n) 
{
    vector<long long> factorization;
    while (n % 2 == 0)
    {
        factorization.push_back(2);
        n /= 2;
    }
    for (long long d = 3; d * d <= n; d += 2) 
    {
        while (n % d == 0) 
        {
            factorization.push_back(d);
            n /= d;
        }
    }
    if (n > 1)
        factorization.push_back(n);
    return factorization;
}
```
# چک کردن تنها با استفاده از اعداد اول
هر چه قدر که الگوریتم قبلی را کسترش دهیم متوجه می شویم که هدف ما در واقع این است که تنها اعداد اول رو چک کنیم . بنابراین یک راه خوب این است که در ابتدا با استفاده از غربال اراتستن ، اعداد اول کوچکتر از $ \sqrt n& را پیدا کنیم و سپس بخش پذیری هرکدام را بهه $n$ بررسی کنیم.
```C++
vector<long long> primes;

vector<long long> trial_division4(long long n) 
{
    vector<long long> factorization;
    for (long long d : primes) 
    {
        if (d * d > n)
            break;
        while (n % d == 0) 
        {
            factorization.push_back(d);
            n /= d;
        }
    }
    if (n > 1)
        factorization.push_back(n);
    return factorization;
}
```
# تجزیه با استفاده از فرما 
در ابتدا دقت داشته باشید که عدد فرد مرکب $n = p \cdot q$ را می توان به صورت اختلاف ۲ عدد مربع کامل نوشت : $n = a^{2} - b^{2}$
$n = ((p + q) / 2) ^ {2} - ((p - q) / 2 ^ {2})$
```C++
int fermat(int n)
{
    int a = ceil(sqrt(n));
    int b2 = a*a - n;
    int b = round(sqrt(b2));
    while (b * b != b2) 
    {
        a = a + 1;
        b2 = a*a - n;
        b = round(sqrt(b2));
    }
    return a - b;
}
```
# مسائل تمرینی
* [SPOJ - FACT0](https://www.spoj.com/problems/FACT0/)
* [SPOJ - FACT1](https://www.spoj.com/problems/FACT1/)
* [SPOJ - FACT2](https://www.spoj.com/problems/FACT2/)
* [GCPC 15 - Divisions](https://codeforces.com/gym/100753)
