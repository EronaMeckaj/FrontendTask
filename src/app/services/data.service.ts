import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/data.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  /**
   * GET request to take all data from the endpoint as an Observable of type Data.
   */
  getAllData(): Observable<Data> {
    return this.http.get<Data>('https://test.dev.al/test/');
  }

  /**
    * replace empty spaces with "-" and remove "/"
    * for example "Food Menu/Snacks" will be formatted into "food-menu-snacks"
    */
  modifyString(input: string): string {
    if (input && input.length) {
      return input.toLowerCase().split(' ').join('-').split('/').join('')
    }
    return ''
  }

}

