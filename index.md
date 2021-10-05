---
title: Dashboard
description: Learning site for FIRE!
layout: dashboard
---

### Visiting Statistics

#### Top 3 Pages
1. (Loading...)
{: id="top3"}

{% for chart in site.data.charts.dashboard %}
{% if chart.style == 'chart' %}
{% include chart.html param=chart %}
{% elsif chart.style == 'pie' %}
{% include pie.html param=chart %}
{% endif %}
{% endfor %}

### Achievements

* (Loading...)
{: id="ach" }