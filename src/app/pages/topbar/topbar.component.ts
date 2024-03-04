import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',

  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  role = JSON.parse(localStorage.getItem('user_data') || '')?.role;
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
