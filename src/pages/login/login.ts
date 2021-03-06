import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController,
  App
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth';
import { EmailValidator } from '../../providers/email';
import { TabsPage } from '../tabs/tabs';
import { SignupWithEmailPage } from '../signup-with-email/signup-with-email';
import { SignupWithPhoneNumberPage } from '../signup-with-phone-number/signup-with-phone-number';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public app: App,
    public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  GoToSignupWithPhoneNumber(){
    this.navCtrl.push(SignupWithPhoneNumberPage);
  }

  GoToSignup(){
    this.navCtrl.push(SignupWithEmailPage);
  }

  GoToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  Login() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          this.app.getRootNav().setRoot(TabsPage);
        }, error => {
          console.log(error.name);
          this.loading.dismiss().then(() => {
            
            let alert = this.alertCtrl.create({
              message: error.name,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}




