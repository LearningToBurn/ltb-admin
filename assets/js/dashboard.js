

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


$(function(){
  $('.pageContent h3, .pageContent h1').each(function(i, h3){
    const sect = $(h3).nextUntil('h3').addBack().wrapAll(`<section class="section_${ i % 4 }"></section>`);
    [...h3.attributes]
      .filter(x => x.nodeName !== "id")
      .map( x => x.nodeName === "data-bg" ? {"nodeName": "style", "nodeValue": `background-image: url('${x.nodeValue}');`} : x)
      .forEach( attr => {
        const val = h3.parentElement.getAttribute(attr.nodeName) ? h3.parentElement.getAttribute(attr.nodeName) + " " + attr.nodeValue: attr.nodeValue;
        h3.parentElement.setAttribute(attr.nodeName, val) 
      });
    $(h3).parent().addClass(h3.classList)
  })
});
