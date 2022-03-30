
console.log("Chrome extension go");

var timeSet = ["2022-03-29T20:22:31.000Z"];

//timeout to wait for the website to finish loading all the comments
const myTimeout = setTimeout(function() {
    let comments = document.getElementsByClassName('Mr508 ');
    console.log(comments);
    for (elt of comments){
        elt.style['background-color'] = '#FF0000';
        markedTimestamp(elt);
        console.log(elt);
}}, 5000);

function markedTimestamp(tree) {
    var all = tree.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        const result = all[i].hasAttribute('datetime');
        if (result) {
            if (timeSet.has(all[i].datetime)){
                console.log(all[i]);
            }
        }
    }
}