import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { TokenStorage } from '../token.storage';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FuseConfigService } from '../../../@fuse/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
              private fuseConfigService: FuseConfigService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorage,
              private loginService: LoginService,
              private router: Router) {
    this.fuseConfigService.config = {
      layout: {
        navbar: { hidden: true },
        toolbar: { hidden: true },
        footer: { hidden: true },
        sidepanel: { hidden: true }
      }
    };
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginService.attemptLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.router.navigateByUrl('/samples');
        }
      );
    }
  }
}
