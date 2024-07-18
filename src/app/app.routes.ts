import { Routes } from '@angular/router';
import { StatusListComponent } from './status-list/status-list.component';

export const routes: Routes = [
    {
        path: '',
        component: StatusListComponent,
        title: "Employee Status List"
    }
];
