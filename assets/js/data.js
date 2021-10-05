---
---

function prepareData(token){
  const DATA = {
    GetData: function(path, params, handler, failed){
      $.ajax({
        url: `{{ site.learntrack.url }}/api/${path}`,
        headers: { 
          "Authorization": `Bearer ${token}`,
          "X-API-KEY": `{{ site.learntrack.api_key }}`
        },
        method: "GET",
        data: params   
      })
      .done(handler)
      .fail(failed);
    },
    SaveData: function(path, data, handler, failed){
      $.ajax({
        url: `{{ site.learntrack.url }}/api/${path}`,
        headers: { 
          "Authorization": `Bearer ${token}`,
          "X-API-KEY": `{{ site.learntrack.api_key }}`
        },
        method: "POST",
        data: JSON.stringify(data)
      })
      .done(handler)
      .fail(failed);
    },

    asList: function(data, elem, formatter) {
      $(elem).html("")
      if(Array.isArray(data)){
        data.forEach(line => {
          $(elem).append($(`<li>${formatter(line)}</li>`))
        })
      }else{
        $(elem).html(data)
      }
    },

    asTableRows: function(data, elem, formatter) {
      $(elem).find("td").remove()
      if(Array.isArray(data)){
        data.forEach(line => {
          $(elem).append($(`${formatter(line)}`))
        })
      }else{
        $(elem).html(data)
      }
    },

    GetAllData: function(failed){
      DATA.GetData("reports/topPages", {year: 2021, limit: 3}, data => DATA.asList(data.slice(1), "#top3", line => `${line.label} (${line.value} visits)`), failed)
      DATA.GetData("admin/achievements", {}, data => DATA.asList(data, "#ach", line => `<a href="editAchievement?id=${line.name}">${line.name} </a>`), failed)
      const keys = Object.keys(charts);
      keys.forEach( url => {
        const limit = charts[url].limit
        DATA.GetData(url, {year: 2021, limit: limit}, data =>{
          const d = {labels: data.map(line => line.label), values: data.map(line => line.value)}
          charts[url].chart.data = d
          charts[url].chart.drawFromObject()
        },
        failed)
      })
    }

  }
  return DATA
}