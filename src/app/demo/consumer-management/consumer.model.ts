import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

//consumer
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

//group
export class GroupViewModel {
	id?: string;
	name?: string;
	createdAt: number;
	constructor(id?: string, name?: string, created_at?:number, init?: Partial<GroupViewModel>) {
		Object.assign(this, init);
		this.id = id;
		this.name = name;
		this.createdAt = created_at;
	}
}

export class GroupRequest extends BaseRequest<GroupViewModel> {
	token?: string;
	payload: GroupViewModel = new GroupViewModel();
	constructor(init?: Partial<GroupRequest>) {
		super();
		Object.assign(this, init);
	}
}
export class GroupResponse extends BaseResponse<GroupViewModel> {
	group?: GroupViewModel;
	token?: string;
	constructor(init?: Partial<GroupResponse>) {
		super();
		Object.assign(this, init);
	}
}


export class GroupSearchRequest extends SearchBaseRequest {
	token?: string;
	constructor(init?: Partial<GroupSearchRequest>) {
		super();
		Object.assign(this, init);
	}
}

export class GroupSearchResponse extends SearchBaseResponse<GroupViewModel> {
	token?: string;
	constructor(init?: Partial<GroupSearchResponse>) {
		super();
		Object.assign(this, init);
	}
}

export class GroupDeleteRequest extends BaseRequest<GroupViewModel> {
	ids: string[];
	constructor(init?: Partial<GroupDeleteRequest>) {
		super();
		Object.assign(this, init);
	}
}

export class GroupDeleteResponse extends BaseResponse<GroupViewModel> {
	constructor(init?: Partial<GroupDeleteResponse>) {
		super();
		Object.assign(this, init);
	}
}