class UI {
    constructor() {
        // Datos Cargados por USUARIO
        // Datos Ingresos UI
        this.genericForm = $(".generic-form");
        this.feedbackNotif = $("#feedback-notification");
        this.numberInput = $("#number-input");
        this.textInput = $("#text-input");
        this.category = $("#generic-category");
        this.account = $("#generic-account");
        this.dateInput = $("#generic-date");

        // Seleccion Ingreso o Gasto
        this.incomeBtn = $("#selectBudget");
        this.expenseBtn = $("#selectExpense");
        this.typeSelect = $("#typeSelection");
        
        // APP INFO VALORES
        this.budgetAmount = $("#budget-amount");
        this.expenseAmount = $("#expense-amount");
        this.balanceAmount = $("#balance-amount");
        this.balance = $("#balance");

        // Listas Ingresos / Gastos
        
        this.totalList = $("#total-list");
        this.itemID = 0;

        //////////////////////////////////////////////
        // Elementos posibles a ELIMINAR
        this.itemExpenseList = []; //Lista de Gastos
        this.itemBudgetList = []; //Lista de Ingresos

        this.expenseList = $("#expense-list");
        this.budgetList = $("#budget-list");
        this.itemExpenseID = 0;
        this.itemBudgetID = 0;
        

    }

