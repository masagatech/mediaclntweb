import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../../services/workspace/ws-service';

@Component({
    selector: 'app-wrk-view',
    templateUrl: './view.comp.html'
})
export class ViewComponent implements OnInit {

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];
    items = [];

    constructor(private _wsservice: WorkspaceService) {
        // for (let i = 0; i < 50; i++) {
        //     this.items.push({});
        // }
    }

    ngOnInit(): void {

        this._wsservice.getWorkspaceDetails({}).subscribe((d) => {
            console.log(d.data)
            this.items = d.data;
        }, (err) => {

        }, () => {

        });
    }
}
