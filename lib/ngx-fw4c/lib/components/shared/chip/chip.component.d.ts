import { OnDestroy, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { ValidationService } from '../validation/validation.service';
export declare class ChipComponent implements OnDestroy {
    protected dataService: DataService;
    title: string;
    model: string[];
    placeholder: string;
    maxItems: number;
    disabled: boolean;
    validationName: string;
    validationScope: string;
    emitNullOnDestroy: boolean;
    validationService: ValidationService;
    modelChange: EventEmitter<string[]>;
    onAdd: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    constructor(dataService: DataService);
    ngOnDestroy(): void;
    handleBlur($event: any): void;
}
