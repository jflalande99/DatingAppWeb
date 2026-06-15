import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../core/account.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from 'src/core/toast-service.service';


@Component({
    selector: 'app-nav',
    imports: [FormsModule, RouterLink, RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {
  protected accountService = inject(AccountService)
  private router = inject(Router)
  private toast = inject(ToastService)
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully!');
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error);             
      }
    })
  }

  logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
  
  
}
