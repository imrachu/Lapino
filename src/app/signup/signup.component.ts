import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm! : FormGroup;
  constructor(private fb: FormBuilder, private _http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [''],
      mobile : [''],
      email : [''],
      password : ['']
    })
  }

  signUp(){
    this._http.post<any>("http://localhost:3000/users",this.signUpForm.value).subscribe((res)=>{
      console.log(res);
      this.signUpForm.reset();  
      this.router.navigate(['login']);    
    },(err)=>{
      console.log("Error", err);
    })
  }

}
