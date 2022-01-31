import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseService} from "../../../services/base-service";
import {createPosts} from "../../../store/posts-store/posts-store.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class EditBasicInfoComponent implements OnInit {
   form: FormGroup;

  constructor(private baseService: BaseService<any>, private store$: Store) { }

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
      ),
      file: new FormControl(''),
      fileSource: new FormControl('')
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    console.log('2222',this.form.getRawValue())
    if(this.form.value.file){
      const formData = new FormData();

      formData.append('file', this.form.get('fileSource').value);
      formData.append('firstName', this.form.get('firstName').value);
      formData.append('lastName', this.form.get('lastName').value);
      formData.append('gender', this.form.get('gender').value);
      formData.append('city', this.form.get('city').value);
      formData.append('country', this.form.get('country').value);
      formData.append('desc', this.form.get('desc').value);
      formData.append('month', this.form.get('month').value);
      formData.append('year', this.form.get('year').value);
      formData.append('day', this.form.get('day').value);
      formData.set('desc', this.form.get('desc').value);
         this.baseService.addUserInfo(formData).subscribe((res) => {
           console.log("re",res)
         });
      // this.store$.dispatch(createPosts({formData}))
      //this.store$.dispatch(getPosts());
    }
    this.form.reset()
  }

  // submit(): void {
  //   const dateOfBirth = {
  //     day: this.form?.value.day,
  //     month: this.form?.value.month,
  //     year: this.form?.value.year
  //   }
  //   const infoUser ={
  //     dateOfBirth : dateOfBirth,
  //     firstName:this.form?.value.firstName,
  //     lastName:this.form?.value.lastName,
  //     gender:this.form?.value.gender,
  //     city:this.form?.value.city,
  //     country:this.form?.value.country,
  //     desc:this.form?.value.desc
  //
  //   }
  //     console.log("dateOfBirth===:", dateOfBirth)
  //   // this.form.append('dateOfBirth', dateOfBirth);
  //   // console.log(this.form?.getRawValue())
  //   console.log(infoUser)
  //
  //    this.baseService.addUserInfo(infoUser).subscribe((res) => {
  //      console.log("re",res)
  //    });
  //    this.form.reset()
  // }

}
