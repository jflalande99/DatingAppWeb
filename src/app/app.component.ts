import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { NavComponent } from '../layout/nav/nav.component';
import { AccountService } from '../core/account.service';
import { lastValueFrom } from 'rxjs';
import { HomeComponent } from "./home/home.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [NavComponent, HomeComponent],
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<any>([]);

  async ngOnInit(): Promise<void> {
    this.setCurrentUser();

    this.members.set(await this.getMembers());
    
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:7281/api/users'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
