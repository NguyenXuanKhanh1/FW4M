/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, ContentChild, RendererFactory2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TableOption, TableMode, TableConstant, TableText, TableMessage, TableColumnType, ChangedRow, ChangedCell } from './table.model';
import { TableRowDetailDirective } from './table-row-detail.directive';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { delay } from "rxjs/operators";
import { ValidationService } from '../validation/validation.service';
import { ClientValidator } from '../validation/validation.model';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
var TableComponent = /** @class */ (function () {
    function TableComponent(thisElement, rendererFactory, dataService, validationService, excelExporterService) {
        this.thisElement = thisElement;
        this.rendererFactory = rendererFactory;
        this.dataService = dataService;
        this.validationService = validationService;
        this.excelExporterService = excelExporterService;
        this.items = [];
        this.totalRecords = 0;
        this.selectedItems = [];
        this.totalPages = [];
        this.currentPage = 0;
        this.filter = {};
        this.maxPage = 5;
        this.selectedAll = false;
        this.filterColumns = [];
        this.toolbarActions = [];
        this.inlineActions = [];
        this.filterSectionToggle = false;
        this.textSearched = "";
        this.showReset = false;
        this.defaultPageSize = 5;
        this.changePage$ = new BehaviorSubject(0);
        this.changedRows = [];
        this.request = {};
        this.previousRequest = {};
        this.recursiveCounter = 0;
        this.subscriptions = new Subscription();
        this.edittedFields = [];
        this.previousItems = [];
        this._render = rendererFactory.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    TableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.init();
        /** @type {?} */
        var changePageSubscription = this.changePage$.pipe(distinctUntilChanged()).subscribe((/**
         * @param {?} pageIndex
         * @return {?}
         */
        function (pageIndex) {
            if (pageIndex < 0 || pageIndex >= _this.totalPages.length)
                return;
            _this.currentPage = pageIndex;
            if (!_this.option.request) {
                _this.option.request = {};
            }
            _this.option.request.pageIndex = _this.currentPage;
            _this.searchAsync(null, null, true).subscribe();
        }));
        this.subscriptions.add(changePageSubscription);
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.registerEvents();
        this.initValidations();
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.unsubscribe();
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.option.selectedItems && this.option.selectedItems.length > 0) {
            if (!this.selectedItems)
                this.selectedItems = [];
            this.option.selectedItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this.selectedItems.push(item);
            }));
        }
        if (!this.option.mode)
            this.option.mode = TableMode.full;
        if (!this.option.actions)
            this.option.actions = [];
        if (!this.option.key)
            this.option.key = TableConstant.Key;
        if (!this.option.totalToolbarItem)
            this.option.totalToolbarItem = 5;
        if (this.option.maxPage)
            this.maxPage = this.option.maxPage;
        if (!this.option.defaultOrderBy)
            this.option.defaultOrderBy = 'CreatedDate';
        if (!this.option.defautOrderDirection)
            this.option.defautOrderDirection = TableConstant.Direction.DESC;
        if (!this.option.componentClass) {
            this.option.componentClass = TableConstant.ComponentClass;
            this.thisElement.nativeElement.classList.add(this.option.componentClass);
        }
        if (this.option.maxLenghtext === undefined || this.option.maxLenghtext === null) {
            this.option.maxLenghtext = 150;
        }
        this.initTableTableTexts();
        this.initTableTableMessages();
        this.initMainColumns();
        if (this.option.actions) {
            this.option.actions.forEach((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                if (!action.type)
                    action.type = TableConstant.ActionType.Inline;
            }));
        }
        this.toolbarActions = this.option.actions.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return [TableConstant.ActionType.Both, TableConstant.ActionType.Toolbar].indexOf(x.type) >= 0; }));
        this.inlineActions = this.option.actions.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return [TableConstant.ActionType.Both, TableConstant.ActionType.Inline].indexOf(x.type) >= 0; }));
        /** @type {?} */
        var inFullMode = this.option.mode === TableMode.full;
        this.filterColumns = this.option.mainColumns.filter((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.allowFilter; }))
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.order > b.order ? 1 : a.order === b.order ? 0 : -1; }));
        this.hasFilterSection = inFullMode;
        if (this.option.paging === undefined) {
            this.option.paging = inFullMode;
        }
        if (inFullMode) {
            if (!this.option.pageSizes)
                this.option.pageSizes = TableConstant.PageSizes;
            if (!this.option.defaultPageSize)
                this.option.defaultPageSize = TableConstant.PageSizes[0];
            if (this.option.defaultPageSize)
                this.defaultPageSize = this.option.defaultPageSize;
        }
        /** @type {?} */
        var hasToolbarActions = this.option.actions && this.option.actions.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return [TableConstant.ActionType.Toolbar, TableConstant.ActionType.Both].indexOf(x.type) >= 0; })).length > 0;
        /** @type {?} */
        var hasTopButtons = this.option.topButtons && this.option.topButtons.length > 0;
        this.hasToolbarSection = inFullMode || hasToolbarActions || hasTopButtons;
        this.hasFooterSection = inFullMode || this.option.paging;
        this.hasPageSizeChooser = this.option.paging;
        if (this.option.hideCheckboxColumn === undefined) {
            this.option.hideCheckboxColumn = !hasToolbarActions;
        }
        if (!this.option.request) {
            this.option.request = {
                pageIndex: 0,
                pageSize: this.defaultPageSize
            };
            if (this.option.defaultPageSize) {
                this.option.request.pageSize = this.option.defaultPageSize;
                this.pageSize = this.option.request.pageSize;
            }
            this.searchAsync().subscribe();
        }
        else {
            if (!this.option.request.pageSize) {
                this.pageSize = this.option.request.pageSize;
            }
            else {
                this.pageSize = this.defaultPageSize;
            }
            this.searchAsync().subscribe();
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.callback = /**
     * @return {?}
     */
    function () {
        return of(this.selectedItems);
    };
    /**
     * @param {?} item
     * @param {?=} refresh
     * @param {?=} execute
     * @param {?=} callback
     * @return {?}
     */
    TableComponent.prototype.copy = /**
     * @param {?} item
     * @param {?=} refresh
     * @param {?=} execute
     * @param {?=} callback
     * @return {?}
     */
    function (item, refresh, execute, callback) {
        if (refresh === void 0) { refresh = true; }
        if (!this.items)
            this.items = [];
        /** @type {?} */
        var copyItem = this.dataService.cloneItem(item);
        if (copyItem.id)
            copyItem.id = this.dataService.newGuid();
        if (execute) {
            execute(copyItem);
        }
        if (this.option.localData) {
            this.localData.push(copyItem);
        }
        this.items.push(copyItem);
        if (callback)
            callback(copyItem);
        if (refresh == true) {
            this.searchAsync(true).subscribe();
        }
    };
    /**
     * @param {?=} fileName
     * @param {?=} callback
     * @return {?}
     */
    TableComponent.prototype.exportToExcel = /**
     * @param {?=} fileName
     * @param {?=} callback
     * @return {?}
     */
    function (fileName, callback) {
        var _this = this;
        if (!this.option.mainColumns || this.option.mainColumns.length == 0)
            return null;
        /** @type {?} */
        var request = this.buildRequest(0, true);
        request.pageSize = 9999999;
        /** @type {?} */
        var search = this.option.localData ? (/**
         * @param {?} req
         * @return {?}
         */
        function (req) { return _this.searchLocalItems(req); }) : (/**
         * @param {?} req
         * @return {?}
         */
        function (req) { return _this.option.serviceProvider.searchAsync(req); });
        if (search) {
            /** @type {?} */
            var data = [];
            search(request).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                response.items.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    /** @type {?} */
                    var exportedItem = {};
                    _this.option.mainColumns.forEach((/**
                     * @param {?} column
                     * @return {?}
                     */
                    function (column) {
                        if (column.valueRef) {
                            exportedItem[column.title()] = item[column.valueRef()];
                        }
                    }));
                    data.push(exportedItem);
                }));
                _this.excelExporterService.exportData(data, new IgxExcelExporterOptions(fileName ? fileName : new Date().getTime().toString()));
                if (callback)
                    callback();
            }));
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.resetChanges = /**
     * @return {?}
     */
    function () {
        this.previousItems = [];
        this.changedRows = [];
    };
    /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @param {?=} ref
     * @param {?=} validationOption
     * @param {?=} callback
     * @return {?}
     */
    TableComponent.prototype.acceptInlineEdit = /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @param {?=} ref
     * @param {?=} validationOption
     * @param {?=} callback
     * @return {?}
     */
    function (item, field, index, ref, validationOption, callback) {
        var _this = this;
        /** @type {?} */
        var element = ref.getElement();
        validationOption.itemRef = item;
        if (!validationOption.valueResolver) {
            validationOption.valueResolver = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return item[field];
            });
        }
        this.validationService.validateElementAsync(element, validationOption).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (!response || response.length == 0) {
                /** @type {?} */
                var currentItem = _this.changedRows.find((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.currentItem.id == item.id; }));
                /** @type {?} */
                var previousItem = _this.previousItems.find((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.id == item.id; }));
                if (!currentItem) {
                    if (item[field] != previousItem[field]) {
                        _this.changedRows.push(new ChangedRow({
                            currentItem: _this.dataService.cloneItem(item),
                            oldItem: previousItem,
                            cells: [
                                new ChangedCell({
                                    field: field,
                                    currentValue: item[field],
                                    oldValue: previousItem[field]
                                })
                            ]
                        }));
                    }
                }
                else {
                    /** @type {?} */
                    var currentField = currentItem.cells.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s.field == field; }));
                    if (!currentField) {
                        currentItem.cells.push(new ChangedCell({
                            field: field,
                            currentValue: item[field],
                            oldValue: previousItem[field]
                        }));
                    }
                    else {
                        if (item[field] != null && item[field] != undefined && item[field] != '' &&
                            currentField.oldValue != null && currentField.oldValue != undefined && currentField.oldValue != '') {
                            if (item[field].toString() != currentField.oldValue.toString()) {
                                currentField.currentValue = item[field];
                            }
                            else {
                                /** @type {?} */
                                var cellIndex = currentItem.cells.findIndex((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                function (s) { return s.field == field; }));
                                currentItem.cells.splice(cellIndex, 1);
                                if (currentItem.cells.length == 0) {
                                    /** @type {?} */
                                    var currentItemIndex = _this.changedRows.findIndex((/**
                                     * @param {?} s
                                     * @return {?}
                                     */
                                    function (s) { return s.currentItem.id == item.id; }));
                                    _this.changedRows.splice(currentItemIndex, 1);
                                }
                            }
                        }
                        else {
                            currentField.currentValue = item[field];
                        }
                    }
                }
                _this.closeInlineEdit(field, index);
                if (callback)
                    callback(item, field);
            }
        }));
    };
    /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.cancelInlineEdit = /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    function (item, field, index) {
        /** @type {?} */
        var currentItem = this.retrieveInlineEdit(field, index);
        if (!currentItem)
            return;
        item[field] = currentItem.item[field];
        this.closeInlineEdit(field, index);
    };
    /**
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.closeInlineEdit = /**
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    function (field, index) {
        /** @type {?} */
        var itemIndex = this.edittedFields.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.field == field && s.index == index; }));
        if (itemIndex > -1)
            this.edittedFields.splice(itemIndex, 1);
    };
    /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.editInline = /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    function (item, field, index) {
        if (!item)
            return;
        if (this.previousItems.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.id == item.id; })) == -1) {
            this.previousItems.push(this.dataService.cloneItem(item));
        }
        /** @type {?} */
        var currentItem = this.retrieveInlineEdit(field, index);
        if (!currentItem) {
            this.edittedFields.push({
                item: this.dataService.cloneItem(item),
                index: index,
                field: field
            });
        }
        else {
            currentItem.item = this.dataService.cloneItem(item);
        }
        this.validationService.updateAsync(null, item);
    };
    /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.hasInlineEdit = /**
     * @param {?} item
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    function (item, field, index) {
        if (!this.option || this.option.inlineEdit != true)
            return false;
        if (!item || !this.edittedFields || this.edittedFields.length == 0)
            return false;
        return ((/** @type {?} */ (this.edittedFields))).findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.field == field && s.index == index; })) > -1;
    };
    /**
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.retrieveInlineEdit = /**
     * @param {?} field
     * @param {?} index
     * @return {?}
     */
    function (field, index) {
        if (!this.edittedFields || this.edittedFields.length == 0)
            return null;
        return ((/** @type {?} */ (this.edittedFields))).find((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.field == field && s.index == index; }));
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.resetFilters = /**
     * @return {?}
     */
    function () {
        this.filter = {};
        this.selectedItems = [];
        this.selectedAll = false;
        this.filterSectionToggle = false;
        this.totalPages = [];
        this.option.request.pageIndex = 0;
        this.currentPage = 0;
        if (!this.option.request.pageSize) {
            this.pageSize = this.option.request.pageSize;
        }
        else {
            this.pageSize = this.defaultPageSize;
        }
        this.option.request.pageSize = this.pageSize;
        this.searchAsync().subscribe();
        this.showReset = false;
        this.request = {};
    };
    /**
     * @param {?} standard
     * @return {?}
     */
    TableComponent.prototype.getToolbarActions = /**
     * @param {?} standard
     * @return {?}
     */
    function (standard) {
        var _this = this;
        /** @type {?} */
        var actions = [];
        if (this.toolbarActions) {
            this.toolbarActions.forEach((/**
             * @param {?} action
             * @param {?} index
             * @return {?}
             */
            function (action, index) {
                if (!standard) {
                    if (index >= _this.option.totalToolbarItem) {
                        actions.push(action);
                    }
                }
                else {
                    if (index < _this.option.totalToolbarItem) {
                        actions.push(action);
                    }
                }
            }));
        }
        return actions;
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.changePageSize = /**
     * @return {?}
     */
    function () {
        this.option.request.pageSize = this.pageSize;
        this.option.request.pageIndex = 0;
        this.searchAsync().subscribe();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TableComponent.prototype.handkeKeypress = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event && $event.which == 13) {
            this.searchAsync().subscribe();
        }
    };
    /**
     * @param {?} $event
     * @param {?=} blur
     * @return {?}
     */
    TableComponent.prototype.goto = /**
     * @param {?} $event
     * @param {?=} blur
     * @return {?}
     */
    function ($event, blur) {
        if ($event.which == 13 || blur == true) {
            this.currentPage = $event.target.value - 1;
            if (this.currentPage < 0)
                this.currentPage = 0;
            if (this.currentPage >= this.totalPages.length) {
                this.currentPage = this.totalPages.length - 1;
            }
            $event.target.value = this.currentPage + 1;
            this.changePage$.next(this.currentPage);
        }
        else {
            if ($event.which < 48 || $event.which > 57)
                $event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.toggleFilterSection = /**
     * @return {?}
     */
    function () {
        this.filterSectionToggle = !this.filterSectionToggle;
    };
    /**
     * @param {?} column
     * @param {?} direction
     * @return {?}
     */
    TableComponent.prototype.showSorter = /**
     * @param {?} column
     * @param {?} direction
     * @return {?}
     */
    function (column, direction) {
        return column.direction === direction;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableComponent.prototype.toggleRowDetail = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item.toggle = !item.toggle;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    TableComponent.prototype.sortAsync = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (!column.valueRef)
            return;
        this.resetSortAsync(column);
        if (column && column.allowSort != false) {
            if (!column.direction) {
                column.direction = TableConstant.Direction.ASC;
            }
            else {
                column.direction = column.direction == TableConstant.Direction.ASC ? TableConstant.Direction.DESC : TableConstant.Direction.ASC;
            }
        }
        this.orderBy = this.dataService.toPascalCase(column.valueRef());
        this.direction = column.direction;
        this.searchAsync(null, null, false).subscribe();
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    TableComponent.prototype.selectAll = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this.selectedItems = selected ? tslib_1.__spread(this.items) : [];
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.clearAll = /**
     * @return {?}
     */
    function () {
        this.selectedItems = [];
        this.selectedAll = false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableComponent.prototype.selectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var selectedIds = this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.id; }));
        /** @type {?} */
        var existingItemIndex = selectedIds.indexOf(item.id);
        if (existingItemIndex >= 0) {
            this.selectedItems.splice(existingItemIndex, 1);
        }
        else {
            this.selectedItems.push(item);
        }
        if (!this.option.multiple) {
            /** @type {?} */
            var currentItem = this.selectedItems.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.id == item.id; }));
            if (currentItem) {
                this.selectedItems = [currentItem];
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableComponent.prototype.isRowSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var selectedIds = this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.id; }));
        return selectedIds.indexOf(item.id) >= 0;
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    TableComponent.prototype.hasAnyAction = /**
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var aliveActions = this.inlineActions.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x.hide || !x.hide(item); }));
        return aliveActions.length > 0;
    };
    /**
     * @param {?} action
     * @param {?=} item
     * @param {?=} $event
     * @param {?=} index
     * @param {?=} loadedCallback
     * @return {?}
     */
    TableComponent.prototype.executeActionAsync = /**
     * @param {?} action
     * @param {?=} item
     * @param {?=} $event
     * @param {?=} index
     * @param {?=} loadedCallback
     * @return {?}
     */
    function (action, item, $event, index, loadedCallback) {
        if (action) {
            /** @type {?} */
            var target = $event ? $event.target : null;
            action.executeAsync(item, target, this, index, loadedCallback);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableComponent.prototype.isActive = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.selectedItems.length === 0)
            return false;
        /** @type {?} */
        var currentItem = this.selectedItems.find((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.id === item.id; }));
        return currentItem && currentItem.checkedRow;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.getCurrentIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.option.request) {
            return this.option.request.pageIndex * this.option.request.pageSize + index + 1;
        }
        return -1;
    };
    /**
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    TableComponent.prototype.getDropdownDisplayText = /**
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    function (column, item) {
        /** @type {?} */
        var values = item[column.valueRef()];
        if (!values)
            return '';
        if (values instanceof Array) {
            /** @type {?} */
            var result = (/** @type {?} */ (values.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x[column.dropdownConfiguration.bindLabel]; }))));
            return result.join(', ');
        }
        return values[column.dropdownConfiguration.bindLabel];
    };
    /**
     * @param {?} n
     * @return {?}
     */
    TableComponent.prototype.getPages = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        /** @type {?} */
        var pages = [];
        if (this.totalPages.length < n) {
            for (var i = this.totalPages.length - 1; i >= 0; i--) {
                pages.push(i);
            }
            return pages;
        }
        if (this.currentPage < n) {
            for (var i = n - 1; i >= 0; i--) {
                pages.push(i);
            }
        }
        else {
            /** @type {?} */
            var count = Math.floor(n / 2);
            /** @type {?} */
            var max = this.currentPage + count >= this.totalPages.length ? this.totalPages.length - 1 : this.currentPage + count;
            for (var i = max; i >= this.currentPage - count; i--) {
                pages.push(i);
            }
        }
        return pages;
    };
    /**
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    TableComponent.prototype.reload = /**
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    function (keepSelectedItems) {
        if (keepSelectedItems === void 0) { keepSelectedItems = false; }
        return this.searchAsync(null, null, keepSelectedItems);
    };
    /**
     * @param {?=} advancedFilter
     * @return {?}
     */
    TableComponent.prototype.search = /**
     * @param {?=} advancedFilter
     * @return {?}
     */
    function (advancedFilter) {
        this.searchAsync(advancedFilter).subscribe();
    };
    /**
     * @param {?} record
     * @return {?}
     */
    TableComponent.prototype.trackRecords = /**
     * @param {?} record
     * @return {?}
     */
    function (record) {
        return record ? record.id : undefined;
    };
    /**
     * @param {?=} advancedFilter
     * @param {?=} currentPage
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    TableComponent.prototype.searchAsync = /**
     * @param {?=} advancedFilter
     * @param {?=} currentPage
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    function (advancedFilter, currentPage, keepSelectedItems) {
        var _this = this;
        if (keepSelectedItems === void 0) { keepSelectedItems = true; }
        this.loading = true;
        /** @type {?} */
        var request = this.buildRequest(currentPage, advancedFilter);
        if (this.option.localData) {
            this.option.localData().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.localData = data;
                _this.searchLocalItems(request).subscribe((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    _this.bindResultData(response, keepSelectedItems);
                }));
            }));
        }
        else {
            if (!this.option.serviceProvider || !this.option.serviceProvider.searchAsync)
                throw new Error('!this.option.serviceProvider.searchAsync');
            this.option.serviceProvider.searchAsync(request).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                _this.bindResultData(response, keepSelectedItems);
            }));
        }
        return of(true);
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.checkedAllPageItems = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.selectedItems || !this.items || this.items.length == 0) {
            return false;
        }
        /** @type {?} */
        var check = true;
        this.items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var currentItem = _this.selectedItems.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.id === item.id; }));
            if (!currentItem) {
                check = false;
                return check;
            }
        }));
        return check;
    };
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    TableComponent.prototype.setDefaultOrder = /**
     * @private
     * @param {?} request
     * @return {?}
     */
    function (request) {
        if (this.option.defaultOrderBy)
            this.orderBy = this.option.defaultOrderBy;
        if (this.option.defautOrderDirection)
            this.direction = this.option.defautOrderDirection;
        request.orderBy = this.orderBy;
        request.direction = this.direction;
        if (!this.orderBy) {
            this.orderBy = "Id";
            this.direction = TableConstant.Direction.ASC;
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    TableComponent.prototype.setFilter = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.request[key] = value;
        this.currentPage = 0;
        this.filter[key] = value;
        if (this.option && this.option.request)
            this.option.request.pageIndex = 0;
    };
    /**
     * @private
     * @param {?} advancedFilter
     * @param {?} request
     * @return {?}
     */
    TableComponent.prototype.retrieveAdvancedFilters = /**
     * @private
     * @param {?} advancedFilter
     * @param {?} request
     * @return {?}
     */
    function (advancedFilter, request) {
        var _this = this;
        this.filterColumns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var value = _this.filter[column.valueRef()];
            if (value == undefined || value == 'undefined') {
                value = '';
            }
            if (advancedFilter == true) {
                if (column.type && (column.type.toLowerCase() == 'date' || column.type.toLowerCase() == 'datetime' || column.type.toLowerCase() == 'time')) {
                    if (value && value != '') {
                        /** @type {?} */
                        var datetimeValues = (/** @type {?} */ (value));
                        if (datetimeValues.length == 1) {
                            request[column.valueRef() + 'From'] = _this.convertDatetime(datetimeValues[0], 'From');
                        }
                        else if (datetimeValues.length == 2) {
                            request[column.valueRef() + 'From'] = _this.convertDatetime(datetimeValues[0], 'From');
                            request[column.valueRef() + 'To'] = _this.convertDatetime(datetimeValues[1], 'To');
                        }
                    }
                }
                else {
                    request[column.valueRef()] = value;
                }
            }
            else {
                request[column.valueRef()] = value;
            }
        }));
    };
    /**
     * @private
     * @param {?=} currentPage
     * @param {?=} advancedFilter
     * @return {?}
     */
    TableComponent.prototype.buildRequest = /**
     * @private
     * @param {?=} currentPage
     * @param {?=} advancedFilter
     * @return {?}
     */
    function (currentPage, advancedFilter) {
        this.previousRequest = Object.assign({}, this.request);
        /** @type {?} */
        var searchText = this.filter.searchText;
        this.textSearched = this.filter.searchText;
        if (searchText == undefined || searchText == 'undefined') {
            searchText = '';
        }
        this.request.pageSize = this.option.request.pageSize;
        if (!this.option.paging) {
            this.request.pageSize = 999999;
            this.pageSize = 999999;
        }
        this.request.searchText = searchText;
        this.request.direction = this.direction;
        this.request.orderBy = this.orderBy;
        if (!this.orderBy)
            this.setDefaultOrder(this.request);
        this.retrieveAdvancedFilters(advancedFilter, this.request);
        this.request.pageIndex = this.option.request.pageIndex;
        if (currentPage) {
            this.request.pageIndex = currentPage;
            this.currentPage = currentPage;
        }
        /** @type {?} */
        var changes = this.dataService.compareObjects(this.previousRequest, this.request);
        /** @type {?} */
        var isChanged = changes.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return ['pageIndex', 'pageSize'].indexOf(x.propertyName) < 0; })).length > 0;
        if (isChanged) {
            this.option.request.pageIndex = 0;
            this.request.pageIndex = 0;
            this.currentPage = 0;
        }
        return this.request;
    };
    /**
     * @private
     * @param {?} dt
     * @param {?} type
     * @return {?}
     */
    TableComponent.prototype.convertDatetime = /**
     * @private
     * @param {?} dt
     * @param {?} type
     * @return {?}
     */
    function (dt, type) {
        if (!dt)
            return '';
        /** @type {?} */
        var convertedDatetime = new Date(dt);
        /** @type {?} */
        var days = convertedDatetime.getDate().toString();
        if (days.length < 2)
            days = '0' + days;
        /** @type {?} */
        var months = (convertedDatetime.getMonth() + 1).toString();
        if (months.length < 2)
            months = '0' + months;
        /** @type {?} */
        var hours = convertedDatetime.getHours().toString();
        if (hours.length < 2)
            hours = '0' + hours;
        /** @type {?} */
        var minutes = convertedDatetime.getMinutes().toString();
        if (minutes.length < 2)
            minutes = '0' + minutes;
        /** @type {?} */
        var year = convertedDatetime.getFullYear();
        switch (this.option.datetimeFormat.format) {
            case 'dd/MM/yyyy':
                return days + '/' + months + '/' + year + (type == 'From' ? ' 00:00' : ' 23:59');
            case 'dd/MM/yyyy HH:mm':
                return days + '/' + months + '/' + year + ' ' + hours + ':' + minutes;
            case 'MM/dd/yyyy':
                return months + '/' + days + '/' + year + (type == 'From' ? ' 00:00' : ' 23:59');
            case 'MM/dd/yyyy HH:mm':
                return months + '/' + days + '/' + year + ' ' + hours + ':' + minutes;
        }
    };
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    TableComponent.prototype.searchLocalItems = /**
     * @private
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var _this = this;
        /** @type {?} */
        var result = this.localData;
        /** @type {?} */
        var orderBy = this.dataService.getField(request.orderBy, true);
        if (request.direction == TableConstant.Direction.ASC) {
            if (!this.option.sort) {
                result = result.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a[orderBy] > b[orderBy] ? 1 : a[orderBy] === b[orderBy] ? 0 : -1; }));
            }
            else {
                result = result.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return _this.option.sort(a, b, orderBy); }));
            }
        }
        else {
            if (!this.option.sort) {
                result = result.sort((/**
                 * @param {?} b
                 * @param {?} a
                 * @return {?}
                 */
                function (b, a) { return a[orderBy] > b[orderBy] ? 1 : a[orderBy] === b[orderBy] ? 0 : -1; }));
            }
            else {
                result = result.sort((/**
                 * @param {?} b
                 * @param {?} a
                 * @return {?}
                 */
                function (b, a) { return _this.option.sort(a, b, orderBy); }));
            }
        }
        /** @type {?} */
        var items = [];
        if (request.pageIndex >= 0 && request.pageSize > 0) {
            /** @type {?} */
            var localResult_1 = [];
            if (request.searchText && this.option.searchFields && this.option.searchFields.length > 0) {
                this.option.searchFields.forEach((/**
                 * @param {?} field
                 * @return {?}
                 */
                function (field) {
                    /** @type {?} */
                    var response = result.filter((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return _this.fuzzysearch(request.searchText, s[field]); }));
                    if (response) {
                        response.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) {
                            if (localResult_1.findIndex((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s.id == item.id; })) == -1) {
                                localResult_1.push(item);
                            }
                        }));
                    }
                }));
                result = localResult_1;
            }
            /** @type {?} */
            var filter = {};
            this.retrieveAdvancedFilters(true, filter);
            if (this.filterColumns) {
                this.filterColumns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    /** @type {?} */
                    var value = filter[column.valueRef()];
                    if (value) {
                        result = result.filter((/**
                         * @param {?} s
                         * @return {?}
                         */
                        function (s) { return _this.fuzzysearch(value, s[column.valueRef()]); }));
                    }
                }));
            }
            items = result.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return (result.indexOf(s) >= request.pageIndex * request.pageSize) && (result.indexOf(s) < (request.pageIndex + 1) * request.pageSize); }));
        }
        /** @type {?} */
        var response = {
            items: items,
            totalRecords: result.length
        };
        return of(response).pipe(delay(250));
    };
    /**
     * @private
     * @param {?} c
     * @return {?}
     */
    TableComponent.prototype.convertUCode = /**
     * @private
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if ('aãạàáảăăẵặằẳâẫậầấẩ'.indexOf(c) > -1)
            return 'a';
        if ('dđ'.indexOf(c) > -1)
            return 'd';
        if ('oõọòóỏôỗộồốơỡợờớở'.indexOf(c) > -1)
            return 'o';
        if ('uũụùúủưữựừứửưữựừứử'.indexOf(c) > -1)
            return 'u';
        if ('iĩịìíỉ'.indexOf(c) > -1)
            return 'i';
        if ('yỹỵỳýỷ'.indexOf(c) > -1)
            return 'y';
        if ('eẽẹèéẽêễệềêể'.indexOf(c) > -1)
            return 'e';
        return c;
    };
    /**
     * @private
     * @param {?} needle
     * @param {?} haystack
     * @return {?}
     */
    TableComponent.prototype.fuzzysearch = /**
     * @private
     * @param {?} needle
     * @param {?} haystack
     * @return {?}
     */
    function (needle, haystack) {
        if (!needle || !haystack)
            return false;
        /** @type {?} */
        var haystackLC = this.removeAllSpaces(haystack.toString().toLowerCase());
        /** @type {?} */
        var needleLC = this.removeAllSpaces(needle.toString().toLowerCase());
        /** @type {?} */
        var hlen = haystack.toString().length;
        /** @type {?} */
        var nlen = needleLC.toString().length;
        if (nlen > hlen) {
            return false;
        }
        if (nlen === hlen) {
            return needleLC === haystackLC;
        }
        outer: for (var i = 0, j = 0; i < nlen; i++) {
            /** @type {?} */
            var nch = this.convertUCode(needleLC[i]);
            while (j < hlen) {
                if (this.convertUCode(haystackLC[j++]) === nch) {
                    continue outer;
                }
            }
            return false;
        }
        return true;
    };
    /**
     * @private
     * @param {?=} str
     * @return {?}
     */
    TableComponent.prototype.removeAllSpaces = /**
     * @private
     * @param {?=} str
     * @return {?}
     */
    function (str) {
        if (!str)
            return '';
        return str.replace(/\s/g, '');
    };
    /**
     * @private
     * @param {?} response
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    TableComponent.prototype.bindResultData = /**
     * @private
     * @param {?} response
     * @param {?=} keepSelectedItems
     * @return {?}
     */
    function (response, keepSelectedItems) {
        if (keepSelectedItems === void 0) { keepSelectedItems = true; }
        this.items = response.items;
        this.totalRecords = response.totalRecords;
        this.calculatePages();
        if (!keepSelectedItems) {
            this.selectedItems = [];
        }
        this.selectedAll = this.checkedAllPageItems();
        if (this.currentPage > this.totalPages.length - 1) {
            this.recursiveCounter++;
            if (this.recursiveCounter < 3) {
                this.searchAsync(null, this.totalPages.length - 1).subscribe();
            }
        }
        this.loading = false;
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.calculatePages = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pages = Math.floor(this.totalRecords / this.pageSize);
        if (pages <= 0) {
            pages = 1;
        }
        if (this.totalRecords % this.pageSize > 0) {
            pages += 1;
        }
        if (this.totalRecords < this.pageSize) {
            pages = 1;
        }
        this.totalPages = [];
        for (var i = 0; i < pages; i++) {
            this.totalPages.push(i);
        }
    };
    /**
     * @private
     * @param {?} currentColumn
     * @return {?}
     */
    TableComponent.prototype.resetSortAsync = /**
     * @private
     * @param {?} currentColumn
     * @return {?}
     */
    function (currentColumn) {
        this.option.mainColumns = this.option.mainColumns.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            if (column.id !== currentColumn.id)
                column.direction = undefined;
            return column;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.initTableTableTexts = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.option.displayText) {
            this.option.displayText = new TableText();
        }
        else {
            if (!this.option.displayText)
                this.option.displayText.placeholderSearch = TableConstant.DisplayText.PlaceholderSearch;
            if (!this.option.displayText.btnSearch)
                this.option.displayText.btnSearch = TableConstant.DisplayText.BtnSearch;
            if (!this.option.displayText.btnReset)
                this.option.displayText.btnReset = TableConstant.DisplayText.BtnReset;
            if (!this.option.displayText.action)
                this.option.displayText.action = TableConstant.DisplayText.Action;
            if (!this.option.displayText.selectPageSize)
                this.option.displayText.selectPageSize = TableConstant.DisplayText.SelectPageSize;
            if (!this.option.displayText.deleteTitle)
                this.option.displayText.deleteTitle = TableConstant.DisplayText.DeleteTitle;
            if (!this.option.displayText.btnAcceptTitle)
                this.option.displayText.btnAcceptTitle = TableConstant.DisplayText.BtnAcceptTitle;
            if (!this.option.displayText.btnCancelTitle)
                this.option.displayText.btnCancelTitle = TableConstant.DisplayText.BtnCancelTitle;
            if (!this.option.displayText.filterTitle)
                this.option.displayText.filterTitle = TableConstant.DisplayText.FilterTitle;
            if (!this.option.displayText.applyFilter)
                this.option.displayText.applyFilter = TableConstant.DisplayText.ApplyFilter;
            if (!this.option.displayText.detailTitle)
                this.option.displayText.detailTitle = TableConstant.DisplayText.DetailTitle;
            if (!this.option.displayText.pageTitle)
                this.option.displayText.pageTitle = TableConstant.DisplayText.PageTitle;
            if (!this.option.displayText.advancedSearchTitle)
                this.option.displayText.advancedSearchTitle = TableConstant.DisplayText.AdvancedSearchTitle;
            if (!this.option.displayText.advancedBtnTitle)
                this.option.displayText.advancedBtnTitle = TableConstant.DisplayText.AdvancedBtnTitle;
            if (!this.option.displayText.advancedBtnCancelTitle)
                this.option.displayText.advancedBtnCancelTitle = TableConstant.DisplayText.AdvancedBtnCancelTitle;
            if (!this.option.displayText.allTitle)
                this.option.displayText.allTitle = TableConstant.DisplayText.AllTitle;
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.initTableTableMessages = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.option.message) {
            this.option.message = new TableMessage();
        }
        else {
            if (!this.option.message.notFoundMessage)
                this.option.message.notFoundMessage = TableConstant.Message.NotFoundMessage;
            if (!this.option.message.foundMessage)
                this.option.message.foundMessage = TableConstant.Message.FoundMessage;
            if (!this.option.message.invalidFormatMessage)
                this.option.message.invalidFormatMessage = TableConstant.Message.InvalidFormatMessage;
            if (!this.option.message.selectedItemsMessage)
                this.option.message.selectedItemsMessage = TableConstant.Message.SelectedItemsMessage;
            if (!this.option.message.confirmSelectAllRecordsMessage)
                this.option.message.confirmSelectAllRecordsMessage = TableConstant.Message.ConfirmSelectAllRecordsMessage;
            if (!this.option.message.confirmClearAllRecordsMessage)
                this.option.message.confirmClearAllRecordsMessage = TableConstant.Message.ConfirmClearAllRecordsMessage;
            if (!this.option.message.deleteMessage)
                this.option.message.deleteMessage = TableConstant.Message.DeleteMessage;
            if (!this.option.message.loadingMessage)
                this.option.message.loadingMessage = TableConstant.Message.LoadingMessage;
            if (!this.option.message.refMessage)
                this.option.message.refMessage = TableConstant.Message.RefMessage;
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.initMainColumns = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.option.mainColumns) {
            this.option.mainColumns = [];
        }
        this.option.mainColumns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            if (!column.textAlign)
                column.textAlign = TableConstant.TextAlign.Left;
            if (column && !column.id) {
                column.id = _this.dataService.newGuid();
            }
            if (column.allowFilter) {
                if (column.type === TableColumnType.Dropdown) {
                    if (!column.dropdownConfiguration)
                        throw new Error('!column.dropdownConfiguration');
                }
                _this.filterColumns.push(column);
                _this.filter[column.valueRef()] = null;
            }
        }));
        this.option.mainColumns = this.option.mainColumns.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.order > b.order ? 1 : a.order === b.order ? 0 : -1; }));
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.initValidations = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.option && this.option.mainColumns) {
            /** @type {?} */
            var validationOptions = [];
            this.option.mainColumns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                if (column.validationOption) {
                    column.validationOption.dynamic = true;
                    if (!column.validationOption.validationName) {
                        column.validationOption.validationName = column.valueRef();
                    }
                    validationOptions.push(column.validationOption);
                }
            }));
            if (validationOptions.length > 0) {
                /** @type {?} */
                var validator = new ClientValidator({
                    formRef: this.wrapper,
                    options: validationOptions,
                    payloadRef: (/**
                     * @return {?}
                     */
                    function () { return _this.items; })
                });
                this.validationService.init({ validator: validator });
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableComponent.prototype.registerEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.gotoRef) {
            this._render.listen(this.gotoRef.nativeElement, 'keydown', (/**
             * @param {?} $event
             * @return {?}
             */
            function ($event) {
                /** @type {?} */
                var value = $event.which;
                /** @type {?} */
                var max = '9999999';
                if (_this.gotoRef.nativeElement.attributes['max']) {
                    max = _this.gotoRef.nativeElement.attributes['max'].value;
                }
                if ((value >= 48 && value <= 57) || (value >= 96 && value <= 105) || value == 8 || value == 13) {
                    if (value >= 48 && value <= 57) {
                        if (parseInt(max) < parseInt($event.target.value + (parseInt(value) - 48))) {
                            $event.preventDefault();
                            $event.target.value = max;
                        }
                    }
                    else if (value >= 96 && value <= 105) {
                        if (parseInt(max) < parseInt($event.target.value + (parseInt(value) - 96))) {
                            $event.preventDefault();
                            $event.target.value = max;
                        }
                    }
                    else
                        return;
                }
                else {
                    $event.preventDefault();
                }
            }));
        }
    };
    TableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'katana-table',
                    template: "<div #wrapper>\r\n  <label *ngIf=\"option.title\">{{option.title}}</label>\r\n  <ng-container *ngIf=\"hasFilterSection then filterSection\"></ng-container>\r\n  <ng-container *ngIf=\"hasToolbarSection then toolbarSection\"></ng-container>\r\n  <div class=\"katana-table--wrapper mb-3\">\r\n    <div class=\"loading-indicator\" [class.show]=\"loading\">\r\n      <div class=\"spinner\">\r\n        <div class=\"bounce1\"></div>\r\n        <div class=\"bounce2\"></div>\r\n        <div class=\"bounce3\"></div>\r\n      </div>\r\n      <p class=\"text-center text-muted text-bold\">{{option?.message?.loadingMessage}}</p>\r\n    </div>\r\n    <div [class.loading-cover]=\"loading\">\r\n      <div class=\"katana-main-table\">\r\n        <table #tableRef class=\"katana-component\" [ngClass]=\"option.componentClass\">\r\n          <ng-container [ngTemplateOutlet]=\"tableHeader\"></ng-container>\r\n          <ng-container *ngIf=\"items.length > 0 then tableBody; else noResult\"></ng-container>\r\n        </table>\r\n        <ng-container *ngIf=\"hasFooterSection then footerSection\"></ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div [attr.validation-name]=\"validationName\" [attr.scope]=\"validationScope ? validationScope : null\"></div>\r\n\r\n  <ng-template #tableHeader>\r\n    <thead>\r\n      <tr>\r\n        <th *ngIf=\"rowDetailTemplate\" style=\"width: 40px;\"></th>\r\n        <th *ngIf=\"!option.hideSequenceColumn\" class=\"\" style=\"width: 40px; text-align: center;\">#</th>\r\n        <th *ngIf=\"!option.hideCheckboxColumn\" style=\"width: 40px;\" class=\"center\">\r\n          <div class=\"checkbox-fade fade-in-primary\">\r\n            <label class=\"m-0\">\r\n              <input [(ngModel)]=\"selectedAll\" (ngModelChange)=\"selectAll($event)\" type=\"checkbox\">\r\n              <span class=\"cr m-0\" style=\"border:solid 2px white\">\r\n                <i class=\"cr-icon fa fa-check txt-primary\"></i>\r\n              </span>\r\n              <span></span>\r\n            </label>\r\n          </div>\r\n        </th>\r\n        <ng-container *ngFor=\"let column of option.mainColumns\">\r\n          <th [ngStyle]=\"{'width.px': column.width}\" [ngClass]=\"{'sortable': column.allowSort}\"\r\n            (click)=\"sortAsync(column)\" *ngIf=\"!column.hide || !column.hide()\">\r\n            <span class=\"wrap-text\">{{column.title()}}</span>\r\n            <span *ngIf=\"showSorter(column, 'desc')\"\r\n              class=\"fa fa-sort-alpha-desc text-desc pull-right sort-icon\"></span>\r\n            <span *ngIf=\"showSorter(column, 'asc')\" class=\"fa fa-sort-alpha-asc text-asc pull-right sort-icon\"></span>\r\n          </th>\r\n        </ng-container>\r\n        <th style=\"width: 120px;\" *ngIf=\"hasAnyAction()\">{{option.displayText.action}}</th>\r\n      </tr>\r\n    </thead>\r\n  </ng-template>\r\n\r\n  <ng-template #tableBody>\r\n    <tbody *ngFor=\"let item of items; let i = index; let even = event; let odd = odd;\">\r\n      <tr #row class=\"katana-tr {{ isRowSelected(item) ? 'selected' : ''}}\" [ngClass]=\"{odd: odd, even: even}\">\r\n        <td [attr.data-content]=\"'Xem chi ti\u1EBFt'\" *ngIf=\"rowDetailTemplate\" class=\"katana-td detail\">\r\n          <span *ngIf=\"!item.toggle\" (click)=\"toggleRowDetail(item)\" style=\"color: #eb5d13;\" class=\"fa fa-plus\"></span>\r\n          <span *ngIf=\"item.toggle\" (click)=\"toggleRowDetail(item)\" style=\"color: #eb5d13;\" class=\"fa fa-minus\"></span>\r\n        </td>\r\n        <td *ngIf=\"!option.hideSequenceColumn\" [attr.data-content]=\"'#'\" class=\"katana-td detail\">{{getCurrentIndex(i)}}\r\n        </td>\r\n        <td *ngIf=\"!option.hideCheckboxColumn\" class=\"center\">\r\n          <div class=\"checkbox-fade fade-in-primary m-0\">\r\n            <label class=\"m-0\">\r\n              <input type=\"checkbox\" (click)=\"selectItem(item)\" [checked]=\"isRowSelected(item)\">\r\n              <span class=\"cr m-0\">\r\n                <i class=\"cr-icon fa fa-check txt-primary\"></i>\r\n              </span>\r\n              <span></span>\r\n            </label>\r\n          </div>\r\n        </td>\r\n        <ng-container *ngFor=\"let column of option.mainColumns\">\r\n          <td *ngIf=\"!column.hide || !column.hide()\" [ngClass]=\"{'link': column.click}\"\r\n            class=\"wrap-text katana-td {{column.textAlign}}\" attr.data-content=\"{{column.title()}}\">\r\n            <div class=\"d-inline-block custom-input\">\r\n              <div class=\"d-inline-block custom-td\">\r\n                <ng-container\r\n                  [ngTemplateOutlet]=\"column.customTemplate ? column.customTemplate() : fieldControlTemplate\"\r\n                  [ngTemplateOutletContext]=\"{item: item, index: i, column: column, readonly: true, hasFormLabel: false}\">\r\n                </ng-container>\r\n              </div>\r\n            </div>\r\n          </td>\r\n        </ng-container>\r\n\r\n        <td #inlineActionArea *ngIf=\"hasAnyAction(item)\" class=\"text-center action-column-wrapper\">\r\n          <div class=\"katana-tooltip\" *ngFor=\"let action of inlineActions\">\r\n            <span *ngIf=\"action.tooltip\" class=\"tooltiptext tooltip-top\">{{action.tooltip()}}</span>\r\n            <katana-button class=\"mr-1\" *ngIf=\"!action.hide || !action.hide(item)\" [lazyload]=\"action.lazyload\"\r\n              [customClass]=\"action.customClass\" title=\"{{action.title ? action.title() : ''}}\" [icon]=\"action.icon\"\r\n              (execute)=\"executeActionAsync(action,item,null, i, $event)\" [disabled]=\"action.disabled\"></katana-button>\r\n          </div>\r\n        </td>\r\n      </tr>\r\n      <tr #rowDetail [@cAnimation] *ngIf=\"item.toggle\" class=\"row-detail-wrapper\">\r\n        <td colspan=\"20\" (click)=\"selectItem(item)\">\r\n          <div *ngIf=\"false\" class=\"d-flex detail-title\">\r\n            <span><i class=\"fa fa-info\" aria-hidden=\"true\"></i> {{option?.displayText?.detailTitle}}</span>\r\n          </div>\r\n          <ng-container *ngIf=\"rowDetailTemplate\" [ngTemplateOutlet]=\"rowDetailTemplate.template\"\r\n            [ngTemplateOutletContext]=\"{item: item}\">\r\n          </ng-container>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </ng-template>\r\n\r\n  <ng-template #noResult>\r\n    <tbody>\r\n      <tr>\r\n        <td colspan=\"20\" class=\"center no-result\">\r\n          <i class=\"fa fa-search\"></i>\r\n          {{option?.message?.notFoundMessage}} <span *ngIf=\"textSearched\"> {{option?.message?.refMessage}} <span\r\n              class=\"text-bold text-primary\">\"{{textSearched}}\"</span>\r\n          </span>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </ng-template>\r\n\r\n  <ng-template #footerSection>\r\n    <div class=\"table-footer\">\r\n      <div class=\"paging d-flex align-items-center\">\r\n        <div *ngIf=\"totalRecords > 0\">\r\n          <span class=\"result-search-text\"\r\n            [innerHTML]=\"option.message.foundMessage.replace('[0]',totalRecords.toString()).replace('[1]',totalPages.length.toString())\"></span>\r\n        </div>\r\n        <div class=\"ml-auto \" *ngIf=\"totalPages.length > 1 && option.paging\">\r\n          <div class=\"d-flex align-items-center page-navigator\">\r\n            <div class=\"mr-5\">\r\n              <span class=\"mr-1 text-muted\">{{option?.displayText?.pageTitle}}</span>\r\n              <input #gotoRef (keypress)=\"goto($event,false)\" (blur)=\"goto($event,true)\" class=\"goto mr-1\"\r\n                value=\"{{currentPage + 1}}\" type=\"text\" max=\"{{totalPages.length}}\" />\r\n              <span>/<span class=\"text-muted ml-1\">{{totalPages.length}}</span></span>\r\n            </div>\r\n            <ul class=\"m-0\">\r\n              <li (click)=\"changePage$.next(totalPages.length - 1)\" class=\"page\"\r\n                *ngIf=\"currentPage < totalPages.length - 1\"\r\n                [ngClass]=\"{'disabled': currentPage >= totalPages.length - 1}\"><span\r\n                  class=\"fa fa-angle-double-right f-17\"></span></li>\r\n              <li class=\"page \" (click)=\"changePage$.next(currentPage + 1)\" *ngIf=\"currentPage < totalPages.length - 1\"\r\n                [ngClass]=\"{'disabled': currentPage >= totalPages.length - 1}\"><span\r\n                  class=\"fa fa-angle-right  f-15\"></span></li>\r\n              <li [ngClass]=\"{'active': currentPage == page}\" *ngFor=\"let page of getPages(maxPage)\"\r\n                (click)=\"changePage$.next(page)\" class=\"page\">\r\n                <a>{{page + 1}}</a>\r\n              </li>\r\n              <li class=\"page \" (click)=\"changePage$.next(currentPage - 1)\" *ngIf=\"currentPage > 0\"><span\r\n                  class=\"fa fa-angle-left  f-15\"></span></li>\r\n              <li class=\"page \" (click)=\"changePage$.next(0)\" *ngIf=\"currentPage > 0\"><span\r\n                  class=\"fa fa-angle-double-left f-17\"></span></li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-template #filterSection>\r\n    <div class=\"row form search-bar form-inline\">\r\n      <div class=\"col col-md-12 col-xs-12\">\r\n        <div class=\"flex-custom\">\r\n          <div class=\"form-group search-input-wrapper\">\r\n            <span class=\"search-icon\">\r\n              <i class=\"fa fa-search\" (click)=\"search()\"></i>\r\n            </span>\r\n            <input spellcheck=\"false\" [(ngModel)]=\"filter.searchText\" type=\"text\" class=\"form-control search-input\"\r\n              (keypress)=\"handkeKeypress($event)\" [placeholder]=\"option.displayText.placeholderSearch\">\r\n            <span class=\"search-reset\" *ngIf=\"filter.searchText\">\r\n              <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n              <i *ngIf=\"!loading\" class=\"fa fa-times-circle\" (click)=\"filter.searchText = ''\"></i>\r\n            </span>\r\n          </div>\r\n          <button *ngIf=\"filterColumns.length\" class=\"btn btn-link-default\"\r\n            [ngClass]=\"{'btn-link-default' : !filterSectionToggle, 'btn-link': filterSectionToggle}\" type=\"button\"\r\n            aria-hidden=\"true\" (click)=\"toggleFilterSection()\">\r\n            <i class=\"fa fa-sliders m-0\"></i> {{option.displayText.advancedSearchTitle}}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div [@cAnimation] *ngIf=\"filterSectionToggle\" class=\"row filter align-items-center\">\r\n      <span class=\"col-xs-12 col-md-12  filter-title\">{{option.displayText.filterTitle}}</span>\r\n      <div class=\"col-md-3 col-xs-12 pull-left filter-element \" *ngFor=\"let column of filterColumns; let i = index\">\r\n        <ng-container [ngTemplateOutlet]=\"column.filterTemplate ? column.filterTemplate() : fieldControlTemplate\"\r\n          [ngTemplateOutletContext]=\"{index: i, item: filter, column: column, readonly: false, hasFormLabel: true}\">\r\n        </ng-container>\r\n      </div>\r\n\r\n      <div class=\"col-sm-12 \">\r\n        <button class=\"btn btn-primary\" type=\"button\" aria-hidden=\"true\" (click)=\"searchAsync(true)\">\r\n          <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n          <i *ngIf=\"!loading\" class=\"fa fa-search\"></i>\r\n          {{option.displayText.advancedBtnTitle}}\r\n        </button>\r\n        <button class=\"btn btn-default m-l-5\" type=\"button\" aria-hidden=\"true\" (click)=\"resetFilters()\">\r\n          {{option.displayText.advancedBtnCancelTitle}}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-template #fieldControlTemplate let-column=\"column\" let-item=\"item\" let-index=\"index\" let-readonly=\"readonly\"\r\n    let-hasFormLabel=\"hasFormLabel\">\r\n    <div [ngSwitch]=\"column.type\">\r\n      <ng-container *ngSwitchDefault>\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()]}}</div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-textbox #el [validationName]=\"column?.validationOption?.validationName\" [focus]=\"true\" [item]=\"item\"\r\n              [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\">\r\n            </katana-textbox>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-textbox [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\">\r\n          </katana-textbox>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'custom'\">\r\n        <ng-container [ngTemplateOutlet]=\"column.customTemplate()\" [ngTemplateOutlet]=\"{item: item}\">\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'description'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\" class=\"katana-tooltip\">\r\n            <span *ngIf=\"item[column.valueRef()] && column.showTooltip\" class=\"tooltiptext tooltip-top\">\r\n              {{item[column.valueRef()]}}\r\n            </span>\r\n            <span>\r\n              {{item[column.valueRef()] | shorten: option.maxLenghtext : '...'}}\r\n            </span>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\" style=\"max-width: 250px;\">\r\n            <katana-editor #el [validationName]=\"column?.validationOption?.validationName\" [focus]=\"true\"\r\n              [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\">\r\n            </katana-editor>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button [customClass]=\"'text-success'\"\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\"></katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-textbox [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\">\r\n          </katana-textbox>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'number'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()]}}</div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-textbox #el [validationName]=\"column?.validationOption?.validationName\" type=\"number\" [focus]=\"true\"\r\n              [item]=\"item\" [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\">\r\n            </katana-textbox>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-textbox [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\"\r\n            type=\"number\">\r\n          </katana-textbox>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'currency'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()] | katanaCurrency}}\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-textbox #el [validationName]=\"column?.validationOption?.validationName\" [focus]=\"true\" [item]=\"item\"\r\n              [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\" type=\"currency\">\r\n            </katana-textbox>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-textbox [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\"\r\n            type=\"currency\">\r\n          </katana-textbox>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'boolean'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">\r\n            <span *ngIf=\"item[column.valueRef()]\" class=\"fa fa-check text-success\"></span>\r\n            <span *ngIf=\"!item[column.valueRef()]\" class=\"fa fa-remove text-danger\"></span>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-checkbox #el [validationName]=\"column?.validationOption?.validationName\"\r\n              [(model)]=\"item[column.valueRef()]\"></katana-checkbox>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-checkbox [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\">\r\n          </katana-checkbox>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'date'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()] | katanaDate}}</div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-daterange-picker #el [validationName]=\"column?.validationOption?.validationName\"\r\n              [selectMode]=\"'single'\" [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\"\r\n              pickerType=\"calendar\">\r\n            </katana-daterange-picker>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-daterange-picker [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\"\r\n            pickerType=\"calendar\"></katana-daterange-picker>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'datetime'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()] | katanaDateTime}}\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-daterange-picker #el [validationName]=\"column?.validationOption?.validationName\"\r\n              [selectMode]=\"'single'\" [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\"\r\n              pickerType=\"both\">\r\n            </katana-daterange-picker>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-daterange-picker [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\"\r\n            pickerType=\"both\"></katana-daterange-picker>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'time'\">\r\n        <ng-container *ngIf=\"readonly && !hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div (dblclick)=\"editInline(item, column.valueRef(), index)\">{{item[column.valueRef()] | katanaTime}}</div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"hasInlineEdit(item, column.valueRef(), index)\">\r\n          <div class=\"col-xs-12\">\r\n            <katana-daterange-picker #el [validationName]=\"column?.validationOption?.validationName\"\r\n              [selectMode]=\"'single'\" [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\"\r\n              pickerType=\"timer\">\r\n            </katana-daterange-picker>\r\n            <div style=\"text-align: right;\">\r\n              <katana-button\r\n                (execute)=\"acceptInlineEdit(item, column.valueRef(), index, el, column?.validationOption, column?.inlineCallback)\"\r\n                [icon]=\"'fa fa-check'\">\r\n              </katana-button>\r\n              <katana-button (execute)=\"cancelInlineEdit(item, column.valueRef(), index)\" [icon]=\"'fa fa-remove'\">\r\n              </katana-button>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-datetime-picker [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"filter[column.valueRef()]\"\r\n            pickerType=\"timer\"></katana-datetime-picker>\r\n        </ng-container>\r\n      </ng-container>\r\n\r\n      <ng-container *ngSwitchCase=\"'dropdown'\">\r\n        <ng-container *ngIf=\"readonly\"> {{getDropdownDisplayText(column, item)}}</ng-container>\r\n        <ng-container *ngIf=\"!readonly\">\r\n          <katana-dropdown [title]=\"hasFormLabel ? column.title() : null\" [(model)]=\"item[column.valueRef()]\"\r\n            [searchFunction]=\"column.dropdownConfiguration.searchFunction\"\r\n            [multiple]=\"column.dropdownConfiguration.multiple\" [bindLabel]=\"column.dropdownConfiguration.bindLabel\"\r\n            [bindValue]=\"column.dropdownConfiguration.bindValue\"></katana-dropdown>\r\n        </ng-container>\r\n      </ng-container>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-template #toolbarSection>\r\n    <div class=\"row no-gutters toolbar\">\r\n      <div *ngIf=\"hasPageSizeChooser\" class=\"d-flex align-items-center mr-2 m-l-2 select-page-wrapper\">\r\n        <span>{{option.displayText.selectPageSize}}</span>\r\n        <div class=\"p-0 \">\r\n          <select [(ngModel)]=\"pageSize\" (change)=\"changePageSize()\" class=\"form-control col-xs-12 col-md-12\">\r\n            <option *ngFor=\"let opt of option.pageSizes\" value=\"{{opt}}\">{{opt}}</option>\r\n            <option value=\"999999\">{{option.displayText.allTitle}}</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n      <div [@cAnimationFadeRight] class=\"table-action\" *ngIf=\"selectedItems.length > 0\">\r\n        <div class=\"d-flex align-items-center\">\r\n          <div class=\"col-xs-12 custom-toolbar  mr-2\">\r\n            <div class=\"btn-group \" role=\"group\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\"\r\n              data-original-title=\".btn-xlg\">\r\n              <ng-container *ngFor=\"let action of getToolbarActions(true)\">\r\n                <div *ngIf=\"!action.hide || !action.hide()\" class=\"katana-tooltip\">\r\n                  <span *ngIf=\"action.tooltip\" class=\"tooltiptext tooltip-top\">{{action.tooltip()}}</span>\r\n                  <katana-button *ngIf=\"action.type !== 'inline'\" class=\"mr-1\" [customClass]=\"action.customClass\"\r\n                    [lazyload]=\"action.lazyload\" title=\"{{action.title ? action.title() : ''}}\" [icon]=\"action.icon\"\r\n                    (execute)=\"executeActionAsync(action,null,null, null, $event)\">\r\n                  </katana-button>\r\n                </div>\r\n              </ng-container>\r\n              <katana-dropdown-buttons *ngIf=\"toolbarActions.length > option.totalToolbarItem\" title=\"T\u00F9y ch\u1ECDn\">\r\n                <ng-container *ngFor=\"let action of getToolbarActions(false)\">\r\n                  <katana-dropdown-button *ngIf=\"!action.hide || !action.hide()\"\r\n                    title=\"{{action.title ? action.title() : ''}}\"\r\n                    (execute)=\"executeActionAsync(action,null,null, null, $event)\" [disabled]=\"action.disabled\">\r\n                  </katana-dropdown-button>\r\n                </ng-container>\r\n              </katana-dropdown-buttons>\r\n            </div>\r\n          </div>\r\n          <div class=\"table-summary\">\r\n            <span\r\n              [innerHTML]=\"option.message.selectedItemsMessage.replace('[0]', selectedItems.length.toString())\"></span>&nbsp;\r\n            <a href=\"javascript:;\" (click)=\"clearAll()\" [innerHTML]=\"option.message.confirmClearAllRecordsMessage\"></a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"d-flex ml-auto\">\r\n        <div class=\"katana-tooltip\" *ngFor=\"let action of this.option.topButtons; last as isLast\">\r\n          <span *ngIf=\"action.tooltip\" class=\"tooltiptext tooltip-top\">{{action.tooltip()}}</span>\r\n          <katana-button *ngIf=\"!action.hide || !action.hide()\" [lazyload]=\"action.lazyload\"\r\n            [customClass]=\"action.customClass\" title=\"{{action.title ? action.title() : ''}}\" [icon]=\"action.icon\"\r\n            (execute)=\"executeActionAsync(action,null,null, null, $event)\" [class.mr-2]=\"!isLast\"\r\n            [disabled]=\"action.disabled\"></katana-button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n</div>",
                    animations: [
                        trigger('cAnimation', [
                            state('void', style({})),
                            state('*', style({})),
                            transition(':enter', [
                                style({ transform: 'translateY(-30px)', opacity: 0 }),
                                animate('300ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
                            ]),
                            transition(':leave', [
                                style({ transform: 'translateY(0)', opacity: 1 }),
                                animate('300ms ease-in-out', style({ transform: 'translateY(-30px)', opacity: 0 }))
                            ])
                        ]),
                        trigger('cAnimationFadeRight', [
                            state('void', style({})),
                            state('*', style({})),
                            transition(':enter', [
                                style({ transform: 'translateX(30px)', opacity: 0 }),
                                animate('300ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
                            ]),
                            transition(':leave', [
                                style({ transform: 'translateX(0)', opacity: 1 }),
                                animate('300ms ease-in-out', style({ transform: 'translateX(30px)', opacity: 0 }))
                            ])
                        ])
                    ],
                    styles: [".katana-switch{position:relative;display:inline-block;width:47px;height:25px}.katana-switch input{display:none}.katana-switch input:checked+.katana-slider{background-color:#6fbb35}.katana-switch input:focus+.katana-slider{box-shadow:0 0 1px #6fbb35}.katana-switch input:checked+.katana-slider:before{transform:translateX(26px)}.katana-switch .katana-slider{box-shadow:1px 1px 1px rgba(0,0,0,.145);position:absolute;cursor:pointer;top:6px;left:6px;right:0;bottom:0;background-color:#b7b0ac;transition:.2s;border-radius:34px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:0;width:2.5rem;height:.9375rem}.katana-switch .katana-slider:before{position:absolute;content:\"\";left:-.3125rem;top:-.17rem;box-shadow:1px 1px 1px 1px rgba(0,0,0,.245);background-color:#f4f3f0;transition:.2s;border-radius:50%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:1.3125rem;height:1.3125rem}.katana-tooltip{position:relative;overflow:unset;display:inline-block}.katana-tooltip.primary .tooltiptext{background-color:#007bff;color:#fff}.katana-tooltip.primary .tooltip-top{box-shadow:none}.katana-tooltip.primary .tooltip-top:after{border-color:#007bff transparent transparent}.katana-tooltip.info .tooltiptext{background-color:#1d9ce7;color:#fff}.katana-tooltip.info .tooltip-top{box-shadow:none}.katana-tooltip.info .tooltip-top:after{border-color:#1d9ce7 transparent transparent}.katana-tooltip.dark .tooltiptext{background-color:#052d3e;color:#fff}.katana-tooltip.dark .tooltip-top{box-shadow:none}.katana-tooltip.dark .tooltip-top:after{border-color:#052d3e transparent transparent}.katana-tooltip .tooltiptext{max-width:180px;min-width:120px;line-height:2;word-break:break-word;visibility:hidden;position:absolute;white-space:normal;background-color:#fff;color:#052d3e;text-align:center;padding:5px;border-radius:5px;z-index:1;opacity:0;transition:.3s;font-size:12px;font-weight:500;transform:translateY(20px)}.katana-tooltip .tooltip-top{box-shadow:1px 3px 9px rgba(0,0,0,.18);bottom:120%;left:50%;margin-left:-60px}.katana-tooltip .tooltip-top:after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#fff transparent transparent}.katana-tooltip:hover .tooltiptext{visibility:visible;opacity:1;transform:translateY(0)}.search-bar .search-input-wrapper{position:relative}.search-bar .search-input-wrapper .search-icon{position:absolute;z-index:9;right:10px;font-size:16px;line-height:32px;color:#87837b;cursor:pointer}.search-bar .search-input-wrapper .search-icon:hover{color:#007bff}.search-bar .search-input-wrapper .search-input{width:420px;padding-left:10px;border-radius:3px;padding-right:56px}@media (max-width:480px){.search-bar .search-input-wrapper .search-input{width:100%}}.search-bar .search-input-wrapper .search-reset{position:absolute;z-index:9;right:36px;font-size:18px;line-height:32px;color:#b7b0ac;cursor:pointer}.search-bar .search-input-wrapper .search-reset:hover{color:#87837b}.katana-table--wrapper{border:1px solid #f4f3f0}.katana-table--wrapper .loading-indicator{display:none}.katana-table--wrapper .loading-indicator.show{display:block;top:50%;position:absolute;right:47%}.katana-table--wrapper .loading-indicator.show .spinner{text-align:center}.katana-table--wrapper .loading-indicator.show .spinner>div{width:18px;height:18px;background-color:#007bff;border-radius:100%;display:inline-block;-webkit-animation:1s ease-in-out infinite both sk-bouncedelay;animation:1s ease-in-out infinite both sk-bouncedelay}.katana-table--wrapper .loading-indicator.show .spinner .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.katana-table--wrapper .loading-indicator.show .spinner .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-bouncedelay{0%,100%,80%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}.katana-table--wrapper .loading-cover{-webkit-filter:blur(2px);filter:blur(2px);opacity:.3;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.toolbar{width:100%;padding:10px 0;margin:0}.toolbar .select-page-wrapper span{font-size:12px;color:#87837b;margin-right:6px}.toolbar .select-page-wrapper select{padding:3px 5px;border:1px solid #e8e8e8;background:#fafafa}.toolbar .table-action .table-summary{background:#fff5e6;padding:5px 16px;border-radius:5px}.toolbar .confirm-highlight,.toolbar .highlight{color:#007bff;font-weight:500}.toolbar .custom-toolbar .dropdown{position:relative;display:inline-block}.toolbar .custom-toolbar .dropdown .dropdown-content{display:none;position:absolute;background-color:#f1f1f1;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1;top:30px}.toolbar .custom-toolbar .dropdown .dropdown-content a{padding:6px 12px;line-height:16px;font-size:11px;text-decoration:none;display:block}.toolbar .custom-toolbar .dropdown .dropdown-content a:hover{background-color:#ddd}.toolbar .custom-toolbar .dropdown:hover .dropdown-content{display:block}.toolbar .custom-toolbar .dropdown .custom-btn{border-left:none}.hidden{display:none}.paging{border-top:1px solid #f4f3f0;padding:15px 10px;position:relative}.paging .page{width:30px;height:30px;line-height:30px;border-right:none;float:right;text-align:center;cursor:pointer}.paging .page:hover{background-color:#007bff;color:#fff;font-weight:500}.paging .page:hover.active{background-color:#dbedff;color:#007bff;font-weight:500}.paging .active{background-color:#dbedff;color:#007bff;font-weight:500}.paging .confirm-highlight,.paging .highlight{color:#007bff;font-weight:500}.paging .result-search-text{color:#87837b}.paging .page-navigator .goto{padding:3px 5px;border:1px solid #e8e8e8;font-weight:500;background:#fafafa;color:#007bff;width:45px;text-align:center}.disabled{opacity:.65}.filter{margin:.5rem 0 0;background:#fafafa;padding:1rem;position:relative}.filter .filter-title{font-weight:500;text-transform:uppercase;color:#4b4542}.filter .filter-element{margin-top:5px;margin-bottom:5px}.filter .filter-element .dt-relative{position:relative}.filter .filter-element .dt-relative:hover{color:#5757e7}.filter .filter-element .date-icon{position:absolute;top:0;right:0;font-size:16px;margin-top:7px;margin-right:10px;cursor:pointer}.katana-main-table{width:100%}.katana-component{padding:0;margin:0;width:100%;border-collapse:collapse}@media (max-width:1024px){.katana-component{width:100%}}.katana-component.scroll-mode{min-width:1200px}.katana-component .no-result{padding:3rem;background:#fafafa;font-weight:400;color:#584d4d;font-size:1rem}.katana-component td,.katana-component th{padding:6px;text-align:left;cursor:pointer;vertical-align:middle}.katana-component thead{border-bottom:1px solid #f2f1ee}.katana-component thead th{background:#fff;padding:10px 5px;font-weight:500;text-transform:inherit;vertical-align:middle;border-right:1px solid #f2f1ee}.katana-component thead th.sortable .sort-icon{line-height:19px}.katana-component thead th.sortable:hover{background:#ededed}.katana-component thead th:last-of-type{border-right:0 solid #f4f3f0}.katana-component tbody:nth-child(odd) .katana-tr{background-color:#fafafa}.katana-component tbody .katana-tr:hover{background-color:#ecf7fd}.katana-component tbody .katana-tr:hover .action-column-wrapper .btn-link{-webkit-filter:grayscale(0);filter:grayscale(0);opacity:1}.katana-component tbody .katana-tr.active{background-color:#d5edfb;border-top:1px solid #a7d9f6;border-bottom:1px solid #a7d9f6}.katana-component tbody .katana-tr.active:hover{background-color:#d5edfb;border-top:1px solid #79c4f1;border-bottom:1px solid #79c4f1}.katana-component tbody .katana-tr.active:hover .action-column-wrapper .btn-link{-webkit-filter:grayscale(0);filter:grayscale(0);opacity:1}.katana-component tbody .katana-tr.link{color:#6767dd}.katana-component tbody .katana-tr.link:hover{color:#151583}.katana-component tbody .katana-tr .katana-td .dt-relative{position:relative}.katana-component tbody .katana-tr .katana-td .dt-relative:hover{color:#5757e7}.katana-component tbody .katana-tr .katana-td .date-icon{position:absolute;top:0;right:0;font-size:16px;margin-top:7px;margin-right:80px;cursor:pointer}.katana-component tbody .katana-tr .action-column-wrapper .btn-link{-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:.3}.katana-component tbody .row-detail-wrapper{border-bottom:1px solid #e8e8e8;border-top:1px solid #f4f3f0}.katana-component tbody .row-detail-wrapper .detail-title{background:#fafafa;padding:6px 14px;margin:7px;font-weight:500;color:#052d3e}.katana-component .wrap-text{white-space:normal;word-wrap:break-word;word-break:break-word}.katana-component .center,.katana-component .detail{text-align:center}.katana-component .right{text-align:right}.katana-component.dark>thead>tr>th{background:#052d3e;color:#fff}.katana-component.dark>thead>tr>th.sortable:hover{background:#031c26}.katana-component.primary>thead>tr>th{background:#f7f7f7;color:#4b4542}.katana-component.primary>thead>tr>th.sortable:hover{background:#ededed}.katana-component.info>thead>tr>th{background:#1d9ce7;color:#fff}.katana-component.info>thead>tr>th.sortable:hover{background:#178ed4}.katana-component.list-mode table,.katana-component.list-mode tbody,.katana-component.list-mode td,.katana-component.list-mode th,.katana-component.list-mode thead,.katana-component.list-mode tr{display:block}.katana-component.list-mode thead tr{position:absolute;top:-9999px;left:-9999px}.katana-component.list-mode tr{border-bottom:0}.katana-component.list-mode tr:last-child{border-bottom:1px solid #ddd}.katana-component.list-mode td.katana-td{border:none;position:relative;padding-left:50%}.katana-component.list-mode td:before{position:absolute;top:6px;left:6px;width:45%;padding-right:10px;white-space:nowrap;font-weight:700;content:attr(data-content)}.katana-component.list-mode .center,.katana-component.list-mode .detail,.katana-component.list-mode .right{text-align:left}.katana-component.list-mode .table-action{margin-top:5px}@media only screen and (max-width:760px),(min-device-width:768px) and (max-device-width:1024px){.katana-component table,.katana-component tbody,.katana-component td,.katana-component th,.katana-component thead,.katana-component tr{display:block}.katana-component thead tr{position:absolute;top:-9999px;left:-9999px}.katana-component tr{border-bottom:0}.katana-component tr:last-child{border-bottom:1px solid #ddd}.katana-component td.katana-td{border:none;position:relative;padding-left:50%}.katana-component td:before{position:absolute;top:6px;left:6px;width:45%;padding-right:10px;white-space:nowrap;font-weight:700;content:attr(data-content)}.katana-component .center,.katana-component .detail,.katana-component .right{text-align:left}.katana-component .table-action{margin-top:5px}}.custom-input{position:relative}.custom-input .custom-td *{margin:0}.custom-input .has-error:not(:focus)+.validation-error{font-size:12px;position:absolute}.custom-input .has-error:not(:focus)+.validation-error:after{font-family:IcoFont!important;position:absolute;top:-30px!important;height:16px;border-radius:50px;right:0;background:#fff;font-size:16px;color:#d61e00}.custom-input .has-error:not(:focus)+.validation-error .mini-pop{position:absolute;top:-35px!important;padding:5px 10px;border-radius:5px;right:26px;z-index:1;background:#fff;box-shadow:0 2px 3px rgba(0,0,0,.12);max-width:212px}.custom-input .has-error:not(:focus)+.validation-error .mini-pop:after{content:\"\";display:block;position:absolute;right:-10px;bottom:7px;width:0;height:0;border:5px solid transparent;border-left-color:#fff}.custom-input .has-error:not(:focus)+.validation-error .mini-pop:before{content:\"\";display:block;position:absolute;right:-12px;bottom:5px;width:0;height:0;border:6px solid transparent;border-left-color:#bfbfbf}.flex-custom{display:flex}.selected{background-color:#d4eaf8!important}@media (max-width:480px){.flex-custom{display:unset}}.loader{-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}@-webkit-keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: RendererFactory2 },
        { type: DataService },
        { type: ValidationService },
        { type: IgxExcelExporterService }
    ]; };
    TableComponent.propDecorators = {
        validationName: [{ type: Input }],
        validationScope: [{ type: Input }],
        option: [{ type: Input }],
        searchRef: [{ type: ViewChild, args: ['searchRef', { static: true },] }],
        gotoRef: [{ type: ViewChild, args: ['gotoRef', { static: true },] }],
        tableRef: [{ type: ViewChild, args: ['tableRef', { static: true },] }],
        rowDetailTemplate: [{ type: ContentChild, args: [TableRowDetailDirective, { static: true },] }],
        wrapper: [{ type: ViewChild, args: ['wrapper', { static: false },] }]
    };
    return TableComponent;
}());
export { TableComponent };
if (false) {
    /** @type {?} */
    TableComponent.prototype.validationName;
    /** @type {?} */
    TableComponent.prototype.validationScope;
    /** @type {?} */
    TableComponent.prototype.option;
    /** @type {?} */
    TableComponent.prototype.searchRef;
    /** @type {?} */
    TableComponent.prototype.gotoRef;
    /** @type {?} */
    TableComponent.prototype.tableRef;
    /** @type {?} */
    TableComponent.prototype.rowDetailTemplate;
    /** @type {?} */
    TableComponent.prototype.wrapper;
    /** @type {?} */
    TableComponent.prototype.items;
    /** @type {?} */
    TableComponent.prototype.totalRecords;
    /** @type {?} */
    TableComponent.prototype.loading;
    /** @type {?} */
    TableComponent.prototype.selectedItems;
    /** @type {?} */
    TableComponent.prototype.pageSize;
    /** @type {?} */
    TableComponent.prototype.orderBy;
    /** @type {?} */
    TableComponent.prototype.direction;
    /** @type {?} */
    TableComponent.prototype.totalPages;
    /** @type {?} */
    TableComponent.prototype.currentPage;
    /** @type {?} */
    TableComponent.prototype.filter;
    /** @type {?} */
    TableComponent.prototype.maxPage;
    /** @type {?} */
    TableComponent.prototype.selectedAll;
    /** @type {?} */
    TableComponent.prototype.filterColumns;
    /** @type {?} */
    TableComponent.prototype.toolbarActions;
    /** @type {?} */
    TableComponent.prototype.inlineActions;
    /** @type {?} */
    TableComponent.prototype.filterSectionToggle;
    /** @type {?} */
    TableComponent.prototype.textSearched;
    /** @type {?} */
    TableComponent.prototype.showReset;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.defaultPageSize;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.localData;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype._render;
    /** @type {?} */
    TableComponent.prototype.hasFilterSection;
    /** @type {?} */
    TableComponent.prototype.hasToolbarSection;
    /** @type {?} */
    TableComponent.prototype.hasFooterSection;
    /** @type {?} */
    TableComponent.prototype.hasDetailTemplate;
    /** @type {?} */
    TableComponent.prototype.hasPageSizeChooser;
    /** @type {?} */
    TableComponent.prototype.changePage$;
    /** @type {?} */
    TableComponent.prototype.changedRows;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.request;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.previousRequest;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.recursiveCounter;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.edittedFields;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.previousItems;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype.thisElement;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.rendererFactory;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.dataService;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.validationService;
    /**
     * @type {?}
     * @protected
     */
    TableComponent.prototype.excelExporterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdGFibGUvdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsZ0JBQWdCLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBNEIsU0FBUyxFQUFFLGFBQWEsRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQWdCLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaE0sT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFjLEVBQUUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRjtJQTRFRSx3QkFDVSxXQUF1QixFQUNyQixlQUFpQyxFQUNqQyxXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsb0JBQTZDO1FBSi9DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBeUI7UUF4Q2xELFVBQUssR0FBVSxFQUFFLENBQUM7UUFDbEIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFJMUIsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0Isa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDMUIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFRN0IsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsZ0JBQVcsR0FBaUIsRUFBRSxDQUFDO1FBQzlCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLGtCQUFhLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBU2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELGlDQUFROzs7SUFBUjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUNOLHNCQUFzQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxTQUFTO1lBQzlGLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDakUsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDMUI7WUFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsd0NBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRU0sNkJBQUk7OztJQUFYO1FBQUEsaUJBOEVDO1FBN0VDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsSUFBSTtnQkFDckMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN2RyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDL0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsTUFBTTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO29CQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDbEUsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF0RixDQUFzRixFQUFDLENBQUM7UUFDOUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXJGLENBQXFGLEVBQUMsQ0FBQzs7WUFFdEksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJO1FBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFdBQVcsRUFBbEIsQ0FBa0IsRUFBQzthQUM5RSxJQUFJOzs7OztRQUFDLFVBQUMsQ0FBYyxFQUFFLENBQWMsSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXBELENBQW9ELEVBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztTQUNqQztRQUVELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZTtnQkFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ3JGOztZQUVLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdEYsQ0FBc0YsRUFBQyxDQUFDLE1BQU0sR0FBRyxDQUFDOztZQUM3SyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7UUFFakYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsSUFBSSxpQkFBaUIsSUFBSSxhQUFhLENBQUM7UUFDMUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLENBQUMsaUJBQWlCLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUc7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZTthQUMvQixDQUFDO1lBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUM5QztZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7OztJQUVNLGlDQUFROzs7SUFBZjtRQUNFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7OztJQUVNLDZCQUFJOzs7Ozs7O0lBQVgsVUFBWSxJQUFTLEVBQUUsT0FBdUIsRUFBRSxPQUE2QixFQUFFLFFBQWtDO1FBQTFGLHdCQUFBLEVBQUEsY0FBdUI7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O1lBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDL0MsSUFBSSxRQUFRLENBQUMsRUFBRTtZQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixJQUFJLFFBQVE7WUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7Ozs7SUFFTSxzQ0FBYTs7Ozs7SUFBcEIsVUFBcUIsUUFBaUIsRUFBRSxRQUFvQjtRQUE1RCxpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7O1lBQzdFLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDeEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O1lBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzs7OztRQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sS0FBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ3ZKLElBQUksTUFBTSxFQUFFOztnQkFDTixJQUFJLEdBQUcsRUFBRTtZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQyxRQUFRO2dCQUNqQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQyxJQUFJOzt3QkFDdEIsWUFBWSxHQUFHLEVBQUU7b0JBQ3JCLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQyxNQUFNO3dCQUNyQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ25CLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7eUJBQ3hEO29CQUNILENBQUMsRUFBQyxDQUFDO29CQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsRUFBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvSCxJQUFJLFFBQVE7b0JBQUUsUUFBUSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFTSxxQ0FBWTs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7Ozs7OztJQUVNLHlDQUFnQjs7Ozs7Ozs7O0lBQXZCLFVBQXdCLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBYSxFQUFFLEdBQVMsRUFBRSxnQkFBbUMsRUFBRSxRQUE0QztRQUE3SixpQkF3REM7O1lBdkRLLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFO1FBQzlCLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRTtZQUNuQyxnQkFBZ0IsQ0FBQyxhQUFhOzs7O1lBQUcsVUFBQyxJQUFJO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUEsQ0FBQTtTQUNGO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLFFBQVE7WUFDeEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTs7b0JBQ2pDLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUEzQixDQUEyQixFQUFDOztvQkFDckUsWUFBWSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBZixDQUFlLEVBQUM7Z0JBQ2hFLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDdEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7NEJBQ25DLFdBQVcsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7NEJBQzdDLE9BQU8sRUFBRSxZQUFZOzRCQUNyQixLQUFLLEVBQUU7Z0NBQ0wsSUFBSSxXQUFXLENBQUM7b0NBQ2QsS0FBSyxFQUFFLEtBQUs7b0NBQ1osWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7b0NBQ3pCLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDO2lDQUM5QixDQUFDOzZCQUNIO3lCQUNGLENBQUMsQ0FBQyxDQUFDO3FCQUNMO2lCQUNGO3FCQUFNOzt3QkFDRCxZQUFZLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQWhCLENBQWdCLEVBQUM7b0JBQ2hFLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2pCLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDOzRCQUNyQyxLQUFLLEVBQUUsS0FBSzs0QkFDWixZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs0QkFDekIsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUM7eUJBQzlCLENBQUMsQ0FBQyxDQUFDO3FCQUNMO3lCQUFNO3dCQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzRCQUN0RSxZQUFZLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLFNBQVMsSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRTs0QkFDcEcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQ0FDOUQsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ3pDO2lDQUFNOztvQ0FDRCxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTOzs7O2dDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQWhCLENBQWdCLEVBQUM7Z0NBQ2xFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDdkMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7O3dDQUM3QixnQkFBZ0IsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7b0NBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUEzQixDQUEyQixFQUFDO29DQUNuRixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztpQ0FDOUM7NkJBQ0Y7eUJBQ0Y7NkJBQU07NEJBQ0wsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3pDO3FCQUNGO2lCQUNGO2dCQUNELEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVNLHlDQUFnQjs7Ozs7O0lBQXZCLFVBQXdCLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBYTs7WUFDekQsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTSx3Q0FBZTs7Ozs7SUFBdEIsVUFBdUIsS0FBYSxFQUFFLEtBQWE7O1lBQzdDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFwQyxDQUFvQyxFQUFDO1FBQ3ZGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7O0lBRU0sbUNBQVU7Ozs7OztJQUFqQixVQUFrQixJQUFTLEVBQUUsS0FBYSxFQUFFLEtBQWE7UUFDdkQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ2xCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQWYsQ0FBZSxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzRDs7WUFDRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDdEMsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFFTSxzQ0FBYTs7Ozs7O0lBQXBCLFVBQXFCLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBYTtRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2pGLE9BQU8sQ0FBQyxtQkFBZ0IsSUFBSSxDQUFDLGFBQWEsRUFBQSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQXBDLENBQW9DLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDOzs7Ozs7SUFFTSwyQ0FBa0I7Ozs7O0lBQXpCLFVBQTBCLEtBQWEsRUFBRSxLQUFhO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2RSxPQUFPLENBQUMsbUJBQWdCLElBQUksQ0FBQyxhQUFhLEVBQUEsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFwQyxDQUFvQyxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVNLHFDQUFZOzs7SUFBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRU0sMENBQWlCOzs7O0lBQXhCLFVBQXlCLFFBQWlCO1FBQTFDLGlCQWdCQzs7WUFmSyxPQUFPLEdBQWtCLEVBQUU7UUFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLE1BQU0sRUFBRSxLQUFLO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLElBQUksS0FBSyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNO29CQUNMLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSx1Q0FBYzs7O0lBQXJCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFTSx1Q0FBYzs7OztJQUFyQixVQUFzQixNQUFNO1FBQzFCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7OztJQUVNLDZCQUFJOzs7OztJQUFYLFVBQVksTUFBVyxFQUFFLElBQWM7UUFDckMsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDO2dCQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDL0M7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNyRTtJQUNILENBQUM7Ozs7SUFFTSw0Q0FBbUI7OztJQUExQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFFTSxtQ0FBVTs7Ozs7SUFBakIsVUFBa0IsTUFBbUIsRUFBRSxTQUFpQjtRQUN0RCxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRU0sd0NBQWU7Ozs7SUFBdEIsVUFBdUIsSUFBUztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDOzs7OztJQUVNLGtDQUFTOzs7O0lBQWhCLFVBQWlCLE1BQW1CO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDckIsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzthQUNqSTtTQUNGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRU0sa0NBQVM7Ozs7SUFBaEIsVUFBaUIsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQyxrQkFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVNLGlDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0sbUNBQVU7Ozs7SUFBakIsVUFBa0IsSUFBUzs7WUFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsRUFBSixDQUFJLEVBQUM7O1lBQy9DLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN0RCxJQUFJLGlCQUFpQixJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7O2dCQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQWYsQ0FBZSxFQUFDO1lBQ2pFLElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxzQ0FBYTs7OztJQUFwQixVQUFxQixJQUFTOztZQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxFQUFKLENBQUksRUFBQztRQUNyRCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVNLHFDQUFZOzs7O0lBQW5CLFVBQW9CLElBQVU7O1lBQ3RCLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXhCLENBQXdCLEVBQUM7UUFDN0UsT0FBTyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7Ozs7SUFFTSwyQ0FBa0I7Ozs7Ozs7O0lBQXpCLFVBQTBCLE1BQW1CLEVBQUUsSUFBVSxFQUFFLE1BQVksRUFBRSxLQUFjLEVBQUUsY0FBeUI7UUFDaEgsSUFBSSxNQUFNLEVBQUU7O2dCQUNKLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDOzs7OztJQUVNLGlDQUFROzs7O0lBQWYsVUFBZ0IsSUFBUztRQUN2QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFoQixDQUFnQixFQUFDO1FBQ2xFLE9BQU8sV0FBVyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFTSx3Q0FBZTs7OztJQUF0QixVQUF1QixLQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDakY7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQzs7Ozs7O0lBRU0sK0NBQXNCOzs7OztJQUE3QixVQUE4QixNQUFtQixFQUFFLElBQVM7O1lBQ3BELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFdkIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFOztnQkFDckIsTUFBTSxHQUFHLG1CQUFVLE1BQU0sQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxFQUFDLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBekMsQ0FBeUMsRUFBQyxFQUFBO1lBQ2xHLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVNLGlDQUFROzs7O0lBQWYsVUFBZ0IsQ0FBUzs7WUFDbkIsS0FBSyxHQUFHLEVBQUU7UUFDZCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO1NBQ0Y7YUFBTTs7Z0JBQ0MsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUs7WUFDdEgsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFTSwrQkFBTTs7OztJQUFiLFVBQWMsaUJBQWtDO1FBQWxDLGtDQUFBLEVBQUEseUJBQWtDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7SUFFTSwrQkFBTTs7OztJQUFiLFVBQWMsY0FBd0I7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVNLHFDQUFZOzs7O0lBQW5CLFVBQW9CLE1BQVc7UUFDN0IsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7O0lBRU0sb0NBQVc7Ozs7OztJQUFsQixVQUFtQixjQUF3QixFQUFFLFdBQW9CLEVBQUUsaUJBQWlDO1FBQXBHLGlCQWlCQztRQWpCa0Usa0NBQUEsRUFBQSx3QkFBaUM7UUFDbEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsSUFBSTtnQkFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTOzs7O2dCQUFDLFVBQUMsUUFBUTtvQkFDaEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUMxSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsUUFBUTtnQkFDbEUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFTyw0Q0FBbUI7Ozs7SUFBM0I7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDaEUsT0FBTyxLQUFLLENBQUM7U0FDZDs7WUFDRyxLQUFLLEdBQUcsSUFBSTtRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLElBQUk7O2dCQUNoQixXQUFXLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQWhCLENBQWdCLEVBQUM7WUFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVPLHdDQUFlOzs7OztJQUF2QixVQUF3QixPQUFZO1FBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ3hGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMvQixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztTQUM5QztJQUNILENBQUM7Ozs7OztJQUVNLGtDQUFTOzs7OztJQUFoQixVQUFpQixHQUFXLEVBQUUsS0FBVTtRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7Ozs7O0lBRU8sZ0RBQXVCOzs7Ozs7SUFBL0IsVUFBZ0MsY0FBdUIsRUFBRSxPQUFZO1FBQXJFLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE1BQW1COztnQkFDekMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFDLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksV0FBVyxFQUFFO2dCQUM5QyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ1o7WUFDRCxJQUFJLGNBQWMsSUFBSSxJQUFJLEVBQUU7Z0JBQzFCLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUU7b0JBQzFJLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7OzRCQUNsQixjQUFjLEdBQUcsbUJBQVEsS0FBSyxFQUFBO3dCQUNwQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOzRCQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3lCQUN2Rjs2QkFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOzRCQUNyQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUN0RixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNuRjtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUNwQzthQUNGO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDcEM7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxxQ0FBWTs7Ozs7O0lBQXBCLFVBQXFCLFdBQW9CLEVBQUUsY0FBd0I7UUFDakUsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBQ25ELFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJLFVBQVUsSUFBSSxTQUFTLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUN4RCxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUN2RCxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUNoQzs7WUFFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDOztZQUM3RSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFyRCxDQUFxRCxFQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDdkcsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7Ozs7O0lBRU8sd0NBQWU7Ozs7OztJQUF2QixVQUF3QixFQUFRLEVBQUUsSUFBWTtRQUM1QyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sRUFBRSxDQUFDOztZQUNmLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQzs7WUFDaEMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNqRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDOztZQUNuQyxNQUFNLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDMUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7WUFDekMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNuRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDOztZQUN0QyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3ZELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7O1lBQzFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7UUFFNUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDekMsS0FBSyxZQUFZO2dCQUNmLE9BQU8sSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkYsS0FBSyxrQkFBa0I7Z0JBQ3JCLE9BQU8sSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7WUFDeEUsS0FBSyxZQUFZO2dCQUNmLE9BQU8sTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkYsS0FBSyxrQkFBa0I7Z0JBQ3JCLE9BQU8sTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7U0FDekU7SUFDSCxDQUFDOzs7Ozs7SUFFTyx5Q0FBZ0I7Ozs7O0lBQXhCLFVBQXlCLE9BQVk7UUFBckMsaUJBbURDOztZQWxESyxNQUFNLEdBQVUsSUFBSSxDQUFDLFNBQVM7O1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztRQUNoRSxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUk7Ozs7O2dCQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBaEUsQ0FBZ0UsRUFBQyxDQUFDO2FBQzVHO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSTs7Ozs7Z0JBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBQyxDQUFDO2FBQzNFO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJOzs7OztnQkFBQyxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWhFLENBQWdFLEVBQUMsQ0FBQzthQUM1RztpQkFBTTtnQkFDTCxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUk7Ozs7O2dCQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQS9CLENBQStCLEVBQUMsQ0FBQzthQUMzRTtTQUNGOztZQUVHLEtBQUssR0FBVSxFQUFFO1FBQ3JCLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7O2dCQUM1QyxhQUFXLEdBQUcsRUFBRTtZQUN0QixJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLEtBQUs7O3dCQUM5QixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU07Ozs7b0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTlDLENBQThDLEVBQUM7b0JBQ25GLElBQUksUUFBUSxFQUFFO3dCQUNaLFFBQVEsQ0FBQyxPQUFPOzs7O3dCQUFDLFVBQUMsSUFBSTs0QkFDcEIsSUFBSSxhQUFXLENBQUMsU0FBUzs7Ozs0QkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBZixDQUFlLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQ0FDckQsYUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDeEI7d0JBQ0gsQ0FBQyxFQUFDLENBQUM7cUJBQ0o7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsTUFBTSxHQUFHLGFBQVcsQ0FBQzthQUN0Qjs7Z0JBRUcsTUFBTSxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUMsTUFBTTs7d0JBQzVCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQyxJQUFJLEtBQUssRUFBRTt3QkFDVCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07Ozs7d0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsRUFBQyxDQUFDO3FCQUM1RTtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBQ0QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQS9ILENBQStILEVBQUMsQ0FBQztTQUM3Sjs7WUFDSyxRQUFRLEdBQXVCO1lBQ25DLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQzVCO1FBQ0QsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVPLHFDQUFZOzs7OztJQUFwQixVQUFxQixDQUFTO1FBQzVCLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNyQyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNwRCxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNyRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDekMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ3pDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUMvQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7Ozs7SUFFTyxvQ0FBVzs7Ozs7O0lBQW5CLFVBQW9CLE1BQVcsRUFBRSxRQUFhO1FBQzVDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7O1lBQ2pDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7WUFDcEUsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUNoRSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU07O1lBQ2pDLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTTtRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE9BQU8sUUFBUSxLQUFLLFVBQVUsQ0FBQztTQUNoQztRQUNELEtBQUssRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDOUMsU0FBUyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFTyx3Q0FBZTs7Ozs7SUFBdkIsVUFBd0IsR0FBWTtRQUNsQyxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7OztJQUVPLHVDQUFjOzs7Ozs7SUFBdEIsVUFBdUIsUUFBNEIsRUFBRSxpQkFBaUM7UUFBakMsa0NBQUEsRUFBQSx3QkFBaUM7UUFDcEYsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDaEU7U0FDRjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU8sdUNBQWM7Ozs7SUFBdEI7O1lBQ00sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUN6QyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sdUNBQWM7Ozs7O0lBQXRCLFVBQXVCLGFBQTBCO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDMUQsSUFBSSxNQUFNLENBQUMsRUFBRSxLQUFLLGFBQWEsQ0FBQyxFQUFFO2dCQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQ2pFLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyw0Q0FBbUI7Ozs7SUFBM0I7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUMzQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1lBQ3RILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUNoSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDN0csSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU07Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztZQUMvSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDdEgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWM7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1lBQy9ILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQTtZQUM5SCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDdEgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3RILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUN0SCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDaEgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLG1CQUFtQjtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1lBQzlJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNySSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7WUFDdkosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1NBQzlHO0lBQ0gsQ0FBQzs7Ozs7SUFFTywrQ0FBc0I7Ozs7SUFBOUI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWU7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3RILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUM3RyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7WUFDckksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQjtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1lBQ3JJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEI7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsOEJBQThCLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztZQUNuSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNkJBQTZCO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLDZCQUE2QixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7WUFDaEssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWE7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUNuSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVTtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7U0FDeEc7SUFDSCxDQUFDOzs7OztJQUVPLHdDQUFlOzs7O0lBQXZCO1FBQUEsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxNQUFNO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztnQkFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZFLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLFFBQVEsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7d0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2lCQUNyRjtnQkFDRCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDdkM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7O1FBQUMsVUFBQyxDQUFjLEVBQUUsQ0FBYyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBcEQsQ0FBb0QsRUFBQyxDQUFDO0lBQ25KLENBQUM7Ozs7O0lBRU8sd0NBQWU7Ozs7SUFBdkI7UUFBQSxpQkFxQkM7UUFwQkMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFOztnQkFDdEMsaUJBQWlCLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxNQUFNO2dCQUNyQyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFO3dCQUMzQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDNUQ7b0JBQ0QsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNqRDtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztvQkFDNUIsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDO29CQUNsQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFVBQVU7OztvQkFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUE7aUJBQzdCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx1Q0FBYzs7OztJQUF0QjtRQUFBLGlCQTBCQztRQXpCQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUzs7OztZQUFFLFVBQUMsTUFBTTs7b0JBQzFELEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSzs7b0JBQ3RCLEdBQUcsR0FBRyxTQUFTO2dCQUNuQixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDaEQsR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7aUJBQzFEO2dCQUNELElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtvQkFDOUYsSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7d0JBQzlCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUMxRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzt5QkFDM0I7cUJBQ0Y7eUJBQU0sSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUU7d0JBQ3RDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUMxRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzt5QkFDM0I7cUJBQ0Y7O3dCQUNJLE9BQU87aUJBQ2I7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN6QjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnQkE3NEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsNms0QkFBcUM7b0JBRXJDLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsWUFBWSxFQUFFOzRCQUNwQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3JCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JELE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNoRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNqRCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNwRixDQUFDO3lCQUNILENBQUM7d0JBQ0YsT0FBTyxDQUFDLHFCQUFxQixFQUFFOzRCQUM3QixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3JCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3BELE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNoRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNqRCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNuRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7O2lCQUNGOzs7O2dCQTFDNkMsVUFBVTtnQkFBMkIsZ0JBQWdCO2dCQU0xRixXQUFXO2dCQUVYLGlCQUFpQjtnQkFFakIsdUJBQXVCOzs7aUNBbUM3QixLQUFLO2tDQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFDdkMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MkJBQ3JDLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO29DQUN0QyxZQUFZLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQUN0RCxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUFzMkJ6QyxxQkFBQztDQUFBLEFBOTRCRCxJQTg0QkM7U0E5MkJZLGNBQWM7OztJQUN6Qix3Q0FBZ0M7O0lBQ2hDLHlDQUFpQzs7SUFDakMsZ0NBQW9DOztJQUNwQyxtQ0FBdUU7O0lBQ3ZFLGlDQUFtRTs7SUFDbkUsa0NBQXFFOztJQUNyRSwyQ0FBMkc7O0lBQzNHLGlDQUFvRTs7SUFDcEUsK0JBQXlCOztJQUN6QixzQ0FBZ0M7O0lBQ2hDLGlDQUF3Qjs7SUFDeEIsdUNBQWlDOztJQUNqQyxrQ0FBd0I7O0lBQ3hCLGlDQUF1Qjs7SUFDdkIsbUNBQXlCOztJQUN6QixvQ0FBaUM7O0lBQ2pDLHFDQUErQjs7SUFDL0IsZ0NBQXdCOztJQUN4QixpQ0FBMkI7O0lBQzNCLHFDQUFvQzs7SUFDcEMsdUNBQXlDOztJQUN6Qyx3Q0FBMEM7O0lBQzFDLHVDQUF5Qzs7SUFDekMsNkNBQTRDOztJQUM1QyxzQ0FBaUM7O0lBQ2pDLG1DQUFrQzs7Ozs7SUFDbEMseUNBQW9DOzs7OztJQUNwQyxtQ0FBMEI7Ozs7O0lBQzFCLGlDQUEyQjs7SUFDM0IsMENBQWlDOztJQUNqQywyQ0FBa0M7O0lBQ2xDLDBDQUFpQzs7SUFDakMsMkNBQWtDOztJQUNsQyw0Q0FBbUM7O0lBQ25DLHFDQUFxRTs7SUFDckUscUNBQXNDOzs7OztJQUN0QyxpQ0FBMEI7Ozs7O0lBQzFCLHlDQUFrQzs7Ozs7SUFDbEMsMENBQXFDOzs7OztJQUNyQyx1Q0FBeUQ7Ozs7O0lBQ3pELHVDQUE2Qzs7Ozs7SUFDN0MsdUNBQW9DOzs7OztJQUdsQyxxQ0FBK0I7Ozs7O0lBQy9CLHlDQUEyQzs7Ozs7SUFDM0MscUNBQWtDOzs7OztJQUNsQywyQ0FBOEM7Ozs7O0lBQzlDLDhDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBDb250ZW50Q2hpbGQsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBUYWJsZU9wdGlvbiwgVGFibGVDb2x1bW4sIFRhYmxlQWN0aW9uLCBUYWJsZU1vZGUsIFRhYmxlQ29uc3RhbnQsIFRhYmxlUmVzcG9uc2UsIFRhYmxlVGV4dCwgVGFibGVNZXNzYWdlLCBUYWJsZUNvbHVtblR5cGUsIEVkaXR0ZWRGaWVsZCwgQ2hhbmdlZFJvdywgQ2hhbmdlZENlbGwgfSBmcm9tICcuL3RhYmxlLm1vZGVsJztcclxuaW1wb3J0IHsgVGFibGVSb3dEZXRhaWxEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXJvdy1kZXRhaWwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRWYWxpZGF0b3IsIFZhbGlkYXRpb25PcHRpb24gfSBmcm9tICcuLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBJZ3hFeGNlbEV4cG9ydGVyU2VydmljZSwgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnMgfSBmcm9tICdpZ25pdGV1aS1hbmd1bGFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAna2F0YW5hLXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignY0FuaW1hdGlvbicsIFtcclxuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7fSkpLFxyXG4gICAgICBzdGF0ZSgnKicsIHN0eWxlKHt9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTMwcHgpJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJywgb3BhY2l0eTogMSB9KSxcclxuICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMzBweCknLCBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdjQW5pbWF0aW9uRmFkZVJpZ2h0JywgW1xyXG4gICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHt9KSksXHJcbiAgICAgIHN0YXRlKCcqJywgc3R5bGUoe30pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgzMHB4KScsIG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9wYWNpdHk6IDEgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMzBweCknLCBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgdmFsaWRhdGlvbk5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB2YWxpZGF0aW9uU2NvcGU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uOiBUYWJsZU9wdGlvbjtcclxuICBAVmlld0NoaWxkKCdzZWFyY2hSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgc2VhcmNoUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2dvdG9SZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgZ290b1JlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd0YWJsZVJlZicsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyB0YWJsZVJlZjogRWxlbWVudFJlZjtcclxuICBAQ29udGVudENoaWxkKFRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgcm93RGV0YWlsVGVtcGxhdGU6IFRhYmxlUm93RGV0YWlsRGlyZWN0aXZlO1xyXG4gIEBWaWV3Q2hpbGQoJ3dyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIHdyYXBwZXI6IEVsZW1lbnRSZWY7XHJcbiAgcHVibGljIGl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gIHB1YmxpYyB0b3RhbFJlY29yZHM6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIHNlbGVjdGVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgcHVibGljIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgcHVibGljIG9yZGVyQnk6IHN0cmluZztcclxuICBwdWJsaWMgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgcHVibGljIHRvdGFsUGFnZXM6IG51bWJlcltdID0gW107XHJcbiAgcHVibGljIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gIHB1YmxpYyBtYXhQYWdlOiBudW1iZXIgPSA1O1xyXG4gIHB1YmxpYyBzZWxlY3RlZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBmaWx0ZXJDb2x1bW5zOiBUYWJsZUNvbHVtbltdID0gW107XHJcbiAgcHVibGljIHRvb2xiYXJBY3Rpb25zOiBUYWJsZUFjdGlvbltdID0gW107XHJcbiAgcHVibGljIGlubGluZUFjdGlvbnM6IFRhYmxlQWN0aW9uW10gPSBbXTtcclxuICBwdWJsaWMgZmlsdGVyU2VjdGlvblRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0ZXh0U2VhcmNoZWQ6IHN0cmluZyA9IGBgO1xyXG4gIHB1YmxpYyBzaG93UmVzZXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIGRlZmF1bHRQYWdlU2l6ZTogbnVtYmVyID0gNTtcclxuICBwcml2YXRlIGxvY2FsRGF0YT86IGFueVtdO1xyXG4gIHByaXZhdGUgX3JlbmRlcjogUmVuZGVyZXIyO1xyXG4gIHB1YmxpYyBoYXNGaWx0ZXJTZWN0aW9uOiBib29sZWFuO1xyXG4gIHB1YmxpYyBoYXNUb29sYmFyU2VjdGlvbjogYm9vbGVhbjtcclxuICBwdWJsaWMgaGFzRm9vdGVyU2VjdGlvbjogYm9vbGVhbjtcclxuICBwdWJsaWMgaGFzRGV0YWlsVGVtcGxhdGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGhhc1BhZ2VTaXplQ2hvb3NlcjogYm9vbGVhbjtcclxuICBwdWJsaWMgY2hhbmdlUGFnZSQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuICBwdWJsaWMgY2hhbmdlZFJvd3M6IENoYW5nZWRSb3dbXSA9IFtdO1xyXG4gIHByaXZhdGUgcmVxdWVzdDogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBwcmV2aW91c1JlcXVlc3Q6IGFueSA9IHt9O1xyXG4gIHByaXZhdGUgcmVjdXJzaXZlQ291bnRlcjogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICBwcm90ZWN0ZWQgZWRpdHRlZEZpZWxkczogRWRpdHRlZEZpZWxkW10gPSBbXTtcclxuICBwcm90ZWN0ZWQgcHJldmlvdXNJdGVtczogYW55W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRoaXNFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcclxuICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGlvblNlcnZpY2U6IFZhbGlkYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGV4Y2VsRXhwb3J0ZXJTZXJ2aWNlOiBJZ3hFeGNlbEV4cG9ydGVyU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5fcmVuZGVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIGNvbnN0IGNoYW5nZVBhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmNoYW5nZVBhZ2UkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHBhZ2VJbmRleCA9PiB7XHJcbiAgICAgIGlmIChwYWdlSW5kZXggPCAwIHx8IHBhZ2VJbmRleCA+PSB0aGlzLnRvdGFsUGFnZXMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlSW5kZXg7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24ucmVxdWVzdCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uLnJlcXVlc3QgPSB7fTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9wdGlvbi5yZXF1ZXN0LnBhZ2VJbmRleCA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgIHRoaXMuc2VhcmNoQXN5bmMobnVsbCwgbnVsbCwgdHJ1ZSkuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoY2hhbmdlUGFnZVN1YnNjcmlwdGlvbik7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICB0aGlzLmluaXRWYWxpZGF0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLnNlbGVjdGVkSXRlbXMgJiYgdGhpcy5vcHRpb24uc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmICghdGhpcy5zZWxlY3RlZEl0ZW1zKSB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5vcHRpb24uc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb24ubW9kZSkgdGhpcy5vcHRpb24ubW9kZSA9IFRhYmxlTW9kZS5mdWxsO1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbi5hY3Rpb25zKSB0aGlzLm9wdGlvbi5hY3Rpb25zID0gW107XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLmtleSkgdGhpcy5vcHRpb24ua2V5ID0gVGFibGVDb25zdGFudC5LZXk7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLnRvdGFsVG9vbGJhckl0ZW0pIHRoaXMub3B0aW9uLnRvdGFsVG9vbGJhckl0ZW0gPSA1O1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLm1heFBhZ2UpIHRoaXMubWF4UGFnZSA9IHRoaXMub3B0aW9uLm1heFBhZ2U7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLmRlZmF1bHRPcmRlckJ5KSB0aGlzLm9wdGlvbi5kZWZhdWx0T3JkZXJCeSA9ICdDcmVhdGVkRGF0ZSc7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLmRlZmF1dE9yZGVyRGlyZWN0aW9uKSB0aGlzLm9wdGlvbi5kZWZhdXRPcmRlckRpcmVjdGlvbiA9IFRhYmxlQ29uc3RhbnQuRGlyZWN0aW9uLkRFU0M7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLmNvbXBvbmVudENsYXNzKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uLmNvbXBvbmVudENsYXNzID0gVGFibGVDb25zdGFudC5Db21wb25lbnRDbGFzcztcclxuICAgICAgdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb24uY29tcG9uZW50Q2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbi5tYXhMZW5naHRleHQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbi5tYXhMZW5naHRleHQgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5vcHRpb24ubWF4TGVuZ2h0ZXh0ID0gMTUwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5pdFRhYmxlVGFibGVUZXh0cygpO1xyXG4gICAgdGhpcy5pbml0VGFibGVUYWJsZU1lc3NhZ2VzKCk7XHJcbiAgICB0aGlzLmluaXRNYWluQ29sdW1ucygpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLmFjdGlvbnMpIHtcclxuICAgICAgdGhpcy5vcHRpb24uYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoIWFjdGlvbi50eXBlKSBhY3Rpb24udHlwZSA9IFRhYmxlQ29uc3RhbnQuQWN0aW9uVHlwZS5JbmxpbmU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b29sYmFyQWN0aW9ucyA9IHRoaXMub3B0aW9uLmFjdGlvbnMuZmlsdGVyKHggPT4gW1RhYmxlQ29uc3RhbnQuQWN0aW9uVHlwZS5Cb3RoLCBUYWJsZUNvbnN0YW50LkFjdGlvblR5cGUuVG9vbGJhcl0uaW5kZXhPZih4LnR5cGUpID49IDApO1xyXG4gICAgdGhpcy5pbmxpbmVBY3Rpb25zID0gdGhpcy5vcHRpb24uYWN0aW9ucy5maWx0ZXIoeCA9PiBbVGFibGVDb25zdGFudC5BY3Rpb25UeXBlLkJvdGgsIFRhYmxlQ29uc3RhbnQuQWN0aW9uVHlwZS5JbmxpbmVdLmluZGV4T2YoeC50eXBlKSA+PSAwKTtcclxuXHJcbiAgICBjb25zdCBpbkZ1bGxNb2RlID0gdGhpcy5vcHRpb24ubW9kZSA9PT0gVGFibGVNb2RlLmZ1bGw7XHJcbiAgICB0aGlzLmZpbHRlckNvbHVtbnMgPSB0aGlzLm9wdGlvbi5tYWluQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IGNvbHVtbi5hbGxvd0ZpbHRlcilcclxuICAgICAgLnNvcnQoKGE6IFRhYmxlQ29sdW1uLCBiOiBUYWJsZUNvbHVtbikgPT4gYS5vcmRlciA+IGIub3JkZXIgPyAxIDogYS5vcmRlciA9PT0gYi5vcmRlciA/IDAgOiAtMSk7XHJcbiAgICB0aGlzLmhhc0ZpbHRlclNlY3Rpb24gPSBpbkZ1bGxNb2RlO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbi5wYWdpbmcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9wdGlvbi5wYWdpbmcgPSBpbkZ1bGxNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbkZ1bGxNb2RlKSB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24ucGFnZVNpemVzKSB0aGlzLm9wdGlvbi5wYWdlU2l6ZXMgPSBUYWJsZUNvbnN0YW50LlBhZ2VTaXplcztcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kZWZhdWx0UGFnZVNpemUpIHRoaXMub3B0aW9uLmRlZmF1bHRQYWdlU2l6ZSA9IFRhYmxlQ29uc3RhbnQuUGFnZVNpemVzWzBdO1xyXG4gICAgICBpZiAodGhpcy5vcHRpb24uZGVmYXVsdFBhZ2VTaXplKSB0aGlzLmRlZmF1bHRQYWdlU2l6ZSA9IHRoaXMub3B0aW9uLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYXNUb29sYmFyQWN0aW9ucyA9IHRoaXMub3B0aW9uLmFjdGlvbnMgJiYgdGhpcy5vcHRpb24uYWN0aW9ucy5maWx0ZXIoeCA9PiBbVGFibGVDb25zdGFudC5BY3Rpb25UeXBlLlRvb2xiYXIsIFRhYmxlQ29uc3RhbnQuQWN0aW9uVHlwZS5Cb3RoXS5pbmRleE9mKHgudHlwZSkgPj0gMCkubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGhhc1RvcEJ1dHRvbnMgPSB0aGlzLm9wdGlvbi50b3BCdXR0b25zICYmIHRoaXMub3B0aW9uLnRvcEJ1dHRvbnMubGVuZ3RoID4gMDtcclxuXHJcbiAgICB0aGlzLmhhc1Rvb2xiYXJTZWN0aW9uID0gaW5GdWxsTW9kZSB8fCBoYXNUb29sYmFyQWN0aW9ucyB8fCBoYXNUb3BCdXR0b25zO1xyXG4gICAgdGhpcy5oYXNGb290ZXJTZWN0aW9uID0gaW5GdWxsTW9kZSB8fCB0aGlzLm9wdGlvbi5wYWdpbmc7XHJcbiAgICB0aGlzLmhhc1BhZ2VTaXplQ2hvb3NlciA9IHRoaXMub3B0aW9uLnBhZ2luZztcclxuICAgIGlmICh0aGlzLm9wdGlvbi5oaWRlQ2hlY2tib3hDb2x1bW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9wdGlvbi5oaWRlQ2hlY2tib3hDb2x1bW4gPSAhaGFzVG9vbGJhckFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm9wdGlvbi5yZXF1ZXN0KSB7XHJcbiAgICAgIHRoaXMub3B0aW9uLnJlcXVlc3QgPSB7XHJcbiAgICAgICAgcGFnZUluZGV4OiAwLFxyXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmRlZmF1bHRQYWdlU2l6ZVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5vcHRpb24uZGVmYXVsdFBhZ2VTaXplKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZSA9IHRoaXMub3B0aW9uLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlYXJjaEFzeW5jKCkuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLnJlcXVlc3QucGFnZVNpemUpIHtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5kZWZhdWx0UGFnZVNpemU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWFyY2hBc3luYygpLnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNhbGxiYWNrKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gb2YodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb3B5KGl0ZW06IGFueSwgcmVmcmVzaDogYm9vbGVhbiA9IHRydWUsIGV4ZWN1dGU/OiAoaXRlbTogYW55KSA9PiB2b2lkLCBjYWxsYmFjaz86IChjb3B5SXRlbTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXRlbXMpIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgIHZhciBjb3B5SXRlbSA9IHRoaXMuZGF0YVNlcnZpY2UuY2xvbmVJdGVtKGl0ZW0pO1xyXG4gICAgaWYgKGNvcHlJdGVtLmlkKSBjb3B5SXRlbS5pZCA9IHRoaXMuZGF0YVNlcnZpY2UubmV3R3VpZCgpO1xyXG4gICAgaWYgKGV4ZWN1dGUpIHtcclxuICAgICAgZXhlY3V0ZShjb3B5SXRlbSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb24ubG9jYWxEYXRhKSB7XHJcbiAgICAgIHRoaXMubG9jYWxEYXRhLnB1c2goY29weUl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtcy5wdXNoKGNvcHlJdGVtKTtcclxuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soY29weUl0ZW0pO1xyXG4gICAgaWYgKHJlZnJlc2ggPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEFzeW5jKHRydWUpLnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGV4cG9ydFRvRXhjZWwoZmlsZU5hbWU/OiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gYW55KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLm1haW5Db2x1bW5zIHx8IHRoaXMub3B0aW9uLm1haW5Db2x1bW5zLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5idWlsZFJlcXVlc3QoMCwgdHJ1ZSk7XHJcbiAgICByZXF1ZXN0LnBhZ2VTaXplID0gOTk5OTk5OTtcclxuICAgIGxldCBzZWFyY2ggPSB0aGlzLm9wdGlvbi5sb2NhbERhdGEgPyAocmVxKSA9PiB7IHJldHVybiB0aGlzLnNlYXJjaExvY2FsSXRlbXMocmVxKTsgfSA6IChyZXEpID0+IHsgcmV0dXJuIHRoaXMub3B0aW9uLnNlcnZpY2VQcm92aWRlci5zZWFyY2hBc3luYyhyZXEpIH07XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIHZhciBkYXRhID0gW107XHJcbiAgICAgIHNlYXJjaChyZXF1ZXN0KS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmVzcG9uc2UuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgdmFyIGV4cG9ydGVkSXRlbSA9IHt9O1xyXG4gICAgICAgICAgdGhpcy5vcHRpb24ubWFpbkNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW4udmFsdWVSZWYpIHtcclxuICAgICAgICAgICAgICBleHBvcnRlZEl0ZW1bY29sdW1uLnRpdGxlKCldID0gaXRlbVtjb2x1bW4udmFsdWVSZWYoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZGF0YS5wdXNoKGV4cG9ydGVkSXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5leGNlbEV4cG9ydGVyU2VydmljZS5leHBvcnREYXRhKGRhdGEsIG5ldyBJZ3hFeGNlbEV4cG9ydGVyT3B0aW9ucyhmaWxlTmFtZSA/IGZpbGVOYW1lIDogbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wcmV2aW91c0l0ZW1zID0gW107XHJcbiAgICB0aGlzLmNoYW5nZWRSb3dzID0gW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWNjZXB0SW5saW5lRWRpdChpdGVtOiBhbnksIGZpZWxkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIHJlZj86IGFueSwgdmFsaWRhdGlvbk9wdGlvbj86IFZhbGlkYXRpb25PcHRpb24sIGNhbGxiYWNrPzogKGl0ZW06IGFueSwgZmllbGQ6IHN0cmluZykgPT4gYW55KTogdm9pZCB7XHJcbiAgICB2YXIgZWxlbWVudCA9IHJlZi5nZXRFbGVtZW50KCk7XHJcbiAgICB2YWxpZGF0aW9uT3B0aW9uLml0ZW1SZWYgPSBpdGVtO1xyXG4gICAgaWYgKCF2YWxpZGF0aW9uT3B0aW9uLnZhbHVlUmVzb2x2ZXIpIHtcclxuICAgICAgdmFsaWRhdGlvbk9wdGlvbi52YWx1ZVJlc29sdmVyID0gKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbVtmaWVsZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGVFbGVtZW50QXN5bmMoZWxlbWVudCwgdmFsaWRhdGlvbk9wdGlvbikuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jaGFuZ2VkUm93cy5maW5kKHMgPT4gcy5jdXJyZW50SXRlbS5pZCA9PSBpdGVtLmlkKTtcclxuICAgICAgICB2YXIgcHJldmlvdXNJdGVtID0gdGhpcy5wcmV2aW91c0l0ZW1zLmZpbmQocyA9PiBzLmlkID09IGl0ZW0uaWQpO1xyXG4gICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgIGlmIChpdGVtW2ZpZWxkXSAhPSBwcmV2aW91c0l0ZW1bZmllbGRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZFJvd3MucHVzaChuZXcgQ2hhbmdlZFJvdyh7XHJcbiAgICAgICAgICAgICAgY3VycmVudEl0ZW06IHRoaXMuZGF0YVNlcnZpY2UuY2xvbmVJdGVtKGl0ZW0pLFxyXG4gICAgICAgICAgICAgIG9sZEl0ZW06IHByZXZpb3VzSXRlbSxcclxuICAgICAgICAgICAgICBjZWxsczogW1xyXG4gICAgICAgICAgICAgICAgbmV3IENoYW5nZWRDZWxsKHtcclxuICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWU6IGl0ZW1bZmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogcHJldmlvdXNJdGVtW2ZpZWxkXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGN1cnJlbnRGaWVsZCA9IGN1cnJlbnRJdGVtLmNlbGxzLmZpbmQocyA9PiBzLmZpZWxkID09IGZpZWxkKTtcclxuICAgICAgICAgIGlmICghY3VycmVudEZpZWxkKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNlbGxzLnB1c2gobmV3IENoYW5nZWRDZWxsKHtcclxuICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlOiBpdGVtW2ZpZWxkXSxcclxuICAgICAgICAgICAgICBvbGRWYWx1ZTogcHJldmlvdXNJdGVtW2ZpZWxkXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXRlbVtmaWVsZF0gIT0gbnVsbCAmJiBpdGVtW2ZpZWxkXSAhPSB1bmRlZmluZWQgJiYgaXRlbVtmaWVsZF0gIT0gJycgJiZcclxuICAgICAgICAgICAgICBjdXJyZW50RmllbGQub2xkVmFsdWUgIT0gbnVsbCAmJiBjdXJyZW50RmllbGQub2xkVmFsdWUgIT0gdW5kZWZpbmVkICYmIGN1cnJlbnRGaWVsZC5vbGRWYWx1ZSAhPSAnJykge1xyXG4gICAgICAgICAgICAgIGlmIChpdGVtW2ZpZWxkXS50b1N0cmluZygpICE9IGN1cnJlbnRGaWVsZC5vbGRWYWx1ZS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RmllbGQuY3VycmVudFZhbHVlID0gaXRlbVtmaWVsZF07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjZWxsSW5kZXggPSBjdXJyZW50SXRlbS5jZWxscy5maW5kSW5kZXgocyA9PiBzLmZpZWxkID09IGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNlbGxzLnNwbGljZShjZWxsSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLmNlbGxzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbUluZGV4ID0gdGhpcy5jaGFuZ2VkUm93cy5maW5kSW5kZXgocyA9PiBzLmN1cnJlbnRJdGVtLmlkID09IGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRSb3dzLnNwbGljZShjdXJyZW50SXRlbUluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY3VycmVudEZpZWxkLmN1cnJlbnRWYWx1ZSA9IGl0ZW1bZmllbGRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2VJbmxpbmVFZGl0KGZpZWxkLCBpbmRleCk7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhpdGVtLCBmaWVsZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNhbmNlbElubGluZUVkaXQoaXRlbTogYW55LCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW0gPSB0aGlzLnJldHJpZXZlSW5saW5lRWRpdChmaWVsZCwgaW5kZXgpO1xyXG4gICAgaWYgKCFjdXJyZW50SXRlbSkgcmV0dXJuO1xyXG4gICAgaXRlbVtmaWVsZF0gPSBjdXJyZW50SXRlbS5pdGVtW2ZpZWxkXTtcclxuICAgIHRoaXMuY2xvc2VJbmxpbmVFZGl0KGZpZWxkLCBpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VJbmxpbmVFZGl0KGZpZWxkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHZhciBpdGVtSW5kZXggPSB0aGlzLmVkaXR0ZWRGaWVsZHMuZmluZEluZGV4KHMgPT4gcy5maWVsZCA9PSBmaWVsZCAmJiBzLmluZGV4ID09IGluZGV4KTtcclxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkgdGhpcy5lZGl0dGVkRmllbGRzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVkaXRJbmxpbmUoaXRlbTogYW55LCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoIWl0ZW0pIHJldHVybjtcclxuICAgIGlmICh0aGlzLnByZXZpb3VzSXRlbXMuZmluZEluZGV4KHMgPT4gcy5pZCA9PSBpdGVtLmlkKSA9PSAtMSkge1xyXG4gICAgICB0aGlzLnByZXZpb3VzSXRlbXMucHVzaCh0aGlzLmRhdGFTZXJ2aWNlLmNsb25lSXRlbShpdGVtKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgY3VycmVudEl0ZW0gPSB0aGlzLnJldHJpZXZlSW5saW5lRWRpdChmaWVsZCwgaW5kZXgpO1xyXG4gICAgaWYgKCFjdXJyZW50SXRlbSkge1xyXG4gICAgICB0aGlzLmVkaXR0ZWRGaWVsZHMucHVzaCh7XHJcbiAgICAgICAgaXRlbTogdGhpcy5kYXRhU2VydmljZS5jbG9uZUl0ZW0oaXRlbSksXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIGZpZWxkOiBmaWVsZFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRJdGVtLml0ZW0gPSB0aGlzLmRhdGFTZXJ2aWNlLmNsb25lSXRlbShpdGVtKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UudXBkYXRlQXN5bmMobnVsbCwgaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzSW5saW5lRWRpdChpdGVtOiBhbnksIGZpZWxkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5vcHRpb24gfHwgdGhpcy5vcHRpb24uaW5saW5lRWRpdCAhPSB0cnVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWl0ZW0gfHwgIXRoaXMuZWRpdHRlZEZpZWxkcyB8fCB0aGlzLmVkaXR0ZWRGaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiAoPEVkaXR0ZWRGaWVsZFtdPnRoaXMuZWRpdHRlZEZpZWxkcykuZmluZEluZGV4KHMgPT4gcy5maWVsZCA9PSBmaWVsZCAmJiBzLmluZGV4ID09IGluZGV4KSA+IC0xO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlSW5saW5lRWRpdChmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogRWRpdHRlZEZpZWxkIHtcclxuICAgIGlmICghdGhpcy5lZGl0dGVkRmllbGRzIHx8IHRoaXMuZWRpdHRlZEZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKDxFZGl0dGVkRmllbGRbXT50aGlzLmVkaXR0ZWRGaWVsZHMpLmZpbmQocyA9PiBzLmZpZWxkID09IGZpZWxkICYmIHMuaW5kZXggPT0gaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0RmlsdGVycygpOiB2b2lkIHtcclxuICAgIHRoaXMuZmlsdGVyID0ge307XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyU2VjdGlvblRvZ2dsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy50b3RhbFBhZ2VzID0gW107XHJcbiAgICB0aGlzLm9wdGlvbi5yZXF1ZXN0LnBhZ2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcclxuICAgIGlmICghdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZSkge1xyXG4gICAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFnZVNpemUgPSB0aGlzLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgIH1cclxuICAgIHRoaXMub3B0aW9uLnJlcXVlc3QucGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplO1xyXG4gICAgdGhpcy5zZWFyY2hBc3luYygpLnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zaG93UmVzZXQgPSBmYWxzZTtcclxuICAgIHRoaXMucmVxdWVzdCA9IHt9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRvb2xiYXJBY3Rpb25zKHN0YW5kYXJkOiBib29sZWFuKTogVGFibGVBY3Rpb25bXSB7XHJcbiAgICBsZXQgYWN0aW9uczogVGFibGVBY3Rpb25bXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMudG9vbGJhckFjdGlvbnMpIHtcclxuICAgICAgdGhpcy50b29sYmFyQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKCFzdGFuZGFyZCkge1xyXG4gICAgICAgICAgaWYgKGluZGV4ID49IHRoaXMub3B0aW9uLnRvdGFsVG9vbGJhckl0ZW0pIHtcclxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMub3B0aW9uLnRvdGFsVG9vbGJhckl0ZW0pIHtcclxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhY3Rpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVBhZ2VTaXplKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemU7XHJcbiAgICB0aGlzLm9wdGlvbi5yZXF1ZXN0LnBhZ2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNlYXJjaEFzeW5jKCkuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGtlS2V5cHJlc3MoJGV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoJGV2ZW50ICYmICRldmVudC53aGljaCA9PSAxMykge1xyXG4gICAgICB0aGlzLnNlYXJjaEFzeW5jKCkuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ290bygkZXZlbnQ6IGFueSwgYmx1cj86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICgkZXZlbnQud2hpY2ggPT0gMTMgfHwgYmx1ciA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAkZXZlbnQudGFyZ2V0LnZhbHVlIC0gMTtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPCAwKSB0aGlzLmN1cnJlbnRQYWdlID0gMDtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy50b3RhbFBhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXMubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlID0gdGhpcy5jdXJyZW50UGFnZSArIDE7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGFnZSQubmV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgkZXZlbnQud2hpY2ggPCA0OCB8fCAkZXZlbnQud2hpY2ggPiA1NykgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlRmlsdGVyU2VjdGlvbigpIHtcclxuICAgIHRoaXMuZmlsdGVyU2VjdGlvblRvZ2dsZSA9ICF0aGlzLmZpbHRlclNlY3Rpb25Ub2dnbGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd1NvcnRlcihjb2x1bW46IFRhYmxlQ29sdW1uLCBkaXJlY3Rpb246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGNvbHVtbi5kaXJlY3Rpb24gPT09IGRpcmVjdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVSb3dEZXRhaWwoaXRlbTogYW55KSB7XHJcbiAgICBpdGVtLnRvZ2dsZSA9ICFpdGVtLnRvZ2dsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzb3J0QXN5bmMoY29sdW1uOiBUYWJsZUNvbHVtbik6IHZvaWQge1xyXG4gICAgaWYgKCFjb2x1bW4udmFsdWVSZWYpIHJldHVybjtcclxuICAgIHRoaXMucmVzZXRTb3J0QXN5bmMoY29sdW1uKTtcclxuICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLmFsbG93U29ydCAhPSBmYWxzZSkge1xyXG4gICAgICBpZiAoIWNvbHVtbi5kaXJlY3Rpb24pIHtcclxuICAgICAgICBjb2x1bW4uZGlyZWN0aW9uID0gVGFibGVDb25zdGFudC5EaXJlY3Rpb24uQVNDO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbHVtbi5kaXJlY3Rpb24gPSBjb2x1bW4uZGlyZWN0aW9uID09IFRhYmxlQ29uc3RhbnQuRGlyZWN0aW9uLkFTQyA/IFRhYmxlQ29uc3RhbnQuRGlyZWN0aW9uLkRFU0MgOiBUYWJsZUNvbnN0YW50LkRpcmVjdGlvbi5BU0M7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3JkZXJCeSA9IHRoaXMuZGF0YVNlcnZpY2UudG9QYXNjYWxDYXNlKGNvbHVtbi52YWx1ZVJlZigpKTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gY29sdW1uLmRpcmVjdGlvbjtcclxuICAgIHRoaXMuc2VhcmNoQXN5bmMobnVsbCwgbnVsbCwgZmFsc2UpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEFsbChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWQgPyBbLi4udGhpcy5pdGVtc10gOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhckFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RlZElkcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5tYXAoeCA9PiB4LmlkKTtcclxuICAgIGNvbnN0IGV4aXN0aW5nSXRlbUluZGV4ID0gc2VsZWN0ZWRJZHMuaW5kZXhPZihpdGVtLmlkKTtcclxuICAgIGlmIChleGlzdGluZ0l0ZW1JbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoZXhpc3RpbmdJdGVtSW5kZXgsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLm11bHRpcGxlKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zLmZpbmQocyA9PiBzLmlkID09IGl0ZW0uaWQpO1xyXG4gICAgICBpZiAoY3VycmVudEl0ZW0pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbY3VycmVudEl0ZW1dO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNSb3dTZWxlY3RlZChpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSWRzID0gdGhpcy5zZWxlY3RlZEl0ZW1zLm1hcCh4ID0+IHguaWQpO1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkSWRzLmluZGV4T2YoaXRlbS5pZCkgPj0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNBbnlBY3Rpb24oaXRlbT86IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgYWxpdmVBY3Rpb25zID0gdGhpcy5pbmxpbmVBY3Rpb25zLmZpbHRlcih4ID0+ICF4LmhpZGUgfHwgIXguaGlkZShpdGVtKSk7XHJcbiAgICByZXR1cm4gYWxpdmVBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhlY3V0ZUFjdGlvbkFzeW5jKGFjdGlvbjogVGFibGVBY3Rpb24sIGl0ZW0/OiBhbnksICRldmVudD86IGFueSwgaW5kZXg/OiBudW1iZXIsIGxvYWRlZENhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gJGV2ZW50ID8gJGV2ZW50LnRhcmdldCA6IG51bGw7XHJcbiAgICAgIGFjdGlvbi5leGVjdXRlQXN5bmMoaXRlbSwgdGFyZ2V0LCB0aGlzLCBpbmRleCwgbG9hZGVkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQWN0aXZlKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50SXRlbSA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5maW5kKHMgPT4gcy5pZCA9PT0gaXRlbS5pZCk7XHJcbiAgICByZXR1cm4gY3VycmVudEl0ZW0gJiYgY3VycmVudEl0ZW0uY2hlY2tlZFJvdztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJyZW50SW5kZXgoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb24ucmVxdWVzdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlSW5kZXggKiB0aGlzLm9wdGlvbi5yZXF1ZXN0LnBhZ2VTaXplICsgaW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERyb3Bkb3duRGlzcGxheVRleHQoY29sdW1uOiBUYWJsZUNvbHVtbiwgaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBpdGVtW2NvbHVtbi52YWx1ZVJlZigpXTtcclxuICAgIGlmICghdmFsdWVzKSByZXR1cm4gJyc7XHJcblxyXG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IDxzdHJpbmdbXT52YWx1ZXMuZmlsdGVyKHggPT4geCkubWFwKHggPT4geFtjb2x1bW4uZHJvcGRvd25Db25maWd1cmF0aW9uLmJpbmRMYWJlbF0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJywgJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWVzW2NvbHVtbi5kcm9wZG93bkNvbmZpZ3VyYXRpb24uYmluZExhYmVsXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQYWdlcyhuOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICBsZXQgcGFnZXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnRvdGFsUGFnZXMubGVuZ3RoIDwgbikge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy50b3RhbFBhZ2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgcGFnZXMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFnZXM7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA8IG4pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IG4gLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gTWF0aC5mbG9vcihuIC8gMik7XHJcbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuY3VycmVudFBhZ2UgKyBjb3VudCA+PSB0aGlzLnRvdGFsUGFnZXMubGVuZ3RoID8gdGhpcy50b3RhbFBhZ2VzLmxlbmd0aCAtIDEgOiB0aGlzLmN1cnJlbnRQYWdlICsgY291bnQ7XHJcbiAgICAgIGZvciAobGV0IGkgPSBtYXg7IGkgPj0gdGhpcy5jdXJyZW50UGFnZSAtIGNvdW50OyBpLS0pIHtcclxuICAgICAgICBwYWdlcy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFnZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsb2FkKGtlZXBTZWxlY3RlZEl0ZW1zOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaEFzeW5jKG51bGwsIG51bGwsIGtlZXBTZWxlY3RlZEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWFyY2goYWR2YW5jZWRGaWx0ZXI/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNlYXJjaEFzeW5jKGFkdmFuY2VkRmlsdGVyKS5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cmFja1JlY29yZHMocmVjb3JkOiBhbnkpIHtcclxuICAgIHJldHVybiByZWNvcmQgPyByZWNvcmQuaWQgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VhcmNoQXN5bmMoYWR2YW5jZWRGaWx0ZXI/OiBib29sZWFuLCBjdXJyZW50UGFnZT86IG51bWJlciwga2VlcFNlbGVjdGVkSXRlbXM6IGJvb2xlYW4gPSB0cnVlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuYnVpbGRSZXF1ZXN0KGN1cnJlbnRQYWdlLCBhZHZhbmNlZEZpbHRlcik7XHJcbiAgICBpZiAodGhpcy5vcHRpb24ubG9jYWxEYXRhKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uLmxvY2FsRGF0YSgpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jYWxEYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLnNlYXJjaExvY2FsSXRlbXMocmVxdWVzdCkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iaW5kUmVzdWx0RGF0YShyZXNwb25zZSwga2VlcFNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24uc2VydmljZVByb3ZpZGVyIHx8ICF0aGlzLm9wdGlvbi5zZXJ2aWNlUHJvdmlkZXIuc2VhcmNoQXN5bmMpIHRocm93IG5ldyBFcnJvcignIXRoaXMub3B0aW9uLnNlcnZpY2VQcm92aWRlci5zZWFyY2hBc3luYycpO1xyXG4gICAgICB0aGlzLm9wdGlvbi5zZXJ2aWNlUHJvdmlkZXIuc2VhcmNoQXN5bmMocmVxdWVzdCkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYmluZFJlc3VsdERhdGEocmVzcG9uc2UsIGtlZXBTZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrZWRBbGxQYWdlSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRJdGVtcyB8fCAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXMuZmluZChzID0+IHMuaWQgPT09IGl0ZW0uaWQpO1xyXG4gICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gY2hlY2s7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNoZWNrO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXREZWZhdWx0T3JkZXIocmVxdWVzdDogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb24uZGVmYXVsdE9yZGVyQnkpIHRoaXMub3JkZXJCeSA9IHRoaXMub3B0aW9uLmRlZmF1bHRPcmRlckJ5O1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLmRlZmF1dE9yZGVyRGlyZWN0aW9uKSB0aGlzLmRpcmVjdGlvbiA9IHRoaXMub3B0aW9uLmRlZmF1dE9yZGVyRGlyZWN0aW9uO1xyXG4gICAgcmVxdWVzdC5vcmRlckJ5ID0gdGhpcy5vcmRlckJ5O1xyXG4gICAgcmVxdWVzdC5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcclxuICAgIGlmICghdGhpcy5vcmRlckJ5KSB7XHJcbiAgICAgIHRoaXMub3JkZXJCeSA9IFwiSWRcIjtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBUYWJsZUNvbnN0YW50LkRpcmVjdGlvbi5BU0M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RmlsdGVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLnJlcXVlc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XHJcbiAgICB0aGlzLmZpbHRlcltrZXldID0gdmFsdWU7XHJcbiAgICBpZiAodGhpcy5vcHRpb24gJiYgdGhpcy5vcHRpb24ucmVxdWVzdCkgdGhpcy5vcHRpb24ucmVxdWVzdC5wYWdlSW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaWV2ZUFkdmFuY2VkRmlsdGVycyhhZHZhbmNlZEZpbHRlcjogYm9vbGVhbiwgcmVxdWVzdDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmZpbHRlckNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBUYWJsZUNvbHVtbikgPT4ge1xyXG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLmZpbHRlcltjb2x1bW4udmFsdWVSZWYoKV07XHJcbiAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhZHZhbmNlZEZpbHRlciA9PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi50eXBlICYmIChjb2x1bW4udHlwZS50b0xvd2VyQ2FzZSgpID09ICdkYXRlJyB8fCBjb2x1bW4udHlwZS50b0xvd2VyQ2FzZSgpID09ICdkYXRldGltZScgfHwgY29sdW1uLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAndGltZScpKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZXRpbWVWYWx1ZXMgPSA8RGF0ZVtdPnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZXRpbWVWYWx1ZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICByZXF1ZXN0W2NvbHVtbi52YWx1ZVJlZigpICsgJ0Zyb20nXSA9IHRoaXMuY29udmVydERhdGV0aW1lKGRhdGV0aW1lVmFsdWVzWzBdLCAnRnJvbScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGV0aW1lVmFsdWVzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdFtjb2x1bW4udmFsdWVSZWYoKSArICdGcm9tJ10gPSB0aGlzLmNvbnZlcnREYXRldGltZShkYXRldGltZVZhbHVlc1swXSwgJ0Zyb20nKTtcclxuICAgICAgICAgICAgICByZXF1ZXN0W2NvbHVtbi52YWx1ZVJlZigpICsgJ1RvJ10gPSB0aGlzLmNvbnZlcnREYXRldGltZShkYXRldGltZVZhbHVlc1sxXSwgJ1RvJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVxdWVzdFtjb2x1bW4udmFsdWVSZWYoKV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVxdWVzdFtjb2x1bW4udmFsdWVSZWYoKV0gPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkUmVxdWVzdChjdXJyZW50UGFnZT86IG51bWJlciwgYWR2YW5jZWRGaWx0ZXI/OiBib29sZWFuKTogYW55IHtcclxuICAgIHRoaXMucHJldmlvdXNSZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yZXF1ZXN0KTtcclxuICAgIGxldCBzZWFyY2hUZXh0ID0gdGhpcy5maWx0ZXIuc2VhcmNoVGV4dDtcclxuICAgIHRoaXMudGV4dFNlYXJjaGVkID0gdGhpcy5maWx0ZXIuc2VhcmNoVGV4dDtcclxuICAgIGlmIChzZWFyY2hUZXh0ID09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXh0ID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHNlYXJjaFRleHQgPSAnJztcclxuICAgIH1cclxuICAgIHRoaXMucmVxdWVzdC5wYWdlU2l6ZSA9IHRoaXMub3B0aW9uLnJlcXVlc3QucGFnZVNpemU7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLnBhZ2luZykge1xyXG4gICAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSA5OTk5OTk7XHJcbiAgICAgIHRoaXMucGFnZVNpemUgPSA5OTk5OTk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlcXVlc3Quc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XHJcbiAgICB0aGlzLnJlcXVlc3QuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XHJcbiAgICB0aGlzLnJlcXVlc3Qub3JkZXJCeSA9IHRoaXMub3JkZXJCeTtcclxuICAgIGlmICghdGhpcy5vcmRlckJ5KSB0aGlzLnNldERlZmF1bHRPcmRlcih0aGlzLnJlcXVlc3QpO1xyXG4gICAgdGhpcy5yZXRyaWV2ZUFkdmFuY2VkRmlsdGVycyhhZHZhbmNlZEZpbHRlciwgdGhpcy5yZXF1ZXN0KTtcclxuICAgIHRoaXMucmVxdWVzdC5wYWdlSW5kZXggPSB0aGlzLm9wdGlvbi5yZXF1ZXN0LnBhZ2VJbmRleDtcclxuICAgIGlmIChjdXJyZW50UGFnZSkge1xyXG4gICAgICB0aGlzLnJlcXVlc3QucGFnZUluZGV4ID0gY3VycmVudFBhZ2U7XHJcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kYXRhU2VydmljZS5jb21wYXJlT2JqZWN0cyh0aGlzLnByZXZpb3VzUmVxdWVzdCwgdGhpcy5yZXF1ZXN0KTtcclxuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGNoYW5nZXMuZmlsdGVyKHggPT4gWydwYWdlSW5kZXgnLCAncGFnZVNpemUnXS5pbmRleE9mKHgucHJvcGVydHlOYW1lKSA8IDApLmxlbmd0aCA+IDA7XHJcbiAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uLnJlcXVlc3QucGFnZUluZGV4ID0gMDtcclxuICAgICAgdGhpcy5yZXF1ZXN0LnBhZ2VJbmRleCA9IDA7XHJcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydERhdGV0aW1lKGR0OiBEYXRlLCB0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFkdCkgcmV0dXJuICcnO1xyXG4gICAgbGV0IGNvbnZlcnRlZERhdGV0aW1lID0gbmV3IERhdGUoZHQpO1xyXG4gICAgbGV0IGRheXMgPSBjb252ZXJ0ZWREYXRldGltZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcclxuICAgIGlmIChkYXlzLmxlbmd0aCA8IDIpIGRheXMgPSAnMCcgKyBkYXlzO1xyXG4gICAgbGV0IG1vbnRocyA9IChjb252ZXJ0ZWREYXRldGltZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcclxuICAgIGlmIChtb250aHMubGVuZ3RoIDwgMikgbW9udGhzID0gJzAnICsgbW9udGhzO1xyXG4gICAgbGV0IGhvdXJzID0gY29udmVydGVkRGF0ZXRpbWUuZ2V0SG91cnMoKS50b1N0cmluZygpO1xyXG4gICAgaWYgKGhvdXJzLmxlbmd0aCA8IDIpIGhvdXJzID0gJzAnICsgaG91cnM7XHJcbiAgICBsZXQgbWludXRlcyA9IGNvbnZlcnRlZERhdGV0aW1lLmdldE1pbnV0ZXMoKS50b1N0cmluZygpO1xyXG4gICAgaWYgKG1pbnV0ZXMubGVuZ3RoIDwgMikgbWludXRlcyA9ICcwJyArIG1pbnV0ZXM7XHJcbiAgICBjb25zdCB5ZWFyID0gY29udmVydGVkRGF0ZXRpbWUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMub3B0aW9uLmRhdGV0aW1lRm9ybWF0LmZvcm1hdCkge1xyXG4gICAgICBjYXNlICdkZC9NTS95eXl5JzpcclxuICAgICAgICByZXR1cm4gZGF5cyArICcvJyArIG1vbnRocyArICcvJyArIHllYXIgKyAodHlwZSA9PSAnRnJvbScgPyAnIDAwOjAwJyA6ICcgMjM6NTknKTtcclxuICAgICAgY2FzZSAnZGQvTU0veXl5eSBISDptbSc6XHJcbiAgICAgICAgcmV0dXJuIGRheXMgKyAnLycgKyBtb250aHMgKyAnLycgKyB5ZWFyICsgJyAnICsgaG91cnMgKyAnOicgKyBtaW51dGVzO1xyXG4gICAgICBjYXNlICdNTS9kZC95eXl5JzpcclxuICAgICAgICByZXR1cm4gbW9udGhzICsgJy8nICsgZGF5cyArICcvJyArIHllYXIgKyAodHlwZSA9PSAnRnJvbScgPyAnIDAwOjAwJyA6ICcgMjM6NTknKTtcclxuICAgICAgY2FzZSAnTU0vZGQveXl5eSBISDptbSc6XHJcbiAgICAgICAgcmV0dXJuIG1vbnRocyArICcvJyArIGRheXMgKyAnLycgKyB5ZWFyICsgJyAnICsgaG91cnMgKyAnOicgKyBtaW51dGVzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hMb2NhbEl0ZW1zKHJlcXVlc3Q6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IHRoaXMubG9jYWxEYXRhO1xyXG4gICAgY29uc3Qgb3JkZXJCeSA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0RmllbGQocmVxdWVzdC5vcmRlckJ5LCB0cnVlKTtcclxuICAgIGlmIChyZXF1ZXN0LmRpcmVjdGlvbiA9PSBUYWJsZUNvbnN0YW50LkRpcmVjdGlvbi5BU0MpIHtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5zb3J0KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiBhW29yZGVyQnldID4gYltvcmRlckJ5XSA/IDEgOiBhW29yZGVyQnldID09PSBiW29yZGVyQnldID8gMCA6IC0xKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHRoaXMub3B0aW9uLnNvcnQoYSwgYiwgb3JkZXJCeSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLnNvcnQpIHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQuc29ydCgoYjogYW55LCBhOiBhbnkpID0+IGFbb3JkZXJCeV0gPiBiW29yZGVyQnldID8gMSA6IGFbb3JkZXJCeV0gPT09IGJbb3JkZXJCeV0gPyAwIDogLTEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zb3J0KChiOiBhbnksIGE6IGFueSkgPT4gdGhpcy5vcHRpb24uc29ydChhLCBiLCBvcmRlckJ5KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXRlbXM6IGFueVtdID0gW107XHJcbiAgICBpZiAocmVxdWVzdC5wYWdlSW5kZXggPj0gMCAmJiByZXF1ZXN0LnBhZ2VTaXplID4gMCkge1xyXG4gICAgICBjb25zdCBsb2NhbFJlc3VsdCA9IFtdO1xyXG4gICAgICBpZiAocmVxdWVzdC5zZWFyY2hUZXh0ICYmIHRoaXMub3B0aW9uLnNlYXJjaEZpZWxkcyAmJiB0aGlzLm9wdGlvbi5zZWFyY2hGaWVsZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uLnNlYXJjaEZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVzdWx0LmZpbHRlcihzID0+IHRoaXMuZnV6enlzZWFyY2gocmVxdWVzdC5zZWFyY2hUZXh0LCBzW2ZpZWxkXSkpO1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBpZiAobG9jYWxSZXN1bHQuZmluZEluZGV4KHMgPT4gcy5pZCA9PSBpdGVtLmlkKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxSZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3VsdCA9IGxvY2FsUmVzdWx0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZmlsdGVyID0ge307XHJcbiAgICAgIHRoaXMucmV0cmlldmVBZHZhbmNlZEZpbHRlcnModHJ1ZSwgZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuZmlsdGVyQ29sdW1ucykge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgICAgIHZhciB2YWx1ZSA9IGZpbHRlcltjb2x1bW4udmFsdWVSZWYoKV07XHJcbiAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcihzID0+IHRoaXMuZnV6enlzZWFyY2godmFsdWUsIHNbY29sdW1uLnZhbHVlUmVmKCldKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaXRlbXMgPSByZXN1bHQuZmlsdGVyKHMgPT4gKHJlc3VsdC5pbmRleE9mKHMpID49IHJlcXVlc3QucGFnZUluZGV4ICogcmVxdWVzdC5wYWdlU2l6ZSkgJiYgKHJlc3VsdC5pbmRleE9mKHMpIDwgKHJlcXVlc3QucGFnZUluZGV4ICsgMSkgKiByZXF1ZXN0LnBhZ2VTaXplKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZTogVGFibGVSZXNwb25zZTxhbnk+ID0ge1xyXG4gICAgICBpdGVtczogaXRlbXMsXHJcbiAgICAgIHRvdGFsUmVjb3JkczogcmVzdWx0Lmxlbmd0aFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvZihyZXNwb25zZSkucGlwZShkZWxheSgyNTApKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydFVDb2RlKGM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoJ2HDo+G6ocOgw6HhuqPEg8SD4bq14bq34bqx4bqzw6Lhuqvhuq3huqfhuqXhuqknLmluZGV4T2YoYykgPiAtMSkgcmV0dXJuICdhJztcclxuICAgIGlmICgnZMSRJy5pbmRleE9mKGMpID4gLTEpIHJldHVybiAnZCc7XHJcbiAgICBpZiAoJ2/DteG7jcOyw7Phu4/DtOG7l+G7meG7k+G7kcah4buh4buj4bud4bub4bufJy5pbmRleE9mKGMpID4gLTEpIHJldHVybiAnbyc7XHJcbiAgICBpZiAoJ3XFqeG7pcO5w7rhu6fGsOG7r+G7seG7q+G7qeG7rcaw4buv4bux4bur4bup4butJy5pbmRleE9mKGMpID4gLTEpIHJldHVybiAndSc7XHJcbiAgICBpZiAoJ2nEqeG7i8Osw63hu4knLmluZGV4T2YoYykgPiAtMSkgcmV0dXJuICdpJztcclxuICAgIGlmICgneeG7ueG7teG7s8O94bu3Jy5pbmRleE9mKGMpID4gLTEpIHJldHVybiAneSc7XHJcbiAgICBpZiAoJ2Xhur3hurnDqMOp4bq9w6rhu4Xhu4fhu4HDquG7gycuaW5kZXhPZihjKSA+IC0xKSByZXR1cm4gJ2UnO1xyXG4gICAgcmV0dXJuIGM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZ1enp5c2VhcmNoKG5lZWRsZTogYW55LCBoYXlzdGFjazogYW55KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIW5lZWRsZSB8fCAhaGF5c3RhY2spIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGhheXN0YWNrTEMgPSB0aGlzLnJlbW92ZUFsbFNwYWNlcyhoYXlzdGFjay50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgbmVlZGxlTEMgPSB0aGlzLnJlbW92ZUFsbFNwYWNlcyhuZWVkbGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGhsZW4gPSBoYXlzdGFjay50b1N0cmluZygpLmxlbmd0aDtcclxuICAgIGNvbnN0IG5sZW4gPSBuZWVkbGVMQy50b1N0cmluZygpLmxlbmd0aDtcclxuICAgIGlmIChubGVuID4gaGxlbikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobmxlbiA9PT0gaGxlbikge1xyXG4gICAgICByZXR1cm4gbmVlZGxlTEMgPT09IGhheXN0YWNrTEM7XHJcbiAgICB9XHJcbiAgICBvdXRlcjogZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgbmxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5jaCA9IHRoaXMuY29udmVydFVDb2RlKG5lZWRsZUxDW2ldKTtcclxuICAgICAgd2hpbGUgKGogPCBobGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udmVydFVDb2RlKGhheXN0YWNrTENbaisrXSkgPT09IG5jaCkge1xyXG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVBbGxTcGFjZXMoc3RyPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghc3RyKSByZXR1cm4gJyc7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccy9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJpbmRSZXN1bHREYXRhKHJlc3BvbnNlOiBUYWJsZVJlc3BvbnNlPGFueT4sIGtlZXBTZWxlY3RlZEl0ZW1zOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5pdGVtcyA9IHJlc3BvbnNlLml0ZW1zO1xyXG4gICAgdGhpcy50b3RhbFJlY29yZHMgPSByZXNwb25zZS50b3RhbFJlY29yZHM7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBhZ2VzKCk7XHJcblxyXG4gICAgaWYgKCFrZWVwU2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkQWxsID0gdGhpcy5jaGVja2VkQWxsUGFnZUl0ZW1zKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPiB0aGlzLnRvdGFsUGFnZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLnJlY3Vyc2l2ZUNvdW50ZXIrKztcclxuICAgICAgaWYgKHRoaXMucmVjdXJzaXZlQ291bnRlciA8IDMpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEFzeW5jKG51bGwsIHRoaXMudG90YWxQYWdlcy5sZW5ndGggLSAxKS5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZVBhZ2VzKCk6IHZvaWQge1xyXG4gICAgbGV0IHBhZ2VzID0gTWF0aC5mbG9vcih0aGlzLnRvdGFsUmVjb3JkcyAvIHRoaXMucGFnZVNpemUpO1xyXG4gICAgaWYgKHBhZ2VzIDw9IDApIHtcclxuICAgICAgcGFnZXMgPSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudG90YWxSZWNvcmRzICUgdGhpcy5wYWdlU2l6ZSA+IDApIHtcclxuICAgICAgcGFnZXMgKz0gMTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRvdGFsUmVjb3JkcyA8IHRoaXMucGFnZVNpemUpIHtcclxuICAgICAgcGFnZXMgPSAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b3RhbFBhZ2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzOyBpKyspIHtcclxuICAgICAgdGhpcy50b3RhbFBhZ2VzLnB1c2goaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0U29ydEFzeW5jKGN1cnJlbnRDb2x1bW46IFRhYmxlQ29sdW1uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9wdGlvbi5tYWluQ29sdW1ucyA9IHRoaXMub3B0aW9uLm1haW5Db2x1bW5zLm1hcChjb2x1bW4gPT4ge1xyXG4gICAgICBpZiAoY29sdW1uLmlkICE9PSBjdXJyZW50Q29sdW1uLmlkKSBjb2x1bW4uZGlyZWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gY29sdW1uO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRUYWJsZVRhYmxlVGV4dHMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0KSB7XHJcbiAgICAgIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0ID0gbmV3IFRhYmxlVGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dCkgdGhpcy5vcHRpb24uZGlzcGxheVRleHQucGxhY2Vob2xkZXJTZWFyY2ggPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LlBsYWNlaG9sZGVyU2VhcmNoO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmJ0blNlYXJjaCkgdGhpcy5vcHRpb24uZGlzcGxheVRleHQuYnRuU2VhcmNoID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5TZWFyY2g7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24uZGlzcGxheVRleHQuYnRuUmVzZXQpIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmJ0blJlc2V0ID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5SZXNldDtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5hY3Rpb24pIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmFjdGlvbiA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWN0aW9uO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LnNlbGVjdFBhZ2VTaXplKSB0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5zZWxlY3RQYWdlU2l6ZSA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuU2VsZWN0UGFnZVNpemU7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24uZGlzcGxheVRleHQuZGVsZXRlVGl0bGUpIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmRlbGV0ZVRpdGxlID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5EZWxldGVUaXRsZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5idG5BY2NlcHRUaXRsZSkgdGhpcy5vcHRpb24uZGlzcGxheVRleHQuYnRuQWNjZXB0VGl0bGUgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkJ0bkFjY2VwdFRpdGxlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmJ0bkNhbmNlbFRpdGxlKSB0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5idG5DYW5jZWxUaXRsZSA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQnRuQ2FuY2VsVGl0bGVcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5maWx0ZXJUaXRsZSkgdGhpcy5vcHRpb24uZGlzcGxheVRleHQuZmlsdGVyVGl0bGUgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkZpbHRlclRpdGxlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmFwcGx5RmlsdGVyKSB0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5hcHBseUZpbHRlciA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQXBwbHlGaWx0ZXI7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24uZGlzcGxheVRleHQuZGV0YWlsVGl0bGUpIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmRldGFpbFRpdGxlID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5EZXRhaWxUaXRsZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5wYWdlVGl0bGUpIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LnBhZ2VUaXRsZSA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuUGFnZVRpdGxlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmFkdmFuY2VkU2VhcmNoVGl0bGUpIHRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmFkdmFuY2VkU2VhcmNoVGl0bGUgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFkdmFuY2VkU2VhcmNoVGl0bGU7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24uZGlzcGxheVRleHQuYWR2YW5jZWRCdG5UaXRsZSkgdGhpcy5vcHRpb24uZGlzcGxheVRleHQuYWR2YW5jZWRCdG5UaXRsZSA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWR2YW5jZWRCdG5UaXRsZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5hZHZhbmNlZEJ0bkNhbmNlbFRpdGxlKSB0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5hZHZhbmNlZEJ0bkNhbmNlbFRpdGxlID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BZHZhbmNlZEJ0bkNhbmNlbFRpdGxlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLmRpc3BsYXlUZXh0LmFsbFRpdGxlKSB0aGlzLm9wdGlvbi5kaXNwbGF5VGV4dC5hbGxUaXRsZSA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWxsVGl0bGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRUYWJsZVRhYmxlTWVzc2FnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLm1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5vcHRpb24ubWVzc2FnZSA9IG5ldyBUYWJsZU1lc3NhZ2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24ubWVzc2FnZS5ub3RGb3VuZE1lc3NhZ2UpIHRoaXMub3B0aW9uLm1lc3NhZ2Uubm90Rm91bmRNZXNzYWdlID0gVGFibGVDb25zdGFudC5NZXNzYWdlLk5vdEZvdW5kTWVzc2FnZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5tZXNzYWdlLmZvdW5kTWVzc2FnZSkgdGhpcy5vcHRpb24ubWVzc2FnZS5mb3VuZE1lc3NhZ2UgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuRm91bmRNZXNzYWdlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLm1lc3NhZ2UuaW52YWxpZEZvcm1hdE1lc3NhZ2UpIHRoaXMub3B0aW9uLm1lc3NhZ2UuaW52YWxpZEZvcm1hdE1lc3NhZ2UgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuSW52YWxpZEZvcm1hdE1lc3NhZ2U7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24ubWVzc2FnZS5zZWxlY3RlZEl0ZW1zTWVzc2FnZSkgdGhpcy5vcHRpb24ubWVzc2FnZS5zZWxlY3RlZEl0ZW1zTWVzc2FnZSA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5TZWxlY3RlZEl0ZW1zTWVzc2FnZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5tZXNzYWdlLmNvbmZpcm1TZWxlY3RBbGxSZWNvcmRzTWVzc2FnZSkgdGhpcy5vcHRpb24ubWVzc2FnZS5jb25maXJtU2VsZWN0QWxsUmVjb3Jkc01lc3NhZ2UgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuQ29uZmlybVNlbGVjdEFsbFJlY29yZHNNZXNzYWdlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLm1lc3NhZ2UuY29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2UpIHRoaXMub3B0aW9uLm1lc3NhZ2UuY29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2UgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuQ29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2U7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb24ubWVzc2FnZS5kZWxldGVNZXNzYWdlKSB0aGlzLm9wdGlvbi5tZXNzYWdlLmRlbGV0ZU1lc3NhZ2UgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuRGVsZXRlTWVzc2FnZTtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbi5tZXNzYWdlLmxvYWRpbmdNZXNzYWdlKSB0aGlzLm9wdGlvbi5tZXNzYWdlLmxvYWRpbmdNZXNzYWdlID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkxvYWRpbmdNZXNzYWdlO1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9uLm1lc3NhZ2UucmVmTWVzc2FnZSkgdGhpcy5vcHRpb24ubWVzc2FnZS5yZWZNZXNzYWdlID0gVGFibGVDb25zdGFudC5NZXNzYWdlLlJlZk1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRNYWluQ29sdW1ucygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5vcHRpb24ubWFpbkNvbHVtbnMpIHtcclxuICAgICAgdGhpcy5vcHRpb24ubWFpbkNvbHVtbnMgPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMub3B0aW9uLm1haW5Db2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xyXG4gICAgICBpZiAoIWNvbHVtbi50ZXh0QWxpZ24pIGNvbHVtbi50ZXh0QWxpZ24gPSBUYWJsZUNvbnN0YW50LlRleHRBbGlnbi5MZWZ0O1xyXG4gICAgICBpZiAoY29sdW1uICYmICFjb2x1bW4uaWQpIHtcclxuICAgICAgICBjb2x1bW4uaWQgPSB0aGlzLmRhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29sdW1uLmFsbG93RmlsdGVyKSB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSBUYWJsZUNvbHVtblR5cGUuRHJvcGRvd24pIHtcclxuICAgICAgICAgIGlmICghY29sdW1uLmRyb3Bkb3duQ29uZmlndXJhdGlvbikgdGhyb3cgbmV3IEVycm9yKCchY29sdW1uLmRyb3Bkb3duQ29uZmlndXJhdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbHRlckNvbHVtbnMucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyW2NvbHVtbi52YWx1ZVJlZigpXSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vcHRpb24ubWFpbkNvbHVtbnMgPSB0aGlzLm9wdGlvbi5tYWluQ29sdW1ucy5zb3J0KChhOiBUYWJsZUNvbHVtbiwgYjogVGFibGVDb2x1bW4pID0+IGEub3JkZXIgPiBiLm9yZGVyID8gMSA6IGEub3JkZXIgPT09IGIub3JkZXIgPyAwIDogLTEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VmFsaWRhdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb24gJiYgdGhpcy5vcHRpb24ubWFpbkNvbHVtbnMpIHtcclxuICAgICAgdmFyIHZhbGlkYXRpb25PcHRpb25zID0gW107XHJcbiAgICAgIHRoaXMub3B0aW9uLm1haW5Db2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xyXG4gICAgICAgIGlmIChjb2x1bW4udmFsaWRhdGlvbk9wdGlvbikge1xyXG4gICAgICAgICAgY29sdW1uLnZhbGlkYXRpb25PcHRpb24uZHluYW1pYyA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIWNvbHVtbi52YWxpZGF0aW9uT3B0aW9uLnZhbGlkYXRpb25OYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbi52YWxpZGF0aW9uT3B0aW9uLnZhbGlkYXRpb25OYW1lID0gY29sdW1uLnZhbHVlUmVmKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YWxpZGF0aW9uT3B0aW9ucy5wdXNoKGNvbHVtbi52YWxpZGF0aW9uT3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodmFsaWRhdGlvbk9wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciB2YWxpZGF0b3IgPSBuZXcgQ2xpZW50VmFsaWRhdG9yKHtcclxuICAgICAgICAgIGZvcm1SZWY6IHRoaXMud3JhcHBlcixcclxuICAgICAgICAgIG9wdGlvbnM6IHZhbGlkYXRpb25PcHRpb25zLFxyXG4gICAgICAgICAgcGF5bG9hZFJlZjogKCkgPT4gdGhpcy5pdGVtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UuaW5pdCh7IHZhbGlkYXRvciB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpIHtcclxuICAgIGlmICh0aGlzLmdvdG9SZWYpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyLmxpc3Rlbih0aGlzLmdvdG9SZWYubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nLCAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkZXZlbnQud2hpY2g7XHJcbiAgICAgICAgbGV0IG1heCA9ICc5OTk5OTk5JztcclxuICAgICAgICBpZiAodGhpcy5nb3RvUmVmLm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlc1snbWF4J10pIHtcclxuICAgICAgICAgIG1heCA9IHRoaXMuZ290b1JlZi5uYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXNbJ21heCddLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHZhbHVlID49IDQ4ICYmIHZhbHVlIDw9IDU3KSB8fCAodmFsdWUgPj0gOTYgJiYgdmFsdWUgPD0gMTA1KSB8fCB2YWx1ZSA9PSA4IHx8IHZhbHVlID09IDEzKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPj0gNDggJiYgdmFsdWUgPD0gNTcpIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heCkgPCBwYXJzZUludCgkZXZlbnQudGFyZ2V0LnZhbHVlICsgKHBhcnNlSW50KHZhbHVlKSAtIDQ4KSkpIHtcclxuICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlID0gbWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID49IDk2ICYmIHZhbHVlIDw9IDEwNSkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQobWF4KSA8IHBhcnNlSW50KCRldmVudC50YXJnZXQudmFsdWUgKyAocGFyc2VJbnQodmFsdWUpIC0gOTYpKSkge1xyXG4gICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWUgPSBtYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=