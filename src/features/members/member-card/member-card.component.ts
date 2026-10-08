import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgePipe } from 'src/core/age.pipe';
import { Member } from 'src/types/member';

@Component({
  selector: 'app-member-card',
  imports: [ RouterLink, AgePipe ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  member = input.required<Member>();
}
