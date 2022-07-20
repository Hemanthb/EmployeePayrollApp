let isUpdate = false;
let employeePayrollObject = {};

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
    checkForUpdate();
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

const save = (event) =>{
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
const resetForm = () =>{
    setDefaultValue('#name','');
    unCheckValues('[name = profile]');
    unCheckValues('[name = gender]');
    unCheckValues('[name = department]');
    setDefaultValue('#salary','50000');
    setDefaultValue('day','day');
    setDefaultValue('month','month');
    setDefaultValue('year','year');
    setDefaultValue('#notes','');
}

const setDefaultValue = (id, value) =>{
    const item = document.querySelector(id)
    item.textContent = value;
}

const unCheckValues = (propertyValue) =>{
   let allItems = document.querySelectorAll(propertyValue);
   allItems.forEach(item =>{
    item.checked = false;
   });
}

const checkForUpdate =()=>{
    const employeePayrollJSON = localStorage.getItem('EmployeePayrollList');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate)return;
    employeePayrollObject = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm =()=>{
    setValue('#name', employeePayrollObject._name);
    setSelectedValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectedValue('[name=gender]', employeePayrollObject._gender);
    setSelectedValue('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary)
    setValue('#notes', employeePayrollObject._notes);
    let date = (employeePayrollObject._startDate).split("/");
    setValue('#day', date[1]);
    setValue('#month', date[0]);
    setValue('#year', date[2]);
}

const setSelectedValue =(propertyValue, value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
            {
                item.checked = true;
            }
        }
        else
        {
            if(item.value ===value)
            {
                item.checked = true;
            }
        }
    });
}
