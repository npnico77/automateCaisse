import { Caisse } from "./classes/Caisse.js";

const caisse = new Caisse();

let resteApayer = 0;

document.querySelector("#scanArticle").addEventListener("click",function (){
    document.querySelectorAll(".argent").forEach(function(element){
        element.disabled = false;
    });
    caisse.scanArticle();
});

//au clic sur billet ou piece
document.querySelectorAll(".argent").forEach(function(element){
    element.addEventListener("click", function(){
        // on ne peut pas ajouter d'argent tant que article = 0
        if (caisse.nbrArticles > 0 ){
            // on désactive l'ajout de nouveaux articles quand on ajoute l'argent pour payer
            document.getElementById("scanArticle").disabled = true;            
            let name = this.id;
            caisse.cashPaid.addCash(name);    
            caisse.cashFund.addCash(name); 
            // on déduit le montant payé du reste à payer
            resteApayer = caisse.totalArticles.toFixed(2) - caisse.cashPaid.countCash().toFixed(2);
           
            if (resteApayer <= 0){   
                 // si le montant donnée est sup ou égale à totalArticles
                // => - on bloque la possibilité de rajouter billets et pieces          
                document.querySelector("#resteAPayer").innerText = "0";
                document.querySelectorAll(".argent").forEach(function(element){
                    element.disabled = true;
                });
                resteApayer = 0;
                document.querySelector("#dejaPaye").innerText = caisse.cashPaid.countCash().toFixed(2);
                //on active le bouton de paiement final
                document.getElementById("payer").disabled = false;    
            }else{                   
                document.querySelector("#resteAPayer").innerText = resteApayer.toFixed(2);
                document.querySelector("#dejaPaye").innerText = caisse.cashPaid.countCash().toFixed(2);
            }

        }            
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
