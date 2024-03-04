import { Component } from '@angular/core';
import { CommonService } from '../../core/service/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public subscriptions: Subscription[] = [];
  public orgUsers: any[] = [];
  public headers: string[] = ['first name', 'last name', 'email', 'address', 'contact No', 'created on'];
  public orgName = '';

  constructor(private service: CommonService, private route: ActivatedRoute) {
    this.orgName = this.route.snapshot.queryParams['orgName'];
    this.subscriptions.push(
      this.service.getOrganizationUsers(this.route.snapshot.params['id']).subscribe({
        next: (res) => {
          if (res.data?.length) {
            console.log("RES", res.data);

            this.orgUsers = res.data;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    // unsubscribe when leaving the component
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
