import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DashboardService } from '../dashboard.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  query = '';
  startdate = '';
  enddate = '';
  event = '';
  options2: any;
  options3: any;
  newCreateQuery='';
  searchedData=[];
  datakeys=[];
  btnVal="Connect db";
  bardataArr=[{values:[]}];
  dataPieArray=[];
  isshowtable=true;
  isAvailData=false;
  constructor(public dataService: DashboardService) {}

  connectDB(){
     this.btnVal="Loading..."
     this.bardataArr[0].values=[]
    this.dataPieArray=[]
     var querydata={'query':this.query,'startdate':this.startdate,'enddate':this.enddate,'event':this.event}
     console.log('print the query');
     console.log(querydata);
     this.dataService.getQueryResponse(querydata).subscribe(data => {
      console.log("generate order");
      console.log(data);
      this.searchedData = data.resp
      this.newCreateQuery = data.query
      this.isAvailData=true;
      this.datakeys = Object.keys(data.resp[0]);
       for(var i=0; i<this.searchedData.length;i++) {

            var keys=''
            var newKeys= Object.keys(this.searchedData[i]);

            for(var c=0;c<newKeys.length;c++){
              if(this.datakeys.indexOf(newKeys[c]) == -1) {
                this.datakeys.push(newKeys[c]);
              }

              if(newKeys[c]!='count'){
                if(this.searchedData[i][newKeys[c]]!= undefined){
                  keys +=  this.searchedData[i][newKeys[c]] +', '
                }
                }
            }
            var dataDict = {
              'key':keys,
              'y': parseInt(this.searchedData[i]['count'])
            }

            var tmpDicts = {
              'label' : keys,
              'value' : parseInt(this.searchedData[i]['count'])
            }

            this.bardataArr[0].values.push(tmpDicts)
            this.dataPieArray.push(dataDict)

          }

       this.btnVal="Connect db";
       this.loadPieChart();
       this.loadBarChart();
    });

  }


  loadPieChart(){
    this.options2 = {
      chart: {
        type: 'pieChart',
        height: 500,
        margin : {
                      top: 20,
                      right: 20,
                      bottom: 150,
                      left: 55
                  },
        x: function (d) {
          return d.key;
        },
        y: function (d) {
          return d.y;
        },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.0,
        // labelSunbeamLayout: false,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 100,
            left: 55
          }
        }
      }
    };
  }

  loadBarChart() {
    this.options3 = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        showValues: true,
        valueFormat: function (d) {
          return d3.format(',.2f')(d);
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'Month',
          rotateLabels: -90
        },
        yAxis: {
          axisLabel: 'Revenue',
          axisLabelDistance: 30
        }
      }
    }

  }





  // settings = {
  //   columns: {
  //     id: {title: 'ID'},
  //     name: {title: 'Full Name'},
  //     username: {title: 'User Name'},
  //     email: {title: 'Email'}
  //   }
  // };
  //
  // data = [
  //   {
  //     id: 1,
  //     name: "Leanne Graham",
  //     username: "Bret",
  //     email: "Sincere@april.biz"
  //   },
  //   {
  //     id: 11,
  //     name: "Nicholas DuBuque",
  //     username: "Nicholas.Stanton",
  //     email: "Rey.Padberg@rosamond.biz"
  //   }
  // ];
  //
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.loadPieChart();
    this.loadBarChart();
  }

}
