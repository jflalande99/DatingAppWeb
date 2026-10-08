import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { MemberServiceService } from 'src/core/member-service.service';
import { Member } from 'src/types/member';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MemberServiceService);
  const router= inject(Router);
  const memberId = route.paramMap.get('id');

  if (!memberId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(memberId);
};
