import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

import { EntityComponent } from './entity.comp';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const routes = [
    {
        path: '',
        component: EntityComponent,
        children: [
            {
                path: '',
                children: [
                    // Dashboard
                    { path: '', loadChildren: './dashboard/index#DashboardModule' },
                    
                    // Zone
                    { path: 'zone', loadChildren: './zone/index#ZoneMasterModule' },
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
        EntityComponent
    ],

    providers: []
})

export class EntityModule {

}
