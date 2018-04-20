import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-edit2',
  templateUrl: './edit2.component.html',
  styleUrls: ['./edit2.component.css']
})
export class Edit2Component implements OnInit {

  newQuote = {quote:"",vote:0}
  error = {}
  errFlag = false
  id:string;
  author= []

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }


  ngOnInit() {
    // this._route.params.subscribe((params: Params) => this.id = params['id']);
    // this.getOneAuthorFromService(this.id)
  }


  // getOneAuthorFromService(id){
  //   let authorObservable = this._httpService.getOneAuthor(id);
  //   authorObservable.subscribe(data => { console.log("Got our data!", data);

  //     if(data['error']){
  //       this.error = data['error']['message']
  //       this.errFlag = true
  //     }
  //     else{
  //       this.error = {}; 
  //       this.errFlag = false
  //       this.author = data['data'];
  //       console.log(data)
  //     }
      
  //   });
  // }

  // onSubmit() {
  //   console.log("IN SUBMIT")
  //   let observable = this._httpService.addQuote(this.id, this.newQuote);
  //   observable.subscribe(data => {
  //     console.log("Got data from post back IN quote SUBMIT", data);

  //     if(data['error']){
  //       this.error = data['error']['message']
  //       this.errFlag = true
  //       console.log("IN SUBMIT ERROR")
  //     }
  //     else{
  //       this.error = {}; 
  //       this.errFlag = false
  //       this._router.navigate(['/quotes/'+this.id])
  //     }
  //   })
  // }
}

