// (C) 2006 by Robert Grimm.
var OFFSET = 3;

function tremble(el) {
  return function() {
    if (! el.trembling) return;
    switch (el.trembleStep) {
    case 0:
      el.style.top  = (parseInt(el.style.top)  - OFFSET) + "px";
      break;
    case 1:
      el.style.left = (parseInt(el.style.left) - OFFSET) + "px";
      break;
    case 2:
      el.style.top  = (parseInt(el.style.top)  + OFFSET) + "px";
      break;
    case 3:
      el.style.left = (parseInt(el.style.left) + OFFSET) + "px";
      break;
    }
    el.trembleStep = (el.trembleStep + 1) % 4;
    setTimeout(tremble(el), 50);
  };
}

function startTrembling() {
  this.trembling   = true;
  this.trembleStep = 0;
  tremble(this)();
}

function stopTrembling() {
  this.trembling  = false;
  this.style.top  = "0px";
  this.style.left = "0px";
}

function init() {
  var idx;
  for (idx = 0; idx<document.images.length; idx++) {
    var img = document.images[idx];

    if ((img.height > 10) && (img.width > 10)) {
      img.trembling      = false;
      img.style.position = "relative";
      img.style.top      = "0px";
      img.style.left     = "0px";
      img.onmouseover    = startTrembling;
      img.onmouseout     = stopTrembling;
    }
  }
}

if (document.images && window.addEventListener) {
  window.addEventListener("load", init, false);
}