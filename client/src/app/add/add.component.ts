import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //newAuthor: any;
  newUser = {likes:0}
  error = {}
  errFlag = false
  //addUser = {}
  //addUser = {skills: [{skill1: '', skill2: '',skill3: ''}]}

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
 
  }

  onSubmit() {

    let observable = this._httpService.addUser(this.newUser);
    observable.subscribe(data => {
      console.log("Got data from post back", data);

      if(data['error']){
          if(data['error']['message']){
          this.error = data['error']['message']
          this.errFlag = true
          }
          else if(data['error']['errmsg']){
            console.log()
            this.error = data['error']['errmsg']
           // this.error = {error:{message:'This name already exists!'}}
            // console.log("unique", data['error']['errmsg'])
            // console.log("unique", data['error'])
            this.errFlag = true
          }
      }
      else{
        this.error = {}; 
        this.errFlag = false
        this._router.navigate([''])
      }
    })
  }

}

