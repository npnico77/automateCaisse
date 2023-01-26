import { Wallet } from "./Wallet.js"

export class Caisse{


    constructor(){
        const cashFundInitializer = {
            "50E" : 0,
            "20E" : 5,
            "10E" : 5,
            "5E"  : 5,
            "2E"  : 10,
            "1E"  : 10,
            "50C" : 20,
            "20C" : 30,
            "10C" : 50,
            "5C"  : 50,
            "2C"  : 50,
            "1C"  : 50,
        };
        this.cashFund = new Wallet("cashFund", cashFundInitializer);
        this.cashPaid = new Wallet("cashPaid");
        this.cashBack = new Wallet("cashBack");

        this.nbrArticles = 0;
        this.totalArticles = 0;
        this.montantARendre = 0;
        this.affichageArendre =[];
    }


    scanArticle(){
        // on génére un article avec un prix aléatoire jusqu'a 15€
        let prixArticle = this.generateRandomPrice(0.1,15);
        // on compte le nombre d'articles
        this.nbrArticles++;
        document.querySelector("#nbreArticles").innerText = this.nbrArticles;
        // on affiche le total article
        this.totalArticles += parseFloat(prixArticle);
        document.querySelector("#totalArticles").innerText = this.totalArticles.toFixed(2);
        document.querySelector("#resteAPayer").innerText = this.totalArticles.toFixed(2);
        
    }

    proceedPayment(){
        //au click sur le bouton payer
        // on calcul le montant donné
        let sommeDonnee = this.cashPaid.countCash();
        // on deduit totalArticles de ce montant pour connaitre le montant à rendre
        this.montantARendre = sommeDonnee - this.totalArticles;
        this.montantARendre = this.montantARendre.toFixed(2);
        console.log(this.montantARendre);
        document.getElementById("payer").disabled = true; 
        // on affiche le montant à rendre :
        let divMonnaie = document.createElement("div");
        divMonnaie.classList.add("fw-bold");
        divMonnaie.innerHTML = "Monnaie à rendre : "+ this.montantARendre +"€"
        document.querySelector(".paiement").append(divMonnaie)   
        this.proceedCashback();
    }

    proceedCashback(){
        // on décompose le montant à rendre en nbre de billets et pieces =>on obtient cashback
        //on déduit cashback de cashfund en vérifiant avant si c'est possible
        // si ok => on rend la monnaie sinon on demande un réappro du fond de caisse

        const denominations = [
            {name: "50E", value: 50},
            {name: "20E", value: 20},
            {name: "10E", value: 10},
            {name: "5E", value: 5},
            {name: "2E", value: 2},
            {name: "1E", value: 1},
            {name: "50C", value : 0.5},
            {name: "20C", value : 0.2},
            {name: "10C", value : 0.1},
            {name: "5C", value : 0.05},
            {name: "1C", value: 0.01}
          ];
          
        // Boucle pour voir si on peut rendre pour chaque valeur en fonction de ce qu'il y a en caisse
          let compteurCaisse = 0;
          while (this.montantARendre > 0 || compteurCaisse < 12) {
            for (let i = 0; i < denominations.length; i++) {
              let denomination = denominations[i];
              if (this.montantARendre >= denomination.value && this.cashFund.stock[denomination.name] >= 1) {
                this.montantARendre -= denomination.value;
                this.montantARendre = this.montantARendre.toFixed(2);
                this.cashPaid.removeCash(denomination.name);
                this.cashBack.addCash(denomination.name);
                break;
              }
            }
            compteurCaisse++;
          }
          if(this.montantARendre == 0){
            //on affiche le rendu de monnaie            
            for(let elt in this.cashBack.stock){ 
                let valeur = 0; 
                if (this.cashBack.stock[elt] > 0 ){  
                    valeur = parseInt(this.cashBack.stock[elt]);
                    for (let i=0; i < valeur; i++){
                        affichageArendre += elt;                        
                    }      
                }
            }
            document.querySelector(".affichageMonnaie").innerHTML = affichageArendre;
          }else{
            alert("Il n'y a pas assez en fond de caisse pour rendre la monnaie");
          }        
    }

    //TOOLS
    generateRandomPrice(min, max){
        let price = (Math.random() * (max - min) + min);
        return price;
    }

}

/*switch(elt){
    case "50E" :
        affichageArendre += '<div class="btn text-center btn-info m-1" style="width:100px">50€</div>';
        break;
    case "20E" :
        affichageArendre += '<div class="btn text-center btn-info m-1" style="width:100px">20€</div>';
        break;
    case "10E" :
        affichageArendre += '<div class="btn text-center btn-info m-1" style="width:100px">10€</div>';
        break;
    case "5E" :
        affichageArendre += '<div class="btn text-center btn-info m-1" style="width:100px">5€</div>';
        break;
    case "2E" :
        affichageArendre += '<div class="btn text-center btn-secondary rounded-5 m-1" style="width:50px">2€</div>';
        break;
    case "1E" :
        affichageArendre += '<div class="btn text-center btn-secondary rounded-5 m-1" style="width:50px">1€</div>';
        break;
    case "50C" :
        affichageArendre += '<div class="btn text-center btn-warning rounded-5 m-1" style="width:50px">50c</div>';
        break;
    case "20C" :
        affichageArendre += '<div class="btn text-center btn-warning rounded-5 m-1" style="width:50px">20c</div>';
        break;
    case "10C" :
        affichageArendre += '<div class="btn text-center btn-warning rounded-5 m-1" style="width:50px">10c</div>';
        break;
    case "5C" :
        affichageArendre += '<div class="btn text-center btn-danger rounded-5 m-1" style="width:50px">5c</div>';
        break;
    case "2C" :
        affichageArendre += '<div class="btn text-center btn-danger rounded-5 m-1" style="width:50px">2c</div>';
        break;
    case "1C" :
        affichageArendre += '<div class="btn text-center btn-danger rounded-5 m-1" style="width:50px">1c</div>';
        break;
}*/