/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
export class TreeViewComponent {
    constructor() {
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [
                    { id: 2, name: 'child1' },
                    { id: 3, name: 'child2' }
                ]
            },
            {
                id: 4,
                name: 'root2',
                children: [
                    { id: 5, name: 'child2.1' },
                    {
                        id: 6,
                        name: 'child2.2',
                        children: [
                            { id: 7, name: 'subsub' }
                        ]
                    }
                ]
            }
        ];
        this.options = {};
    }
}
TreeViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'katana-treeview',
                template: "<tree-root [nodes]=\"nodes\" [options]=\"options\">\r\n    <!-- <ng-template #treeNodeTemplate let-node let-index=\"index\">\r\n        <span><span class=\"fa fa-plus\"></span> {{ node?.data?.name }}</span>\r\n    </ng-template> -->\r\n</tree-root>",
                styles: [""]
            }] }
];
if (false) {
    /** @type {?} */
    TreeViewComponent.prototype.nodes;
    /** @type {?} */
    TreeViewComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdHJlZXZpZXcvdHJlZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQVFwRSxNQUFNLE9BQU8saUJBQWlCO0lBTjlCO1FBT1MsVUFBSyxHQUFHO1lBQ2I7Z0JBQ0UsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO29CQUN6QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtpQkFDMUI7YUFDRjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtvQkFDM0I7d0JBQ0UsRUFBRSxFQUFFLENBQUM7d0JBQ0wsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsRUFBRTs0QkFDUixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTt5QkFDMUI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFDSyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQWhDQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isb1FBQXdDOzthQUV6Qzs7OztJQUdDLGtDQXVCRTs7SUFDRixvQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdrYXRhbmEtdHJlZXZpZXcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVldmlldy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZXZpZXcuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVWaWV3Q29tcG9uZW50IHtcclxuICBwdWJsaWMgbm9kZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAxLFxyXG4gICAgICBuYW1lOiAncm9vdDEnLFxyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIHsgaWQ6IDIsIG5hbWU6ICdjaGlsZDEnIH0sXHJcbiAgICAgICAgeyBpZDogMywgbmFtZTogJ2NoaWxkMicgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogNCxcclxuICAgICAgbmFtZTogJ3Jvb3QyJyxcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICB7IGlkOiA1LCBuYW1lOiAnY2hpbGQyLjEnIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDYsXHJcbiAgICAgICAgICBuYW1lOiAnY2hpbGQyLjInLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgeyBpZDogNywgbmFtZTogJ3N1YnN1YicgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF07XHJcbiAgcHVibGljIG9wdGlvbnMgPSB7fTtcclxufVxyXG4iXX0=