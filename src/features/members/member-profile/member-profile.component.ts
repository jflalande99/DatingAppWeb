import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Member } from 'src/types/member';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css',
})
export class MemberProfileComponent implements OnInit {    
    private route = inject(ActivatedRoute);    
    protected member = signal<Member | undefined>(undefined);     

    ngOnInit() : void {
        this.route.parent?.data.subscribe( data => {
          this.member.set(data['member']);
        })
    }

}
