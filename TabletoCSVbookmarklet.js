function csvNormalDownload(str) {
    // download as CSV file  //
    var a = document.createElement('a');
    a.href        = 'data:text/csv,' + str;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}

function csvUTF16Download(str) {
    // download as UTF-16 charset CSV file, for Excel //
    
    var a = document.createElement('a');
    a.href        = 'data:text/csv;charset=utf-16,' + str;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}

// check whether the table contains 
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
    var $ = jQuery;
    var tr = $(table).children();
    var tableString = "";

    var tableData = $.map(tr, function(tr) {
     var row = [$.map($(tr).children(), function(td) {
                    return $(td).text();
                })];
     return row;
    });
    
    
    // for each element in each array find ones with a comma and escape it with "/"
    tableData.forEach(function(entry) {
   
      entry.forEach(function(i) {
        //escaping spaces, double quotes and breaks
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



    

