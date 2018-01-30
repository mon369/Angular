import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from "../data/position";
import { PositionService } from '../position.service';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../log.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {

  position: Position;
  getPosSub: any;
  paramSub: any;
  savePosSub: any;
  successMessage: boolean;


  constructor(
    private pService: PositionService,
    private aRoute: ActivatedRoute,
    private logService: LogService
  ) {

    this.position = new Position();
    this.getPosSub = "";
    this.paramSub = "";
    this.savePosSub = "";
    this.successMessage = false;
  }

  ngOnInit() {
    this.paramSub = this.aRoute.params.subscribe((params) => {
      this.position._id = params._id;
    })
    this.getPosSub = this.pService.getPosition(this.position._id).subscribe((position) => {
      this.position = position[0];

    })
  }

  onSubmit() {
    this.savePosSub = this.pService.savePosition(this.position).subscribe(() => {
      this.logService.writeLog(this.position.PositionName + " successfully updated");
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500);
    })
  }

  ngOnDestroy() {
    this.getPosSub.unsubscribe();
    this.paramSub.unsubscribe();
    if (this.savePosSub) {
      this.savePosSub.unsubscribe();
    }
  }
}
