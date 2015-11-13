$(document).ready(function() {
  var myDB = $("#database");

  for (var i = 0; i < DB.length; i++) {
    myDB.append( document.createTextNode(DB[i].Job_Title) );
  }

  console.log(DB[0].Job_Title);
})
