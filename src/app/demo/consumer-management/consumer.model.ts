import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class ConsumerKongModel {
    custom_id?: string;
    tags?: string[];
    username?: string;
    constructor(custom_id?: string, tags?: string[], username?: string) {
        this.custom_id = custom_id;
        this.tags = tags;
        this.username = username;
    }
}

export class ConsumerViewModel {
    id?: string;
    customId?: string;
    tags?: string[];
    username?: string;
    createdAt: number;
    constructor(id?: string, custom_id?: string, tags?: string[], username?: string, created_at?: number, init?: Partial<ConsumerViewModel>) {
        Object.assign(this, init);
        this.id = id;
        this.customId = custom_id;
        this.tags = tags;
        this.username = username;
        this.createdAt = created_at;
    }
}

export class ConsumerRequest extends BaseRequest<ConsumerViewModel> {
    token?: string;
    payload: ConsumerViewModel = new ConsumerViewModel();
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

export class ConsumerDeleteRequest extends BaseRequest<ConsumerViewModel> {
    ids: string[];
    constructor(init?: Partial<ConsumerDeleteRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ConsumerDeleteResponse extends BaseResponse<ConsumerViewModel> {
    constructor(init?: Partial<ConsumerDeleteResponse>) {
        super();
        Object.assign(this, init);
    }
}


