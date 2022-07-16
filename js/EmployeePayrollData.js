class EmployeePayrollData
{
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get name() 
    {
        return this._name;
    }
    set name(name)
    {
        let checkName = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$')
            if(checkName.test(name)){
                this._name = name;
        }
        else{
            throw "Invalid Name - Min length:3 & start with a capital";
        }
    }

    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }

    get department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }

    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary = salary;
    }

    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        let date = new Date().toLocaleDateString();
        if(startDate <= date)
        {
            this._startDate = startDate;
        }
        else
        {
            throw "Invalid Date!!";
        }
    }

    get notes(){
        return this._notes;
    }
    set notes(notes){
        this._notes = notes;
    }

    toString()
    {
        return "Id: " + this.id + ", Name: " + this.name + ", Profile Pic: " + this.profilePic + ", Gender: " + this.gender + 
        ", Department: " + this.department + ", Salary: " + this.salary + ", StartDate: " + this.startDate + ", Notes: " + this.notes;
    }
}

