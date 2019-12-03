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
import { FileModule } from './components/shared/file/file.module';
import { MediaViewerModule } from './components/shared/media-viewer/media-viewer.module';
import { ImageViewerModule } from './components/shared/image-viewer/image-viewer.module';
import { ViewerModule } from './components/shared/viewer/viewer.module';
import { RadioModule } from './components/shared/radio/radio.module';
import { TimelineModule } from './components/shared/timeline/timeline.module';
import { ChipModule } from './components/shared/chip/chip.module';
import { PanelModule } from './components/shared/panel/panel.module';
import { ListModule } from './components/shared/list/list.module';
import { TreeViewModule } from './components/shared/treeview/treeview.module';
import { IgxExcelExporterService } from "igniteui-angular";
export class Framework4CModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: Framework4CModule,
            providers: [
                AggregatorService,
                IgxExcelExporterService
            ]
        };
    }
}
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
                    FileModule,
                    MediaViewerModule,
                    ImageViewerModule,
                    ViewerModule,
                    RadioModule,
                    TimelineModule,
                    ChipModule,
                    PanelModule,
                    ListModule,
                    TreeViewModule,
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
                    TableModule,
                    FileModule,
                    MediaViewerModule,
                    ImageViewerModule,
                    ViewerModule,
                    RadioModule,
                    TimelineModule,
                    ChipModule,
                    PanelModule,
                    ListModule,
                    TreeViewModule
                ],
                providers: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnc0Yy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9mdzRjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxF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O2FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ01vZGFsTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9tb2RhbHMnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXV0aE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRoL2F1dGgubW9kdWxlJztcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFiTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC90YWIvdGFiLm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRldGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZGF0ZXRpbWUtcGlja2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEVkaXRvck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZWRpdG9yL2VkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3JtTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9mb3JtL2Zvcm0ubW9kdWxlJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcbmltcG9ydCB7IEZvcm1hdHRlck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZm9ybWF0dGVyL2Zvcm1hdHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTGF5b3V0TW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL2xheW91dC9sYXlvdXQubW9kdWxlJztcbmltcG9ydCB7IFNwaW5uZXJNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3NwaW5uZXIvc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xpY2tPdXRzaWRlTW9kdWxlIH0gZnJvbSAnbmctY2xpY2stb3V0c2lkZSc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvY2hlY2tib3gvY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFRleHRib3hNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3RleHRib3gvdGV4dGJveC5tb2R1bGUnO1xuaW1wb3J0IHsgVGFibGVNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3RhYmxlL3RhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBGaWxlTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9maWxlL2ZpbGUubW9kdWxlJztcbmltcG9ydCB7IE1lZGlhVmlld2VyTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9tZWRpYS12aWV3ZXIvbWVkaWEtdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBJbWFnZVZpZXdlck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvaW1hZ2Utdmlld2VyL2ltYWdlLXZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgVmlld2VyTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC92aWV3ZXIvdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBSYWRpb01vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvcmFkaW8vcmFkaW8ubW9kdWxlJztcbmltcG9ydCB7IFRpbWVsaW5lTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC90aW1lbGluZS90aW1lbGluZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hpcE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvY2hpcC9jaGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBQYW5lbE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvcGFuZWwvcGFuZWwubW9kdWxlJztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2xpc3QvbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgVHJlZVZpZXdNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3RyZWV2aWV3L3RyZWV2aWV3Lm1vZHVsZSc7XG5pbXBvcnQgeyBJZ3hFeGNlbEV4cG9ydGVyU2VydmljZSB9IGZyb20gXCJpZ25pdGV1aS1hbmd1bGFyXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgVGFiTW9kdWxlLFxuICAgIEVkaXRvck1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgRm9ybU1vZHVsZSxcbiAgICBDbGlja091dHNpZGVNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIFRleHRib3hNb2R1bGUsXG4gICAgVGFibGVNb2R1bGUsXG4gICAgRmlsZU1vZHVsZSxcbiAgICBNZWRpYVZpZXdlck1vZHVsZSxcbiAgICBJbWFnZVZpZXdlck1vZHVsZSxcbiAgICBWaWV3ZXJNb2R1bGUsXG4gICAgUmFkaW9Nb2R1bGUsXG4gICAgVGltZWxpbmVNb2R1bGUsXG4gICAgQ2hpcE1vZHVsZSxcbiAgICBQYW5lbE1vZHVsZSxcbiAgICBMaXN0TW9kdWxlLFxuICAgIFRyZWVWaWV3TW9kdWxlLFxuICAgIEZvcm1hdHRlck1vZHVsZS5mb3JDaGlsZCgpLFxuICAgIFZhbGlkYXRpb25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgIENNb2RhbE1vZHVsZS5mb3JSb290KCksXG4gICAgQXV0aE1vZHVsZS5mb3JSb290KCksXG4gICAgRGF0ZXRpbWVQaWNrZXJNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBMYXlvdXRNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBdXRoTW9kdWxlLFxuICAgIFRhYk1vZHVsZSxcbiAgICBDTW9kYWxNb2R1bGUsXG4gICAgRGF0ZXRpbWVQaWNrZXJNb2R1bGUsXG4gICAgRWRpdG9yTW9kdWxlLFxuICAgIEZvcm1Nb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgVGV4dGJveE1vZHVsZSxcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBGaWxlTW9kdWxlLFxuICAgIE1lZGlhVmlld2VyTW9kdWxlLFxuICAgIEltYWdlVmlld2VyTW9kdWxlLFxuICAgIFZpZXdlck1vZHVsZSxcbiAgICBSYWRpb01vZHVsZSxcbiAgICBUaW1lbGluZU1vZHVsZSxcbiAgICBDaGlwTW9kdWxlLFxuICAgIFBhbmVsTW9kdWxlLFxuICAgIExpc3RNb2R1bGUsXG4gICAgVHJlZVZpZXdNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcblxuZXhwb3J0IGNsYXNzIEZyYW1ld29yazRDTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRnJhbWV3b3JrNENNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQWdncmVnYXRvclNlcnZpY2UsXG4gICAgICAgIElneEV4Y2VsRXhwb3J0ZXJTZXJ2aWNlIFxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==