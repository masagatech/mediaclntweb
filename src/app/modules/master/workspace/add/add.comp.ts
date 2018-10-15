import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../../services/workspace/ws-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wrk-add',
    templateUrl: './add.comp.html',
    providers: []
})
export class AddComponent implements OnInit {

    formd = {
        _id: 0,
        ws_code: '',
        ws_name: '',
        desc: '',
        login_code: '',
        pwd: '',
        contact_person: '',
        mobile: '',
        email: '',
        address: ''
    };

    savedisabled = true;

    constructor(private _wsservice: WorkspaceService, private toastr: ToastrService) { }

    ngOnInit(): void { }

    save(): void {
        this._wsservice.saveWorkspaceInfo(this.formd).subscribe((d) => {
            this.toastr.success('success', 'Done');
        }, (err) => {

        }, () => {

        });
    }

    onWsBlur() {
        this._wsservice.exists({ 'ws_code': this.formd.ws_code }).subscribe((d) => {
            // this.toastr.success('success', d.status + "");
            this.savedisabled = d.status;
        }, (err) => {

        }, () => {

        });

    }


    clear(): void {
        this.formd = {
            _id: 0,
            ws_code: '',
            ws_name: '',
            desc: '',
            login_code: '',
            pwd: '',
            contact_person: '',
            mobile: '',
            email: '',
            address: ''
        };
    }
}
