---
title: Dashboard
description: Learning site for FIRE!
layout: dashboard
---

## Top 3 Pages this month
1. Plan - Permits (157 hits)
1. Prepare - Notify (120 hits)
1. Plan - Smoke Plan (33 hits)

{:id="vis0"}
&nbsp;

<script>

  new roughViz.Bar(
  {
    element: '#vis0',
    data: {
      labels: ['Plan - Permits', 'Prepare - Notify', 'Plan - Smoke Plan',  'A', 'B', 'C'],
      values: [157, 120, 33, 5, 5, 3]
    },
    // data: 'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
    title: 'Pages',
    width: window.innerWidth / 3,
    stroke: 'coral',
    strokeWidth: 3,
    color: 'pink',
    fillWeight: 1.5,
  }
);
</script>