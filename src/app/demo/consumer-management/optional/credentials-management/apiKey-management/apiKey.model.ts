import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class ApiKeyKongModel {
    key?:string;
    tags?: string[];
    constructor(key?: string, tags?: string[]) {
        this.key = key
        this.tags = tags;
    }
}

export class ApiKeyViewModel {
    id?: string;
    key?: string;
    tags?: string[];
    createdAt: number;
    constructor(id?: string, tags?: string[], key?: string, created_at?: number, init?: Partial<ApiKeyViewModel>) {
        Object.assign(this, init);
        this.id = id;
        this.tags = tags;
        this.key = key
        this.createdAt = created_at;
    }
}

export class ApiKeyRequest extends BaseRequest<ApiKeyViewModel> {
    token?: string;
    payload: ApiKeyViewModel = new ApiKeyViewModel();
    constructor(init?: Partial<ApiKeyRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ApiKeyResponse extends BaseResponse<ApiKeyViewModel> {
    consumer?: ApiKeyViewModel;
    token?: string;
    constructor(init?: Partial<ApiKeyResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ApiKeySearchRequest extends SearchBaseRequest {
    token?: string;
    constructor(init?: Partial<ApiKeySearchRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ApiKeySearchResponse extends SearchBaseResponse<ApiKeyViewModel> {
    token?: string;
    constructor(init?: Partial<ApiKeySearchResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ApiKeyDeleteRequest extends BaseRequest<ApiKeyViewModel> {
    ids: string[];
    constructor(init?: Partial<ApiKeyDeleteRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ApiKeyDeleteResponse extends BaseResponse<ApiKeyViewModel> {
    constructor(init?: Partial<ApiKeyDeleteResponse>) {
        super();
        Object.assign(this, init);
    }
}