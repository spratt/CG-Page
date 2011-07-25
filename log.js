var log_div = document.getElementById("log_div");
var response;
var log_xh=new XMLHttpRequest();
var logUpdate = function() {
    console.log("log_xh: Ready state change...");
    if (log_xh.readyState==4 && log_xh.status==200) {
	console.log("log_xh: Status: 200");
	log_div.innerText=log_xh.responseText;
	log_div.style.visibility="visible";
	log_div.scrollTop=log_div.scrollHeight;
    }
}
var refresh_log = function() {
    console.log("log_xh: Sending request...");
    log_xh.onreadystatechange=logUpdate;
    log_xh.open("GET","log/pnd.log",true);
    log_xh.send();
}
refresh_log();
setInterval(refresh_log,5000);