import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class BasicAuthKongModel {
    username?: string;
    password?:string;
    tags?: string[];
    constructor(username?: string, password?: string, tags?: string[]) {
        this.username = username;
        this.password = password;
        this.tags = tags;
    }
}

export class BasicAuthViewModel {
    id?: string;
    tags?: string[];
    username?: string;
    password?: string;
    createdAt: number;

    constructor(id?: string, tags?: string[], username?: string, password?: string, created_at?: number, init?: Partial<BasicAuthViewModel>) {
        Object.assign(this, init);
        this.id = id;
        this.tags = tags;
        this.username = username;
        this.password = password
        this.createdAt = created_at;
    }
}

export class BasicAuthRequest extends BaseRequest<BasicAuthViewModel> {
    token?: string;
    payload: BasicAuthViewModel = new BasicAuthViewModel();
    constructor(init?: Partial<BasicAuthRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class BasicAuthResponse extends BaseResponse<BasicAuthViewModel> {
    consumer?: BasicAuthViewModel;
    token?: string;
    constructor(init?: Partial<BasicAuthResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class BasicAuthSearchRequest extends SearchBaseRequest {
    token?: string;
    constructor(init?: Partial<BasicAuthSearchRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class BasicAuthSearchResponse extends SearchBaseResponse<BasicAuthViewModel> {
    token?: string;
    constructor(init?: Partial<BasicAuthSearchResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class BasicAuthDeleteRequest extends BaseRequest<BasicAuthViewModel> {
    ids: string[];
    constructor(init?: Partial<BasicAuthDeleteRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class BasicAuthDeleteResponse extends BaseResponse<BasicAuthViewModel> {
    constructor(init?: Partial<BasicAuthDeleteResponse>) {
        super();
        Object.assign(this, init);
    }
}
