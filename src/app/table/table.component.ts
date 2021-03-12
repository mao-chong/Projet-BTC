import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { GetInfoService } from "../getInfo.service";


@Component({
  templateUrl:'./table.component.html',
  styleUrls:['./table.component.scss']
})
export class TableComponent{

  constructor(
    private getInfoService:GetInfoService
  ){}
  private subsciption:Subscription;

  isLoading = false;

  btnDataGroup:{time:string,price:number}[] =  [];
  presentGroup:{time:string,price:number}[] =  [];

  length = 0;
  pageSize = 8;

  ngOnInit(){
    this.isLoading = true;

    this.subsciption = this.getInfoService.getObservableListener().subscribe(result=>{
      // console.log(result)
      var btnData:{time:string,price:number} = {
        time:this.getInfoService.timestampToDateTime(result[0][0],'dd/MM/yyyy HH:mm:ss'),
        price:result[0][1]
      }
      this.btnDataGroup.unshift(btnData);
      this.getInfoService.saveBtc(btnData);
      this.length = this.btnDataGroup.length;
      this.isLoading = false;
    })
     this.getInfoService.getBtc().subscribe(data=>{
       this.btnDataGroup = data.result;
       this.btnDataGroup = this.btnDataGroup.reverse();
       this.length = this.btnDataGroup.length;

       for(var i=0;i<this.length&&i<this.pageSize;i++){
         this.presentGroup[i] = this.btnDataGroup[i];
       }

       this.isLoading = false;
     });


    setInterval(()=>{
      this.isLoading = true;
      var nowTime = new Date().getTime()-1000*3600;
      var lastTime = nowTime - 1000*60;

      this.getInfoService.getData(lastTime,nowTime);

    },5*60*1000)
  }

  changePage(event){
    console.log(event.pageIndex)
    this.presentGroup = [];
    for(var i=0+event.pageIndex*this.pageSize, j=0;i<this.btnDataGroup.length&&i<this.pageSize*(event.pageIndex+1);i++,j++){
      this.presentGroup[j] = this.btnDataGroup[i];
    }
    console.log(this.presentGroup)

  }

  ngOnDestroy(){
    this.subsciption.unsubscribe()
  }
}
