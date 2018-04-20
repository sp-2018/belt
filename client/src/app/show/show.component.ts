// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-show',
//   templateUrl: './show.component.html',
//   styleUrls: ['./show.component.css']
// })
// export class ShowComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
// import { ViewChild, ElementRef } from '@angular/core';

// @ViewChild('submitButton') submitButton:ElementRef;

@Component({
  selector: 'app-list-quote',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  error = {}
  errFlag = false
  id:string;
  user= []
  quotes = []
  flagVariable = ""
//  val = false;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }


  ngOnInit() {
    this.listUser()
  }

  listUser() {
    //this.formFlag = true
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    console.log("list user id",this.id)
    this.getOneUserFromService(this.id)
  }

  getOneUserFromService(id){
    let authorObservable = this._httpService.getOneUser(id);
    authorObservable.subscribe(data => { console.log("Got our data!", data);

      if(data['error']){
        this.error = data['error']['message']
        this.errFlag = true
        console.log("in show err")
      }
      else{
        this.error = {}; 
        this.errFlag = false
        this.user = data['data'];
        console.log('in show success',data)
        console.log('in show success',this.user)
        //this.quotes = data['data']['quotes'];
        for(let task of data['data']){
          console.log(task);
        }
      }
      
    });
  }

  onDelete(id) {
    let observable = this._httpService.deleteUser(id);
    observable.subscribe(data => {
      console.log("Got data from delete back", data);

      if(data['error']){
        this.error = data['error']['message']
        this.errFlag = true
      }
      else{
        this.error = {}; 
        this.errFlag = false
        //this.getUsersFromService();
        // this._router.navigate(['/list/'])
        this._router.navigate([''])
      }
    })
  }

  // onDelete(author_id,quote_id){
  //   let observable = this._httpService.deleteQuote(author_id,quote_id);
  //   observable.subscribe(data => {
  //     console.log("Got data from delete back", data);

  //     if(data['error']){
  //       this.error = data['error']['message']
  //       this.errFlag = true
  //     }
  //     else{
  //       this.error = {}; 
  //       this.errFlag = false
  //       this.getOneUserFromService(this.id);
  //     }
  //   })
  // }

  voteUp(user_id){
    // this.submitButton.nativeElement.disabled = true;
    // this.val=true;
    this.flagVariable = "true"
    let observable = this._httpService.addUpVote(user_id);
    observable.subscribe(data => {
      console.log("Got data from post back", data);

      if(data['error']){
        this.error = data['error']['message']
        this.errFlag = true
      }
      else{
        this.error = {}; 
        this.errFlag = false
        this.getOneUserFromService(this.id)
      }
    })
  }

  // angular.module('demo', [])
  //   .controller('demoController',function($scope){

  //   $scope.isDisabled = false;

  //   $scope.disableButton = function() {
  //       $scope.isDisabled = true;
  //   }

  //   });

  // voteDown(author_id,quote_id){

  //   let observable = this._httpService.addDownVote(author_id,quote_id);
  //   observable.subscribe(data => {
  //     console.log("Got data from post back", data);

  //     if(data['error']){
  //       this.error = data['error']['message']
  //       this.errFlag = true
  //     }
  //     else{
  //       this.error = {}; 
  //       this.errFlag = false
  //       this.getOneAuthorFromService(this.id)
  //     }
  //   })
  // }

  isDisabled(item) : boolean {
    return item && item.username === name;
   }

  }




