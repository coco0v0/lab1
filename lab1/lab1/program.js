//Check if this is actually the Google search engine and not some other google site.
function isSearch(){
    const classname = document.getElementsByClassName("RNNXgb"); //Class present on one of the divs of the Google search bar.

    if(classname != undefined && classname != null)
        return true;
    else
        return false;
}

console.log("program.js loaded");
// console.log(document.location.origin);

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  
    // create a script DOM node
    script.src = url;  
    // set its src to the provided URL
   
    document.head.appendChild(script); 
    // add it to the end of the head section of the page
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: document.location.origin});
    }
  );


