$(document).ready(function() {

  //var myDB = $("#database");
  /*
  for (var i = 0; i < DB.length; i++) {
    myDB.append( document.createTextNode(DB[i].Job_Title) );
  }
  */

  //console.log(DB[0].Job_Title);


  var jobTitles = [];
  for (var i = 0; i < DB.length; i++) {
    jobTitles.push(DB[i].Job_Title);
  }
  


  //console.log(jobTitles);
  //console.log(DB);

  var app = new Ractive({
    el: "#database-rows",
    template: "#row-template",
    data: {
      myJobs: jobTitles
      //skills: _.keys(DB.skills)
    }

  });

})
