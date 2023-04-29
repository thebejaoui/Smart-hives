import { Component } from '@angular/core';
import { reclamation } from '../models/reclamation';
import { Router } from '@angular/router';
import { reclamationservice } from '../reclamationservice';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-historiquereclamation',
  templateUrl: './historiquereclamation.component.html',
  styleUrls: ['./historiquereclamation.component.css']
})
export class HistoriquereclamationComponent {
  reclamations:reclamation[];
  userid:number;
  
  constructor(private service:reclamationservice,private service2: AuthService,public router:Router){};
  ngOnInit()
  {
    this.userid=Number(localStorage.getItem('userid'));
    this.service.getreclamations(this.userid).subscribe((data: reclamation[])=>{
    this.reclamations=data;
  })
 

}
logout(){
  this.service2.logout();
}
}
