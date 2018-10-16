import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EntityComponent } from './entity.comp';

export const routes = [
    {
        path: '', children: [
            { path: '', component: EntityComponent },
        ]
    },
];

@NgModule({
    declarations: [EntityComponent],
    imports: [CommonModule,
        FormsModule,
        RouterModule.forChild(routes)],
    exports: [],
    providers: [],
})

export class EntityModule {

}
