/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
var TreeViewComponent = /** @class */ (function () {
    function TreeViewComponent() {
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
    TreeViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'katana-treeview',
                    template: "<tree-root [nodes]=\"nodes\" [options]=\"options\">\r\n    <!-- <ng-template #treeNodeTemplate let-node let-index=\"index\">\r\n        <span><span class=\"fa fa-plus\"></span> {{ node?.data?.name }}</span>\r\n    </ng-template> -->\r\n</tree-root>",
                    styles: [""]
                }] }
    ];
    return TreeViewComponent;
}());
export { TreeViewComponent };
if (false) {
    /** @type {?} */
    TreeViewComponent.prototype.nodes;
    /** @type {?} */
    TreeViewComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdHJlZXZpZXcvdHJlZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUVwRTtJQUFBO1FBT1MsVUFBSyxHQUFHO1lBQ2I7Z0JBQ0UsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO29CQUN6QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtpQkFDMUI7YUFDRjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtvQkFDM0I7d0JBQ0UsRUFBRSxFQUFFLENBQUM7d0JBQ0wsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsRUFBRTs0QkFDUixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTt5QkFDMUI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFDSyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQWhDQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0Isb1FBQXdDOztpQkFFekM7O0lBNEJELHdCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7U0ExQlksaUJBQWlCOzs7SUFDNUIsa0NBdUJFOztJQUNGLG9DQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2thdGFuYS10cmVldmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RyZWV2aWV3LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90cmVldmlldy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZVZpZXdDb21wb25lbnQge1xyXG4gIHB1YmxpYyBub2RlcyA9IFtcclxuICAgIHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIG5hbWU6ICdyb290MScsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgeyBpZDogMiwgbmFtZTogJ2NoaWxkMScgfSxcclxuICAgICAgICB7IGlkOiAzLCBuYW1lOiAnY2hpbGQyJyB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA0LFxyXG4gICAgICBuYW1lOiAncm9vdDInLFxyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIHsgaWQ6IDUsIG5hbWU6ICdjaGlsZDIuMScgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogNixcclxuICAgICAgICAgIG5hbWU6ICdjaGlsZDIuMicsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7IGlkOiA3LCBuYW1lOiAnc3Vic3ViJyB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXTtcclxuICBwdWJsaWMgb3B0aW9ucyA9IHt9O1xyXG59XHJcbiJdfQ==