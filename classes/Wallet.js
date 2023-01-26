export class Wallet{

    constructor(name, stock = null){
        this.name = name;
        if(!stock){
            this.stock = {
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
                "1C"  : 0,
            }
        }
        else{
            this.stock = stock;
        }
    }
    getAmount(){

    }

    //ajouter piece ou billet au wallet
    addCash(name, quantity = 1){
        this.stock[name] += quantity;
    }

    //enlever piece ou billet au wallet
    removeCash(name, quantity = 1){
        if (this.stock[name]>=quantity){
            this.stock[name] -= quantity;
            this.alerteCaisse = false;
        }
    }

    //compte la somme totale du wallet
    countCash(){
        let sum = 0; 
        for(let elt in this.stock){
            let value = 0;
            if(elt.indexOf("E") >= 0){
                value = elt.replace("E","");
            }
            else if(elt.indexOf("C") >= 0){
                value = elt.replace("C","") / 100;
            }            
            sum += this.stock[elt]*value;
        }
        return sum;
    }

    // version moins optimisée
    /*countCash(){
        let sum = 0; 
        for(let elt in this.stock){
            switch(elt){
                case "50E":
                    sum += this.stock["50E"]*50;
                    break;
                case "20E":
                    sum += this.stock["20E"]*20;
                    break;
                case "10E":
                    sum += this.stock["10E"]*10;
                    break;
                case "5E":
                    sum += this.stock["5E"]*5;
                    break;
                case "2E":
                    sum += this.stock["2E"]*2;
                    break;
                case "1E":
                    sum += this.stock["1E"];
                    break;
                case "50C":
                    sum += this.stock["50C"]*0.5;
                    break;
                case "20C":
                    sum += this.stock["20C"]*0.2;
                    break;
                case "10C":
                    sum += this.stock["10C"]*0.1;
                    break;
                case "5C":
                    sum += this.stock["5C"]*0.05;
                    break;
                case "2C":
                    sum += this.stock["2C"]*0.02;
                    break;
                case "1C":
                    sum += this.stock["1C"]*0.01;
                    break;
    
            }
        }
        console.log(sum);
    }*/


    

}