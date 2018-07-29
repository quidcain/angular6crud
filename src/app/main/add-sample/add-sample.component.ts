import { Component, Input, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';
import { Sample } from '../sample';

@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.scss']
})
export class AddSampleComponent implements OnInit {
  @Input() sample: Sample;

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.sample = new Sample();
  }

  add(): void {
    this.sampleService.create(this.sample).subscribe();
  }

}
