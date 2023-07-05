// Your code here
let createEmployeeRecord = function(array){
    return{
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(employees){
	let records = [];
	employees.forEach(function(employee){
		records.push(createEmployeeRecord(employee))
	});
	return records;
}
let createTimeInEvent=function( employee,dateStamp){
    let [date,hour]=dateStamp.split(' ')

    employee.timeInEvents.push({
    type:"TimeIn",
    hour:parseInt(hour,10),
    date,
    })


  return employee;  
}
let createTimeOutEvent=function(employee,dateStamp){
    let[date,hour]=dateStamp.split(' ')

    employee.timeOutEvents.push({
        type:"TimeOut",
        hour:parseInt(hour,10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return rawWage
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
     let payable = 0;

    eligibleDates.forEach(function(date){
        payable += wagesEarnedOnDate(employee, date);

 })

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll=function(arrayOfEmployeeRecords){
    let payroll =0
    arrayOfEmployeeRecords.forEach(function(employee){
        payroll +=allWagesFor(employee);
    })
 return payroll
}