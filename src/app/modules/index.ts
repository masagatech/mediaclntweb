import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModuleComponent } from './module.comp';
import { SharedModule } from '../shared/shared-module';

export const routes = [
    {
        path: '',
        component: ModuleComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', loadChildren: './master/master.module#MasterModule' },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule,
    ],
    declarations: [
        ModuleComponent
    ],
    exports: [],
    providers: [],
})

export class MainModule {

}
