document.querySelectorAll(".toppmeny>li").forEach(function(l) {
    toggleClass(l, "menuclosed")
    l.addEventListener("click", menuclick);
})

function menuclick(e) {
  document.querySelectorAll(".toppmeny>li").forEach(
    function(l) {
        if (l !== e.currentTarget && l.className.split(" ").includes("menuclosed")===false) {
            toggleClass(l, "menuclosed")
        }});
  toggleClass(e.currentTarget, "menuclosed")
}

/**
 * Om elementet el har en klass, ta bort det. Lägg annars till det.
 * el: ett element i DOM
 * cls: namnet på klassen
 */
function toggleClass(el, cls) {
    'use strict';
    /* Ett element kan ha flera klasser. Vi delar först upp
     klasserna i en array. */
    var classes = el.className.split(" ");
    /* Kolla om klassen redan finns, ta bort den från vår array,
     sammanfoga vår array till en sträng och sätt elementets
     className till det värdet. */
    if (classes.includes(cls)) {
        el.className = classes.filter(c => c !== cls).join(" ");
    }
    else {
        // Om klassen inte finns lägger vi bara till det.
        el.className += (el.classname===""? "": " ") + cls;
    }
}