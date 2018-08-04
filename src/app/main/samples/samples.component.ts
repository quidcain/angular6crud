import { Component, OnInit, ViewChild } from '@angular/core';
import { Sample } from '../sample';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SampleService } from '../sample.service';
import { catchError, filter, finalize, map, tap, switchMap } from 'rxjs/operators';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ModifySampleDialogComponent } from '../modify-sample-dialog/modify-sample-dialog.component';
import { CancellationDialogComponent } from '../cancellation-dialog/cancellation-dialog.component';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  dataSource: SamplesDataSource;
  displayedColumns = ['id', 'columnA', 'columnB', 'columnC', 'columnD', 'columnE', 'modify', 'modify with popup', 'cancellation'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sampleService: SampleService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new SamplesDataSource(this.sampleService);
    this.dataSource.loadSamples(0, 10);
  }

  getServerData(event?: PageEvent): void {
    this.dataSource.loadSamples(event.pageIndex, event.pageSize);
  }

  clickCancellation(id: number): void {
    const dialogRef = this.dialog.open(CancellationDialogComponent);
    dialogRef.afterClosed()
      .pipe(
        filter(answer => answer),
        switchMap(() => this.sampleService.delete(id))
      )
      .subscribe(() => this.dataSource.loadSamples(this.paginator.pageIndex, this.paginator.pageSize));
  }

  clickModifyWithPopup(id: number): void {
    const dialogRef = this.dialog.open(ModifySampleDialogComponent, {data: {id}});
    dialogRef.afterClosed()
      .pipe(
        filter(answer => !!answer),
        switchMap(sample => this.update(sample))
      )
      .subscribe(() => this.dataSource.loadSamples(this.paginator.pageIndex, this.paginator.pageSize));
  }

  private update(sample: Sample): Observable<any> {
    return this.sampleService.update(sample);
  }
}

export class SamplesDataSource implements DataSource<Sample>{
  private samplesSubject = new BehaviorSubject<Sample[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();
  length = 0;

  constructor(private sampleService: SampleService) { }

  connect(collectionViewer: CollectionViewer): Observable<Sample[]> {
    return this.samplesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.samplesSubject.complete();
    this.loadingSubject.complete();
  }

  loadSamples(pageNumber = null, pageSize = null): void {
    this.loadingSubject.next(true);

    this.sampleService.findAll(pageNumber, pageSize)
      .pipe(
        tap(samplePage => this.length = samplePage.totalPages * samplePage.content.length),
        map(samplePage => samplePage.content),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(samples => this.samplesSubject.next(samples));
  }
}
