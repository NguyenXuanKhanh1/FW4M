import { Service } from './service';

export class ServiceRequest {
    pageIndex: number;

}

export class ServiceResponse {
    status: boolean;
    items: Service;
    totalRecords: number;
}