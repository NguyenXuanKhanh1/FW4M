/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ValidationModule } from './components/shared/validation/validation.module';
import { CModalModule } from './components/shared/modals';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './components/auth/auth.module';
import { AggregatorService } from './components/shared/services/aggregator.service';
import { TabModule } from './components/shared/tab/tab.module';
import { DatetimePickerModule } from './components/shared/datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from './components/shared/editor/editor.module';
import { ButtonModule } from './components/shared/button/button.module';
import { FormModule } from './components/shared/form/form.module';
import { DropdownModule } from './components/shared/dropdown/dropdown.module';
import { CardModule } from './components/shared/card/card.module';
import { AccordionModule } from './components/shared/accordion/accordion.module';
import { FormatterModule } from './components/shared/formatter/formatter.module';
import { LayoutModule } from './components/layout/layout.module';
import { SpinnerModule } from './components/shared/spinner/spinner.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { CheckboxModule } from './components/shared/checkbox/checkbox.module';
import { TextboxModule } from './components/shared/textbox/textbox.module';
import { TableModule } from './components/shared/table/table.module';
var Framework4CModule = /** @class */ (function () {
    function Framework4CModule() {
    }
    /**
     * @return {?}
     */
    Framework4CModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Framework4CModule,
            providers: [
                AggregatorService
            ]
        };
    };
    Framework4CModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        HttpClientModule,
                        TabModule,
                        EditorModule,
                        ButtonModule,
                        CardModule,
                        AccordionModule,
                        FormModule,
                        ClickOutsideModule,
                        SpinnerModule,
                        CardModule,
                        CheckboxModule,
                        TextboxModule,
                        TableModule,
                        FormatterModule.forChild(),
                        ValidationModule.forRoot(),
                        CModalModule.forRoot(),
                        AuthModule.forRoot(),
                        DatetimePickerModule.forChild(),
                        LayoutModule.forRoot()
                    ],
                    exports: [
                        AuthModule,
                        TabModule,
                        CModalModule,
                        DatetimePickerModule,
                        EditorModule,
                        FormModule,
                        DropdownModule,
                        SpinnerModule,
                        CardModule,
                        ButtonModule,
                        AccordionModule,
                        CheckboxModule,
                        TextboxModule,
                        TableModule
                    ],
                    providers: []
                },] }
    ];
    return Framework4CModule;
}());
export { Framework4CModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnc0Yy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9mdzRjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFckU7SUFBQTtJQXVEQSxDQUFDOzs7O0lBUmUseUJBQU87OztJQUFyQjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7YUFDbEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBdERGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYix1QkFBdUI7d0JBQ3ZCLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixlQUFlO3dCQUNmLFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsZUFBZSxDQUFDLFFBQVEsRUFBRTt3QkFDMUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUMxQixZQUFZLENBQUMsT0FBTyxFQUFFO3dCQUN0QixVQUFVLENBQUMsT0FBTyxFQUFFO3dCQUNwQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7d0JBQy9CLFlBQVksQ0FBQyxPQUFPLEVBQUU7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFdBQVc7cUJBQ1o7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2Q7O0lBV0Qsd0JBQUM7Q0FBQSxBQXZERCxJQXVEQztTQVRZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDTW9kYWxNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL21vZGFscyc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2F1dGgvYXV0aC5tb2R1bGUnO1xuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3RhYi90YWIubW9kdWxlJztcbmltcG9ydCB7IERhdGV0aW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9kYXRldGltZS1waWNrZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9lZGl0b3IvZWRpdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IEZvcm1Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm0vZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9jYXJkL2NhcmQubW9kdWxlJztcbmltcG9ydCB7IEFjY29yZGlvbk1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybWF0dGVyTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9mb3JtYXR0ZXIvZm9ybWF0dGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC5tb2R1bGUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVNb2R1bGUgfSBmcm9tICduZy1jbGljay1vdXRzaWRlJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9jaGVja2JveC9jaGVja2JveC5tb2R1bGUnO1xuaW1wb3J0IHsgVGV4dGJveE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdGV4dGJveC90ZXh0Ym94Lm1vZHVsZSc7XG5pbXBvcnQgeyBUYWJsZU1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdGFibGUvdGFibGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBUYWJNb2R1bGUsXG4gICAgRWRpdG9yTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIEFjY29yZGlvbk1vZHVsZSxcbiAgICBGb3JtTW9kdWxlLFxuICAgIENsaWNrT3V0c2lkZU1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgVGV4dGJveE1vZHVsZSxcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBGb3JtYXR0ZXJNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBWYWxpZGF0aW9uTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDTW9kYWxNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEF1dGhNb2R1bGUuZm9yUm9vdCgpLFxuICAgIERhdGV0aW1lUGlja2VyTW9kdWxlLmZvckNoaWxkKCksXG4gICAgTGF5b3V0TW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQXV0aE1vZHVsZSxcbiAgICBUYWJNb2R1bGUsXG4gICAgQ01vZGFsTW9kdWxlLFxuICAgIERhdGV0aW1lUGlja2VyTW9kdWxlLFxuICAgIEVkaXRvck1vZHVsZSxcbiAgICBGb3JtTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIFRleHRib3hNb2R1bGUsXG4gICAgVGFibGVNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcblxuZXhwb3J0IGNsYXNzIEZyYW1ld29yazRDTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRnJhbWV3b3JrNENNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQWdncmVnYXRvclNlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=