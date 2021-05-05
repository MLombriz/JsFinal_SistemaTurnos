class UI {
    constructor() {
        // Datos Ingresos UI
        this.budgetFeedback = $(".budget-feedback");
        this.budgetForm = $(".budget-form");
        this.budgetInput = $("#budget-input");
        this.budgetTextInput = $("#textBudget-input");

        // Datos Gastos UI
        this.expenseFeedback = $("#feedback-expense");
        this.expenseForm = $(".expense-form");
        this.expenseInput = $("#expense-input");
        this.expenseDate = $("#expense-date");
        this.amountInput = $("#amount-input"); //Monto cargado por usuario Gasto 

        // APP INFO VALORES
        this.budgetAmount = $("#budget-amount");
        this.expenseAmount = $("#expense-amount");
        this.balanceAmount = $("#balance-amount");
        this.balance = $("#balance");

        // Listas Ingresos / Gastos
        this.expenseList = $("#expense-list");
        this.budgetList = $("#budget-list");
        this.totalList = $("#total-list");
        this.itemsList = []; // Lista de Gastos e Ingresos
        this.itemExpenseList = []; //Lista de Gastos
        this.itemBudgetList = []; //Lista de Ingresos
        this.itemExpenseID = 0;
        this.itemBudgetID = 0;

        //Nuevos Datos Cargados por USUARIO
        
    }

    // Declaramos los Metodos
    // submit budget method
    submitBudgetForm() {
        const value = this.budgetInput.val(); //Valor ingresado por UI
        const budgetText = this.budgetTextInput.val();
        if (budgetText === "" || value === "" || value < 0) {
            this.budgetFeedback.addClass('showItem');
            this.budgetFeedback.html(`<p> No puede faltar el valor o ser negativo </p>`);
            this.budgetFeedback.removeClass('alert-success');
            this.budgetFeedback.addClass('alert-danger');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.budgetFeedback.removeClass("showItem");
            }, 3000);
        } else {
            //this.budgetAmount.textContent = value; //Asigno el valor cargado al budget
            this.budgetInput.val(''); //Seteo el valor a "vacio" para que no quede a la vista
            this.budgetTextInput.val('');
            // Feedback OK - Carga Exitosa
            this.budgetFeedback.addClass('showItem');
            this.budgetFeedback.html(`<p> Carga de Ingreso exitosa </p>`);
            this.budgetFeedback.removeClass('alert-danger');
            this.budgetFeedback.addClass('alert-success');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.budgetFeedback.removeClass('showItem');
            }, 3000);

            // Creo objeto INPUT
            const income = {
                id: this.itemBudgetID,
                title: budgetText,
                amount: parseInt(value),
            }
            this.itemBudgetID++;
            this.itemBudgetList.push(income);
            // Instancio funciones creadas
            this.addBudget(income);
            this.showBalance();
        }
    }

    // submit Expense Form method
    submitExpenseForm() {
        const expenseValue = this.expenseInput.val(); //Valor ingresado por UI
        const amountValue = this.amountInput.val();
        if (expenseValue === "" || amountValue === "" || amountValue < 0) {
            this.expenseFeedback.addClass('showItem');
            this.expenseFeedback.html(`<p> No puede faltar el valor o ser negativo </p>`);
            this.expenseFeedback.removeClass('alert-success');
            this.expenseFeedback.addClass('alert-danger');
            setTimeout(() => {
                this.expenseFeedback.removeClass('showItem');
            }, 3000); //3000 ms = 3 seg
        } else {
            let amountExpense = parseInt(amountValue);
            this.expenseInput.val("");
            this.amountInput.val("");

            // Feedback OK - Carga Exitosa
            this.expenseFeedback.addClass('showItem');
            this.expenseFeedback.html(`<p> Carga de Gasto exitosa </p>`);
            this.expenseFeedback.removeClass('alert-danger');
            this.expenseFeedback.addClass('alert-success');
            setTimeout(() => { // En cierto tiempo la alerta desaparece
                this.expenseFeedback.removeClass('showItem');
            }, 3000);

            // Creo el objeto expense para almacenarlo con los datos cargados por UI
            let expense = {
                id: this.itemExpenseID,
                title: expenseValue,
                amount: amountExpense,
            }
            this.itemExpenseID++; //aumento el ID para que no se repita
            this.itemExpenseList.push(expense); // Agrego el objeto expense dentro de la lista
            // Instancio funciones creadas
            this.addExpense(expense); // lo muestro en el listado de Gastos
            this.showBalance(); //Vuelvo a recalcular el balance
        }
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
        let total = 0;
        if (this.itemExpenseList.length > 0) {
            total = this.itemExpenseList.reduce(function (valAcum, valCorriente) {
                valAcum += valCorriente.amount; //Le sumo el valor actual al acumulado (x cada item de la lista)
                return valAcum; // Tengo que devolver este valor para que la funcion ande correctamente
            }, 0);

        }
        this.expenseAmount.text(total); // Muestro el total en el balance
        return total;
    }
    // edit List Item 
    editItem(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;
        
        if(parent.classList.contains('expense')){
            parent.remove();
            // El elemento es un gasto
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
            this.expenseInput.val(expense[0].title);
            this.amountInput.val(expense[0].amount);
        }
        else if(parent.classList.contains('budget')){
            parent.remove();
            // El elemento es un ingreso (Budget)
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

            // edito los valores
            this.budgetTextInput.val(budget[0].title);
            this.budgetInput.val(budget[0].amount);
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
    const budgetForm = $("#budget-form");
    const expenseForm = $("#expense-form");
    const totalList = $("#total-list");

    // Instancio la clase UI (UserInterface)
    const ui = new UI();

    // budget form submit
    budgetForm.submit(function (event) {
        event.preventDefault();
        ui.submitBudgetForm();
    });
    // expense form submit
    expenseForm.on("submit", function (event) {
        event.preventDefault();
        ui.submitExpenseForm();
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
}

// Este evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado
$(document).ready(function () {
    console.log("DOM full loaded and parsed")
    eventListeners();
})
