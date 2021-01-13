---
---

LTB_API_KEY="asdf"

function GetData(token){
  return function(path, handler){
    $.ajax({
      url: `{{ site.learntrack }}/api/${path}`,
      headers: { 
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": LTB_API_KEY
      },
      method: "GET",
      data: {
        year: 2021,
        limit: 5
      }      
    }).done(handler)
  }
}

function GetAllData(token){
  const api = GetData(token)
  api("admin/topPages", data =>{
      $("#top3").html("")
      data.forEach(line => {
        $("#top3").append($(`<li>${line.src} (${line.count} students)</li>`))
      })
    }
  )
}

var loggedIn = function(token){
  if(googleUser === null)
    $('.pageContent').html("Reload once signed in to view")
  else{
    GetAllData(token)
  }
}

