import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-cases-graph',
  templateUrl: './cases-graph.component.html',
  styleUrls: ['./cases-graph.component.css']
})
export class CasesGraphComponent implements OnInit {


  // tslint:disable-next-line: max-line-length
  statePieChartLabels = [];
  statePieChartData = [];
  pieChartType = 'pie';
  constructor(private service: DataService) { }
  totalCases: number = 0;
  activeCases: number = 0;
  recoveredCases: number = 0;
  deathCases: number = 0;

  states:Array<string> = []
  stateTotalCases:Array<string> = []

  ngOnInit() {
    this.service.GetStateWiseCases().subscribe((response: any) => {
      this.totalCases = response.statewise[0].confirmed;
      this.activeCases = response.statewise[0].active;
      this.recoveredCases = response.statewise[0].recovered;
      this.deathCases = response.statewise[0].deaths;

      for (let index = 1; index < response.statewise.length; index++) {
        this.states.push(response.statewise[index].state);
        this.stateTotalCases.push(response.statewise[index].confirmed);
      }

      this.statePieChartLabels =this.states
      this.statePieChartData = this.stateTotalCases;
      console.log(response.statewise[0]);
    });
  }
}
