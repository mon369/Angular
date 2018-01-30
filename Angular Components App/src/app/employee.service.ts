import { Injectable } from '@angular/core';
import { Employee } from "./data/employee";
import { EmployeeRaw } from "./data/employeeRaw"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://web422.herokuapp.com/employees");
  }

  getEmployee(id : string) : Observable<EmployeeRaw[]>{
   return this.http.get<EmployeeRaw[]>("https://web422.herokuapp.com/employee-raw/"+ id);

  }

  saveEmployee(employee : EmployeeRaw) :Observable<any>{
    console.log(employee)
    return this.http.put("https://web422.herokuapp.com/employee/"+ employee._id, employee);
  }
}
