import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MemberServiceService } from 'src/core/member-service.service';
import { Member } from 'src/types/member';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
    selector: 'app-member-list',
    imports: [AsyncPipe, MemberCardComponent],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent {
    private memberService = inject(MemberServiceService);
    protected members$: Observable<Member[]> = this.memberService.getMembers();
}
