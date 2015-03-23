if (window.jQuery) { 
    loadScript();
    
} else {
    var jq = document.createElement('script');
    jq.type = 'text/javascript'; 
    jq.onload = function() { 
        console.log('jQuery loading');
        loadScript();
    }   
    jq.src = 'http://code.jquery.com/jquery-1.11.2.min.js';
    document.getElementsByTagName('head')[0].appendChild(jq);
}


function loadScript() {
    var A = document.createElement('script');
    A.type = 'text/javascript'; 
    A.onload = function() { 
        console.log('Script loading');
    }   
    // A.src = 'http://scripts-live.shpg.org/TabletoCSVbookmarklet.js';
    A.src = 'https://rawgit.com/justinelam/Table2CSVDownloader/master/TabletoCSVbookmarklet.js';
    // A.src = 'https://localhost/TabletoCSVbookmarklet.js';
    document.getElementsByTagName('head')[0].appendChild(A);
    mouseActions();
}

function mouseActions() {
    var $ = jQuery;
    $('table').mouseover( function() {

       var pos = $(this).offset();
       var width = $(this).width();
       var height= $(this).height();
       $(this).css("cursor","pointer");
       //if table-overlay already exists show it
       if ($( "div.table-overlay" ).length ) {
        $( "div.table-overlay" ).show();
       } else {
        // otherwise add a div element with class "table-overlay" to the body element
           $('body').append($("<div></div>").addClass("table-overlay"));
           $('div.table-overlay').append("<div>Click to download table as CSV file</div>");
        }

       //set position, height, width, color of table-overlay to match the table that is hovered over.

       $('div.table-overlay').offset(pos);
       $('div.table-overlay').width(width);
       $('div.table-overlay').height(height);
       $('div.table-overlay').css({"position": "relative", "background-color": "rgba(0,0,0,0.4)", "z-index":100000, "pointer-events": "none", "cursor": "pointer","display": "table"});
       
       $('div.table-overlay div').css({"color": "white", "pointer-events": "none","display": "table-cell", "text-align": "center", "vertical-align": "middle", "font-size": "26px", "font-family": "Arial", "font-weight": "800"});
        

    });
    $('table').mouseleave( function() {
      //when mouse leaves the table, hide the div.table-overlay element.
        $('div.table-overlay').hide();
    });
    $('table tbody').click( function() {
      // when table is clicked, start processing the data in table to be downloaded
        var table = $(this)[0];
        tableData(table);
  })
}