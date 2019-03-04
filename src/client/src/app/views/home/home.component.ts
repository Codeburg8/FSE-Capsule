import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-view-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private users = {};

    constructor(
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private userService: UserService
                ) {}

        ngOnInit() {
        }

    public navDocs(): void {
        this.router.navigate(['../documents']);
    }
    // findAll(): Observable<Array<User>> {
    //     return of(Object.values(this.users).slice() as Array<User>);
    //   }
  }

