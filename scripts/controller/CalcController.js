class CalcController {
    constructor() {  //metodo é chamado automaticamente quando instancia uma classe.
        //atributos pode possuir encapsulamento(que é 'this'), ou seja quem pode conversar com ele.
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initButtonsEvents();
        //diferent var - varivel,um atributo pode ser chamado qualquer lugar
        this._currentDate;        //dentro da Classe, underline = privado (atributo privado)
        this.initialize();


    }
    //DOM - Manipular Objeto Documento
    //BOM - Manipular Objeto Browser
    //Refatorar - Melhorar ou refazer codigo otimizando o mesmo.
    //* remover tab, selecione linhas e Shift+tab.
    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(elements, events, fn) {
        events.split(' ').forEach(event => {
            elements.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    
    addOperation(value) {
        this._operation.push(value);
        console.log(this._operation);
    }

    setError() {
        this.displayCalc = "Error";
    }


    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.clearEntry();
                break;

            case 'subtracao':
                this.clearEntry();
                break;

            case 'divisao':
                this.clearEntry();
                break;

            case 'multiplicacao':
                this.clearEntry();
                break;

            case 'porcento':
                this.clearEntry();
                break;

            case 'igual':
                this.clearEntry();
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

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
                //console.log(textBtn);
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        })
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    /**setTimeout(() => {
        clearInterval(interval);
    }, 10000); */

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {  //isto é um metodo, () -> passar argumento,parametro e {} o que ira executar.
        return this._displayCalcEl.innerHTML;   //Getters and Setters a forma que obtem e atribui informações.
    }

    set displayCalc(value) {     //Ctrl+F2 Multiple Cursor Word
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}
