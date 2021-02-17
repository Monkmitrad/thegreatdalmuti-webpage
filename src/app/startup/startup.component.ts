import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.apiService.createGame().subscribe((gameID: number) => {
      this.router.navigate(['login']);
    });
  }
}
