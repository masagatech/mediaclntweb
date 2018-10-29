import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ZoneService } from '../../../services/zone/zone-service';

import { AddZoneComponent } from './add/addzone.comp';
import { ViewZoneComponent } from './view/viewzone.comp';

export const routes = [
    {
        path: '',
        children: [
            { path: '', component: ViewZoneComponent },
            { path: 'add', component: AddZoneComponent },
            { path: 'edit/:id', component: AddZoneComponent }
        ]
    },
];

@NgModule({
    declarations: [
        AddZoneComponent, ViewZoneComponent
    ],

    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgxDatatableModule
    ],

    exports: [],

    providers: [ZoneService],
})

export class ZoneMasterModule {

}
