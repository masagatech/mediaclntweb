import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppBarComponent } from '../usercontrols/appbar/appbar.comp';

import { NgAggregatePipesModule } from 'angular-pipes';

export function HttpLoaderFactory(http: HttpClient) {

}

@NgModule({
    declarations: [AppBarComponent],
    imports: [CommonModule, HttpClientModule, NgAggregatePipesModule],
    exports: [CommonModule, HttpClientModule, AppBarComponent, NgAggregatePipesModule],
    providers: [],
})

export class SharedModule {

}
