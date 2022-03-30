
console.log("Chrome extension go");

var timeSet = new Set();
timeSet.add("2022-03-29T20:22:31.000Z")
console.log(timeSet)
document.addEventListener('click', function (e) {
    var color = e.target.style['background-color'];
    console.log(color)
    if (color == "rgb(255, 0, 0)") {
        console.log(e.target)
        e.target.removeAttribute("style");;
    } else{
        e.target.style['background-color'] = '#FF0000';
    }
});

//timeout to wait for the website to finish loading all the comments
const myTimeout = setTimeout(function() {
    let comments = document.getElementsByClassName('Mr508 ');
    console.log(comments);
    for (elt of comments){
        var ret = markedTimestamp(elt);
        console.log(ret);
        if (ret){
            elt.style['background-color'] = '#FF0000';
        }
        //console.log(elt);
}}, 5000);

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