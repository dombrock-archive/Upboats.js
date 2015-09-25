# Upboats.js
Automatically votes on websites like Reddit and Voat. 

Upboats.js should be used used with a user script manager like "GreaseMonkey" or "TamperMonkey". If you do not wish to use one of these managers, the code will also work in the JS console found on most modern browsers. 

Set up your options with the code block starting at line 10:
````
//OPTIONS////////////////////
$option_target = '.up';
$option_use_pagnation = false;
$option_next_anchor = 'next ›';
//OPTIONS////////////////////
````
"$options_target" Should be your target, targets should be a CSS class. 

"$option_use_pagnation" Should be set to true if you want the script to try to move to the next page and continue voting when it is done with the current page.

"$option_next_anchor" Is required for the pagination to work, this should be the link anchor text of the next button on the page. This could be extended using custom RegEx. 

This software emulates actual mouse clicks on the page instead of attempting to use the built in click() of Jquery. 
 
This software works by indexing all of the targets (your specified CSS class) on the page and moving through them one by one. Also, instead of clicking all targets at a uniform interval and moving through them as quickly as possible, this software will move through them with a semi-random interval (Usually around 500ms).

All of these things together should make this a nearly undetectable clicking machine. 

###WARNING: 
Using this software is 100% in violation of the Reddit terms of service (and probably the TOS of any site you might visit). This exists for illustrative purposes only and should not be used by anyone anywhere for any reason. 
