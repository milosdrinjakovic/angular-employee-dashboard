import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EmployeeService } from '../services/employee.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';  

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css']
})
export class EmployeeChartComponent implements OnInit {
  public pieChart: any;

  constructor(private employeeService: EmployeeService) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);  
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      const labels = data.map(e => e.name);
      const dataValues = data.map(e => e.totalHours);

      this.pieChart = new Chart('pieChartCanvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: dataValues,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ],
            borderColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ],
            borderWidth: 2,
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ],
            hoverBorderColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw} hours`;
                }
              }
            },
            datalabels: {
              color: '#fff', 
              formatter: (value: any, ctx: any) => {
                let sum = 0;
                const dataArr = ctx.chart.data.datasets[0].data;
                dataArr.forEach((data: any) => {
                  sum += data;
                });
                const percentage = (value * 100 / sum).toFixed(2) + "%";
                return percentage;
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      });
    });
  }
}
