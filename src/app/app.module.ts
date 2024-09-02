import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { BaseChartDirective } from 'ng2-charts';
import { EmployeeChartComponent } from './employee-chart/employee-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseChartDirective

   ],
   exports: [
      
   ],
  providers: [provideHttpClient()] ,
  bootstrap: [AppComponent]
})
export class AppModule { }

