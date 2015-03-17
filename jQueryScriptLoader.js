if (window.jQuery) { 
    loadScript();
    
} else {
    var jq = document.createElement('script');
    jq.type = 'text/javascript'; 
    jq.onload = function() { 
        console.log('jQuery loading');
        loadScript();
    }   
    jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js';
    document.getElementsByTagName('head')[0].appendChild(jq);
}

function loadScript() {
    var A = document.createElement('script');
    A.type = 'text/javascript'; 
    A.onload = function() { 
        console.log('Script loading');
    }   
    A.src = 'https://rawgit.com/justinelam/Table2CSVDownloader/master/TabletoCSVbookmarklet.js';
    document.getElementsByTagName('head')[0].appendChild(A);
    mouseActions();
}

function mouseActions() {
    jQuery('table').mouseover( function() {
       $(this).css('border','5px black solid');
    });
    jQuery('table').mouseleave( function() {
        $(this).css('border', 'none');
    });
    jQuery('table tbody').click( function() {
        var table = $(this)[0];
        tableData(table);
        findPosition(table);
    })
}