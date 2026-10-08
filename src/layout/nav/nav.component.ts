import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../core/account.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from 'src/core/toast-service.service';
import { themes } from 'src/layout/theme';

@Component({
    selector: 'app-nav',
    imports: [FormsModule, RouterLink, RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  protected accountService = inject(AccountService)
  private router = inject(Router)
  private toast = inject(ToastService)
  protected creds: any = {}
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'dark');
  protected themes = themes;

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLElement | null;
    if (elem) elem.blur();
  }

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
