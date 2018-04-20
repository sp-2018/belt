import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){}


getUsers(){
  return this._http.get('/pets');
}

addUser(newUser){
  return this._http.post('/pets', newUser)
}


// addQuote(user_id,newQuote){
//   console.log(user_id,newQuote,"service")
//   return this._http.post('/quotes/'+user_id, newQuote)
// }

addUpVote(user_id){
  //console.log(author_id,newQuote,"service")
  return this._http.post('/quotes/upvote/'+user_id, {})
}

// addDownVote(author_id,quote_id){
//   //console.log(author_id,newQuote,"service")
//   return this._http.post('/quotes/downvote/'+author_id, {quote_id})
// }

editUser(id, editUser){
  return this._http.put('/pets/'+id, editUser)
}

deleteUser(id){
  return this._http.delete('/pets/destroy/'+id)
}

// deleteQuote(author_id,quote_id){
//   console.log(author_id,quote_id,"service delete quote")
//   return this._http.post('/quotes/destroy/'+author_id, {quote_id})
// }

getOneUser(id){
  return this._http.get('/pets/'+id);
}

}
