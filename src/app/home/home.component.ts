import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { User } from 'src/types/user';

@Component({
    selector: 'app-home',
    imports: [RegisterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  protected registerMode = signal(false);

  ngOnInit(): void {
  }

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

}
