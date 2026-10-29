import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesServiceService } from 'src/core/likes-service.service';
import { MemberCardComponent } from 'src/features/members/member-card/member-card.component';
import { Paginator } from 'src/shared/paginator/paginator.component';
import { LikeParams, Member } from 'src/types/member';
import { PaginationResult } from 'src/types/pagination';

@Component({
    selector: 'app-lists',
    imports: [ MemberCardComponent, Paginator ],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
    private likesService = inject(LikesServiceService)
    protected members = signal<Member[]>([]);
    protected likeParams = new LikeParams;
    protected paginatedLikes = signal<PaginationResult<Member> | null>(null);

    tabs = [
        {label: 'Liked', value: 'liked' },
        {label: 'Liked me', value: 'likedBy' },
        {label: 'Mutual', value: 'mutual' }
    ]

    ngOnInit(): void {
        this.loadLikes();
    }

    setPredicate(predicate: string) {        
        if (this.likeParams.predicate !== predicate) {
            this.likeParams.predicate = predicate;
            this.likeParams.pageNumber = 1;
            
            this.loadLikes();
        }
    }

    loadLikes() {
        this.likesService.getLikes(this.likeParams).subscribe({
            next: result => {
                this.paginatedLikes.set(result)
            }
        });
    }   

    onPageChange(event: {pageNumber: number, pageSize: number}) {
        this.likeParams.pageSize = event.pageSize;
        this.likeParams.pageNumber = event.pageNumber;
        this.loadLikes();
    }

    
}
