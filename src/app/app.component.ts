import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComponent } from '../layout/nav/nav.component';
import { AccountService } from '../core/account.service';
import { Router, RouterOutlet } from "@angular/router";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [NavComponent, RouterOutlet, NgClass],
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  private accountService = inject(AccountService);
  protected router = inject(Router);

  async ngOnInit(): Promise<void> {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
