import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppBarComponent } from '../usercontrols/appbar/appbar.comp';

import { NgAggregatePipesModule } from 'angular-pipes';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppBarComponent],
    imports: [CommonModule, HttpClientModule,
        NgAggregatePipesModule
    ],
    exports: [CommonModule, HttpClientModule, AppBarComponent, NgAggregatePipesModule],
    providers: [],
})
export class SharedModule {

}
