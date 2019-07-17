import { NgModule } from "@angular/core";
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatIconModule, MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatCardModule,
  MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule,
  MatInputModule, MatSortModule, MatTabsModule, MatButtonToggleModule,
  MatChipsModule, MatRadioModule, MatOptionModule, MatSelectModule,
  MatTooltipModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatExpansionModule, MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule, MatTableModule, MatPaginatorModule, MatStepper, 
} from "@angular/material";

@NgModule({
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule, MatButtonToggleModule,
    MatChipsModule, MatTabsModule, MatRadioModule,
    MatDialogModule, MatInputModule,
    MatTooltipModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule,
  ],

  exports: [
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule, MatSortModule,
    MatButtonModule, MatTabsModule,
    MatButtonToggleModule, MatChipsModule,
    MatCheckboxModule, MatRadioModule,
    MatFormFieldModule, MatDialogModule,
    MatInputModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule,MatStepperModule
  ]
})
export class MaterialModule { }