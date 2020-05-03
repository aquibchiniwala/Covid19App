import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import * as $ from 'jquery';
import { INews } from 'src/Models/INews';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnChanges, OnInit {

  News: Array<INews> = new Array<INews>();
  userRole;

  defaultImg: string = '../../assets/default-img.png';

  constructor(private service: DataService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userRole = this.authService.user.role

    this.getNews();

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
    this.getNews();
  }

  getNews() {
    return this.service.GetNews().subscribe(data => {
      this.News = data;
    });
  }

  deleteNews(id: number) {
    this.service.DeleteNews(id).subscribe(data => {
      // tslint:disable-next-line: triple-equals
      const index: number = this.News.findIndex(n => n.id == id);
      // tslint:disable-next-line: triple-equals
      if (index != -1) {
        this.News.splice(index, 1);
      }
      this.toastr.success('News Deleted Sucessfully', 'Covid-19 Portal');
    },
      error => {
        this.toastr.error(error.error, 'Covid-19 Portal');
      });
  }
}
