export class Consumer {
    id?: string;
    custom_id?: string;
    tags?: string[];
    username?: string;
    created_at_2: number;
    created_at: number;
}

export class ConsumerRequest {
    pageIndex: number;
    pageSize: number;
    data?: any;
    searchText: any;
}

export class ConsumerResponse {
    status: boolean;
    items: Consumer;
    totalRecords: number;
}

