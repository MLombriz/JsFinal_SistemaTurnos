class UI {
    constructor() {
        // Datos Ingresos UI
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.budgetForm = document.querySelector(".budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetTextInput = document.getElementById("textBudget-input");

        // Datos Gastos UI
        this.expenseFeedback = document.getElementById("feedback-expense");
        this.expenseForm = document.querySelector(".expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.expenseDate = document.getElementById("expense-date");
        this.amountInput = document.getElementById("amount-input"); //Monto cargado por usuario Gasto 

        // APP INFO VALORES
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balanceAmount = document.getElementById("balance-amount");
        this.balance = document.getElementById("balance");

        // Listas Ingresos / Gastos
        this.expenseList = document.getElementById("expense-list");
        this.budgetList = document.getElementById("budget-list");
        this.itemExpenseList = []; //Lista de Gastos
        this.itemBudgetList = []; //Lista de Ingresos
        this.itemExpenseID = 0;
        this.itemBudgetID = 0;
    }

    // Declaramos los Metodos
    // submit budget method
    submitBudgetForm() {
        const value = this.budgetInput.value; //Valor ingresado por UI
        const budgetText = this.budgetTextInput.value;
        console.log(budgetText);
        if (value === "" || value < 0) {
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `<p> No puede faltar el valor o ser negativo </p>`;
            this.budgetFeedback.classList.remove('alert-success');
            this.budgetFeedback.classList.add('alert-danger');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.budgetFeedback.classList.remove("showItem");
            }, 3000);
        } else {
            //this.budgetAmount.textContent = value; //Asigno el valor cargado al budget
            this.budgetInput.value = ''; //Seteo el valor a "vacio" para que no quede a la vista
            this.budgetTextInput.value = '';
            // Feedback OK - Carga Exitosa
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `<p> Carga de Ingreso exitosa </p>`
            this.budgetFeedback.classList.remove('alert-danger');
            this.budgetFeedback.classList.add('alert-success');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.budgetFeedback.classList.remove('showItem');
            }, 3000);

            // Creo objeto INPUT
            const income={
                id: this.itemBudgetID,
                title: budgetText,
                amount: parseInt(value), 
            }
            this.itemBudgetID++;
            this.itemBudgetList.push(income);
            this.addBudget(income);
            this.showBalance();
        }
    }

    // submit Expense Form method
    submitExpenseForm() {
        const expenseValue = this.expenseInput.value; //Valor ingresado por UI
        const amountValue = this.amountInput.value;
        if (expenseValue === "" || amountValue === "" || amountValue < 0) {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p> No puede faltar el valor o ser negativo </p>`;
            this.expenseFeedback.classList.remove('alert-success');
            this.expenseFeedback.classList.add('alert-danger');
            setTimeout(() => {
                this.expenseFeedback.classList.remove('showItem');
            }, 3000); //3000 ms = 3 seg
        } else {
            let amountExpense = parseInt(amountValue);
            this.expenseInput.value = "";
            this.amountInput.value = "";

            // Feedback OK - Carga Exitosa
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p> Carga de Gasto exitosa </p>`
            this.expenseFeedback.classList.remove('alert-danger');
            this.expenseFeedback.classList.add('alert-success');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.expenseFeedback.classList.remove('showItem');
            }, 3000);

            // Creo el objeto expense para almacenarlo con los datos cargados por UI
            let expense = {
                id: this.itemExpenseID,
                title: expenseValue,
                amount: amountExpense,
            }
            this.itemExpenseID++; //aumento el ID para que no se repita
            this.itemExpenseList.push(expense); // Agrego el objeto expense dentro de la lista
            this.addExpense(expense); // lo muestro en el listado de Gastos
            // show Balance
            this.showBalance(); //Vuelvo a recalcular el balance
        }
    }
    // addBudget (agregar INPUT)
    addBudget(income){
        const divBudget = document.createElement('div');
        divBudget.classList.add('budget');
        divBudget.innerHTML = `
        <div class="budget-item d-flex justify-content-between align-items-baseline">
            <div class="col-3 list-item text-uppercase budget-description">${income.title}</div>
            <div class="col-3 list-item budget-amount">${income.amount}</div>
            <div class="col-3 list-item budget-type">No cargado</div>
            <div class="col-3 list-item budget-icons">
                <div class="row">
                    <a href="#" class="edit-icon mx-2" data-id="${income.id}">
                        <button class="btn btn-warning" id="budget-edit-button">editar</button>
                    </a>
                    <a href="#" class="delete-icon" data-id="${income.id}">
                        <button class="btn btn-danger" id="budget-delete-button">borrar</button>
                    </a>
                </div>                    
            </div>
        </div>
        `
        this.budgetList.appendChild(divBudget);
    }

    // addExpense (agregar GASTO)
    addExpense(expense) {
        const divExpense = document.createElement('div');
        divExpense.classList.add('expense');
        divExpense.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <div class="col-3 list-item text-uppercase expense-description">${expense.title}</div>
            <div class="col-3 list-item expense-amount">${expense.amount}</div>
            <div class="col-3 list-item expense-type">No cargado</div>
            <div class="col-3 list-item expense-icons">
                <div class="row">
                    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                        <button class="btn btn-warning" id="expense-edit-button">editar</button>
                    </a>
                    <a href="#" class="delete-icon" data-id="${expense.id}">
                        <button class="btn btn-danger" id="expense-delete-button">borrar</button>
                    </a>
                </div>                    
            </div>
        </div>
        `;
        this.expenseList.appendChild(divExpense); //Agrego el elemento div al HTML
    }
    // Show Balance
    showBalance() {
        const expense = this.totalExpense();
        const budget = this.totalBudget();
        // Calculo el balance (Ingreso - Gastos)
        const total = budget - expense;
        this.balanceAmount.textContent = total;
        // Condiciones Si total es <> 0
        if (total < 0) {
            this.balance.classList.remove("showGreen", "showBlack");
            this.balance.classList.add("showRed");
        } else if (total > 0) {
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
        } else if (total === 0) {
            this.balance.classList.remove("showRed", "showGreen");
            this.balance.classList.add("showBlack");
        }
    }
    // Calculo el Ingreso Total (totalbudget)
    totalBudget(){
        let totalBudget = 0;
        if(this.itemBudgetList.length > 0){
            totalBudget = this.itemBudgetList.reduce(function(acc,curr){
                acc += curr.amount;
                return acc;
            },0);
            
        }
        this.budgetAmount.textContent = totalBudget; //Actualizo el valor mostrado
        
        return totalBudget;
    }
    // Calculo el Gasto Total (totalExpense)
    totalExpense() {
        let total = 0;
        if (this.itemExpenseList.length > 0) {
            total = this.itemExpenseList.reduce(function (valAcum, valCorriente) {
                valAcum += valCorriente.amount; //Le sumo el valor actual al acumulado (x cada item de la lista)
                return valAcum; // Tengo que devolver este valor para que la funcion ande correctamente
            }, 0);
            
        }
        this.expenseAmount.textContent = total; // Muestro el total en el balance
        return total;
    }

    // edit Element List EXPENSE
    editExpense(element){
        let id = parseInt(element.dataset.id) //busco del elemento el data-id que se le asigno en el html
        //console.log(element.parentElement.parentElement.parentElement.parentElement) busco el elemento padre a eliminar
        let parent = element.parentElement.parentElement.parentElement.parentElement

        // remuevo el elemento
        this.expenseList.removeChild(parent);

        //seleccion de la lista el elemento
        let expense = this.itemExpenseList.filter((item)=>{return item.id === id});
        // remuevo el elemnto de la lista y reemplazo la nueva lista sin ese elemento
        let tempList = this.itemExpenseList.filter((item)=>{return item.id !== id});
        this.itemExpenseList = tempList;
        this.showBalance();

        //show value en editor
        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;
        
    }
    //delete Element List EXPENSE
    deleteExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;

        // elimino el elemento del DOM
        this.expenseList.removeChild(parent);
        // Elimino el elemento del listado budget
        let tempList = this.itemExpenseList.filter((item)=>{return item.id !== id});
        this.itemExpenseList = tempList;
        this.showBalance();

    }

    //edit Budget Element
    editBudget(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;

        // elimino el elemento del DOM
        this.budgetList.removeChild(parent);
        // elimino el elemento de la lista Budget
        let budget = this.itemBudgetList.filter((item)=>{return item.id === id}); //Agarro el objeto
        let tempList = this.itemBudgetList.filter((item)=>{ return item.id !== id}); // me genero una lista temporal
        // genero el nuevo listado sin el elemento
        this.itemBudgetList = tempList;
        this.showBalance();

        // edito los valores
        this.budgetTextInput.value = budget[0].title;
        this.budgetInput.value = budget[0].amount; 
    }

    //delete Budget Element
    deleteBudget(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;

        // elimino el elemento del DOM
        this.budgetList.removeChild(parent);
        // elimino el elemento de la lista Budget
        let budget = this.itemBudgetList.filter((item)=>{return item.id === id}); //Agarro el objeto
        let tempList = this.itemBudgetList.filter((item)=>{ return item.id !== id}); // me genero una lista temporal
        // genero el nuevo listado sin el elemento
        this.itemBudgetList = tempList;
        this.showBalance();
    }
}
//Corremos esta funcion una vez corrio y se cargo el DOM
function eventListeners() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const budgetList = document.getElementById("budget-list");

    // Instancio la clase UI (UserInterface)
    const ui = new UI();

    // budget form submit
    budgetForm.addEventListener("submit", function (event) {
        event.preventDefault();
        ui.submitBudgetForm();
    });

    // Budget Click
    budgetList.addEventListener("click", function (event) {
        if(event.target.parentElement.classList.contains('edit-icon')){
            ui.editBudget(event.target.parentElement);
        }
        else if(event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteBudget(event.target.parentElement);
        }
    });

    // expense form submit
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        ui.submitExpenseForm();
    });

    // expense Click form submit (veo donde se hace click en el listafo Gastos)
    expenseList.addEventListener("click", function (event) {
        //console.log(event.target); // me fijo el evento que devuelve el click
        if(event.target.parentElement.classList.contains('edit-icon')){
            ui.editExpense(event.target.parentElement)
        }
        else if(event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteExpense(event.target.parentElement)
        }
    });
}

// Este evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM full loaded and parsed")
    eventListeners();
})