import { Component, inject, signal } from '@angular/core';
import { Router } from "@angular/router";
import { ApiError } from 'src/types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
})
export class ServerErrorComponent {
  protected error : ApiError;
  private router = inject(Router);
  protected showDetails = false;

  constructor() {
    const navigation = this.router.currentNavigation();
    this.error = navigation?.extras?.state?.['error'] as ApiError;
  }

  detailsToggle() {
    this.showDetails = !this.showDetails;
  }
}
