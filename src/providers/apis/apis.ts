import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApisProvider {

  constructor(public http: Http) {
    
  }

  async weather_api(): Promise<any>
  {
    let api_link = 'http://api.openweathermap.org/data/2.5/forecast?id=3195499&appid=3e49947e1075ca4e45f4443cba63d94d&units=metric&lang=hr';

    const response = await this.http.get(api_link).toPromise();
    return response.json();

  }

}
