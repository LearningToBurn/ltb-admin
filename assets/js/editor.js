---
---

function loadForm(DATA) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const url = $("form").attr("action").replace("ID", id)
  DATA.GetData(url, {}, data => {
    $("form input[name='name']").val(data.name)
    $("form input[name='requirement']").val(data.requirement.case)
    $("form").append($('<p><input type="submit" value="Save" /> </p>'))
  }, failed)
  $("form").submit(ev => {
    ev.preventDefault()
    const data = {
      name: $("form input[name='name']").val(),
      requirement: {
        case: $("form input[name='requirement']").val()
      }
    }
    DATA.SaveData(url, data)
    window.location = "{{ site.baseurl }}/"
    return 0
  })
}

var loggedIn = function(token){
  if(googleAuthor.googleUser === null)
    $('.pageContent').html("Reload once signed in to view")
  else{
    var DATA = prepareData(token)
    loadForm(DATA)
  }
}
googleAuthor.authSuccess = loggedIn;

function failed(xhr){
  if(xhr.status == 403 || xhr.status == 401)
    window.location = "/"
}
