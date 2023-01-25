import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  register() {
    if (this.registerForm.valid) {
      let uname = this.registerForm.value.uname;
      let acno = this.registerForm.value.acno;
      let pswd = this.registerForm.value.pswd;
      this.api.register(uname, acno, pswd).subscribe(
        //success
        (result: any) => {
          alert(result.message);
          //navigate
          this.router.navigateByUrl('');
        },
        //client error
        (result: any) => {
          alert(result.console.error.message);
        }
      );
    } else {
      alert('invalid data');
    }
  }
}
