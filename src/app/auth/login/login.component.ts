import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../core/service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: CommonService, private route: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('user_data', JSON.stringify(res.data));

          const role = res.data.role;
          if (role == 'admin') {
            this.route.navigate(['pages/dashboard']);
          } else if (role == 'organization') {
            this.route.navigate([`pages/users/${res.data.organizationId}`]);
          } else {
            this.route.navigate([`pages/user-info/${res.data._id}`]);

          }
        }
      });
    }
  }
}
