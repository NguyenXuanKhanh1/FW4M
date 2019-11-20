export class Consumer {
    id?: string;
    custom_id?: string;
    tags?: string[];
    username?: string;
}

export class ConsumerRequest {
    pageIndex: number;
}

export class ConsumerResponse {
    status: boolean;
    items: Consumer;
    totalRecords: number;
}

