---
---

function loadForm(DATA) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const url = $("form").attr("action").replace("ID", id)
  DATA.GetData(url, {}, data => {
    $("form input[name='name']").val(data.name)
    $("form input[name='description']").val(data.description)
    
    for(condItem of data.conditions){
      var conditionRoot = addCondition()
      conditionRoot.find("select[name='calculation']").val(condItem.condition.calculation.case)
      conditionRoot.find("select[name='comparison']").val(condItem.condition.comparison.case)
      conditionRoot.find("input[name='comparisonValue']").val(condItem.condition.comparison.fields[0])
      for(restriction of condItem.restrictions){
        var restrictionRoot = addRestriction(conditionRoot)
        restrictionRoot.find("select[name='restriction']").val(restriction.case)
        restrictionRoot.find("input[name='restrictionValue']").val(restriction.fields[0])
      }
    }

    $("form").append($('<p><input type="submit" value="Save" /> </p>'))
  }, failed)
  $("form").submit(ev => {
    ev.preventDefault()
    const data = {
      name: $("form input[name='name']").val(),
      description: $("form input[name='description']").val(),
      conditions: $("form .condition").map( function(i) {
        var condItem = $(this)
        return {
          condition: {
            calculation: {
              case: condItem.find("select[name='calculation']").val()
            },
            comparison: {
              case: condItem.find("select[name='comparison']").val(),
              fields: [
                condItem.find("input[name='comparisonValue']").val()
              ]
            }
          },
          restrictions: condItem.find(".restriction").map( function(i) {
            var restriction = $(this)
            return {
              case: restriction.find("select[name='restriction']").val(),
              fields: [
                restriction.find("input[name='restrictionValue']").val()
              ]
            }
          }).toArray()
        }
      }).toArray(),

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
    $('#addCondition').click( addCondition );
  }
}
googleAuthor.authSuccess = loggedIn;

function failed(xhr){
  if(xhr.status == 403 || xhr.status == 401)
    window.location = "/"
}

function addCondition(){
  var cond = $('#conditionTemplate').clone(true).prop('id', '').css('display','block').insertBefore($('#addCondition'))
  cond.find("#addRestriction").click(() => addRestriction(cond))
  return cond
}

function addRestriction(conditionRoot){
  return $('#restrictionTemplate').clone(true).prop('id', '').css('display','block').insertBefore(conditionRoot.find('#addRestriction'))
}