import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(
      (res:any) => { 
          this.currentUser = res.msg;
    })
  }

}
