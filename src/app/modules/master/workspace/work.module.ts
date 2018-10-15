import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WorkspceComponent } from './work.comp';
import { AddComponent } from './add/add.comp';
import { ViewComponent } from './view/view.comp';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WorkspaceService } from '../../../services/workspace/ws-service';
export const routes = [
    {
        path: '',
        component: WorkspceComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: ViewComponent },
                    { path: 'add', component: AddComponent }
                ]
            },
        ]
    },
];


@NgModule({
    declarations: [WorkspceComponent, AddComponent, ViewComponent],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes), NgxDatatableModule],
    exports: [],
    providers: [WorkspaceService],
})


export class WrkspcModule {

}
