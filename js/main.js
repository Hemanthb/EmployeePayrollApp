window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const message = document.querySelector('.text-error');
    name.addEventListener('input', function(){
    if(name.value.length == 0)
    {
        message.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
        message.textContent = "";
    }
    catch(ex){
        message.textContent = ex;
    }
    }); 

    //validate date
    const date = document.querySelector("#month").value + " " + document.querySelector("#day").value + " " + document.querySelector("#year").value;
    const dateMessage = document.querySelector('.date-error');
    date.addEventListener('input', function(){
        let givenDate = new Date(date);
        try{
            (new EmployeePayrollData()).startDate = givenDate;
            dateMessage.textContent = "";
        }
        catch(ex){
            dateMessage.textContent = ex;
        }
    });

    //To display salary slider value
    const salaryValue = document.querySelector('#salary');
    const outputValue = document.querySelector('.salary-output');
    outputValue.textContent = salaryValue.value;
    salaryValue.addEventListener('input',function(){
        outputValue.textContent = salaryValue.value;
    });
    
});
