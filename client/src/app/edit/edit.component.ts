import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  oneUser = {}
  id:string;
  error = {}
  errFlag = false

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.onPopulateEdit()
  }

  onPopulateEdit() {
    //this.formFlag = true
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getOneUserFromService(this.id)
  }

  getOneUserFromService(id){
    let oneTaskObservable = this._httpService.getOneUser(id);
    oneTaskObservable.subscribe(data => {console.log("Got one task!", data)

        if(data['error']){
          this.error = data['error']['message']
          this.errFlag = true
        }
        else{
          console.log("in edit data",data)
          this.errFlag = false
          this.error = {}; 
          this.oneUser = data['data'];
          console.log("in edit retrieve",this.oneUser)
        }

    });
  }

  onSubmitEdit(id) {
    let observable = this._httpService.editUser(id,this.oneUser);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if(data['error']){
        this.error = data['error']['message']
        this.errFlag = true
      }
      else{
        this.error = {}; 
        this.errFlag = false
        //this._router.navigate(['/list/'])
        this._router.navigate([''])
      }

    })
  }
}

