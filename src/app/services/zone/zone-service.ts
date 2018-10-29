import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class ZoneService {
    constructor(private _dataserver: DataService) { }

    // Insert / Update

    saveZoneInfo(req: any) {
        return this._dataserver.post('saveZoneInfo', req);
    }

    // Get All Data

    getZoneDetails(req: any) {
        return this._dataserver.get('getZoneDetails', req);
    }

    // Get Data By ID

    getZoneByID(req: any) {
        return this._dataserver.get('getZoneByID', req);
    }
}
