import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  private entries: string[];
  private getLogSub: any;
  constructor(private logService: LogService) { }
  ngOnInit() {
    this.getLogSub = this.logService.getLog.subscribe((data) => {
      this.entries = data;
    });
  }
  ngOnDestroy() {
    if (this.getLogSub) { this.getLogSub.unsubscribe(); }
  }
}