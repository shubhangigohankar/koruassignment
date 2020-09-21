import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertserviceService} from '../alertservice.service';
import {MatTableDataSource} from '@angular/material';
import { Alertdata } from '../alertdata';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit, AfterViewInit  {
  TotalRow: number;
  constructor(private formBuilder: FormBuilder, public alertser: AlertserviceService, private router: Router, private ngZone: NgZone) {
    this.loadAddDetails();
  }
  displayedColumns = [ 'select', 'name', 'description', 'webReference'];
  ProductList: any = [] ;
  data = Object.assign( this.ProductList);
  public dataSource = new MatTableDataSource<Alertdata>(this.data);
  selection = new SelectionModel < Alertdata > (true, []);
  @ViewChild (MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  addForm: FormGroup ;
  submitted = false;

  ngAfterViewInit(): void {
    this.loadAddDetails();
    
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  highlight(element: Alertdata) {
    element.highlighted = !element.highlighted;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
}
masterToggle() {
  this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
}

checkboxLabel(row: Alertdata): string {
  if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
}
  loadAddDetails() {
    return this.alertser.GetAlerts().subscribe(data => {
      this.ProductList = data;
      this.dataSource = this.ProductList;
      this.dataSource = new MatTableDataSource(this.ProductList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }) ;
      }
  ngOnInit() {

    this.loadAddDetails();
    this.adddetails();

  }
  adddetails() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      webReference: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    this.alertser.CreateAlert(this.addForm.value).subscribe(res => {
      console.log('Details added!');
      this.loadAddDetails();
      this.addForm.reset();

  });
  }
  DeleteData() {
    let alertname;
    // tslint:disable-next-line: only-arrow-functions
    // tslint:disable-next-line: one-variable-per-declaration
    // tslint:disable-next-line: only-arrow-functions
    const numSelected = this.selection.selected.filter(function(user) {
       alertname = user.id ;
      });
    if (confirm('Are you sure to delete items ')) {
            this.alertser.DeleteAlert(alertname).subscribe(result => {
                this.loadAddDetails();
            });
        }
    
}


}
