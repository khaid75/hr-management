import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private servicen: StorageService, private router: Router){}
  logOut(){
    this.servicen.clean();
    this.router.navigate(['/home']);
  }

}
