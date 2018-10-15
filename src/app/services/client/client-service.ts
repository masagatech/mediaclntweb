import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class ClientService {
    constructor(private _dataserver: DataService) { }

    getClients(req: any) {
        return this._dataserver.get('getClients', req);
    }

    updateClient(req: any) {
        return this._dataserver.post('updateClient', req);
    }

    getClientDetails(req: any) {
        return this._dataserver.get('getClientDetails', req);
    }
}
