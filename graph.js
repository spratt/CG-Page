// load google's corechart package
google.load("visualization", "1", {packages:["annotatedtimeline"]});
/******************************************************************************
* Graph                                                                       *
******************************************************************************/
var graph_div = document.getElementById("graph_div");
var data = new Array();
var datum = function() {
    return {"date":null,"downtime":0};
}
var drawGraph = function() {
    data.sort(function(a,b) {
	return a.date > b.date;
    });
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('date','Date');
    dataTable.addColumn('number','Downtime');
    dataTable.addColumn('string', 'title1');
    dataTable.addColumn('string', 'text1');
    dataTable.addRows(data.length);
    for(var i = 0; i < data.length; ++i) {
	dataTable.setValue(i, 0, data[i].date);
	dataTable.setValue(i, 1, Number(data[i].downtime));
	console.log(data[i].date.getTime());
	if(data[i].date.getTime() == 1311307200000) {
	    dataTable.setValue(i, 2, "Traffic Shaper disabled");
	    dataTable.setValue(i, 3, "Traffic Shaper disabled");
	} else {
	    dataTable.setValue(i, 2, undefined);
	    dataTable.setValue(i, 3, undefined);
	}	    
    }
    var chart = new google.visualization.AnnotatedTimeLine(graph_div);
    chart.draw(dataTable, {width: '100%',
                           height: 400,
			   'displayAnnotations': true
			  });
}
/******************************************************************************
* Parse files for total downtime each day                                     *
******************************************************************************/
var file_xh=new XMLHttpRequest();
var num_of_files;
var files_parsed = 0;
var parseLogText = function(text) {
    var lines = text.split("\n");
    var date_line = lines[0];
    var downtime_line = lines[lines.length-2];
    if(downtime_line.indexOf("downtime") == -1) return null;
    var toReturn = new datum();
    date_line = date_line.substr(0,date_line.lastIndexOf(":"));
    toReturn.date = new Date(date_line);
    toReturn.date.setHours(0);
    toReturn.date.setMinutes(0);
    toReturn.date.setSeconds(0);
    downtime_line = downtime_line.substr(downtime_line.indexOf(":")+2);
    toReturn.downtime = downtime_line.substr(0,downtime_line.indexOf("s")-1);
    return toReturn;
}
var normalOnReadyStateChange = function() {
    console.log("file_xh: Normal file...");
    if (file_xh.readyState==4 && file_xh.status==200) {
	++files_parsed;
	var datum = parseLogText(file_xh.responseText);
	if(datum != null) data.push(datum);
	if(files_parsed == num_of_files) {
	    console.log("file_xh: Last file...");
	    drawGraph();
	}
    }
}
var parseFiles = function(files) {
    num_of_files = files.length;
    for(var i = 0; i < num_of_files; ++i) {
	file_xh.onreadystatechange=normalOnReadyStateChange;
	file_xh.open("GET","log/" + files[i],false);
	file_xh.send();
    }
}
/******************************************************************************
* Retrieve the list of files                                                  *
******************************************************************************/
var parseDirectoryListing = function(text) {
    var files = new Array();
    var lines = text.split('\n');
    for(var i in lines) {
	var line = lines[i];
	if(line.indexOf("pnd.log") != -1) {
	    // parse line
	    var file = line.substr(line.indexOf("href=\"")+6);
	    file = file.substr(0,file.indexOf("\""));
	    files.push(file);
	}
    }
    return files;
}
var files_xh=new XMLHttpRequest();
files_xh.onreadystatechange=function() {
    console.log("files_xh: Ready state change...");
    if (files_xh.readyState==4 && files_xh.status==200) {
	console.log("files_xh: Status: 200");
	parseFiles(parseDirectoryListing(files_xh.responseText));
    }
}
var get_files = function() {
    files_xh.open("GET","log/",true);
    files_xh.send();
}