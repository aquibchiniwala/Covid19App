import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/Models/State';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnChanges, OnInit {

  states:Array<State> = new Array<State>();


  constructor(private service: DataService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getStateWiseCases();

    $('.filterable .btn-filter').click(function () {
      const $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
      if ($filters.prop('disabled') == true) {
        $filters.prop('disabled', false);
        $filters.first().focus();
      } else {
        $filters.val('').prop('disabled', true);
        $tbody.find('.no-result').remove();
        $tbody.find('tr').show();
      }
    });

    $('.filterable .filters input').keyup(function (e) {
      /* Ignore tab key */
      const code = e.keyCode || e.which;
      if (code.toString() == '9') { return; }
      /* Useful DOM data and selectors */
      // tslint:disable-next-line: one-variable-per-declaration
      const $input = $(this),
        inputContent = $input.val().toString().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
      /* Dirtiest filter function ever ;) */
      const $filteredRows = $rows.filter(function () {
        const value = $(this).find('td').eq(column).text().toLowerCase();
        return value.indexOf(inputContent) === -1;
      });
      /* Clean previous no-result if exist */
      $table.find('tbody .no-result').remove();
      /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
      $rows.show();
      $filteredRows.hide();
      /* Prepend no-result row if all rows are filtered */
      if ($filteredRows.length === $rows.length) {
        // tslint:disable-next-line: max-line-length
        $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
      }
    });
  }

  ngOnChanges() {
    this.getStateWiseCases();
  }

  getStateWiseCases() {

    return this.service.GetStateWiseCases().subscribe((response: any) => {
      for (let index = 0; index < response.statewise.length; index++) {
        this.states.push( new State(response.statewise[index].state,response.statewise[index].confirmed,response.statewise[index].active,response.statewise[index].recovered,response.statewise[index].deaths));
      }
    });
  }

  getDistrictWiseCases(stateName){
    if(stateName=='Total'){
      this.router.navigateByUrl('dashboard');
    }
    else{
    this.router.navigate(['dashboard/districtwise'], { queryParams: { stateName: stateName}});
    }
  }
}
