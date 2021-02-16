import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  gameID: number;
  errorText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.errorText = '';
      const name: string = loginForm.value.name;
      const gameID: number = loginForm.value.id;

      if (gameID < 1000 || gameID > 9999) {
        this.errorText = 'Invalid gameID';
        return;
      }
      // send login request

    } else {
      this.errorText = "Invalid login data";
    }
  }

}
