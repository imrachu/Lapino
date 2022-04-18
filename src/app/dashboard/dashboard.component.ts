import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name :[''],
      email : [''],
      mobile : [''],
      address : [''],
      services : ['']
    })
  }

}
