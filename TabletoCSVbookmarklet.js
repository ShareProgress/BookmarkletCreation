

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
    


    // download as CSV file  //
 
    var a = document.createElement('a');
    a.href        = 'data:text/csv,' + tableString;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}

