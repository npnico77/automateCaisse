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
            "1C"  : 50
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
        document.getElementById("payer").disabled = true; 

        // on affiche le montant à rendre :
        /*let divMonnaie = document.createElement("div");
        divMonnaie.classList.add("fw-bold","monnaieArendre");
        divMonnaie.innerHTML = "Monnaie à rendre : "+ this.montantARendre +"€"
        document.querySelector(".paiement").append(divMonnaie)  */ 

        this.proceedCashback();
    }

    proceedCashback(){
        // on décompose le montant à rendre en nbre de billets et pieces =>on obtient cashback
        //on déduit cashback de cashfund en vérifiant avant si c'est possible
        // si ok => on rend la monnaie sinon on demande un réappro du fond de caisse

        // tableau pour récupérer les valeurs et automatiser dans une boucle
        const valeurs = [
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
          // compteur pour arreter la boucle une fois qu'il a regarder tous les types de monnaie ou qu'il n'ya plus rien à rendre
          let compteurCaisse = 0;
          while (this.montantARendre > 0 || compteurCaisse < valeurs.lenght) {
            for (let i = 0; i < valeurs.length; i++) {
              let valeur = valeurs[i];
              if (this.montantARendre >= valeur.value && this.cashFund.stock[valeur.name] >= 1) {
                this.montantARendre -= valeur.value;
                this.montantARendre = this.montantARendre.toFixed(2);
                this.cashPaid.removeCash(valeur.name);
                this.cashFund.removeCash(valeur.name);
                this.cashBack.addCash(valeur.name);
                break;
              }
            }
            compteurCaisse++;
          }
          if(this.montantARendre == 0){
            //on decompose le rendu de monnaie            
            for(let elt in this.cashBack.stock){ 
                let valeur = 0; 
                if (this.cashBack.stock[elt] > 0 ){  
                    valeur = parseInt(this.cashBack.stock[elt]);
                    for (let i=0; i < valeur; i++){
                        this.affichageArendre.push(elt);                        
                    }      
                }
            }
            // on execute la fonction qui affiche le rendu
            this.affichageMonnaie();            
            document.getElementById("newClient").disabled = false;
          }else{
            alert("Il n'y a pas assez en fond de caisse pour rendre la monnaie");
          }        
    }

    //TOOLS
    generateRandomPrice(min, max){
        let price = (Math.random() * (max - min) + min);
        return price;
    }

   async affichageMonnaie(){     
        const denoms = [
            {position: 1 ,value: '50E', classes: 'btn-info', text: '50€'},
            {position: 2 ,value: '20E', classes: 'btn-info', text: '20€'},
            {position: 3 ,value: '10E', classes: 'btn-info', text: '10€'},
            {position: 4 ,value: '5E', classes: 'btn-info', text: '5€'},
            {position: 5 ,value: '2E', classes: 'btn-secondary', text: '2€'},
            {position: 6 ,value: '1E', classes: 'btn-secondary', text: '1€'},
            {position: 7 ,value: '50C', classes: 'btn-warning', text: '50c'},
            {position: 8 ,value: '20C', classes: 'btn-warning', text: '20c'},
            {position: 9 ,value: '10C', classes: 'btn-warning', text: '10c'},
            {position: 10 ,value: '5C', classes: 'btn-danger', text: '5c'},
            {position: 11 ,value: '2C', classes: 'btn-danger', text: '2c'},
            {position: 12 ,value: '1C', classes: 'btn-danger', text: '1c'}
          ]
       
         for (let elt of this.affichageArendre) {
           let divMonnaie = document.createElement('button');
           divMonnaie.classList.add('renduMonnaie', 'btn', 'text-center', 'm-1');
           divMonnaie.style.width = '100px';
           divMonnaie.disabled = true;
           let denom = denoms.find(d => d.value === elt);
           if (denom) {
                divMonnaie.classList.add(denom.classes);
                divMonnaie.innerText = denom.text;
                if(denom.position > 4){
                    divMonnaie.style.width = "50px";
                    divMonnaie.classList.add("rounded-5");
                }
            }
            document.querySelector('.affichageMonnaie').append(divMonnaie);
            // attente de 0.5s entre l'affichage de chaque billet/piece
            await new Promise((resolve, reject) => setTimeout(resolve, 500));
         }
         console.log(this.cashFund.stock);
    }

    newClient(){
        this.nbrArticles = 0;
        this.totalArticles = 0;
        this.montantARendre = 0;
        this.affichageArendre =[];
        document.querySelectorAll(".renduMonnaie").forEach(function(element) {
            element.remove();
          });
        document.getElementById("payer").disabled = true;  
        document.getElementById("scanArticle").disabled = false;      
        document.querySelector("#nbreArticles").innerText = "0.00";
        document.querySelector("#totalArticles").innerText = "0";
        document.querySelector("#resteAPayer").innerText = "0.00";
        document.querySelector("#dejaPaye").innerText = "0.00";
        this.cashPaid.stock = {
            "50E" : 0,
            "20E" : 0,
            "10E" : 0,
            "5E"  : 0,
            "2E"  : 0,
            "1E"  : 0,
            "50C" : 0,
            "20C" : 0,
            "10C" : 0,
            "5C"  : 0,
            "2C"  : 0,
            "1C"  : 0
        };    
        this.cashBack.stock = {
            "50E" : 0,
            "20E" : 0,
            "10E" : 0,
            "5E"  : 0,
            "2E"  : 0,
            "1E"  : 0,
            "50C" : 0,
            "20C" : 0,
            "10C" : 0,
            "5C"  : 0,
            "2C"  : 0,
            "1C"  : 0
        };
    }
       
}