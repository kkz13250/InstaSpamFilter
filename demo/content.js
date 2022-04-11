
console.log("Chrome extension go");

var timeSet = new Set();

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
                if (currElement.style['background-color'] == "rgb(169, 169, 169)") {
                    console.log(currElement);
                    currElement.removeAttribute("style");
                    deletefromSet(currElement);
                } else{
                    currElement.style['background-color'] = '#A9A9A9';
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
                if (ret && request.status == "true"){
                    elt.style['background-color'] = '#A9A9A9';
                } else {
                    elt.removeAttribute("style");
                }
                //console.log(elt);
            }
        }  else if (request.text == "fselect"){
            if (request.op == "highlight"){
                console.log("highlight requested");
                let comments = document.getElementsByClassName('Mr508 ');
                for (elt of comments){
                    if (elt.style['background-color'] == "rgb(169, 169, 169)"){
                        elt.style.display = "block";
                    }
                }
            } else {
                console.log("hide requested");
                let comments = document.getElementsByClassName('Mr508 ');
                for (elt of comments){
                    if (elt.style['background-color'] == "rgb(169, 169, 169)"){
                        elt.style.display = "none";
                    }
                }
            } 
        } else if (request.text == "timestamps"){
            var data = request.data;
            for (var i = 0; i < data.length; i++){
                if (data[i].PREDICTION == "1"){
                    timeSet.add(data[i].timestamp);
                }
            }
            console.log("HERE")
            console.log(timeSet)
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