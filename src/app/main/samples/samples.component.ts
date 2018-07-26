import { Component, OnInit } from '@angular/core';
import { Sample } from '../sample';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SampleService } from '../sample.service';
import { catchError, finalize, map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  dataSource: SamplesDataSource;
  displayedColumns = ['id', 'columnA', 'columnB', 'columnC', 'columnD', 'columnE'];

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.dataSource = new SamplesDataSource(this.sampleService);
    this.dataSource.loadSamples();
  }
}

export class SamplesDataSource implements DataSource<Sample>{
  private samplesSubject = new BehaviorSubject<Sample[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private sampleService: SampleService) { }

  connect(collectionViewer: CollectionViewer): Observable<Sample[]> {
    return this.samplesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.samplesSubject.complete();
    this.loadingSubject.complete();
  }

  loadSamples(): void {
    this.loadingSubject.next(true);

    this.sampleService.findAll()
      .pipe(
        map(samplesPage => samplesPage.content),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(samples => this.samplesSubject.next(samples));
  }
}
