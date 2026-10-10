import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EditableMember, Member } from 'src/types/member';
import { MemberServiceService } from 'src/core/member-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from 'src/core/toast-service.service';
import { AccountService } from 'src/core/account.service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css',
})
export class MemberProfileComponent implements OnInit, OnDestroy {  

   @ViewChild('editForm') editForm?: NgForm;
   @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
     if (this.editForm?.dirty) {
       $event.returnValue = true;
     }
    }
    protected accountService = inject(AccountService);
    protected memberService = inject(MemberServiceService);  
    private toast = inject(ToastService);   
    protected editableMember : EditableMember = {
      displayName: '',
      description: '',
      city: '',
      country: '' 
    }

    constructor() {

    }

    ngOnInit() : void {
        this.editableMember = {
          displayName: this.memberService.member()?.displayName || '',
          description: this.memberService.member()?.description || '',
          city: this.memberService.member()?.city || '',
          country: this.memberService.member()?.country || ''
        };
    }

    updateProfile() {
      if (!this.memberService.member()) return;

      if (this.editForm?.valid && this.memberService.member()) {
        const updatedMember: EditableMember = {...this.memberService.member(), ...this.editableMember} as EditableMember;
        this.memberService.updateMember(this.editableMember).subscribe({
          next: () => {
            const currentUser = this.accountService.currentUser();
            if (currentUser && updatedMember.displayName !== currentUser?.userName) {
              currentUser.userName = updatedMember.displayName;
              this.accountService.currentUser.set(currentUser);
            }            
            this.toast.success('Profile updated successfully!');
            this.memberService.editMode.set(false);
            this.memberService.member.set(updatedMember as Member);            
            this.editForm?.reset(updatedMember);
          }
        });        
      }
    }

    ngOnDestroy(): void {
      if (this.memberService.editMode()) {
        this.memberService.editMode.set(false);
      }      
    }

}
