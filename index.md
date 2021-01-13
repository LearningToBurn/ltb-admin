---
title: Dashboard
description: Learning site for FIRE!
layout: dashboard
---

## Top 3 Pages
1. (Loading...)
{: id="top3"}

{% for chart in site.data.charts.dashboard %}
{% include chart.html param=chart %}
{% endfor %}
