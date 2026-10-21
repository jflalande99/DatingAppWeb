import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberServiceService } from 'src/core/member-service.service';
import { Member, Photo } from 'src/types/member';
import { ImageUploadComponent } from 'src/shared/image-upload/image-upload.component';
import { AccountService } from 'src/core/account.service';
import { User } from 'src/types/user';
import { StarButtonComponent } from 'src/shared/star-button/star-button.component';
import { DeleteButtonComponent } from 'src/shared/delete-button/delete-button.component';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUploadComponent, StarButtonComponent, DeleteButtonComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css',
})
export class MemberPhotosComponent implements OnInit {
  protected memberService = inject(MemberServiceService);
  protected accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([])
  protected loading = signal(false);
  
  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      });      
    }
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos, photo])
      },
      error: error => {
        console.log('Error uploading image: ', error);
        this.loading.set(false);
      }
    })
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser) currentUser.imageUrl = photo.url;
        this.accountService.setCurrentUser(currentUser as User);
        this.memberService.member.update(member => ({
          ...member,
          imageUrl: photo.url
        }) as Member)
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId);
    this.photos.update(photos => photos.filter(x => x.id !== photoId));
  }
}
