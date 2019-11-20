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
const declarations = [
    NotificationComponent,
    ConfirmComponent,
    TemplateComponent,
    LoadingComponent
];
export class CModalModule {
    /**
     * @return {?}
     */
    static forRoot() {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvbW9kYWxzL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztNQUVqRCxZQUFZLEdBQUc7SUFDbkIscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZ0JBQWdCO0NBQ2pCO0FBZ0JELE1BQU0sT0FBTyxZQUFZOzs7O0lBQ2hCLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Qsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWix3QkFBd0I7YUFDekI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBMUJGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JCLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtpQkFDbEM7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixTQUFTLEVBQUUsRUFBRTthQUNkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uZmlybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25maXJtL2NvbmZpcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGUvdGVtcGxhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9hZGVyTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGVyL2xvYWRlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBNb2RhbE1vZHVsZSwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSwgUG9zaXRpb25pbmdTZXJ2aWNlLCBCc01vZGFsU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZzRMb2FkaW5nU3Bpbm5lck1vZHVsZSwgTmc0TG9hZGluZ1NwaW5uZXJTZXJ2aWNlIH0gZnJvbSAnbmc0LWxvYWRpbmctc3Bpbm5lcic7XHJcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZyc7XHJcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcclxuXHJcbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcclxuICBOb3RpZmljYXRpb25Db21wb25lbnQsXHJcbiAgQ29uZmlybUNvbXBvbmVudCxcclxuICBUZW1wbGF0ZUNvbXBvbmVudCxcclxuICBMb2FkaW5nQ29tcG9uZW50XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogZGVjbGFyYXRpb25zLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIExvYWRlck1vZHVsZSxcclxuICAgIEJ1dHRvbk1vZHVsZSxcclxuICAgIE1vZGFsTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIE5nNExvYWRpbmdTcGlubmVyTW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBkZWNsYXJhdGlvbnMsXHJcbiAgZXhwb3J0czogZGVjbGFyYXRpb25zLFxyXG4gIHByb3ZpZGVyczogW11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDTW9kYWxNb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBDTW9kYWxNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENvbXBvbmVudExvYWRlckZhY3RvcnksIFxyXG4gICAgICAgIFBvc2l0aW9uaW5nU2VydmljZSxcclxuICAgICAgICBCc01vZGFsU2VydmljZSxcclxuICAgICAgICBNb2RhbFNlcnZpY2UsXHJcbiAgICAgICAgTmc0TG9hZGluZ1NwaW5uZXJTZXJ2aWNlIFxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufSJdfQ==