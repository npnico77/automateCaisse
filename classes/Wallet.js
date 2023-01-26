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

}