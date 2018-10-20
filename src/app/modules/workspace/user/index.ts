import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserService } from '../../../services/users/user-service';
import { CommonService } from '../../../services/common/common-service';

import { AddUserComponent } from './add/adduser.comp';
import { ViewUserComponent } from './view/viewuser.comp';

import { AutoCompleteModule } from 'primeng/primeng';

export const routes = [
    {
        path: '',
        children: [
            { path: '', component: ViewUserComponent },
            { path: 'add', component: AddUserComponent },
            { path: 'edit/:id', component: AddUserComponent }
        ]
    },
];

@NgModule({
    declarations: [
        AddUserComponent, ViewUserComponent
    ],

    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgxDatatableModule,
        AutoCompleteModule
    ],

    exports: [],

    providers: [UserService, CommonService]
})

export class UserMasterModule {

}
