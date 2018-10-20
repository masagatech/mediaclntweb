import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppBarComponent } from '../usercontrols/appbar/appbar.comp';

import { NgAggregatePipesModule } from 'angular-pipes';

export function HttpLoaderFactory(http: HttpClient) {

}

@NgModule({
    declarations: [AppBarComponent],
    imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, NgAggregatePipesModule],
    exports: [HttpClientModule, AppBarComponent, NgAggregatePipesModule],
    providers: [],
})

export class SharedModule {

}
