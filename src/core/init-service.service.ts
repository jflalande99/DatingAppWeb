import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of } from 'rxjs';
import { LikesServiceService } from './likes-service.service';

@Injectable({
  providedIn: 'root',
})
export class InitServiceService {
  private accountService = inject(AccountService);
  private likeService = inject(LikesServiceService);

  constructor() {
    this.init();
  }

   init() {
    const userString = localStorage.getItem('user');
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user); 
    this.likeService.getLikeIds();

    return of(null);
  }
}
