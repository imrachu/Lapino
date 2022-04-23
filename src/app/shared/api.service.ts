import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  //POST METHOD
  postRestaturant(data : any){
    return this._http.post("http://localhost:3000/posts",data).pipe(map((res)=> {
      return res;
    }))
  }

  //GET METHOD
  getRestaturant(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res)=>{
      return res;
    }))
  }

  //PUT METHOD
  updateRestaurent(data: any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id, data).pipe(map((res)=>{
      return res;
    }))
  }

  // DELETE METHOD
  deleteMethod(id: number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res)=>{
      return res;
    }))
  }


}
