import { HttpHeaders } from '@angular/common/http';

export class SystemConstant {
    public apiURL = 'http://192.168.110.61:8001/';
    public services = 'services';
    public consumers = 'consumers';
    public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
}
