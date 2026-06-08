import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../core/account.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-nav',
    imports: [FormsModule, BsDropdownModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {
  protected accountService = inject(AccountService)
  private router = inject(Router)
  private toastr = inject(ToastrService)
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.creds = {};
      },
      error: error => {
        alert(error.message);        
      }
    })
  }

  logout() {
      this.accountService.logout();
    }
  
  
}
