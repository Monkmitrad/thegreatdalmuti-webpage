import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GameService } from '../services/game.service';

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
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const gameID = this.gameService.getGameID();
    if (gameID) {  
      this.gameID = gameID;
    }
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
            if (!this.gameID) {
              this.gameService.setgameID(gameID);
            }
            this.gameService.setToken(response);
            this.router.navigate(['/lobby']);
            break;
        }
      });
    } else {
      this.errorText = "Invalid login data";
    }
  }

}
