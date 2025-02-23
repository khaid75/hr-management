import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

    constructor(private servicen: StorageService, private router: Router){}
    logOut(){
      this.servicen.clean();
      this.router.navigate(['/home']);
    }

}
