---
title: Dashboard
description: Learning site for FIRE!
layout: dashboard
---

## Top 3 Pages
1. Plan - Permits (157 students)
1. Prepare - Notify (120 students)
1. Plan - Smoke Plan (33 students)

{% for chart in site.data.charts.dashboard %}
{% include chart.html param=chart %}
{% endfor %}