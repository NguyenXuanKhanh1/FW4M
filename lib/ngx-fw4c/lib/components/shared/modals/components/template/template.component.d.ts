import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
import { TemplateViewModel } from '../../modal.model';
import { LoaderComponent } from '../../../loader/loader.component';
import { AggregatorService } from '../../../services/aggregator.service';
export declare class TemplateComponent {
    private _sanitizationService;
    private _aggregatorService;
    _modalRef: BsModalRef;
    loader: LoaderComponent;
    data: TemplateViewModel;
    protected close: Function;
    protected key: string;
    constructor(_sanitizationService: DomSanitizer, _aggregatorService: AggregatorService, _modalRef: BsModalRef);
    bypassSecurityTrustHtml(html: string): SafeHtml;
    cancel(): void;
    accept(close: any): void;
    show(): boolean;
    isValid(): boolean;
    setKey(callback: () => any): void;
}
