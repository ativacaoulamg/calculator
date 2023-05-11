
class CalcController {
    constructor(){
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
        
    }
    
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event=>{
            element.addEventListener(event, fn, false);
        })
    }
    
    clearAll(){
        this._operation = [];
    }
    clearEntry(){
        this._operation.pop();
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

    calc(){
            let last = this._operation.pop();
            let result = eval(this._operation.join(""));
            this._operation = [result, last];
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
                
            } 
            
        } else {
            if (this.isOperator(value)){
                this.pushOperation(value);
            }
            else{               
                
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                
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
