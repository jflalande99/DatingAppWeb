import { CanDeactivateFn } from '@angular/router';
import { MemberProfileComponent } from 'src/features/members/member-profile/member-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfileComponent> = (component) => {
  if (component.editForm?.dirty) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }

  return true;
};
