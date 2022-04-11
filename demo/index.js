var el = document.getElementById("report");
if (el) {
  el.addEventListener("click", myFunction);
}

function myFunction() {
  window.location.href = "report.html";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "markSpam" });
  });
}


var el2 = document.getElementById("sw");
if (el2) {
  el2.addEventListener("click", changeStyle);
}
var onOff = localStorage.getItem("sw");
if (onOff == "true") {
  el2.checked = true;
}

function changeStyle() {
  console.log("switch triggered");
  var onOff = localStorage.getItem("sw");
  if(onOff == "true"){
    localStorage.setItem("sw", "false");
  }else{
    localStorage.setItem("sw", "true");
  }
  onOff = localStorage.getItem("sw");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "switchOnOff", status: onOff});
  });
}

var el3 = document.getElementById("fselect");
if (el3) {
  el3.addEventListener("change", highlightOp);
}

function highlightOp() {
  console.log("highlight selected");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "highlight" });
  });
}

var el4 = document.getElementById("hd");
if (el4) {
  el4.addEventListener("click", hideOp);
}

function hideOp() {
  console.log("switch triggered");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "hide" });
  });
}

console.log("start query");
var ini = true;
if (ini){
  ini = false;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    let url = tabs[0].url;
    try {
      let url_id = String(url).split("/p/")[1].slice(0, -1);
      // alert(url_id);
      fetch("http://3.231.28.43:5000/api/getURL?api_url=" + url_id, {
        mode: "cors",
        method: "GET",
      })
        .then((response) => {
          return response.json(); // server returned valid JSON
        })
        .then((parsed_result) => {
          console.log(parsed_result);
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: "timestamps", data: parsed_result});
          });
        });
    } catch (err) {
      alert("No post detected, please open a specific instagram post");
    }
  });
}
console.log("end query");