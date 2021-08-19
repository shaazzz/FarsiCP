---
layout: Default
---

# ترجمه سوالات کدفرسز

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'CF'"%}
<ol>
{% for item in folder1 %}
  <li><a href="{{item.url}}">{{item.url}}</a></li>
{% endfor %}
</ol>
