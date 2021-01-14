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
}

var loggedIn = function(token){
  if(googleAuthor.googleUser === null)
    $('.pageContent').html("Reload once signed in to view")
  else{
    GetAllData(token)
  }
}
googleAuthor.authSuccess = loggedIn;

function failed(){
  window.location = "/"
}