import { Injectable, } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {Position} from "./data/position";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) {
   }

   getPositions() : Observable<Position[]>{
     return this.http.get<Position[]>("http://web422.herokuapp.com/positions");
   }

   getPosition(id : string) : Observable<Position[]>{
    return this.http.get<Position[]>("http://web422.herokuapp.com/position/"+id);
   }

   savePosition(position : Position) :Observable<any>{
     return this.http.put<any>("http://web422.herokuapp.com/position/"+position._id, position);
   }
}
