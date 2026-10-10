import { Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';  
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AccountService } from 'src/core/account.service';
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
    protected memberService = inject(MemberServiceService);
    private accountService = inject(AccountService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    protected title = signal<string | undefined>('Profile');
    protected isCurrentUser = computed(() => {
        const currentUser = this.accountService.currentUser();
        return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
    });   
    private location = inject(Location);


    ngOnInit() {
        this.title.set(this.route.snapshot.firstChild?.title);

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.title.set(this.route.snapshot.firstChild?.title);
        });
    }

    goBack() {
      this.location.back();
    }
}
