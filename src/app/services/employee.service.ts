import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        const employeeMap = new Map<string, { name: string, totalHours: number, id: string }>();
        
        data.forEach(entry => {
          const start = new Date(entry.StarTimeUtc);
          const end = new Date(entry.EndTimeUtc);
          const hoursWorked = ((end.getTime() - start.getTime()) / (1000 * 60 * 60));
          const roundedHours = Math.round(hoursWorked)
          const id = entry.Id
          
          if (!employeeMap.has(entry.EmployeeName)) {
            employeeMap.set(entry.EmployeeName, { name: entry.EmployeeName, totalHours: 0, id : id });
          }

          employeeMap.get(entry.EmployeeName)!.totalHours += roundedHours;
        });

        return Array.from(employeeMap.values());
      })
    );
  }
}
