import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class WorkspaceService {
    constructor(private _dataserver: DataService) { }

    // Insert / Update

    saveWorkspace(req: any) {
        return this._dataserver.post('saveWorkspace', req);
    }

    // Exists

    existsWorkspace(req: any) {
        return this._dataserver.get('existsWorkspace', req);
    }

    // Get All Data

    getAllWorkspace(req: any) {
        return this._dataserver.get('getAllWorkspace', req);
    }

    // Get Data By ID

    getWorkspaceByID(req: any) {
        return this._dataserver.get('getWorkspaceByID', req);
    }
}
