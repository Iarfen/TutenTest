import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as jquery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  booking: any[] = [];
  actual_booking: any[] = [];

  constructor(private http: HttpClient)
  {}

  ngOnInit()
  {
      console.log('Hello!');
      const httpOptions = {
          headers: {
              'App': 'APP_BCK',
              'Password' : '1234',
              'Accept' : 'application/json'
          }
      };
      this.http.put('https://dev.tuten.cl/TutenREST/rest/user/testapis%40tuten.cl',{},httpOptions)
        .subscribe(data => {
            let token = data["sessionTokenBck"];

            let request_bookings = {
                headers: {
                    'App': 'APP_BCK',
                    'Accept' : 'application/json',
                    'Adminemail' : 'testapis@tuten.cl',
                    'Token' : token
                },
                params: {
                    'current' : 'true'
                }
            };

            this.http.get('https://dev.tuten.cl/TutenREST/rest/user/miguel%40tuten.cl/bookings',request_bookings)
                .subscribe(response => {
                    console.log("New data!");
                    console.log(response);
                    for (let item in response)
                    {
                        console.log(response[item]);
                        const parsed = JSON.parse(response[item].bookingFields);
                        response[item]['bookingFields'] = parsed;
                        this.booking.push(response[item]);
                    }
                    this.actual_booking = this.booking;
                });
        });
  }

  search_id()
  {
      let new_actual_booking = [];
      let value = jquery('#filter_text').val();
      if (value != "")
      {
          for (let item in this.booking)
          {
              if (this.booking[item]["bookingId"] == value)
              {
                  new_actual_booking.push(this.booking[item]);
              }
          }
          this.actual_booking = new_actual_booking;
      }
      else
      {
          this.actual_booking = this.booking;
      }
  }
}
