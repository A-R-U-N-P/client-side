import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../core/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, AfterViewInit {
  public signupForm: FormGroup;
  public organizations: any = [];
  public passwordHidden = true;


  roles = ['user', 'organization'];

  constructor(private fb: FormBuilder, private service: CommonService, private route: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required],
      organizationId: [''],
    });


  }

  ngOnInit(): void {
    this.service.getOrganizations().subscribe((response: any) => {
      console.log(response);
      if (response.data?.length) {
        this.organizations = response.data;
      }

    });
  }

  onSubmit() {
    console.log(this.signupForm);

    if (this.signupForm.valid) {
      const { role } = this.signupForm.value;

      if (role == 'organization') {
        this.signupForm.value.name = this.signupForm.value.firstName;
      }

      this.service.signUp(this.signupForm.value).subscribe((res: any) => {
        console.log("SUCESS", res);
        this.route.navigateByUrl('auth/login');
      });
      console.log('Form submitted:', this.signupForm.value);
    }
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
  ngAfterViewInit(): void {
    const organizationIdControl = this.signupForm?.get('organizationId');
    const lastNameControl = this.signupForm?.get('lastName');

    this.signupForm?.get('role')?.valueChanges?.subscribe((role) => {
      if (role === 'organization') {
        organizationIdControl?.setValidators(null);
        lastNameControl?.setValidators(null);
      } else {
        organizationIdControl?.setValidators([Validators.required]);
        lastNameControl?.setValidators([Validators.required]);
        organizationIdControl?.setValue('');
      }

      organizationIdControl?.updateValueAndValidity();
      lastNameControl?.updateValueAndValidity();
    });
  }

}
