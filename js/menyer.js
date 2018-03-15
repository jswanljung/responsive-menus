/**
 * Vi vill inte att vårt skript körs innan webbläsaren har hunnit läsa in
 * resten av DOM. Ett enkelt (quick and dirty) trick är att lägga dina 
 * script-taggar längst ner i body. Funkar, men känns kanske mer estetiskt
 * riktigt att ha dem i head. Då kan man i stället vänta in ett load-event,
 * vilket är det vi gör här. Vi använder "DomContentLoaded" i stället för
 * window.onload (eller onload-attributet i body-taggen) eftersom den senare 
 * väntar på att allt (css, bilder osv) ska laddas, vilket vi inte behöver. 
 * Fråga om du är intresserad och inte fattar, men för den här kursen
 * duger det gott och väl att du bara lägger dina script-taggar längst ner i body.
 *
 * En fördel till: javascript har "function level scoping", dvs variabler  
 * (inklusive funktioner) som vi definierar utanför en funktion har global 
 * räckvidd (syns överallt). 
 * Har du bara lite kod och inga externa skriptbibliotek brukar det inte 
 * spela så stor roll, men använder du många skript kan det ställa till 
 * problem. Genom att omsluta all vår kod i en anonym funktion döljer vi 
 * allt från andra skript. Konstigt, men funkar.
 *
 */
document.addEventListener("DOMContentLoaded", 
function() {
/* Här registrerar vi alla li element på övre nivån som intresserade
   av musklick (eller tryck på tryckkänslig skärm). När ett klick
   registreras anropas funktionen menuclick. */
document.querySelectorAll(".toppmeny>li").forEach(function(l) {
    /* Se till att allt är stängt förstås! */
    add_class(l, "menuclosed")
    l.addEventListener("click", menuclick);
    
    l.addEventListener("focusin", menufocused);
    l.addEventListener("focusout", menuunfocused);
    //l.setAttribute("tabindex", 0)
})

/* Öppna eller stäng menyn som användaren klickar på, se till att alla
 * andra menyer är stängda. e är ett Event-objekt. Vi använder 
 * egenskapen e.currentTarget för att komma åt elementet som klickades
 * på.
 */
function menuclick(e) {
  document.querySelectorAll(".toppmeny>li").forEach(
    function(l) {
        if (l===e.currentTarget) {
            toggle_class(l, "menuclosed");
        }
        // Se till att andra menyer stängs
        else add_class(l, "menuclosed"); 
    });
}
    
function menufocused(e) {
    remove_class(e.currentTarget, "menuclosed");
}
    
function menuunfocused(e) {
    add_class(e.currentTarget, "menuclosed");
}
    

/****************************************************************
 * Nedanför det här strecket finns lättåteranvända funktioner för
 * att manipulera klasser i DOM-element. Varsågod att låna!
 * För produktion vill man kanske ta bort kommentarerna som ju
 * ökar storleken på skriptfilen. Finns små hjälpprogram som 
 * "minifierar" javascript om du inte vill göra det för hand.
 * Googla!
 ****************************************************************
 */
    
/**
 * Om elementet har en klass, ta bort det. Lägg annars till det.
 * el: ett element i DOM
 * cls: namnet på klassen
 */
function toggle_class(el, cls) {
    if (has_class(el, cls)) {
        remove_class(el, cls);
    }
    else {
        add_class(el, cls);
    }
}

/**
 * Kolla om en klass finns i class-attributet hos ett element.
 * Ett element kan ju ha flera klasser, därför delar vi upp dem!
 *
 * @param {Element} el: elementet som ska kollas
 * @param {string} cls: klassen att leta efter.
 */
function has_class(el, cls) {
    return el.className.split(" ").includes(cls)
}

/**
 * Lägg till en klass hos ett element om det inte redan finns.
 * @param {Element} el: elementet
 * @param {string} cls: klassnamnet
 */
function add_class(el, cls) {
    if (!has_class(el, cls)) {
        el.className += (el.classname==""? "": " ") + cls;
    }
}

/**
 * Ta bort en klass om den finns.
 * @param {Element} el: elementet
 * @param {string} cls: klassnamnet
 */
function remove_class(el, cls) {
    /* Här delar vi först upp strängen med klasser till en array, filtrerar den
     * och sätter ihop igen. */
    el.className = el.className.split(" ").filter(c => c!== cls).join(" ");
}
    
});