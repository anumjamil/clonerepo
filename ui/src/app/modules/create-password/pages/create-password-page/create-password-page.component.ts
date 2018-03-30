import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '@app/core/services/authentication.service';

import {ActivatedRoute, Router} from '@angular/router';
import {PasswordUtilities} from '@app/shared/utilities/password-utilities';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password-page.component.html',
  styleUrls: ['./create-password-page.component.scss']
})
export class CreatePasswordPageComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public loading: boolean = false;
  public length: boolean = false;
  public uppercase: boolean = false;
  public number: boolean = false;
  public special: boolean = false;

  public key: string;
  public keyMissing: boolean;

  @ViewChild('passwordInput') public passwordInput: ElementRef;

  @HostBinding('class') public class: string = 'col p-0 d-flex justify-content-center align-items-center';

  public get isDisabled(): boolean {
    return !(this.length && this.uppercase && this.number && this.special);
  }

  public constructor(private fb: FormBuilder,
                     private service: AuthenticationService,
                     private route: ActivatedRoute,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((params) => {
      this.key = params['token'];
    });
    this.keyMissing = !this.key;
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.passwordInput.nativeElement.focus());
  }

  public onSubmit(): void {
    this.loading = true;
    this.service.resetPassword(this.key, this.form.value.password).subscribe(response => {
      this.loading = false;
      this.router.navigate(['../success'], {relativeTo: this.route});
    }, error => {
      this.loading = false;
      this.router.navigate(['../error'], {relativeTo: this.route});

    });
  }

  private createForm(): void {
    this.form = this.fb.group({password: ''});
    this.form.valueChanges.subscribe(values => this.updateCheckedValues(values.password));
  }

  private updateCheckedValues(password: string): void {
    this.length = password.length >= 8;
    this.number = PasswordUtilities.NUMBERS_PATTERN.test(password);
    this.uppercase = PasswordUtilities.UPPER_CASE_PATTERN.test(password);
    this.special = PasswordUtilities.SPECIAL_CHARACTERS_PATTERN.test(password);
  }
}
