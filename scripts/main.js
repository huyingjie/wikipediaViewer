var searchTerm;
$(document).ready(function() {
  $("#clear").click(function(){
    $("#wiki").hide("");
    $("form").addClass("form");
    $("#term").val("");
  });

  $("#form").submit(function(){
    $(this).removeClass("form");
    event.preventDefault();
    var term =  $('#term').val();
    //console.log("term is: " + term);
    var url = createURL(encodeURI(term));
    //window.open(url,'_blank');

    $.getJSON(url, function(json){
      var contents = json.query.search;
      //console.log(contents);
      var html = "<div id='wiki'>";
      if(contents.length == 0) {
        html += "<div class='no-result'>No results found. Try again ! <div style='font-size: 40px'><i class='far fa-smile'></i><div></div>";
      } else {
        for(var i = 0; i < contents.length; i++){
          //console.log("i=",i, ", title", contents[i].title);
          //console.log(contents[i].snippet);
          html += "<a class='search-url' href='https://en.wikipedia.org/?curid=" + contents[i].pageid + "' target='_blank'><div class='search-block'>"
          html += "<p class='search-title'>" + contents[i].title + "</p>";
          html += "<div class='search-result'>" + contents[i].snippet + "</div>";
          html += "</div></a>";
        }
      }
      html += "</div>";
      $("#contents").html(html);
    });

  });

  function createURL(term){
    return "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + term + "&origin=*";
  }

});
