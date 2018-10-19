import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EntityService } from '../../../services/entity/entt-service';

import { AddEntityComponent } from './add/addentt.comp';
import { ViewEntityComponent } from './view/viewentt.comp';

export const routes = [
    {
        path: '',
        children: [
            { path: '', component: ViewEntityComponent },
            { path: 'add', component: AddEntityComponent },
            { path: 'edit/:id', component: AddEntityComponent }
        ]
    },
];

@NgModule({
    declarations: [
        AddEntityComponent, ViewEntityComponent
    ],

    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgxDatatableModule
    ],

    exports: [],

    providers: [EntityService],
})

export class EntityMasterModule {

}
