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
    /*const date = document.querySelector("#day").value + " " + document.querySelector("#month").value + " " + document.querySelector("#year").value;
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
    });*/

    //To display salary slider value
    const salaryValue = document.querySelector('#salary');
    const outputValue = document.querySelector('.salary-output');
    outputValue.textContent = salaryValue.value;
    salaryValue.addEventListener('input',function(){
        outputValue.textContent = salaryValue.value;
    });
    
});

const save = () =>{
    try{
        let employeePayrollData = createEmployeePayroll();
        createLocalStorage(employeePayrollData)
    }
    catch (ex){
        return;
    }
}
const createEmployeePayroll = () =>{
    let employeePayroll = new EmployeePayrollData();
    try{
        employeePayroll.name = getInputValuesbyId('#name');
    }
    catch (ex){
        setTextValue('.nameError', ex);
        throw ex;
    }
    employeePayroll.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayroll.gender = getSelectedValues('[name=gender]').pop();
    employeePayroll.department = getSelectedValues('[name=department]');
    employeePayroll.salary = getInputValuesbyId('#salary');
    employeePayroll.notes = getInputValuesbyId('#notes');
    let date = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
    employeePayroll.startDate = new Date(Date.parse(date)).toLocaleDateString();
    alert(employeePayroll.toString());
    return employeePayroll;
}

const getInputValuesbyId = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item =>{
        if(item.checked)
        {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}
//To store data into local storage
function createLocalStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

