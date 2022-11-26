import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first, firstValueFrom } from 'rxjs';
import { LoginRequestModel } from 'src/app/models/user-requests.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CheckDialogModalComponent } from 'src/app/shared/modal/check-dialog-modal/check-dialog-modal.component';
import { GameTypesStatic } from 'src/app/shared/static/game-types.static';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  showLoader: boolean = false;
  errorMessage: string = '';
  noPlayerImg: string = '/assets/images/user/user-placeholder.jpg';
  uploadPlayerImg?: any;
  userData: any;
  activeId?: string;
  gameTypes?: any[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
    private readonly authService: AuthService,
    private readonly userService: UserService,     //Only for Testing
    private readonly router: Router,               //Only for Testing
  ) {
    this.userForm = this.fb.group({
      nickname: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(32)],
        [this.userService.validateNickname.bind(this.userService)]
      ],
      gameType: [null, [Validators.required]],
      avatar: [null, [
        (control: AbstractControl): {[key: string]: boolean} | null => {
          const validImageType: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
          if (!control?.value) return null;
          if (!control?.value?.type.toLowerCase().includes('image') || !validImageType.includes(control?.value?.type.toLowerCase())) return { invalidImageType: true } //If the image is not a .jpg, .jpeg or .png file, error
          if (control?.value?.size > 2097152) return { invalidImageSize: true } //If the image is larger than 2MB
          return null;
        }
      ]],
      password: ['', [Validators.minLength(4), Validators.maxLength(32)]],
      repeatPassword: ['', []]
    },
    {
      validator: MustMatch('password', 'repeatPassword')    //this validator is separated due to beign more rehusable, as it can be used with any form controls
    }
    );
  }

  ngOnInit(): void {
    console.log('valid', this.userForm.valid)
    console.log('pristine',this.userForm.pristine)
    this.getUserData();
  }

  get fc(): any {
    return this.userForm.controls;
  }

  async getUserData() {
    this.showLoader = true;
    this.errorMessage = "";
    const data = this.userService.currentUser.value;
    try {
      if (!this.userForm.valid && this.userForm.pristine) this.isSubmitted = true;
      this.gameTypes = GameTypesStatic.slice();
      if (!this.gameTypes || this.gameTypes?.length <= 0) throw new Error();
      const res = await firstValueFrom(this.userService.getUsers({ search:
        // "637a993e661a060290f07c4e" //Only For Testing
        data?._id
      }));
      if (res.status.toLowerCase() !== 'success' || !Array.isArray(res.data.users) || res.data.users.length !== 1) throw new Error();
      this.showLoader = false;
      this.userData = res.data.users[0];
      if (this.userData?.gameType && this.userData?.gameType !== '') {
        this.activeId = this.userData?.gameType;
        this.onGameTypeSelected(this.userData?.gameType, true);
      }
      this.userForm.get('email')?.setValue(this.userData.email);
      this.userForm.get('nickname')?.setValue(this.userData.nickname);
    } catch (error: any) {
      this.errorMessage = "An error has ocurred, please try again";
      this.showLoader = false;
    }
    console.log(this.userData)
  }

  onFileSelected(event: any) {
    const reader = new FileReader();

    if (event?.target?.files && event?.target?.files?.length > 0) {
      const [file] = event?.target?.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadPlayerImg = reader.result as string;
        this.userForm.get('avatar')?.setValue(file);
        this.userForm.get('avatar')?.updateValueAndValidity();
        if (this.userForm.pristine) this.userForm.markAsDirty();
      }
    }
  }

  async onGameTypeSelected(gameType: string, initialLoad: boolean = false) {
    // this.activeId = 'rally-racing';
    if (!gameType || gameType === '' || typeof gameType !== 'string') return;
    if (!initialLoad) {
      const modalRef: NgbModalRef = this.modalService.open(CheckDialogModalComponent, { centered: true, backdrop: 'static' });
      modalRef.componentInstance.buttonClass = 'btn-sm btn-primary';
      modalRef.componentInstance.title = 'Change Game Type';
      modalRef.componentInstance.content = 'Are you sure you wish to change your Game Type? You will lose all your current points';
      modalRef.componentInstance.button = 'Change Game Type';
      const res = await firstValueFrom(modalRef.closed);
      try {
        console.log(res);
        if (!res) return;
        this.activeId = gameType;
      } catch (error) {
        return;
      }
    }
    this.userForm.get('gameType')?.setValue(gameType.toLowerCase());
    this.userForm.get('gameType')?.updateValueAndValidity();
    if (!initialLoad && this.userForm.pristine) this.userForm.markAsDirty();
  }

  async onDelete() {
    const modalRef: NgbModalRef = this.modalService.open(CheckDialogModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.buttonClass = 'btn-sm btn-danger';
    modalRef.componentInstance.title = 'Delete Player';
    modalRef.componentInstance.content = 'Are you sure you wish to delete your account? You will lose all your current progress';
    modalRef.componentInstance.button = 'Delete Player';
    const res = await firstValueFrom(modalRef.closed);
    if (res) {
      //ToDo logica de eliminar user
      this.userService.clearToken();
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    //We reset the error message
    this.errorMessage = '';
    //We confirm the user has tried to submit the form
    this.isSubmitted = true;
    //Only if the form is valid, we submit
    if (this.userForm.valid) {
      const data: any = {
        id: this.userData._id,
        email: this.userForm.value.email
      }
      if (this.userForm?.value?.gameType && this.userForm?.value?.gameType !== '' && this.userForm?.value?.gameType?.toLowerCase() !== this.userData?.gameType?.toLowerCase()) data.gameType = this.userForm?.value?.gameType;
      if (this.userData?.nickname.toLowerCase() !== this.userForm?.value?.nickname.toLowerCase()) data.nickname = this.userForm?.value?.nickname;
      if (this.userForm?.value?.password && this.userForm?.value?.password !== '') data.password = this.userForm?.value?.password;
      const fd: any = new FormData();
      fd.append('data', JSON.stringify(data));
      if (this.userForm?.value?.avatar) fd.append('avatar', this.userForm?.value?.avatar);
      console.log(Object.fromEntries(fd));
      return;
      this.authService.login(data).pipe(first()).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          switch(err.status) {
            case 404:
              this.errorMessage = 'The User/Password is incorret'
            break;
            default:
              this.errorMessage = 'An error has ocurred'
            break;
          }
       }
      });
      this.userService.setToken(JSON.stringify(this.userForm.value));         //Only for Testing
      if (this.userService.checkToken()) this.router.navigate(['/home'])       //Only for Testing
    }
  }

}
