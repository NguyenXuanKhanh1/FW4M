import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class ConsumerViewModel {
    id?: string;
    customId?: string;
    tags?: string[];
    username?: string;
    createdAtText: number;
    createdAt: number;
    constructor(init?: Partial<ConsumerViewModel>) {
        Object.assign(this, init);
    }
}

export class ConsumerRequest extends BaseRequest<ConsumerViewModel> {
    token?: string;
    payload: ConsumerViewModel = new ConsumerViewModel({});
    constructor(init?: Partial<ConsumerRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ConsumerResponse extends BaseResponse<ConsumerViewModel> {
    consumer?: ConsumerViewModel;
    token?: string;
    constructor(init?: Partial<ConsumerResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ConsumerSearchRequest extends SearchBaseRequest {
    token?: string;
    constructor(init?: Partial<ConsumerSearchRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ConsumerSearchResponse extends SearchBaseResponse<ConsumerViewModel> {
    token?: string;
    constructor(init?: Partial<ConsumerSearchResponse>) {
        super();
        Object.assign(this, init);
    }
}


