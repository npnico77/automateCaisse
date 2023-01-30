import { Caisse } from "./classes/Caisse.js";

const caisse = new Caisse();


document.querySelector("#scanArticle").addEventListener("click",function (){
    document.querySelectorAll(".argent").forEach(function(element){
        element.disabled = false;
    });
    caisse.scanArticle();
});

//au clic sur billet ou piece
document.querySelectorAll(".argent").forEach(function(element){
    element.addEventListener("click", function(){
        let name = this.id;
        caisse.addCashPayment(name);
    });
});
// au clic sur payer on procède au rendu de monnaie
document.getElementById("payer").addEventListener("click",function (){
    caisse.proceedPayment();
});

document.getElementById("newClient").addEventListener("click",function (){
    caisse.newClient();    
    this.disabled = true;
});
