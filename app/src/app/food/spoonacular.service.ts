import { Countries } from './../../util/countries';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


@Injectable()
export class SpoonacularService {

  apiKeys:string[] = ["?apiKey=63a06bcd21694edaa60185edaa6bee0e", "?apiKey=492ae5b5a563451c8ace177e23a4770b"]
  baseURL: string = "https://api.spoonacular.com/recipes";
  preamble: string = this.apiKeys[1];

  constructor(private http: HttpClient) {
  }

  getCuisineDetails(cuisine: Countries): Observable<any> {
    return this.http.get(this.baseURL + "/complexSearch" + this.preamble + '&cuisine=' + cuisine.toLowerCase())
  }

  getFromIds(ids: string): Observable<any> {
    return this.http.get(this.baseURL + "/informationBulk" + this.preamble + '&ids=' + ids)
  }
}
