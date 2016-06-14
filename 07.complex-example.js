const loginServices = angular.module('loginServices', [])
  .constant('passwordLength', 8)
  .constant('loginLength', 6)


  .value('uppercasePattern', '[A-Z]')
  .value('lowercasePattern', '[a-z]')
  .value('digitPattern', '\\d')


  .service('lowercaseValidator', ['lowercasePattern', RegExp])
  .service('uppercaseValidator', ['uppercasePattern', RegExp])
  .service('digitValidator', ['digitPattern', RegExp])


  .factory('loginFormFactory', $injector => {
    const lowercaseValidator = $injector.get('lowercaseValidator');
    const uppercaseValidator = $injector.get('uppercaseValidator');
    const digitValidator     = $injector.get('digitValidator');
    const passwordLength     = $injector.get('passwordLength');
    const loginLength        = $injector.get('loginLength');
    const authStrings        = $injector.get('authStrings')();


    return {
      validatePassword(password) {
        const errors = [];

        if (!password) {
          return authStrings.NO_PASSWORD;
        }

        if (password.length < passwordLength) {
          errors.push(authStrings.PASSWORD_LENGTH);
        }

        if (!digitValidator.test(password)) {
          errors.push(authStrings.PASSWORD_NUMBERS);
        }

        if (!lowercaseValidator.test(password)) {
          errors.push(authStrings.PASSWORD_LOWERCASE);
        }

        if (!uppercaseValidator.test(password)) {
          errors.push(authStrings.PASSWORD_UPPERCASE);
        }

        return errors.join('. ');
      },


      validateLogin(login) {
        const errors = [];

        if (!login) {
          return authStrings.NO_LOGIN;
        }

        if (login.length < loginLength) {
          errors.push(authStrings.LOGIN_LENGTH);
        }

        return errors.join('. ');
      }
    }
  })


  .provider('authStrings', function ($injector) {
    let language         = 'en';
    const passwordLength = $injector.get('passwordLength');
    const loginLength    = $injector.get('loginLength');

    this.setLanguage = newLanguage => {
      if (!strings[newLanguage]) {
        return;
      }

      language = newLanguage;
    };

    const strings = {
      en: {
        LOGIN   : 'Login',
        PASSWORD: 'Password',
        SUBMIT  : 'Submit',
        CLEAR   : 'Clear',

        LOGIN_PLACEHOLDER   : 'Please enter login...',
        PASSWORD_PLACEHOLDER: 'Please enter password...',

        NO_PASSWORD       : 'Password is required',
        PASSWORD_LENGTH   : `Password should be ${ passwordLength } symbols length minimum`,
        PASSWORD_NUMBERS  : 'Password should contain numbers',
        PASSWORD_LOWERCASE: 'Password should contain Lowercase letters',
        PASSWORD_UPPERCASE: 'Password should contain Uppercase letters',
        NO_LOGIN          : 'Login is required',
        LOGIN_LENGTH      : `Login should be ${ loginLength } symbols length minimum`
      },

      ua: {
        LOGIN   : 'Логін',
        PASSWORD: 'Пароль',
        SUBMIT  : 'Підтвердити',
        CLEAR   : 'Очистити',

        LOGIN_PLACEHOLDER   : 'Введіть логин...',
        PASSWORD_PLACEHOLDER: 'Введіть пароль...',

        NO_PASSWORD       : 'Пароль обов\'язковий',
        PASSWORD_LENGTH   : `Пароль повинен бути ${ passwordLength } символів мінімум`,
        PASSWORD_NUMBERS  : 'Пароль має містити цифри',
        PASSWORD_LOWERCASE: 'Пароль має містити маленькі літери',
        PASSWORD_UPPERCASE: 'Пароль має містити великі літери',
        NO_LOGIN          : 'Логін обов\'язковий',
        LOGIN_LENGTH      : `Логін повинен бути ${ loginLength } символів мінімум`
      }
    };


    this.$get = () =>
      () => strings[language]
  })
  .name;


class ComplexCtrl {
  constructor($injector) {
    this.loginFormFactory = $injector.get('loginFormFactory');
    this.strings          = $injector.get('authStrings')();
  }

  onSubmit() {

  }

  isFormInvalid() {
    return this.isPasswordInvalid() || this.isLoginInvalid();
  }

  isLoginInvalid() {
    return !!this.getLoginErrorMessage();
  }

  isPasswordInvalid() {
    return !!this.getPasswordErrorMessage();
  }

  getLoginErrorMessage() {
    return this.loginFormFactory.validateLogin(this.login);
  }

  getPasswordErrorMessage() {
    return this.loginFormFactory.validatePassword(this.password);
  };
}

angular.module('complexApp', [
  loginServices
])


  .config(authStringsProvider => {
    authStringsProvider.setLanguage('ua');
  })


  .controller('ComplexCtrl', ComplexCtrl);