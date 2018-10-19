import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

import { WorkspaceComponent } from './workspace.comp';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const routes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            {
                path: '',
                children: [
                    // Entity
                    { path: 'entity', loadChildren: './entity/index#EntityMasterModule' },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), SharedModule, FormsModule, CommonModule,
    ],

    declarations: [
        WorkspaceComponent
    ],

    providers: []
})

export class WorkspaceModule {

}
