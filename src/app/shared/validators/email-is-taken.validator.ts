import { AbstractControl } from "@angular/forms";
import { first } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export function EmailIsTaken(authService: AuthService) {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    try {
      if (control.value === null)
      authService.checkEmail({ email: control.value }).pipe(first()).subscribe({
        next: (res) => {
          if (control.value === 'goeintut@gmail.com') throw new Error("Error");
        },
        error: (err) => {
          console.log(err)
          throw new Error("Error");
        }
      });
      if (control.value === 'goeintut@gmail.com') throw new Error("Error");
      return null;
    } catch (error) {
      return {'emailIsTaken': true}
    }
  };
}
