import { OnInit, AfterViewInit } from "@angular/core";
import { DefaultLayoutService } from './layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregatorService } from '../shared/services/aggregator.service';
import { NotificationDetail } from '../shared/models/notification.model';
import { MenuTab, Breadcrumb } from '../shared/models/base.model';
import { ActionService } from '../shared/services/action.service';
import { AuthenticationService } from '../auth/auth.service';
import { CacheService } from '../shared/services/cache.service';
export declare class AdminLayoutComponent implements OnInit, AfterViewInit {
    workspaceLayoutService: DefaultLayoutService;
    route: ActivatedRoute;
    authenticationService: AuthenticationService;
    protected router: Router;
    protected actionService: ActionService;
    protected aggregatorService: AggregatorService;
    protected cacheService: CacheService;
    notifications: NotificationDetail[];
    logo: string;
    title: string;
    menuTabs: MenuTab[];
    isModalShow: boolean;
    modalImageSrc: string;
    imageAltText: string;
    breadcrumbs: Breadcrumb[];
    breadcrumb: Breadcrumb;
    url: string;
    authUrl: string;
    setActive: boolean;
    menuType: string;
    isMobile: boolean;
    constructor(workspaceLayoutService: DefaultLayoutService, route: ActivatedRoute, authenticationService: AuthenticationService, router: Router, actionService: ActionService, aggregatorService: AggregatorService, cacheService: CacheService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    closeImage(): void;
    changeMenu(items: Breadcrumb[]): void;
    private registerEvents;
}
