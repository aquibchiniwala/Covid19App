import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { District } from 'src/Models/District';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnChanges, OnInit {

  districts:Array<District> = new Array<District>();
  stateName:string='';


  constructor(private service: DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.stateName = params['stateName'];
    });
    this.getDistrictWiseCases(this.stateName);

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
    this.getDistrictWiseCases(this.stateName);
  }

  getDistrictWiseCases(stateName) {

    return this.service.GetDistrictWiseCases().subscribe((response: any) => {
      const elements = response[stateName].districtData;
      for (let index = 0; index < Object.keys(elements).length; index++) {
        this.districts.push(new District(Object.keys(elements)[index],Object.values(elements)[index]['confirmed'],Object.values(elements)[index]['active'],Object.values(elements)[index]['recovered'],Object.values(elements)[index]['deceased']));
      }
      console.log(Object.values(response[stateName].districtData)[0]['active']);
      console.log(this.districts);
    });
  }
}
