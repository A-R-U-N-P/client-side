import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonService } from '../core/service/common.service';
import { TokenInterceptor } from '../core/interceptor/token.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        UserInfoComponent,
        TopbarComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        PagesRoutingModule,
        FormsModule],
    providers: [CommonService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})
export class PagesModule { }