    // Declaramos los Metodos
    // Grabar item cargado ("Submit")
    submitForm(valor){
        // guardo los valores cargados por UI
        const fecha = this.dateInput.val();
        const account = this.account.val();
        const category = this.category.val();
        const amount = this.numberInput.val();
        const title = this.textInput.val();

        if(this.checkForm() && (amount > 0)){//condicion si todo esta Ok
            this.dateInput.val('');
            this.account.val('');
            this.category.val('');
            this.numberInput.val('');
            this.textInput.val('');
            // Feedback OK - Carga Exitosa
            this.feedbackNotif.addClass('showItem');
            this.feedbackNotif.html(`<p> Carga exitosa </p>`);
            this.feedbackNotif.removeClass('alert-danger');
            this.feedbackNotif.addClass('alert-success');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.feedbackNotif.removeClass('showItem');
            }, 3000);
            //////////////////////////////////////////////
            // Verifico si esta apretado boton Ingreso o Egreso
            if(valor === true){
                // Creo objeto INCOME
                const income = {
                    id: this.itemID,
                    date: fecha,
                    title: title,
                    amount: parseInt(amount),
                    category: category,
                    account: account,
                } 
                this.itemID++;
                this.itemBudgetList.push(income);
                // Instancio funciones creadas
                this.addBudget(income);
                this.showBalance();

            } else {
                // Creo objeto EXPENSE
                const expense = {
                    id: this.itemID,
                    date: fecha,
                    title: title,
                    amount: parseInt(amount),
                    category: category,
                    account: account,
                } 
                this.itemID++;
                this.itemExpenseList.push(expense);
                // Instancio funciones creadas
                this.addExpense(expense);
                this.showBalance();
            }
            
        } else{ //condicion si hay algo erroneo
            this.feedbackNotif.addClass('showItem');
            this.feedbackNotif.html(`<p> Hay datos faltantes en el Formulario o el Monto es negativo</p>`);
            this.feedbackNotif.removeClass('alert-success');
            this.feedbackNotif.addClass('alert-danger');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.feedbackNotif.removeClass("showItem");
            }, 3000);
        }
    }

    checkForm(){
        let controlOk = false;
        const formArray = [this.numberInput, 
            this.textInput, this.category,
            this.account, this.dateInput];
        for (const iterator of formArray) {
            if(iterator.val()===""){
                controlOk = false;
            }
            else{
                controlOk = true;
            }
        }
        return controlOk;
    }
    
    // addBudget (agregar INPUT)
    addBudget(income) {
        this.totalList.prepend(`
        <div class="budget">
            <div class="budget-item d-flex justify-content-between align-items-center">
                <div class="col-2 budget-list-item">20-04-2021</div>
                <div class="col-2 budget-list-item text-uppercase">${income.title}</div>
                <div class="col-2 budget-list-item">+$ ${income.amount}</div>
                <div class="col-2 budget-list-item">Ingreso</div>
                <div class="col-2 budget-list-item">S/N</div>
                <div class="col-2 budget-icons">
                    <div class="row">
                        <a href="#" class="edit-icon mx-2" data-id="${income.id}">
                            <ion-icon name="create" size="large" id="edit-button"></ion-icon>
                            <!--<button class="btn  btn-sm btn-warning" id="edit-button">editar</button>-->
                        </a>
                        <a href="#" class="delete-icon" data-id="${income.id}">
                            <ion-icon name="trash" size="large" id="delete-button"></ion-icon>
                            <!--<button class="btn btn-sm btn-danger" id="delete-button">borrar</button>-->
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `)
    }

    // addExpense (agregar GASTO)
    addExpense(expense) {
        this.totalList.prepend(`
        <div class="expense">
            <div class="expense-item d-flex justify-content-between align-items-center">
                <div class="col-2 expense-list-item">20-04-2021</div>
                <div class="col-2 expense-list-item text-uppercase">${expense.title}</div>
                <div class="col-2 expense-list-item">-$ ${expense.amount}</div>
                <div class="col-2 expense-list-item">Gasto</div>
                <div class="col-2 expense-list-item">S/N</div>
                <div class="col-2 expense-icons">
                    <div class="row">
                        <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                            <ion-icon name="create" size="large" id="edit-button"></ion-icon>
                            <!--<button class="btn  btn-sm btn-warning" id="edit-button">editar</button>-->
                        </a>
                        <a href="#" class="delete-icon" data-id="${expense.id}">
                            <ion-icon name="trash" size="large" id="delete-button"></ion-icon>
                            <!--<button class="btn btn-sm btn-danger" id="delete-button">borrar</button>-->
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `)
    }
    // Show Balance
    showBalance() {
        const expense = this.totalExpense();
        const budget = this.totalBudget();
        // Calculo el balance (Ingreso - Gastos)
        const total = budget - expense;
        this.balanceAmount.text(total);
        // Condiciones Si total es <> 0
        if (total < 0) {
            this.balance.removeClass("showGreen", "showBlack");
            this.balance.addClass("showRed");
        } else if (total > 0) {
            this.balance.removeClass("showRed", "showBlack");
            this.balance.addClass("showGreen");
        } else if (total === 0) {
            this.balance.removeClass("showRed", "showGreen");
            this.balance.addClass("showBlack");
        }
    }
    // Calculo el Ingreso Total (totalbudget)
    totalBudget() {
        let totalBudget = 0;
        if (this.itemBudgetList.length > 0) {
            totalBudget = this.itemBudgetList.reduce(function (acc, curr) { // reduce suma el valor actual(curr) al valor acumulado, va recorriendo todo el array
                acc += curr.amount;
                return acc;
            }, 0);

        }
        this.budgetAmount.text(totalBudget); //Actualizo el valor mostrado

        return totalBudget;
    }
    // Calculo el Gasto Total (totalExpense)
    totalExpense() {
        let totalExpense = 0;
        if (this.itemExpenseList.length > 0) {
            totalExpense = this.itemExpenseList.reduce(function (valAcum, valCorriente) {
                valAcum += valCorriente.amount; //Le sumo el valor actual al acumulado (x cada item de la lista)
                return valAcum; // Tengo que devolver este valor para que la funcion ande correctamente
            }, 0);

        }
        this.expenseAmount.text(totalExpense); // Muestro el total en el balance
        return totalExpense;
    }
    // edit List Item 
    editItem(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;
        
        if(parent.classList.contains('expense')){// El elemento es un gasto
            parent.remove();
            //seleccion de la lista el elemento
            let expense = this.itemExpenseList.filter((item) => {
                return item.id === id
            });
            // remuevo el elemnto de la lista y reemplazo la nueva lista sin ese elemento
            let tempList = this.itemExpenseList.filter((item) => {
                return item.id !== id
            });
            this.itemExpenseList = tempList;
            this.showBalance();

            //show value en editor
            this.numberInput.val(expense[0].amount);
            this.textInput.val(expense[0].title);
            this.category.val(expense[0].category);
            this.account.val(expense[0].account);
            this.dateInput.val(expense[0].date);
            this.textInput.val(expense[0].title);
            this.numberInput.val(expense[0].amount);
        }
        else if(parent.classList.contains('budget')){// El elemento es un ingreso (Budget)
            parent.remove();
            // elimino el elemento de la lista Budget
            let budget = this.itemBudgetList.filter((item) => {
                return item.id === id
            }); //Agarro el objeto
            let tempList = this.itemBudgetList.filter((item) => {
                return item.id !== id
            }); // me genero una lista temporal
            // genero el nuevo listado sin el elemento
            this.itemBudgetList = tempList;
            this.showBalance();

            //show value en editor
            this.numberInput.val(budget[0].amount);
            this.textInput.val(budget[0].title);
            this.category.val(budget[0].category);
            this.account.val(budget[0].account);
            this.dateInput.val(budget[0].date);
            this.textInput.val(budget[0].title);
            this.numberInput.val(budget[0].amount);
        }
    }
    // delete Item List EXPENSE / INCOME
    deleteItem(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;
        
        if(parent.classList.contains('expense')){
            parent.remove();
            // El elemento es un gasto
            // remuevo el elemnto de la lista y reemplazo la nueva lista sin ese elemento
            let tempList = this.itemExpenseList.filter((item) => {
                return item.id !== id
            });
            this.itemExpenseList = tempList;
            this.showBalance();
        }
        else if(parent.classList.contains('budget')){
            parent.remove();
            // El elemento es un ingreso (Budget)
            let tempList = this.itemBudgetList.filter((item) => {
                return item.id !== id
            }); // me genero una lista temporal
            // genero el nuevo listado sin el elemento
            this.itemBudgetList = tempList;
            this.showBalance();
        }
    }

    
}
//Corremos esta funcion una vez corrio y se cargo el DOM
function eventListeners() {
    const genericForm = $("#generic-form");
    const totalList = $("#total-list");
    const typeSelect = $("#typeSelection");
    let ingresoBtn = false;
    let egresoBtn = false;

    // Instancio la clase UI (UserInterface)
    const ui = new UI();

    ////////////////////////////////////
    //////////     EVENTOS  ///////////
    //////////////////////////////////

    // Form submit
    genericForm.submit(function (event) {
        event.preventDefault();
        if(ingresoBtn){ //Boton Ingreso Seleccionado
            ui.submitForm(ingresoBtn);
        } else if(egresoBtn){ //Boton Egreso Seleccionado
            ui.submitForm(ingresoBtn);
        }
    });
    
    // Total List Click
    totalList.click(function(event) {
        if(event.target.parentElement.classList.contains('edit-icon')){
            ui.editItem(event.target.parentElement);
        }
        else if(event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteItem(event.target.parentElement);
        }
    });

    typeSelect.click(function(event){
            
        if(event.target.id === 'selectBudget'){
            ingresoBtn = true;
            egresoBtn =  !ingresoBtn;
        }else if(event.target.id === 'selectExpense'){
            egresoBtn =  true;
            ingresoBtn = !egresoBtn;
            
        }
        console.log('Apretado Boton Ingreso: '+ingresoBtn);
        console.log('Apretado Boton Egreso: '+egresoBtn);
    });

}

// Este evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado
$(document).ready(function () {
    console.log("DOM full loaded and parsed")
    eventListeners();
})
