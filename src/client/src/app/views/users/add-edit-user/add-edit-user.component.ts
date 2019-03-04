import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-view-users-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
    model: any = {user: {}};

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.activatedRoute.data
            .subscribe(res => {
                switch (res.action) {
                    case 'register':
                        this.model.action = 'register';
                        this.model.user = new User(null, null, null, null, null);
                        console.log('add-edit-user', {model: this.model});
                        break;
                    case 'edit':
                        this.model.action = 'edit';
                        console.log('add-edit-user', {model: this.model});
                        this.activatedRoute.paramMap
                            .subscribe(params => {
                                const id = params.get('id');
                                this.model.id = id;
                                console.log('add-edit-user', {model: this.model});

                                if (id && id !== null) {
                                    // now get the user from the user service
                                    this.userService.findById(id)
                                        .subscribe(user => {
                                            console.log('add-edit-user', {model: this.model});
                                            this.model.user = user;
                                        });
                                }
                            });
                        break;
                    default:
                        break;
                }
            });
    }

    onRegister() {
        console.log('register', {model: this.model});
        this.userService.create(this.model.user)
            .subscribe(res => {
                if (!res || res == null) {
                    console.log('registered: failed');
                    this.router.navigate(['']);
                } else {
                    console.log('registered: success', {res});
                    this.router.navigate(['/new']);
                }
            });
    }

    onEdit() {
        console.log('edit', {model: this.model});
        this.userService.update(this.model.id, this.model.user)
            .subscribe(res => {
                if (!res || res == null) {
                    console.log('edit: failed');
                    this.router.navigate(['']);
                } else {
                    console.log('edit: success', {res});
                    this.router.navigate(['']);
                }
            });
        this.router.navigate(['']);
    }

    onCancel() {
        console.log('cancel', {model: this.model});
        this.userService.delete(this.model.User);
        this.router.navigate(['']);
    }
}
