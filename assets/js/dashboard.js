

var loggedIn = function(token){
  if(googleAuthor.googleUser === null)
    $('.pageContent').html("Reload once signed in to view")
  else{
    var data = prepareData(token)
    data.GetAllData(failed)
  }
}
googleAuthor.authSuccess = loggedIn;

function failed(xhr){
  if(xhr.status == 403 || xhr.status == 401)
    window.location = "/"
}
