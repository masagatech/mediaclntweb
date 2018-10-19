import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';

import { ModulesComponent } from './modules.comp';

export const routes = [
    {
        path: '',
        component: ModulesComponent,
        children: [
            {
                path: '',
                children: [
                    // Admin
                    { path: 'admin', loadChildren: './admin#AdminModule' },

                    // Workspace
                    { path: 'workspace', loadChildren: './workspace#WorkspaceModule' },

                    // Entity
                    { path: '', loadChildren: './entity#EntityModule' },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), SharedModule
    ],

    declarations: [
        ModulesComponent
    ],

    exports: [],
    providers: [],
})

export class ModulesModule {

}
