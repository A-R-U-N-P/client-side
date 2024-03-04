import { Component, OnDestroy } from '@angular/core';
import { CommonService } from '../../core/service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];
  public organizations: any[] = [];
  public headers: string[] = ['organization name', 'email', 'address', 'contact No', 'created on'];

  constructor(private service: CommonService) {
    this.subscriptions.push(
      this.service.getOrganizations().subscribe({
        next: (res) => {
          if (res.data?.length) {
            console.log("RES", res.data);

            this.organizations = res.data;
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
