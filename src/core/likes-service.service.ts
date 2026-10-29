import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LikeParams, Member } from 'src/types/member';
import { PaginationResult } from 'src/types/pagination';

@Injectable({
  providedIn: 'root',
})
export class LikesServiceService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<string[]>([]);

  toggleLike(targetMemberId: string) {
    return this.http.post(`${this.baseUrl}likes/${targetMemberId}`,{})
  }
  
  getLikes(likeParams: LikeParams) {
    let params = new HttpParams();
    
    if (likeParams.predicate) params = params.append('predicate', likeParams.predicate);
    params = params.append('pageNumber', likeParams.pageNumber);
    params = params.append('pageSize', likeParams.pageSize);

    return this.http.get<PaginationResult<Member>>(this.baseUrl + 'likes', {params});
  }  
  
  getLikeIds() {
    return this.http.get<string[]>(this.baseUrl + 'likes/list').subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }

  clearLikeIds() {
    this.likeIds.set([]);

  }
}
