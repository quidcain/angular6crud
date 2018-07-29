import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SampleService } from '../sample.service';
import { Sample } from '../sample';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modify-sample-dialog',
  templateUrl: './modify-sample-dialog.component.html',
  styleUrls: ['./modify-sample-dialog.component.scss']
})
export class ModifySampleDialogComponent implements OnInit {
  @Input() sample: Sample;

  constructor(private sampleService: SampleService,
              private dialogRef: MatDialogRef<ModifySampleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.getSample().subscribe((sample) => this.sample = sample);
  }

  private getSample(): Observable<any> {
    return this.sampleService.getById(this.data.id);
  }
}
