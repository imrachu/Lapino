import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service'
import { RestaturantData } from './restaurant.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formValue: FormGroup
  restaurantModelObj: RestaturantData = new RestaturantData()

  restaurants = []
  showAddBtn : boolean = false;
  showUpdateBtn : boolean = false;
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    })
    this.getAllRestaurant();
  }

  addBtn(){
    this.formValue.reset()
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }

  //SUBSCRIBING OF DATA
  addRestaurant() {
    this.restaurantModelObj.name = this.formValue.value.name
    this.restaurantModelObj.email = this.formValue.value.email
    this.restaurantModelObj.mobile = this.formValue.value.mobile
    this.restaurantModelObj.address = this.formValue.value.address
    this.restaurantModelObj.services = this.formValue.value.services

    this.api.postRestaturant(this.restaurantModelObj).subscribe(
      (res) => {
        console.log(res)
        this.formValue.reset()
        this.getAllRestaurant()
      },
      (err) => {
        console.log('Error', err)
      },
    )
  }

  //GET ALL RESTAURANT
  getAllRestaurant() {
    this.api.getRestaturant().subscribe(
      (res) => {
        console.log(res)
        this.restaurants = res;
      },
      (err) => {
        console.log('Error', err)
      },
    )
  }

  //DELETE RESTAURANT
  deleteRestaurant(data : any){
    this.api.deleteMethod(data.id).subscribe((res)=>{
      alert("Restaturant Deleted!!")
      this.getAllRestaurant()
    })
  }

  // EDIT RESTAURANT
  editRestaurant(data : any){
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name
    this.restaurantModelObj.email = this.formValue.value.email
    this.restaurantModelObj.mobile = this.formValue.value.mobile
    this.restaurantModelObj.address = this.formValue.value.address
    this.restaurantModelObj.services = this.formValue.value.services
    this.api.updateRestaurent(this.restaurantModelObj, this.restaurantModelObj.id).subscribe((res)=> {
      this.getAllRestaurant();
      return res;
    })
  }
}
