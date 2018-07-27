import { Component, OnInit, ViewChild } from '@angular/core';
import { Sample } from '../sample';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SampleService } from '../sample.service';
import { catchError, finalize, map, tap } from 'rxjs/internal/operators';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  dataSource: SamplesDataSource;
  displayedColumns = ['id', 'columnA', 'columnB', 'columnC', 'columnD', 'columnE'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.dataSource = new SamplesDataSource(this.sampleService);
    this.dataSource.loadSamples();
  }

  getServerData(event?: PageEvent): void {
    this.dataSource.loadSamples(event.pageIndex, event.pageSize);
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
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(samples => this.samplesSubject.next(samples));
  }
}
