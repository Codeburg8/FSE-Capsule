import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'app-view-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    model: any = {
        userList: []
    };

    constructor(private userService: UserService) {}

    ngOnInit() {
        // load the user list
        this.loadUsers();
    }

    private loadUsers() {
        // load the user list from the user service
        this.userService.findAll()
            .subscribe((res) => {
                console.log('UserComponent.loadUsers()', {res});
                if (res !== null) {
                    this.model.userList = res;
                } else {
                    this.model.userList = [];
                }
            });
    }
}
