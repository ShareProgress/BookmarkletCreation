// change the scriptURL variable to add your own script file

var scriptURL = "https://scripts.shpg.org/TabletoCSVbookmarklet.js";
//'//localhost/TabletoCSVbookmarklet.js'; shareprogress-scripts.s3-website-us-west-2.amazonaws.com/TabletoCSVbookmarklet.js; //rawgit.com/justinelam/Table2CSVDownloader/master/TabletoCSVbookmarklet.js //scripts-live.shpg.org/TabletoCSVbookmarklet.js //localhost/TabletoCSVbookmarklet.js //rawgit.com/justinelam/Table2CSVDownloader/master/TabletoCSVbookmarklet.js


if (window.jQuery) { 
    loadScript();
    
} else {
    var jq = document.createElement('script');
    jq.type = 'text/javascript'; 
    jq.onload = function() { 
        loadScript();
    }   
    jq.src = '//code.jquery.com/jquery-2.1.3.js';
    document.getElementsByTagName('head')[0].appendChild(jq);
}


function loadScript() {

  //add new script file to the DOM then run the init function in script file. Change the init() to whatever function you need to run.

    var A = document.createElement('script');
    A.type = 'text/javascript'; 
    A.onload = function() { 
    }   
    A.src = scriptURL;
    document.getElementsByTagName('head')[0].appendChild(A);
    
}

