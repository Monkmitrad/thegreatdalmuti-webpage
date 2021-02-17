import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  gameID: number;
  errorText: string;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

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
      this.apiService.login(gameID, name).subscribe((response: string) => {
        switch (response) {
          case 'Internal server error during login':
            this.errorText = response;
            break;
          case 'playerName already taken':
            this.errorText = response;
            break;
          case 'game has already started':
            this.errorText = response;
            break;
          case 'gameID not valid':
            this.errorText = response;
            break;
          case 'playerName not valid':
            this.errorText = response;
            break;
          case '':
            console.log('Empty response');
            break;
          default:
            // returned jwt
            this.router.navigate(['/lobby']);
        }
      });
    } else {
      this.errorText = "Invalid login data";
    }
  }

}
