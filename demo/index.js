document.getElementById("report").addEventListener("click", myFunction);

function myFunction(){
    window.location.href = "report.html";
  }

document.getElementById("sw").addEventListener("click", changeStyle);
function changeStyle(){
  var comments = document.getElementById("report")
  comments.innerHTML = "hello world"
} 
