import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { GraficaService } from 'src/app/services/grafica.service';
import { WebsocketService } from 'src/app/services/websocket.service';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit {
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective)
  public chart?: BaseChartDirective;
  constructor(
    private _graficaService: GraficaService,
    public websocketService: WebsocketService
  ) {}
  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  public getData(): void {
    this._graficaService.getData().subscribe((data: any) => {
      this.lineChartData.datasets[0].data = data[0].data;
      this.chart?.update();
    });
  }
  public escucharSocket() {
    this.websocketService.listen('cambio-grafica').subscribe((data: any) => {
      console.log('grafica.component LINE 33 =>', data);
      this.lineChartData.datasets[0].data = data[0].data;
      this.chart?.update();
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [0, 0, 0, 0],
        label: 'Ventas',
      },
    ],
    labels: ['enero', 'febrero', 'marzo', 'abril'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };
}
