import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from 'src/core/account.service';
import { RegisterCreds, User } from 'src/types/user';

@Component({
    selector: 'app-register',
    imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);  
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  
  ngOnInit() {    

  }

  register() {
    this.accountService.register(this.creds).subscribe({
      next: response => {
      console.log(response);
      this.cancel();
      },
      error: error => console.error(error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
