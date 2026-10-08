import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MemberServiceService } from 'src/core/member-service.service';
import { Photo } from 'src/types/member';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css',
})
export class MemberPhotosComponent {
  private memmberService = inject(MemberServiceService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<Photo[]>;

  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.photos$ = this.memmberService.getMemberPhotos(memberId);      
    }
  }

  get photoMocks() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/id/${i + 1}/200/200`,
    }));
  }
}
