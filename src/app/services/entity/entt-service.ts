import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class EntityService {
    constructor(private _dataserver: DataService) { }

    // Insert / Update

    saveEntityInfo(req: any) {
        return this._dataserver.post('saveEntityInfo', req);
    }

    // Exists

    existsEntity(req: any) {
        return this._dataserver.get('existsEntity', req);
    }

    // Get All Data

    getEntityDetails(req: any) {
        return this._dataserver.get('getEntityDetails', req);
    }

    // Get Data By ID

    getEntityByID(req: any) {
        return this._dataserver.get('getEntityByID', req);
    }
}
