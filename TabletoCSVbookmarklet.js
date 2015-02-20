

function tableData(table) {
    var tr = $(table).find('tr');
    var tableString = "";

    var tableData = $.map(tr, function(tr) {
     return [$.map($(tr), function(td) {
        return $(td).children().text();
     })];
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
       tableString += "%0A ";
    });    
    
    console.log(tableData);

    // download as CSV file  //
 
    var a = document.createElement('a');
    a.href        = 'data:attachment/csv,' + tableString;
    a.target      = '_blank';
    a.download    = "tabledownload.csv";
    document.body.appendChild(a);
    a.click();
}
