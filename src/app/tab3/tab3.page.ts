import { Component } from '@angular/core';
import { Setup } from '../shared/models/setup';
import { SetupService } from '../shared/api/setup/setup.service';
import { ProtectedPage } from '../shared/protected-page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page extends ProtectedPage {
  constructor(private api: SetupService) {
    super()
  }
  public setups: Setup[] = [];

  async ngOnInit(){
    this.setups = await this.api.getAll()
  }
}
