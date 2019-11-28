import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuTab, AdminLayoutComponent, AuthComponent } from 'ngx-fw4c';
import { DashboardDemoComponent } from './demo/dashboard';
import { ServiceManagementComponent } from './demo/service-management/service-management.component';
import { ConsumerManagementComponent } from './demo/consumer-management/consumer-management.component';
import { AddConsumerComponent } from './demo/consumer-management/add-consumer/add-consumer.component';
import { EditConsumerComponent } from './demo/consumer-management/edit-consumer/edit-consumer.component';

const menuTabs: MenuTab[] = [
  {
    role: 'Admin',
    items: [
      {
        label: 'Dashboard',
        icon: 'fa fa-pie-chart ',
        children: [
          { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fa fa-pie-chart' }
        ]
      },
      {
        label: 'Service Management',
        icon: 'fa fa-bar-chart',
        children: [
          { state: 'service', name: 'Service', type: 'link', icon: 'fa fa-calendar-check-o' }
        ]
      },
      {
        label: 'Consumer Management',
        icon: 'fa fa-line-chart',
        children: [
          { state: 'consumer', name: 'Consumer', type: 'link', icon: 'fa fa-calendar-check-o' }
        ]
      } 
    ]
  }
];

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    data: {
      breadcrumb: {
        label: 'CMC Global',
        url: '/dashboard'
      },
      menuTabs: menuTabs,
      menuType: 'TOP',
      // recommendation: {
      //   template: ConsumerManagementComponent
      // }
    },
    children: [      
      {
        path: 'dashboard',
        component: DashboardDemoComponent
      },
      {
        path: 'service',
        component: ServiceManagementComponent
      },
      {
        path: 'consumer',
        component: ConsumerManagementComponent
      },
      {
        path: 'create-consumer',
        component: AddConsumerComponent
      },
      {
        path: 'edit-consumer',
        component: EditConsumerComponent
      },
      {
        path: 'auth',
        component: AuthComponent,
        data: {
          successPath: '/dashboard',
          success: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
