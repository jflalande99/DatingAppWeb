import { Component, inject, OnInit, signal } from '@angular/core';  
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AgePipe } from 'src/core/age.pipe';
import { MemberServiceService } from 'src/core/member-service.service';
import { Member } from 'src/types/member';

@Component({
    selector: 'app-member-detail',
    imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
    private memberService = inject(MemberServiceService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    protected member = signal<Member | undefined>(undefined);
    protected title = signal<string | undefined>('Profile');

    ngOnInit() {
        this.route.data.subscribe({
            next: data => this.member.set(data['member'])
        })

        this.title.set(this.route.snapshot.firstChild?.title);

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.title.set(this.route.snapshot.firstChild?.title);
        });
    }

}
