/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TemplateComponent } from './components/template/template.component';
import { LoaderModule } from '../loader/loader.module';
import { ModalModule, ComponentLoaderFactory, PositioningService, BsModalService } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingComponent } from './components/loading';
import { ButtonModule } from '../button/button.module';
/** @type {?} */
var declarations = [
    NotificationComponent,
    ConfirmComponent,
    TemplateComponent,
    LoadingComponent
];
var CModalModule = /** @class */ (function () {
    function CModalModule() {
    }
    /**
     * @return {?}
     */
    CModalModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: CModalModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsModalService,
                ModalService,
                Ng4LoadingSpinnerService
            ]
        };
    };
    CModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: declarations,
                    imports: [
                        CommonModule,
                        LoaderModule,
                        ButtonModule,
                        ModalModule.forRoot(),
                        Ng4LoadingSpinnerModule.forRoot()
                    ],
                    entryComponents: declarations,
                    exports: declarations,
                    providers: []
                },] }
    ];
    return CModalModule;
}());
export { CModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvbW9kYWxzL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUVqRCxZQUFZLEdBQUc7SUFDbkIscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZ0JBQWdCO0NBQ2pCO0FBRUQ7SUFBQTtJQTJCQSxDQUFDOzs7O0lBWmUsb0JBQU87OztJQUFyQjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Qsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWix3QkFBd0I7YUFDekI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBMUJGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQ3JCLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtxQkFDbEM7b0JBQ0QsZUFBZSxFQUFFLFlBQVk7b0JBQzdCLE9BQU8sRUFBRSxZQUFZO29CQUNyQixTQUFTLEVBQUUsRUFBRTtpQkFDZDs7SUFlRCxtQkFBQztDQUFBLEFBM0JELElBMkJDO1NBYlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbmZpcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uZmlybS9jb25maXJtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RlbXBsYXRlL3RlbXBsYXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvYWRlck1vZHVsZSB9IGZyb20gJy4uL2xvYWRlci9sb2FkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTW9kYWxNb2R1bGUsIENvbXBvbmVudExvYWRlckZhY3RvcnksIFBvc2l0aW9uaW5nU2VydmljZSwgQnNNb2RhbFNlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmc0TG9hZGluZ1NwaW5uZXJNb2R1bGUsIE5nNExvYWRpbmdTcGlubmVyU2VydmljZSB9IGZyb20gJ25nNC1sb2FkaW5nLXNwaW5uZXInO1xyXG5pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRpbmcnO1xyXG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XHJcblxyXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXHJcbiAgTm90aWZpY2F0aW9uQ29tcG9uZW50LFxyXG4gIENvbmZpcm1Db21wb25lbnQsXHJcbiAgVGVtcGxhdGVDb21wb25lbnQsXHJcbiAgTG9hZGluZ0NvbXBvbmVudFxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucyxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBMb2FkZXJNb2R1bGUsXHJcbiAgICBCdXR0b25Nb2R1bGUsXHJcbiAgICBNb2RhbE1vZHVsZS5mb3JSb290KCksXHJcbiAgICBOZzRMb2FkaW5nU3Bpbm5lck1vZHVsZS5mb3JSb290KClcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogZGVjbGFyYXRpb25zLFxyXG4gIGV4cG9ydHM6IGRlY2xhcmF0aW9ucyxcclxuICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ01vZGFsTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQ01vZGFsTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb21wb25lbnRMb2FkZXJGYWN0b3J5LCBcclxuICAgICAgICBQb3NpdGlvbmluZ1NlcnZpY2UsXHJcbiAgICAgICAgQnNNb2RhbFNlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxTZXJ2aWNlLFxyXG4gICAgICAgIE5nNExvYWRpbmdTcGlubmVyU2VydmljZSBcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn0iXX0=