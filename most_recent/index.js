document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("switch_status")
      .addEventListener("input", function () {
        if (this.value) {
          chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            function (tabs) {
              let url = tabs[0].url;
              let url_id = String(url).split('/p/')[1].slice(0, -2)
              alert(url_id);
            $.ajax({
                type: 'GET',
                url: "http://127.0.0.1:5000/api/sendURL?api_url="+url_id,
                success:function(data){
                    alert('success')
                }
            });
            }
          );
        }
      });
  });
// chrome.tabs.onActivated.addListener( function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         y = tab.url;
//         console.log("you are here: "+y);
//     });
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//     if (tab.active && change.url) {
//         console.log("you are here: "+change.url);
//     }
// });

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log("111");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );



//   chrome.runtime.onMessage.addListener(

//     function(request, sender, sendResponse) {
//     if (request.contentScriptQuery == "queryPrice") {
//     var url = "https://another-site.com/price-query?itemId=" +
//     encodeURIComponent(request.itemId);
//     fetch(url)
//     .then(response => response.text())
//     .then(text => parsePrice(text))
//     .then(price => sendResponse(price))
//     return true; // Will respond asynchronously.
//     }
//     });


    // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //     console.log(tabs[0].url);
    //  });
    // async function getCurrentTab() {
    //     let queryOptions = { active: true, currentWindow: true };
    //      let [tab] = await browser.tabs.query(queryOptions);
    //      localStorage.setItem('tabname' , tab);
    //       return tab;
    //      }
    //     getCurrentTab()
    //     .then((data) => { console.log('newdata',data)})
    //     .then(() => { console.log('error')});
    // let currentURL = window.location.href;
    // console.log(currentURL)

    // chrome.tabs.getSelected(null, function(tab) {
    //     console.log(tab.url)
    // })








// $.ajax({

//     type: 'GET',fvvvvvvg0sawzxzd-8
//     url: "'https://jsonplaceholder.typicode.com/todos/1'",
//     success:function(data){
//         console.log(data);
//     }
// });
// $.ajax({
//     type: 'GET',
//     url: "https://reqres.in/api/users?page=2",
//     success:function(data){
//         $(".RNNXgb").append(JSON.stringify(data));
//     }
// // });
// $.ajax({
//     type: "GET",
//     url: "//api.instagram.com/v1/users/2093101329/media/recent/?access_token=2093101329.0e4abd3.d017a21b3e6e45408126e42cf0940d79",
//     crossDomain: true,
//     success: function(response) {
//         console.log(response);

//         $.each(response.data, function(index, obj) {
//             console.log(obj.images.low_resolution.url);

//             $('#instagram_feed').append("<li><a href='" + obj.link + "' target='_blank'><img src=" + obj.images.low_resolution.url + "/></a></li>");
//         })
//     },

//     dataType: "jsonp" //set to JSONP, is a callback
// });
// $(function(){
//     $("#btnLoad").click(function(){
//         LoadData();
//         return false;
//     });
// });//End of DOM Ready function

// function LoadData(){
//     var url = "https://jsonplaceholder.typicode.com/posts";
//     var settings = {
//         type : "GET",
//         dataType : "json",
//         url : url,
//         data : "{}",
//         success : function(result){
//             Display(result);
//         },
//         error : function(err){
//             alert('error');
//         }
//     };
//     $.ajax(settings);
// }//LoadData
// function Display(result){
//     //chrome.browserAction.setBadgeText({text: count});
//     var $container = $("#container").html("");
//     for(var i=0;i<result.length;i++)
//     {
//         var obj = result[i];
//         var $item = $("<div>").addClass("item");
//         var $sp = $("<span>").text("ID:" + obj.id);
//         $item.append($sp);
//         $item.append("<br>");
//         $sp = $("<span>").text("Title:" + obj.title);
//         $item.append($sp);
//         $item.append("<br>");
//         $container.append($item);
//     }
// }//Display