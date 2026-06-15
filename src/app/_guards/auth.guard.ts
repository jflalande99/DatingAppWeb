import { CanActivateFn } from '@angular/router';
import { AccountService } from '../../core/account.service';
import { inject } from '@angular/core';
import { ToastService } from 'src/core/toast-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if (accountService.currentUser()) {
    return true;  
  }
  else {
    toast.error('You must be logged in to access this route.');
    return false; 
  }

};
