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
    a.download    = "UTF-16tabledownload.csv";
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
        alert("Your table data has been downloaded as a UTF-16 formatted csv file, but it still may not open correctly in MS Excel on Mac.");
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
        //escaping spaces and double quotes
        var space = " ",
            re = new RegExp(space, "g"),
            doublequotes = '"';
            rdq = new RegExp(doublequotes, "g");
        i = i.trim();
        i = i.replace(re, "%20");
        i = i.replace(rdq, '\""');
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



    

