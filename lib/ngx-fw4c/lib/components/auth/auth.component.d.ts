import { ElementRef, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationLoginRequest, AuthenticationLoginResponse } from './auth.model';
import { AuthenticationService } from './auth.service';
import { CacheService } from '../shared/services/cache.service';
import { DataService } from '../shared/services/data.service';
import { ValidationService, ClientValidator } from '../shared/validation';
import { BaseTemplate } from '../shared/models/base.model';
import { AggregatorService } from '../shared/services/aggregator.service';
export declare class AuthComponent implements OnInit, AfterViewInit {
    route: ActivatedRoute;
    private _router;
    private _cacheService;
    private _authenticationService;
    private _validationService;
    private _dataService;
    private _aggregatorService;
    title: string;
    validator: ClientValidator;
    succeedPath: string;
    template: BaseTemplate;
    api: string;
    success: boolean;
    completed: EventEmitter<AuthenticationLoginResponse>;
    formRef: ElementRef;
    request: AuthenticationLoginRequest;
    errorMessage: string;
    constructor(route: ActivatedRoute, _router: Router, _cacheService: CacheService, _authenticationService: AuthenticationService, _validationService: ValidationService, _dataService: DataService, _aggregatorService: AggregatorService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    login(): void;
    private initValidations;
}
