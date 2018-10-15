import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class WorkspaceService {
    constructor(private _dataserver: DataService) { }

    getWorkspaceDetails(req: any) {
        return this._dataserver.get('getWrkspace', req);
    }

    exists(req: any) {
        return this._dataserver.get('wrkspcExists', req);
    }

    saveWorkspaceInfo(req: any) {
        return this._dataserver.post('saveWrkspace', req);
    }
}
