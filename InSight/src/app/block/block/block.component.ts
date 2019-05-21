import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { Result } from '../../models';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// @ts-ignore
@Component({
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  id$: Observable<number>;
  block$: Observable<Result<any>>;
  accessToken$: string;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService
  ) { }

  // @ts-ignore
  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => +params.id)
    );

    this.block$ = this.id$.pipe(
      switchMap(id => this.eosService.getBlockRaw(id))
    );
  }

}
