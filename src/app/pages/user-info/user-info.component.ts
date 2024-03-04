import { Component } from '@angular/core';
import { CommonService } from '../../core/service/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',

  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public subscriptions: Subscription[] = [];
  public userData: any;
  public orgName = '';

  constructor(private service: CommonService, private route: ActivatedRoute) {
    this.subscriptions.push(
      this.service.getuserByUserId(this.route.snapshot.params['id']).subscribe({
        next: (res) => {
          if (res.data) {
            console.log("RES", res.data);

            this.userData = res.data;
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
