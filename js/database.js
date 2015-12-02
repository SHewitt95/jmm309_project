$(document).ready(function() {

  var app = new Ractive({
    el: ".database-rows",
    template: "#row-template",
    data: {
      myJobs: DB,

      // Code from Ractive.js tutorial: http://learn.ractivejs.org/list-sections/5
      sort: function ( array, sortColumn ) {
        array = array.slice();
        return array.sort( function ( a, b ) {
          if (sortColumn == "Min_Pay" || sortColumn == "Min_Hours") {
            // Sorts from least to greatest.
            return a[ sortColumn ] < b[ sortColumn ] ? -1 : 1;
          }
          // Sorts from greatest to least.
          return a[ sortColumn ] < b[ sortColumn ] ? 1 : -1;
        });
      }
    }
  });

  app.on( 'sort', function ( event, column ) {
    this.set( 'myColumn', column );
  });


  function showDB() {
    $(".database-rows").removeClass("hide");
  }

  var myButton = document.getElementById("button");

  //$(".database-rows").addClass("hide");
  myButton.addEventListener("click", showDB, false);

})
