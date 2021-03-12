import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Subscription } from "rxjs";
import { GetInfoService } from "../getInfo.service";

@Component({
  templateUrl:'./chart.component.html',
  styleUrls:['./chart.component.scss']
})
export class ChartComponent{

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Price'},
  ];
  public lineChartColors:Color[] = [{ // grey
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(100,100,0,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }]

  isLoading = false;

  subsciption:Subscription;

  constructor(
    private http:HttpClient,
    private getInfoService:GetInfoService
  ){}

  ngOnInit(){

    var nowTime = new Date().getTime() - 1000*3600;
    var yesterdayTime = nowTime - 1000*3600*24;

    this.isLoading = true;

    this.getInfoService.getData(yesterdayTime,nowTime);
    this.subsciption=this.getInfoService.getObservableListener().subscribe((data:Object[])=>{
      for(var i=0;i<data.length;i++){
        this.barChartLabels[i]=this.getInfoService.timestampToDateTime(data[i][0],'dd/MM/yyyy HH:mm');
        this.barChartData[0].data[i]=data[i][1];
      }

      this.isLoading = false;

      console.log(this.barChartLabels);
    })

  }
  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }







}
