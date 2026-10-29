import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgePipe } from 'src/core/age.pipe';
import { LikesServiceService } from 'src/core/likes-service.service';
import { Member } from 'src/types/member';

@Component({
  selector: 'app-member-card',
  imports: [ RouterLink, AgePipe ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private likeService = inject(LikesServiceService);
  member = input.required<Member>();
  protected hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id))

  toggleLike(event: Event) {
    event.stopImmediatePropagation();
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.member().id))            
        }
        else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id])            
        }
      }
    })
  }
}
