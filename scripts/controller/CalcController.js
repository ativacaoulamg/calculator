
class CalcController {
    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalEl = document.querySelector("#display");
        this._dataEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }
    
    initialize(){
        this.setDisplayDataTime();
        setInterval(() => {
            this.setDisplayDataTime();
        }, 1000);

        this.setLastNumberDisplay();
        
    }
    
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event=>{
            element.addEventListener(event, fn, false);
        })
    }
    
    clearAll(){
        this._operation = [];
        this.setLastNumberDisplay();
    }
    clearEntry(){
        this._operation.pop();
        this.setLastNumberDisplay();
    }
    getLastOperation(){
        return this._operation[this._operation.length - 1]; //Metodo obtem, retorna ultima posicao do Array.
    }
    
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value; //Metodo ajusta,inseri valor ultima posicao do Array
    }
    
    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value) > -1); //Metodo retorna index valor sinal maior -1,senao tiver sinal . ou = retorna False 
    }
    
    pushOperation(value){
        this._operation.push(value);
        if (this._operation.length > 3) {
           this.calc(); 
        }
    }

    getResult(){
        return eval(this._operation.join(""));
    }

    calc(){
            let last = '';

            this._lastOperator = this.getLastItem();

        if (this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

            if (this._operation.length > 3){
                last = this._operation.pop();
                this._lastNumber = this.getResult();

            } else if (this._operation.length == 3){
                this._lastNumber = this.getLastItem(false);
            }

            let result = this.getResult();

            if (last == '%') {
                result /= 100;
            this._operation = [result];

            } else {

            this._operation = [result];
            if (last) this._operation.push(last);
                
            }
            this.setLastNumberDisplay();
    }

    getLastItem(isOperator = true) {
         let lastItem;
         
        for (let i=this._operation.length-1; i >=0; i--){
      
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem= this._operation[i];
                break;
            } 
            if (!lastItem){
                lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
            }
        }
        return lastItem;
        
    }

    setLastNumberDisplay(){
        let lastNumber = this.getLastItem(false);
       if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){
        //console.log('A', value, isNaN(this.getLastOperation()));
        
        if (isNaN(this.getLastOperation())) {
            if(this.isOperator(value)) {
                
                this.setLastOperation(value);
                
            }else if(isNaN(value)){
                console.log('Outra coisa',value);
            } else {
                this.pushOperation(value);
               this.setLastNumberDisplay(); 
            } 
            
        } else {
            if (this.isOperator(value)){
                this.pushOperation(value);
            }
            else{               
                
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
               this.setLastNumberDisplay(); 
            }
        }
        //console.log(this._operation);
    }
    
    setError(){
        this.displayCalc = "Error";
    }
    execBtn(value){     //:3,10s/this.clear.*//g -->> da linha 3 a 10 substituir começo e depois .* por nada // g (goal)
        switch (value){ //:.,+4s/ -->> da linha corrente mais 4 proximas linhas.
            case 'ac':
            this.clearAll();
            break;
            case 'ce':
            this.clearEntry(); 
            break;
            case 'soma':
            this.addOperation('+');
            break;
            case 'subtracao':
            this.addOperation('-');
            break;
            case 'divisao':
            this.addOperation('/');
            break;
            case 'multiplicacao':
            this.addOperation('*');
            break;
            case 'porcento':
            this.addOperation('%');
            break;
            case 'igual':
            this.calc();            
            break;
            case 'ponto':
            this.addOperation('.');
            break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            this.addOperation(parseInt(value));
            break;
            
            default:
            this.setError();
            break;
            
        }
    }
    
    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn,"click drag", e=>{
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);
            });
            
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });
        });
    }
    
    setDisplayDataTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }
    
    set displayDate(value){
        return this._dataEl.innerHTML = value;
    }
    
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    
    get displayDate(){
        return this._dataEl.innerHTML;
    }
    
    get displayCalc(){
        return this._displayCalEl.innerHTML;
    }
    
    set displayCalc(value){
        this._displayCalEl.innerHTML = value;
    }
    
    get currentDate(){
        return new Date();
    }
    
    set currentDate(value){
        this._currentDate = value;
    }
}
