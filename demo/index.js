var el = document.getElementById("report");
if(el){
  el.addEventListener("click", myFunction);
}

function myFunction(){
    window.location.href = "report.html";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text:"markSpam"});
    });
  }

var el2 = document.getElementById("sw");
if(el2){
  el2.addEventListener("click", changeStyle);
}

function changeStyle(){
  console.log("switch triggered");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text:"switchOnOff"});
  });
} 

var el3 = document.getElementById("fselect");
if(el3){
  el3.addEventListener("change", highlightOp);
}

function highlightOp(){
  console.log("highlight selected");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text:"highlight"});
  });
} 

var el4 = document.getElementById("hd");
if(el4){
  el4.addEventListener("click", hideOp);
}

function hideOp(){
  console.log("switch triggered");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text:"hide"});
  });
} 
