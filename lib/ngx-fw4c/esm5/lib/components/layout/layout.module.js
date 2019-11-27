/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { AdminLayoutComponent } from './backsite-layout.component';
import { DefaultBreadcrumbsComponent } from './breadcrumbs.component';
import { DefaultCustomizerComponent } from './customizer.component';
import { DefaultFooterComponent } from './footer.component';
import { DefaultHeaderComponent } from './header.component';
import { DefaultNavBarComponent } from './navbar.component';
import { DefaultSidebarComponent } from './sidebar.component';
import { DefaultToolbarComponent } from './toolbar.component';
import { FloatingToolbarComponent } from './floating-toolbar.component';
import { DefaultLayoutService } from './layout.service';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { CardModule } from '../shared/card/card.module';
import { FormatterModule } from '../shared/formatter/formatter.module';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { ButtonModule } from '../shared/button/button.module';
import { AccordionDirective } from '../shared/accordion/accordion.directive';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { LoaderModule } from '../shared/loader/loader.module';
import { RecommendationComponent } from './recommendation/recommendation.component';
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    /**
     * @return {?}
     */
    LayoutModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: LayoutModule,
            providers: [
                DefaultLayoutService,
                AccordionDirective
            ]
        };
    };
    LayoutModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AdminLayoutComponent,
                        DefaultBreadcrumbsComponent,
                        DefaultCustomizerComponent,
                        DefaultFooterComponent,
                        DefaultHeaderComponent,
                        DefaultNavBarComponent,
                        DefaultSidebarComponent,
                        DefaultToolbarComponent,
                        FloatingToolbarComponent,
                        RecommendationComponent
                    ],
                    imports: [
                        FormsModule,
                        CommonModule,
                        RouterModule,
                        SpinnerModule,
                        CardModule,
                        ClickOutsideModule,
                        FormatterModule,
                        AccordionModule,
                        ButtonModule,
                        AuthModule,
                        LoaderModule
                    ],
                    exports: [
                        AdminLayoutComponent,
                        DefaultBreadcrumbsComponent,
                        DefaultCustomizerComponent,
                        DefaultFooterComponent,
                        DefaultHeaderComponent,
                        DefaultNavBarComponent,
                        DefaultSidebarComponent,
                        DefaultToolbarComponent,
                        FloatingToolbarComponent,
                        RecommendationComponent
                    ],
                },] }
    ];
    return LayoutModule;
}());
export { LayoutModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVwRjtJQUFBO0lBa0RBLENBQUM7Ozs7SUFUZSxvQkFBTzs7O0lBQXJCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7Z0JBQ3BCLGtCQUFrQjthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkFqREYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4Qix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixhQUFhO3dCQUNiLFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsMkJBQTJCO3dCQUMzQiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0QixzQkFBc0I7d0JBQ3RCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLHVCQUF1QjtxQkFDeEI7aUJBQ0Y7O0lBWUQsbUJBQUM7Q0FBQSxBQWxERCxJQWtEQztTQVZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWNrT3V0c2lkZU1vZHVsZSB9IGZyb20gJ25nLWNsaWNrLW91dHNpZGUnO1xyXG5pbXBvcnQgeyBBZG1pbkxheW91dENvbXBvbmVudCB9IGZyb20gJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlZmF1bHRCcmVhZGNydW1ic0NvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGVmYXVsdEN1c3RvbWl6ZXJDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbWl6ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGVmYXVsdEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlZmF1bHRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEZWZhdWx0TmF2QmFyQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZiYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGVmYXVsdFNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGVmYXVsdFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmxvYXRpbmdUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9mbG9hdGluZy10b29sYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY2FyZC9jYXJkLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9mb3JtYXR0ZXIvZm9ybWF0dGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFjY29yZGlvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9idXR0b24vYnV0dG9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFjY29yZGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL3NoYXJlZC9hY2NvcmRpb24vYWNjb3JkaW9uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZHVsZSc7XHJcbmltcG9ydCB7IExvYWRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9sb2FkZXIvbG9hZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IFJlY29tbWVuZGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9yZWNvbW1lbmRhdGlvbi9yZWNvbW1lbmRhdGlvbi5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFkbWluTGF5b3V0Q29tcG9uZW50LFxyXG4gICAgRGVmYXVsdEJyZWFkY3J1bWJzQ29tcG9uZW50LFxyXG4gICAgRGVmYXVsdEN1c3RvbWl6ZXJDb21wb25lbnQsXHJcbiAgICBEZWZhdWx0Rm9vdGVyQ29tcG9uZW50LFxyXG4gICAgRGVmYXVsdEhlYWRlckNvbXBvbmVudCxcclxuICAgIERlZmF1bHROYXZCYXJDb21wb25lbnQsXHJcbiAgICBEZWZhdWx0U2lkZWJhckNvbXBvbmVudCxcclxuICAgIERlZmF1bHRUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgRmxvYXRpbmdUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgUmVjb21tZW5kYXRpb25Db21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgU3Bpbm5lck1vZHVsZSxcclxuICAgIENhcmRNb2R1bGUsXHJcbiAgICBDbGlja091dHNpZGVNb2R1bGUsXHJcbiAgICBGb3JtYXR0ZXJNb2R1bGUsXHJcbiAgICBBY2NvcmRpb25Nb2R1bGUsXHJcbiAgICBCdXR0b25Nb2R1bGUsXHJcbiAgICBBdXRoTW9kdWxlLFxyXG4gICAgTG9hZGVyTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBBZG1pbkxheW91dENvbXBvbmVudCxcclxuICAgIERlZmF1bHRCcmVhZGNydW1ic0NvbXBvbmVudCxcclxuICAgIERlZmF1bHRDdXN0b21pemVyQ29tcG9uZW50LFxyXG4gICAgRGVmYXVsdEZvb3RlckNvbXBvbmVudCxcclxuICAgIERlZmF1bHRIZWFkZXJDb21wb25lbnQsXHJcbiAgICBEZWZhdWx0TmF2QmFyQ29tcG9uZW50LFxyXG4gICAgRGVmYXVsdFNpZGViYXJDb21wb25lbnQsXHJcbiAgICBEZWZhdWx0VG9vbGJhckNvbXBvbmVudCxcclxuICAgIEZsb2F0aW5nVG9vbGJhckNvbXBvbmVudCxcclxuICAgIFJlY29tbWVuZGF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXRNb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBMYXlvdXRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgICAgIEFjY29yZGlvbkRpcmVjdGl2ZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=