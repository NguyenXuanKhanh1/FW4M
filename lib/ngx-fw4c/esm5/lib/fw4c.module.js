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
                AggregatorService,
                IgxExcelExporterService
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
    return Framework4CModule;
}());
export { Framework4CModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnc0Yy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9mdzRjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxF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ZDs7SUFZRCx3QkFBQztDQUFBLEFBNUVELElBNEVDO1NBVlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC92YWxpZGF0aW9uL3ZhbGlkYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENNb2RhbE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvbW9kYWxzJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYXV0aC9hdXRoLm1vZHVsZSc7XG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYk1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdGFiL3RhYi5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZXRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2RhdGV0aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBFZGl0b3JNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2VkaXRvci9lZGl0b3IubW9kdWxlJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybU1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZm9ybS9mb3JtLm1vZHVsZSc7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3JtYXR0ZXJNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm1hdHRlci9mb3JtYXR0ZXIubW9kdWxlJztcbmltcG9ydCB7IExheW91dE1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9zcGlubmVyL3NwaW5uZXIubW9kdWxlJztcbmltcG9ydCB7IENsaWNrT3V0c2lkZU1vZHVsZSB9IGZyb20gJ25nLWNsaWNrLW91dHNpZGUnO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2NoZWNrYm94L2NoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBUZXh0Ym94TW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC90ZXh0Ym94L3RleHRib3gubW9kdWxlJztcbmltcG9ydCB7IFRhYmxlTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS90YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgRmlsZU1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvZmlsZS9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBNZWRpYVZpZXdlck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvbWVkaWEtdmlld2VyL21lZGlhLXZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgSW1hZ2VWaWV3ZXJNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2ltYWdlLXZpZXdlci9pbWFnZS12aWV3ZXIubW9kdWxlJztcbmltcG9ydCB7IFZpZXdlck1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdmlld2VyL3ZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgUmFkaW9Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3JhZGlvL3JhZGlvLm1vZHVsZSc7XG5pbXBvcnQgeyBUaW1lbGluZU1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9zaGFyZWQvdGltZWxpbmUvdGltZWxpbmUubW9kdWxlJztcbmltcG9ydCB7IENoaXBNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL2NoaXAvY2hpcC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFuZWxNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcmVkL3BhbmVsL3BhbmVsLm1vZHVsZSc7XG5pbXBvcnQgeyBMaXN0TW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC9saXN0L2xpc3QubW9kdWxlJztcbmltcG9ydCB7IFRyZWVWaWV3TW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXJlZC90cmVldmlldy90cmVldmlldy5tb2R1bGUnO1xuaW1wb3J0IHsgSWd4RXhjZWxFeHBvcnRlclNlcnZpY2UgfSBmcm9tIFwiaWduaXRldWktYW5ndWxhclwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRhYk1vZHVsZSxcbiAgICBFZGl0b3JNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgIEZvcm1Nb2R1bGUsXG4gICAgQ2xpY2tPdXRzaWRlTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBDaGVja2JveE1vZHVsZSxcbiAgICBUZXh0Ym94TW9kdWxlLFxuICAgIFRhYmxlTW9kdWxlLFxuICAgIEZpbGVNb2R1bGUsXG4gICAgTWVkaWFWaWV3ZXJNb2R1bGUsXG4gICAgSW1hZ2VWaWV3ZXJNb2R1bGUsXG4gICAgVmlld2VyTW9kdWxlLFxuICAgIFJhZGlvTW9kdWxlLFxuICAgIFRpbWVsaW5lTW9kdWxlLFxuICAgIENoaXBNb2R1bGUsXG4gICAgUGFuZWxNb2R1bGUsXG4gICAgTGlzdE1vZHVsZSxcbiAgICBUcmVlVmlld01vZHVsZSxcbiAgICBGb3JtYXR0ZXJNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBWYWxpZGF0aW9uTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDTW9kYWxNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEF1dGhNb2R1bGUuZm9yUm9vdCgpLFxuICAgIERhdGV0aW1lUGlja2VyTW9kdWxlLmZvckNoaWxkKCksXG4gICAgTGF5b3V0TW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQXV0aE1vZHVsZSxcbiAgICBUYWJNb2R1bGUsXG4gICAgQ01vZGFsTW9kdWxlLFxuICAgIERhdGV0aW1lUGlja2VyTW9kdWxlLFxuICAgIEVkaXRvck1vZHVsZSxcbiAgICBGb3JtTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIFRleHRib3hNb2R1bGUsXG4gICAgVGFibGVNb2R1bGUsXG4gICAgRmlsZU1vZHVsZSxcbiAgICBNZWRpYVZpZXdlck1vZHVsZSxcbiAgICBJbWFnZVZpZXdlck1vZHVsZSxcbiAgICBWaWV3ZXJNb2R1bGUsXG4gICAgUmFkaW9Nb2R1bGUsXG4gICAgVGltZWxpbmVNb2R1bGUsXG4gICAgQ2hpcE1vZHVsZSxcbiAgICBQYW5lbE1vZHVsZSxcbiAgICBMaXN0TW9kdWxlLFxuICAgIFRyZWVWaWV3TW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5cbmV4cG9ydCBjbGFzcyBGcmFtZXdvcms0Q01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZyYW1ld29yazRDTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFnZ3JlZ2F0b3JTZXJ2aWNlLFxuICAgICAgICBJZ3hFeGNlbEV4cG9ydGVyU2VydmljZSBcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=