import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'app-view-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.css']
})
export class DeleteComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService
        ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params) => {
                if ('id' in params) {
                    this.userService.delete(params['id']);
                }
                this.router.navigate(['/users']);
            }
        );

    }

}
