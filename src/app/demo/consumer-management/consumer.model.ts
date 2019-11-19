import { Consumer } from './consumer';

export class ConsumerRequest {
    pageIndex: number;
}
export class ConsumerResponse {
    status: boolean;
    items: Consumer;
    totalRecords: number;
}