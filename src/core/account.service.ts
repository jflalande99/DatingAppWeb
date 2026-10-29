import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from  '../types/user';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LikesServiceService } from './likes-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likesService = inject(LikesServiceService);
  private baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);
  
  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      map(user => {
        if (user) {          
          this.setCurrentUser(user);
        }
      })
    )
  } 

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  } 

  setCurrentUser(user: User) {
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likesService.getLikeIds();
  } 

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('filters');
    this.likesService.clearLikeIds();
    this.currentUser.set(null);
  }
  
}


