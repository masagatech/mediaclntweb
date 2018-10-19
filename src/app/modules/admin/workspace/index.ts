import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WorkspaceService } from '../../../services/workspace/ws-service';

import { AddWorkspaceComponent } from './add/addws.comp';
import { ViewWorkspaceComponent } from './view/viewws.comp';

export const routes = [
    {
        path: '',
        children: [
            { path: '', component: ViewWorkspaceComponent },
            { path: 'add', component: AddWorkspaceComponent },
            { path: 'edit/:id', component: AddWorkspaceComponent }
        ]
    },
];

@NgModule({
    declarations: [
        AddWorkspaceComponent, ViewWorkspaceComponent
    ],

    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgxDatatableModule
    ],

    exports: [],

    providers: [WorkspaceService],
})

export class WorkspaceMasterModule {

}