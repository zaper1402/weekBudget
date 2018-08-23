//classes
class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    subtractFromBudget(amount){
        return this.budgetLeft -=amount; 
    }
}
 
//Everything related to html
class HTML{
//Insert budget
 insertBudget(amount){
     console.log(amount);
 budgetTotal.innerHTML = amount;
 budgetLeft.innerHTML = amount;

 }

 //Display message(correct/invalid)
 printMessage(message,className){
     const messageWrapper = document.createElement('div');
     messageWrapper.classList.add('text-centre','alert',className);
     messageWrapper.appendChild(document.createTextNode(message));

     //Insert itno html
     document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm);
    
     //clear the error
     setTimeout(() => {
        document.querySelector('.primary .alert').remove();
     }, 3000);
  
 }
//diplay the content in the list
addExpenseToList(name,amount){
    const expensesList = document.querySelector('#expenses ul');

    //create li
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-centre";
    //create template
    li.innerHTML = `${name}
    <span class="badge badge-primary badge-pill">$ ${amount}</span>`;

    //add to list
    expensesList.appendChild(li);
};
 //subtract expense
 trackBudget(amount){
     const budgetLeftDollars = budget.subtractFromBudget(amount);
     budgetLeft.innerHTML = `${budgetLeftDollars}`;
     //check %budget
     if((budget.budget)/4 > budgetLeftDollars){
         //add some classes and remove others
         budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
         budgetLeft.parentElement.parentElement.classList.add('alert-danger');

     }else if((budget.budget)/2 > budgetLeftDollars){
        budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
        budgetLeft.parentElement.parentElement.classList.add('alert-warning');
     }
 }

}


//variables

const addExpenseForm = document.querySelector('#add-expense')
 html = new HTML(),
 budgetTotal = document.querySelector('span#total'),
 budgetLeft = document.querySelector('span#left');
let budget,userbudget;



//Event Listeners
eventListeners();

function eventListeners()
{
    //App Init
    document.addEventListener('DOMContentLoaded',function(){
        //ask the visitor for budget
     userbudget = prompt('What your budget for this week?');
     //validate the user budget
     if(userbudget === null|| userbudget ===''||userbudget==='0'){
         window.location.reload();
     }
     else
     {
         //Budget is valid make budget class
        budget = new Budget(userbudget);

        //instantiate HTML class
        html.insertBudget(budget.budget);
     }
    });

    //when new expense is added
    addExpenseForm.addEventListener('submit',function(e){
        //.read the input values
        e.preventDefault();
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;
        if(expenseName===''|| amount == '')
        {
            console.log('invalid');
           
        }else
        {
            //Add the ecpense to the list
            html.addExpenseToList(expenseName,amount);
            html.trackBudget(amount)
            html.printMessage('Added...','alert-success');
        }

    });
}
