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
    }


    scanArticle(){
        let prixArticle = this.generateRandomPrice(0.1,15);
        this.nbrArticles++;
        document.querySelector("#nbreArticles").innerText = this.nbrArticles;
        this.totalArticles += parseFloat(prixArticle);
        document.querySelector("#totalArticles").innerText = this.totalArticles.toFixed(2);
        document.querySelector("#resteAPayer").innerText = this.totalArticles.toFixed(2);
        
    }

    proceedPayment(){
        //au click sur le bouton payer
        // on calcul le montant donné
        let sommeDonnee = this.cashPaid.countCash();
        // on deduit totalArticles de ce montant pour connaitre le montant à rendre
        let montantARendre = this.cashPaid.countCash() - this.totalArticles;
        montantARendre = montantARendre.toFixed(2);
        console.log(montantARendre);
        document.getElementById("payer").disabled = true;    
        // on lance la fonction proceedCashback
    }

    proceedCashback(){
        // on décompose le montant à rendre en nbre de billets et pieces =>on obtient cashback
        //on déduit cashback de cashfund en vérifiant avant si c'est possible
        // si ok => on rend la monnaie
    }

    //TOOLS
    generateRandomPrice(min, max){
        let price = (Math.random() * (max - min) + min);
        return price;
    }

}