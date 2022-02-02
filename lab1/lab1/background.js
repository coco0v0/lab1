// chrome.history.search({text: 'google', maxResults: 100}, function(historyItems) {
//     console.log(historyItems.length);
//     for (var i = 0; i < historyItems.length; ++i) {
//         console.log(historyItems[i]);
//         // break;
//     }
// });


console.log('fuck');


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension", request);
      if (request.type === "hist_query") {
        
        chrome.history.search({text: request.url, maxResults: 1000, startTime:0}, resp => {
            console.log('searching history for : ' + request.url);
            console.log(resp);
            statics = {}
            result = [];
            for(var i = 0; i < resp.length; i++) {
              let date = new Date(resp[i].lastVisitTime);
              let datastr = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
              console.log(datastr, date);
              if(datastr in statics) {
                statics[datastr] += resp[i].visitCount;
              } else {
                statics[datastr] = resp[i].visitCount;
              }
            };
            console.log(statics);
            for(var key in statics) {
              result.push([key, statics[key]]);
            }
            result.sort((a, b) => {
              var aa = a[0].split('-');
              var bb = b[0].split('-');
              if (parseInt(aa[0]) < parseInt(bb[0])) {
                return -1;
              } else if (parseInt(aa[0]) > parseInt(bb[0])) {
                return 1;
              };
              if (parseInt(aa[1]) < parseInt(bb[1])) {
                return -1;
              } else if (parseInt(aa[1]) > parseInt(bb[1])) {
                return 1;
              }
              if (parseInt(aa[2]) < parseInt(bb[2])) {
                return -1;
              } else if (parseInt(aa[2]) > parseInt(bb[2])) {
                return 1;
              }
              return 0;
            });
            console.log(result);
            sendResponse(result);
        });
      }
      return true;
    }
  );


