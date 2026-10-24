import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditableMember, Member, MemberParams, Photo } from 'src/types/member';
import { AccountService } from './account.service';
import { tap } from 'rxjs';
import { PaginationResult } from 'src/types/pagination';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private accountService = inject(AccountService);
  editMode = signal(false); 
  member = signal<Member | null>(null);

  getMembers(memberParams: MemberParams) {
    let params = new HttpParams();
    
    params = params.append('pageNumber', memberParams.pageNumber);
    params = params.append('pageSize', memberParams.pageSize);
    params = params.append('minAge', memberParams.minAge);
    params = params.append('maxAge', memberParams.maxAge);
    params = params.append('orderBY', memberParams.orderBy);
    if (memberParams.gender) params = params.append('gender', memberParams.gender);

    return this.http.get<PaginationResult<Member>>(this.baseUrl + 'members', {params}).pipe(
        tap(() => {
          localStorage.setItem('filters', JSON.stringify(memberParams))
        })
    );
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(  
      tap(member => {
        this.member.set(member);
      })
    );
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
  }

  updateMember(member: EditableMember) {
    return this.http.put(this.baseUrl + 'members', member);
  }

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(this.baseUrl + 'members/add-photo', formData);    
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'members/set-main-photo/' + photo.id, {});
  }

  deletePhoto(photoId: number) {
    this.http.delete(this.baseUrl + 'members/delete-photo/' + photoId);
  }

}
