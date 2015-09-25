// ==UserScript==
// @name         upboats
// @namespace    http://www.myceliumzero.com
// @version      0.2
// @description  Ruins voting for everyone
// @author       mat dombrock
// @grant        none
// ==/UserScript==

//OPTIONS////////////////////
$option_target = '.up';
$option_use_pagnation = false;
$option_next_anchor = 'next ›';
//OPTIONS////////////////////
//These options get passed as parameters to go_boating() for simplicity of customization

jQuery.fn.scrollToViewPort = function(animTimeInterval) {
  animTimeInterval = (typeof animTimeInterval == "undefined")?"slow":animTimeInterval;
  return this.each(function(){
    $('html,body').animate({scrollTop: $(this).offset().top},animTimeInterval);
  });
}



function simulatedClick(target, options) {
  var event = target.ownerDocument.createEvent('MouseEvents'),
  options = options || {};
  //Set your default options to the right of ||
  var opts = {
    type: options.type                   || 'click',
    canBubble:options.canBubble          || true,
    cancelable:options.cancelable        || true,
    view:options.view                    || target.ownerDocument.defaultView,
    detail:options.detail                || 1,
    screenX:options.screenX              || 0, //The coordinates within the entire page
    screenY:options.screenY              || 0,
    clientX:options.clientX              || 0, //The coordinates within the viewport
    clientY:options.clientY              || 0,
    ctrlKey:options.ctrlKey              || false,
    altKey:options.altKey                || false,
    shiftKey:options.shiftKey            || false,
    metaKey:options.metaKey              || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
    button:options.button                || 0, //0 = left, 1 = middle, 2 = right
    relatedTarget:options.relatedTarget  || null,
  }
  //Pass in the options
  event.initMouseEvent(
    opts.type,
    opts.canBubble,
    opts.cancelable,
    opts.view,
    opts.detail,
    opts.screenX,
    opts.screenY,
    opts.clientX,
    opts.clientY,
    opts.ctrlKey,
    opts.altKey,
    opts.shiftKey,
    opts.metaKey,
    opts.button,
    opts.relatedTarget
  );
//Fire the event
  target.dispatchEvent(event);
}
$pagnation = 0;
$pagnation_total = 10;

//gets boating
function go_boating($target, $use_pagnation, $next_anchor){
  $new_id_list = [];
  $new_id_list.length=0;
  $($target).each(function( index ) {
    console.log( "Aquired Target: "+index);
    $new_id = "marker"+index;
    $new_id_list[index] = $new_id;
    $(this).attr('id', $new_id);
  });
  $i = 0;
  $wait = 1000;
  $done_boating = false;
  console.log('Looping through targets and simulating clicks.');
  iii = setInterval( function(){
      if ($done_boating==false){
        $wait=Math.random()*1000;//waits for a semi random amount of time to look like a human or cat.
        if($wait<500){
          $wait = 500;
        }
        if($i < $new_id_list.length){
          simulatedClick(document.getElementById($new_id_list[$i]));
          $v_target=document.getElementById($new_id_list[$i]);
          $($v_target).scrollToViewPort(600);
          console.log("clicked: "+$i+", waited for: "+$wait);
          $i=$i+1;
        }
        else if ($pagnation < $pagnation_total && $use_pagnation == true){
          $pagnation = $pagnation +1;
          console.log('NEXT PAGE');
          clearInterval(iii);
          //$next_btn=$( ".nextprev:last-child" );
          //$($next_btn).attr('id', 'next_btn');
          $('a').each(function(){
            if ($(this).text()==$next_anchor){
              console.log('founbd nect');
              simulatedClick(this);
            }
          });
          
        }
         else if ($pagnation >= $pagnation_total && $use_pagnation == true){
          console.log('DONE BOATING');
          //$done_boating=true;
          
          clearInterval(iii);
        }
      }
  }, $wait);
}

go_boating($option_target,$option_use_pagnation, $option_next_anchor);
