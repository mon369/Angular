import { Component, OnInit, OnDestroy } from '@angular/core';
import {Employee} from "../data/employee";
import { EmployeeService } from '../employee.service';
import {Router} from "@angular/router";




@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees : Employee[];
  filteredEmployees : Employee[];
  getEmployeeSub : any;

  constructor(
    private eService : EmployeeService,
    private router : Router
  ) {
    this.employees = [];
    this.filteredEmployees = [];
    this.getEmployeeSub = "";
   }

  ngOnInit() {

    this.getEmployeeSub = this.eService.getEmployees().subscribe((employees) =>{
      this.employees = employees;
      this.filteredEmployees = employees;
    })

  }

  routeEmployee(id : string){
    this.router.navigate(["/employee", id]);
  }

  onEmployeeSearchKeyUp(event: any){    
    let substring : string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) => ( (e.FirstName.toLowerCase().indexOf(substring) !== -1 ) || (e.LastName.toLowerCase().indexOf(substring) !== -1)))
  }
  
  ngOnDestroy(){
    this.getEmployeeSub.unsubscribe();
  }

}
