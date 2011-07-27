var log_div = document.getElementById("log_div");
var response;
var log_xh=new XMLHttpRequest();
var autoscroll=true;
var enable_button = document.getElementById("enable_button");
var disable_button = document.getElementById("disable_button");
var enable_autoscroll = function() {
    autoscroll=true;
    hide(enable_button);
    show(disable_button);
};
var disable_autoscroll = function() {
    autoscroll=false;
    hide(disable_button);
    show(enable_button);
};
var logUpdate = function() {
    if(DEBUG_ENABLED)
	console.log("log_xh: Ready state change...");
    if (log_xh.readyState==4 && log_xh.status==200) {
	if(DEBUG_ENABLED)
	    console.log("log_xh: Status: 200");
	$(log_div).text(log_xh.responseText);
	show(log_div);
	if(autoscroll)
	    log_div.scrollTop=log_div.scrollHeight;
    }
}
var refresh_log = function() {
    if(DEBUG_ENABLED)
	console.log("log_xh: Sending request...");
    log_xh.onreadystatechange=logUpdate;
    log_xh.open("GET","log/pnd.log",true);
    log_xh.send();
}
hide(log_div);
enable_autoscroll();
refresh_log();
setInterval(refresh_log,5000);