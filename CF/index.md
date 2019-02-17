---
layout: Default
---

# ترجمه سوالات کدفرسز

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'CF'"%}
{% for item in folder1 %}
{{item.url}}<br>
{% endfor %}
