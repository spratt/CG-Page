var log_div = document.getElementById("log_div");
var response;
var log_xh=new XMLHttpRequest();
var autoscroll=true;
var enable_button = document.getElementById("enable_button");
var disable_button = document.getElementById("disable_button");
var enable_autoscroll = function() {
    autoscroll=true;
    disable_button.style.visibility="visible";
    enable_button.style.visibility="hidden";
};
var disable_autoscroll = function() {
    autoscroll=false;
    disable_button.style.visibility="hidden";
    enable_button.style.visibility="visible";
};
var logUpdate = function() {
    console.log("log_xh: Ready state change...");
    if (log_xh.readyState==4 && log_xh.status==200) {
	console.log("log_xh: Status: 200");
	log_div.innerText=log_xh.responseText;
	log_div.style.visibility="visible";
	if(autoscroll)
	    log_div.scrollTop=log_div.scrollHeight;
    }
}
var refresh_log = function() {
    console.log("log_xh: Sending request...");
    log_xh.onreadystatechange=logUpdate;
    log_xh.open("GET","log/pnd.log",true);
    log_xh.send();
}
enable_autoscroll();
refresh_log();
setInterval(refresh_log,5000);