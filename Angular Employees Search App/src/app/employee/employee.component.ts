import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../employee.service';
import { PositionService } from '../position.service';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../data/position';
import { LogService } from '../log.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  employee : EmployeeRaw;
  positions : Position[];
  paramSub : any;
  getEmpSub : any;
  getPosSub : any;
  saveEmpSub : any;
  successMessage : boolean;

  constructor(
    private eService : EmployeeService,
    private pService : PositionService,
    private aRoute : ActivatedRoute,
    private logService : LogService
  ) { 
    this.employee = new EmployeeRaw();
    this.positions = [];
    this.paramSub = "";
    this.getEmpSub = "";
    this.getPosSub = "";
    this.saveEmpSub = "";
    this.successMessage = false;
  }

  ngOnInit() {
    this.paramSub = this.aRoute.params.subscribe((params) =>{
      this.employee._id = params._id;
    })

    this.getEmpSub = this.eService.getEmployee(this.employee._id).subscribe((employee)=>{
      this.employee = employee[0];      
    })
    
    this.getPosSub = this.pService.getPositions().subscribe((positions) =>{
      this.positions = positions;
    })
  }

  onSubmit(){   
    this.saveEmpSub = this.eService.saveEmployee(this.employee).subscribe((res)=>{
        this.logService.writeLog(this.employee.FirstName + " " + this.employee.LastName + " successfully updated");
        this.successMessage = true;
        setTimeout(()=>{
          this.successMessage = false;
        }, 2500);      
    })   
  }

  ngOnDestroy(){
    this.paramSub.unsubscribe();
    this.getEmpSub.unsubscribe();
    this.getPosSub.unsubscribe();
    if(this.saveEmpSub){
      this.saveEmpSub.unsubscribe();
    }
  }

}
