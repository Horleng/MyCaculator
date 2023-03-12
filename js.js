class Caculator {
    constructor(currentText,previousText,){
        this.currentText = currentText;
        this.previousText = previousText;
        this.clearAllElement();
    }
    deleteOneDigit(){
        this.currentNumber = this.currentNumber.toString().slice(0,-1);
    }
    clearAllElement(){
        this.currentNumber = "";
        this.previousNumber = "";
        this.operators = undefined;
        this.previousText.innerText = "";
    }
    appentNumber(number){
        if(number==='.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString(); 
    }
    updateTextElement(){
        if(this.currentNumber.toString().length>8){
            if(this.currentNumber.toString().length>12) this.currentText.style.fontSize = "30px";
            else this.currentText.style.fontSize = "40px";
        }
        else this.currentText.style.fontSize = "60px";
        this.currentText.innerText = this.currentNumber;
        if(this.operators!=null) 
            this.previousText.innerText = `${this.previousNumber} ${this.operators}`;
    }
    selectOperator(operator){
        if(!this.currentNumber && this.previousNumber) return this.operators = operator;
        if(this.previousNumber) this.caculation();
        this.previousNumber = this.currentNumber;
        if(!this.previousNumber) return
        this.operators = operator;
        this.currentNumber = "";
    }
    caculation(){
        let result;
        const preNumber = parseFloat(this.previousNumber);
        const currNumber = parseFloat(this.currentNumber);
        if(isNaN(currNumber) && !isNaN(preNumber)) {
            this.operators = undefined;
            this.previousNumber = "";
            this.previousText.innerText = "";
            return this.currentNumber = preNumber;
        }
        if(isNaN(preNumber) || isNaN(currNumber)) return 0;
        switch(this.operators){
            case "+" : result = preNumber + currNumber; break;
            case "-" : result = preNumber - currNumber;break;
            case "÷" : result = preNumber / currNumber;break;
            case "×" : result = preNumber * currNumber;break;
            default : return 0;
        }
        if(isNaN(result)) return
        let floatDigit;
        let fullDigit;
        if(result.toString().includes('.')){
            floatDigit = result.toString().split('.')[1];
            if(floatDigit.toString().length>4) {
                if(result.toString().split('.')[0].length>8)
                    floatDigit = floatDigit.slice(0,2);
                else floatDigit = floatDigit.slice(0,4);
            }
            fullDigit = result.toString().split('.')[0]+"."+floatDigit;
            this.currentNumber = fullDigit;
        } 
        else this.currentNumber = result;
        this.operators = undefined;
        this.previousNumber = "";
        this.previousText.innerText = "";
    }
}

const numberButton = document.querySelectorAll("button[number]");
const previousNumber = document.querySelector(".previousNumber");
const currentNnumber = document.querySelector(".currentNnumber");
const operators = document.querySelectorAll("button[operator");
const buttonClearAll = document.querySelector("button[clearAll]");
const equal = document.querySelector("button[equal]");
const deleteButton = document.querySelector("button[del]");
const caculator = new Caculator(currentNnumber,previousNumber);
numberButton.forEach(button=>{
    button.addEventListener("click",()=>{
        caculator.appentNumber(button.innerText)
        caculator.updateTextElement();
    })
});
operators.forEach(button=>{
    button.addEventListener("click",()=>{
        caculator.selectOperator(button.innerText);
        caculator.updateTextElement();
    })
});
buttonClearAll.addEventListener("click",()=>{
    caculator.clearAllElement();
    caculator.updateTextElement();
})
equal.addEventListener("click",()=>{
    caculator.caculation();
    caculator.updateTextElement();
})
deleteButton.addEventListener("click",()=>{
    caculator.deleteOneDigit();
    caculator.updateTextElement();
})

