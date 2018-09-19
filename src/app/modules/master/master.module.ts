import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master.comp';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const routes = [
    {
        path: '',
        component: MasterComponent,
        children: [
            {
                path: '',
                children: [
                    // Dashboard

                    { path: '', loadChildren: './dashboard/index#DashboardModule' },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
    ],

    declarations: [
        MasterComponent
    ],

    providers: []
})

export class MasterModule {

}
