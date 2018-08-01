import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleService } from '../sample.service';
import { Sample } from '../sample';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modify-sample',
  templateUrl: './modify-sample.component.html',
  styleUrls: ['./modify-sample.component.scss']
})
export class ModifySampleComponent implements OnInit {
  @Input() sample: Sample;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sampleService: SampleService) { }

  ngOnInit(): void {
    this.getSample().subscribe((sample) => this.sample = sample);
  }

  private getSample(): Observable<any> {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.sampleService.getById(id);
  }

  modify(): void {
    this.sampleService.update(this.sample)
      .subscribe(() => this.router.navigate(['../'], {relativeTo: this.route}));
  }
}
