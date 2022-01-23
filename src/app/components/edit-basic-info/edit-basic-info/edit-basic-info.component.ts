import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class EditBasicInfoComponent implements OnInit {
   form: FormGroup;

  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(
        null
      ),
      lastName: new FormControl(
        null
      ),
      city: new FormControl(
        null
      ),
      country: new FormControl(
        null
      ),
      desc: new FormControl(
        null
      ),
      day: new FormControl(
        null
      ),
      month: new FormControl(
        null
      ),
      year: new FormControl(
        null
      ),
      gender: new FormControl(
        null
      )
    });
  }

  submit(): void {
    const dateOfBirth = {
      day: this.form?.value.day,
      month: this.form?.value.month,
      year: this.form?.value.year
    }
    const infoUser ={
      dateOfBirth : dateOfBirth,
      firstName:this.form?.value.firstName,
      lastName:this.form?.value.lastName,
      gender:this.form?.value.gender,
      city:this.form?.value.city,
      country:this.form?.value.country,
      desc:this.form?.value.desc

    }
      console.log("dateOfBirth===:", dateOfBirth)
    // this.form.append('dateOfBirth', dateOfBirth);
    // console.log(this.form?.getRawValue())
    console.log(infoUser)

     this.baseService.addUserInfo(infoUser).subscribe((res) => {
       console.log("re",res)
     });
     this.form.reset()
  }

}
