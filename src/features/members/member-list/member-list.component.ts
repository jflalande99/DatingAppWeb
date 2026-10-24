import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberServiceService } from 'src/core/member-service.service';
import { Member, MemberParams } from 'src/types/member';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PaginationResult } from 'src/types/pagination';
import { Paginator } from 'src/shared/paginator/paginator.component';
import { FilterModalComponent } from  '../filter-modal/filter-modal.component';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-member-list',
    imports: [MemberCardComponent, Paginator, FilterModalComponent],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
    @ViewChild('filterModal') modal!: FilterModalComponent;
    private memberService = inject(MemberServiceService);
    protected paginatedMembers = signal<PaginationResult<Member> | null>(null);
    protected memberParams = new MemberParams();
    private updatedParams = new MemberParams();

    constructor() {
        const filters = localStorage.getItem('filters')

        if (filters) {
            this.memberParams = JSON.parse(filters);
            this.updatedParams = JSON.parse(filters);
        }
    }

    ngOnInit(): void {
          this.loadMembers();
    }

    loadMembers() {
        this.memberService.getMembers(this.memberParams).subscribe({
            next: result => {
                this.paginatedMembers.set(result)
            }
        });
    }   

    onPageChange(event: {pageNumber: number, pageSize: number}) {
        this.memberParams.pageSize = event.pageSize;
        this.memberParams.pageNumber = event.pageNumber;
        this.loadMembers();
    }

    openModal() {
        this.modal.open();
    }

    onClose() {
        console.log('Modal closed')
    }

    onFilterChange(data:MemberParams) {
        this.memberParams= {...data};
        this.updatedParams= {...data};
        this.loadMembers();
    }

    resetFilters() {        
        this.memberParams = new MemberParams();
        this.updatedParams = new MemberParams();

        console.log("resetFilters:" + this.updatedParams);
        this.loadMembers();
    }

  get displayMessage(): string {
    const defaultParams = new MemberParams();

    const filters: string[] = [];

    if (this.updatedParams.gender) {
      filters.push(this.updatedParams.gender + 's')
    } else {
      filters.push('Males, Females');
    }
    
    if (this.updatedParams.minAge !== defaultParams.minAge 
        || this.updatedParams.maxAge !== defaultParams.maxAge) {
        filters.push(` ages ${this.updatedParams.minAge}-${this.updatedParams.maxAge}`)
    }

    filters.push(this.updatedParams.orderBy === 'lastActive' 
        ? 'Recently active' : 'Newest members');
    
    return filters.length > 0 ? `Selected: ${filters.join('  | ')}` : 'All members'
  }
}
