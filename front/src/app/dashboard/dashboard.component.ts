import { Component, OnInit } from '@angular/core';
import { ruche } from '../models/ruche';
import { rucheservice } from '../rucheservice';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ruche: ruche[];
  userid: number;
  userrole: string;

  constructor(
    private service: rucheservice,
    private service2:AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   
    this.userid=Number(localStorage.getItem('userid'));
    console.log('User ID:', this.userid);
      
    this.service.getruches(this.userid).subscribe((data: ruche[]) => {
      this.ruche = data;
    });
  }
  logout(){
    this.service2.logout();
    
  }
}
