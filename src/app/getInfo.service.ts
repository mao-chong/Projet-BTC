import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetInfoService {
  private getBtcPrice = new Subject();

  constructor(private http: HttpClient) {}

  getObservableListener() {
    return this.getBtcPrice.asObservable();
  }

  getData(firstDay, lastDay) {
    firstDay = this.timestampToDateTime(firstDay, 'yyyy-MM-ddTHH:mm');
    lastDay = this.timestampToDateTime(lastDay, 'yyyy-MM-ddTHH:mm');

    this.http
      .get<any>(
        'https://production.api.coindesk.com/v2/price/values/BTC?start_date=' +
          firstDay +
          '&end_date=' +
          lastDay +
          '&ohlc=true'
      )
      .subscribe((result) => {
        // console.log(result);
        var data = result.data.entries;
        this.getBtcPrice.next(data);
      });
  }

  timestampToDateTime(timestamp, format) {
    if (isNaN(timestamp)) {
      return;
    }

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    var dateFormat = format
      .replace('yyyy', year.toString())
      .replace('MM', month > 9 ? month.toString() : `0${month}`)
      .replace('dd', day > 9 ? day.toString() : `0${day}`)
      .replace('HH', hour > 9 ? hour.toString() : `0${hour}`)
      .replace('mm', minute > 9 ? minute.toString() : `0${minute}`)
      .replace('ss', second > 9 ? second.toString() : `0${second}`);

    return dateFormat;
  }

  saveBtc(btc){

    this.http.post<any>('http://localhost:3000/btc',btc).subscribe(data=>{
      console.log(data.result);
    });
  }
  getBtc(){
    return this.http.get<any>('http://localhost:3000/btc')
  }
}
