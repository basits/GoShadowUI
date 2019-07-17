import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            // {path: 'products', component: ProductlistComponent},
            // { path: 'product/:id'
            // , canActivate: [ ProductDetailGuard ]
            // , component: ProductDetialComponent},
            // {path: 'new/product', component: ProductNewComponent}

            {
                path: '',
                component: HomeComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: []
})

export class HomeModule { }