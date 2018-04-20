import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  users = []
  error = {}
  errFlag = false

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getUsersFromService()
  }

  getUsersFromService(){
    let allTasksObservable = this._httpService.getUsers();
    allTasksObservable.subscribe(data => { console.log("Got our authors!", data);

      if(data['error']){
        this.error = data['error']['message']
        this.errFlag = true
      }
      else{
        this.error = {}; 
        this.errFlag = false
        this.users = data['data'];
        for(let task of data['data']){
          console.log(task);
        }
      }
      
    });
  }

  // onDelete(id) {
  //   let observable = this._httpService.deleteAuthor(id);
  //   observable.subscribe(data => {
  //     console.log("Got data from delete back", data);

  //     if(data['error']){
  //       this.error = data['error']['message']
  //       this.errFlag = true
  //     }
  //     else{
  //       this.error = {}; 
  //       this.errFlag = false
  //       this.getAuthorsFromService();
  //     }
  //   })
  // }

  onEdit(id) {
    this._router.navigate(['/edit/'+id])
  }

  viewUser(id){
    this._router.navigate(['/details/'+id])
  }
}