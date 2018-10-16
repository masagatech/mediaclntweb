import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';
@Injectable()
export class EntityService {

    constructor(private _dataserver: DataService) { }

    getEntity(req: any) {
        return this._dataserver.get('getEntity', req);
    }

    existsEntity(req: any) {
        return this._dataserver.get('existsEntity', req);
    }

    saveEntity(req: any) {
        return this._dataserver.post('saveEntity', req);
    }


}
