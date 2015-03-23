var $$;

function init() {
    $$ = jQuery;
    $$('table').mouseover( function() {

       var pos = $$(this).offset();
       var width = $$(this).width();
       var height= $$(this).height();
       $$(this).css("cursor","pointer");
       //if table-overlay already exists show it
       if ($$( "div.table-overlay" ).length ) {
        $$( "div.table-overlay" ).show();
       } else {
        // otherwise add a div element with class "table-overlay" to the body element
           $$('body').append($$("<div></div>").addClass("table-overlay"));
           $$('div.table-overlay').append("<div>Click to download table as CSV file</div>");
        }

       //set position, height, width, color of table-overlay to match the table that is hovered over.

       $$('div.table-overlay').offset(pos);
       $$('div.table-overlay').width(width);
       $$('div.table-overlay').height(height);
       $$('div.table-overlay').css({"position": "relative", "background-color": "rgba(0,0,0,0.4)", "z-index":100000, "pointer-events": "none", "cursor": "pointer","display": "table"});
       
       $$('div.table-overlay div').css({"color": "white", "pointer-events": "none","display": "table-cell", "text-align": "center", "vertical-align": "middle", "font-size": "26px", "font-family": "Arial", "font-weight": "800"});
        

    });
    $$('table').mouseleave( function() {
      //when mouse leaves the table, hide the div.table-overlay element.
        $$('div.table-overlay').hide();
    });
    $$('table tbody').click( function() {
      // when table is clicked, start processing the data in table to be downloaded
        var table = $$(this)[0];
        tableData(table);
  })
}function csvNormalDownload(str) {
    // download table as CSV file  //
    var a = document.createElement('a');
    a.href        = 'data:text/csv,' + str;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}

function csvUTF16Download(str) {
    // download table as UTF-16 charset CSV file, for Excel //
    
    var a = document.createElement('a');
    a.href        = 'data:text/csv;charset=utf-16,' + str;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}

// check whether the table contains UTF-16 characters and determine what type of file should be downloaded
function utf16Checker(str) {

    var re = /%u\d/;
    var string = escape(str);
    var res = string.search(re);
    if ( res === -1) {
        csvNormalDownload(str);
    } else {
        csvUTF16Download(str);
        alert("NOTE: Because this table contains special characters, the data has been downloaded in UTF-16 format. This may cause compatibility issues with some spreadsheet programs.");
    }
}


function tableData(table) {

    var tr = $$(table).children();
    var tableString = "";

    var tableData = $$.map(tr, function(tr) {
     var row = [$$.map($$(tr).children(), function(td) {
                    return $$(td).text();
                })];
     return row;
    });
    
    
    tableData.forEach(function(entry) {
   
      entry.forEach(function(i) {
        //for each cell's content escape spaces, double quotes and breaks
        var space = " ",
            re = new RegExp(space, "g"),
            doublequotes = '"';
            linebreak = "\n";
            rdq = new RegExp(doublequotes, "g");
            rlb = new RegExp(linebreak,"g");
        i = i.trim();
        i = i.replace(re, "%20");
        i = i.replace(rdq, '\""');
        i = i.replace(rlb,'%0D');

        //add quotes around entire cell so that commas won't split the cell
        tableString += '"';
        tableString += i;
        tableString += '",';
        
      })

       //remove the last comma in a row so that there isn't an extra column
       tableString = tableString.substring(0, tableString.length - 1);
       tableString += "%0A";
       
    }); 
    utf16Checker(tableString); 
}



    

