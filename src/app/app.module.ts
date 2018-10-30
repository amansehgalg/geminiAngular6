import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import 'd3';
import 'nvd3';
import {NvD3Module} from 'ng2-nvd3';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardService } from './dashboard.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatTableModule,
    NvD3Module,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule,




  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
