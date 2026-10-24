import { Component, ElementRef, input, model, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberParams } from 'src/types/member';

@Component({
  selector: 'app-filter-modal',
  imports: [ FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
})
export class FilterModalComponent {
  @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>;  
  closeModal = output();
  submitData = output<MemberParams>();
  memberParams = model(new MemberParams());

  open() {    
    const filters = localStorage.getItem('filters')
    if (filters) {
        this.memberParams.set(JSON.parse(filters));          
    }

    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.closeModal.emit();
  }

  submit() {
    this.submitData.emit(this.memberParams());
    this.close();
  }

  onMinAgeChange() {
    if (this.memberParams().minAge < 18) this.memberParams().minAge = 18;
  }

  onMaxAgeChange() {
    if (this.memberParams().maxAge < this.memberParams().minAge) {
      this.memberParams().maxAge = this.memberParams().minAge;
    }
  }

}
