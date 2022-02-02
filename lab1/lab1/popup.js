

function log(msg) {
    // this is a function for debug
    return;
    console.log(msg);
    try {
        document.getElementById("logs").innerHTML += msg + "<br>";
    } catch (e) {
        console.log(msg);
    }
}


window.addEventListener('load', (event) => {
    //Initialization////////////////////////////////////////////////////
    console.log(chrome.runtime.id);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
            // send messages to get the origin from the page
            var origin = response.farewell;
            log('get origin: ' + origin);
            document.getElementById("title").innerHTML = 'Visit counts of ' + origin;
            // Now got the origin, send message to get the history data
            chrome.runtime.sendMessage(
                chrome.runtime.id,
                { type: "hist_query", url: origin },
                callback = function (response) {
                    log(response);
                    _history_cache = response;
                    _data_cache = {};
                    // var myChart = echarts.init(document.getElementById('main'));
                    // myChart.setOption(option);
                    log("Good now");
                    log(chrome.extension.getBackgroundPage());
                    var myChart = echarts.init(document.getElementById('main'));

                    // Specify the configuration items and data for the chart
                    var option = {
                        // title: {
                        //     text: ,
                        // },
                        tooltip: {},
                        legend: {
                            data: ['visits']
                        },
                        xAxis: {
                            type: 'time',
                            axisLabel: {
                                rotate:60
                            }                      
                        },
                        yAxis: {},
                        series: [
                            {
                                name: 'visits',
                                type: 'line',
                                data: response
                            }
                        ]
                    };

                    // Display the chart using the configuration items and data just specified.
                    myChart.setOption(option);
                }
            );
        });
    });



    // Initialize the echarts instance based on the prepared dom
    log('loaded echarts')

});


