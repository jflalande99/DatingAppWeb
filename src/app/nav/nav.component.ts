import { Component, inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-nav',
    imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {
  public accountService = inject(AccountService)
  private router = inject(Router)
  private toastr = inject(ToastrService)
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error)
      
    })
  }

  logout() {
    this.accountService.logout()
    this.router.navigateByUrl('/');
  }
  
}
