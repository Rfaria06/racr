import { Component } from '@angular/core';
import { Setup } from '../shared/models/setup';
import { SetupService } from '../shared/api/setup/setup.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private api: SetupService) {}
  public setups: Setup[] = [];

  async ngOnInit(){
    this.setups = await this.api.getAll()
  }
}
