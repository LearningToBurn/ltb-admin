---
---



function GetData(token){
  return function(path, handler){
    $.ajax({
      url: `{{ site.learntrack.url }}/api/${path}`,
      headers: { 
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": `{{ site.learntrack.api_key }}`
      },
      method: "GET",
      data: {
        year: 2021,
        limit: 3
      }      
    })
    .done(handler)
    .fail(failed);
  }
}

function GetAllData(token){
  const api = GetData(token)
  api("admin/topPages", data =>{
      $("#top3").html("")
      if(Array.isArray(data)){
        data.forEach(line => {
          $("#top3").append($(`<li>${line.src} (${line.count} students)</li>`))
        })
      }else{
        $("#top3").html(data)
      }
    }
  )
  const keys = Object.keys(charts);
  keys.forEach( url => {
    api(url, data =>{
      const d = {labels: data.map(line => line.src), values: data.map(line => line.count)}
      charts[url].data = d
      charts[url].drawFromObject()
    })
  })
}

var loggedIn = function(token){
  if(googleAuthor.googleUser === null)
    $('.pageContent').html("Reload once signed in to view")
  else{
    GetAllData(token)
  }
}
googleAuthor.authSuccess = loggedIn;

function failed(xhr){
  if(xhr.status == 403 || xhr.status == 401)
    window.location = "/"
}

