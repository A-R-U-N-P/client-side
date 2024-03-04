import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { LoginGuard } from './core/guard/auth/login.guard';
export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
    {
        path: "auth",
        canActivate: [LoginGuard],
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "pages",
        canActivate: [AuthGuard],
        loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
    }
];
