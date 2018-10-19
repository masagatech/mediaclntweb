import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

import { AdminComponent } from './admin.comp';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                children: [
                    // Workspace
                    { path: 'workspace', loadChildren: './workspace/index#WorkspaceMasterModule' },
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
        AdminComponent
    ],

    providers: []
})

export class AdminModule {

}
