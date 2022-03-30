
console.log("Chrome extension go");

var timeSet = new Set();
timeSet.add("2021-12-29T19:47:01.000Z")
timeSet.add("2021-09-09T18:58:44.000Z")
timeSet.add("2021-08-22T18:08:26.000Z")
timeSet.add("2021-07-03T13:59:38.000Z")
timeSet.add("2021-06-03T02:27:32.000Z")
timeSet.add("2021-04-14T02:11:11.000Z")
timeSet.add("2021-04-10T07:05:34.000Z")
timeSet.add("2021-03-28T20:36:56.000Z")
timeSet.add("2021-03-25T22:28:08.000Z")
timeSet.add("2021-03-18T14:31:14.000Z")
console.log(timeSet)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.text == "markSpam") {
        var counter = 0
        console.log('requestReceived');
        document.addEventListener('click', function (e) {
            if (counter < 1){
                //travese back up the DOM tree to find the comment class
                var currElement = e.target;
                console.log(currElement.className)
                while (currElement.className != 'Mr508 '){
                    currElement = currElement.parentElement;
                }
                console.log(currElement.className)
                if (currElement.style['background-color'] == "rgb(255, 0, 0)") {
                    console.log(currElement);
                    currElement.removeAttribute("style");
                    deletefromSet(currElement);
                } else{
                    currElement.style['background-color'] = '#FF0000';
                    addtoSet(currElement);
                }
                counter += 1;
            }
            return
        });
      } else if (request.text == "switchOnOff"){
            let comments = document.getElementsByClassName('Mr508 ');
            console.log(comments);
            for (elt of comments){
                var ret = markedTimestamp(elt);
                console.log(ret);
                if (ret && elt.style['background-color'] != "rgb(255, 0, 0)"){
                    elt.style['background-color'] = '#FF0000';
                } else {
                    elt.removeAttribute("style");;
                }
                //console.log(elt);
            }
        }  else if (request.text == "hl"){
            console.log("highlight requested");
            window.location.reload();
        } else if (request.text == "hd"){
            console.log("hide requested");
            let comments = document.getElementsByClassName('Mr508 ');
            for (elt of comments){
                if (elt.style['background-color'] == "rgb(255, 0, 0)"){
                    elt.remove();
                }
            }
        }
  });

function markedTimestamp(tree) {
    var all = tree.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        const result = all[i].hasAttribute('datetime');
        if (result) {
            var dt = String(all[i].getAttribute("datetime"));
            if (timeSet.has(dt)){
                //console.log(all[i]);
                return true;
            }
        }
    }
    return false;
}

function addtoSet(tree) {
    var all = tree.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        const result = all[i].hasAttribute('datetime');
        if (result) {
            var dt = String(all[i].getAttribute("datetime"));
            timeSet.add(dt);
            return
        }
    }
}

function deletefromSet(tree) {
    var all = tree.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        const result = all[i].hasAttribute('datetime');
        if (result) {
            var dt = String(all[i].getAttribute("datetime"));
            timeSet.delete(dt);
            return
        }
    }
}