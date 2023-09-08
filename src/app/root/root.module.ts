import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import { RootContainerComponent } from './components/root-container/root-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LoaderViewComponent } from './components/loader-view/loader-view.component';
import { MatChipsModule} from '@angular/material/chips';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterComponent } from './components/filter/filter.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    RootContainerComponent,
    LoaderViewComponent,
    PaginatorComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    BrowserModule,
    FlexModule,
    HttpClientModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule
  ],
  bootstrap: [RootContainerComponent]
})
export class RootModule { }
