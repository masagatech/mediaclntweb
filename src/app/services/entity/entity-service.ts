import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';
@Injectable()
export class EntityService {

    constructor(private _dataserver: DataService) { }

    geEntityDetails(req: any) {
        return this._dataserver.get('getWrkspace', req);
    }

    exists(req: any) {
        return this._dataserver.get('wrkspcExists', req);
    }

    saveEntityInfo(req: any) {
        return this._dataserver.post('saveWrkspace', req);
    }


}
