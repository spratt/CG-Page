var DEBUG_ENABLED=false;
if(typeof console != 'undefined')
    DEBUG_ENABLED=true;
var hide = function(DOMob) {
    DOMob.style.visibility = 'hidden';
    DOMob.style.display    = 'none';
}
var show = function(DOMob) {
    DOMob.style.visibility = 'visible';
    DOMob.style.display    = 'block';
}