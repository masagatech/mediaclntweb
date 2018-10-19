import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class WorkspaceService {
    constructor(private _dataserver: DataService) { }

    // Insert / Update

    saveWorkspaceInfo(req: any) {
        return this._dataserver.post('saveWorkspaceInfo', req);
    }

    // Exists

    existsWorkspace(req: any) {
        return this._dataserver.get('existsWorkspace', req);
    }

    // Get All Data

    getWorkspaceDetails(req: any) {
        return this._dataserver.get('getWorkspaceDetails', req);
    }

    // Get Data By ID

    getWorkspaceByID(req: any) {
        return this._dataserver.get('getWorkspaceByID', req);
    }
}
