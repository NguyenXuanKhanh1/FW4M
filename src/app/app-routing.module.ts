import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuTab, AdminLayoutComponent, AuthComponent, AggregatorService, KeyConst, RecommendationComponent } from 'ngx-fw4c';
import { DashboardDemoComponent } from './demo/dashboard';
import { ListConsumerComponent } from './demo/consumer-management/list';

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
				label: 'Consumer Management',
				icon: 'fa fa-user-circle',
				children: [
					{ state: 'consumers', name: 'Consumer', type: 'link', icon: 'fa fa-calendar-check-o' }
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
			recommendation: {
				template: RecommendationComponent,
				// data: {
				//   item: KeyConst.Search
				// }
			}
		},
		children: [
			{
				path: 'dashboard',
				component: DashboardDemoComponent
			},
			{
				path: 'consumers',
				component: ListConsumerComponent
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
