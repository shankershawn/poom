define(['jquery', 'knockout', 'utils/router.util', 'text!config/configuration.json', 'ojs/ojasyncvalidator-regexp', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup', 'ojs/ojdataprovider'],
function($, ko, routerUtil, config, AsyncRegExpValidator){
    function registrationProcessor(){
        console.log(config);
        var self = this;
        self.request = {
            firstname: ko.observable(""),
            lastname: ko.observable(""),
            email: ko.observable(""),
            phone: ko.observable(""),
            username: ko.observable(""),
            password: ko.observable(""),
            confirmpassword: ko.observable("")
        };
        /*self.firstname = ko.observable("");
        self.lastname = ko.observable("");
        self.email = ko.observable("");
        self.phone = ko.observable("");
        self.username = ko.observable("");
        self.password = ko.observable("");
        self.confirmpassword = ko.observable("");*/

        self.labels = {
            firstname: 'First Name',
            lastname: 'Last Name',
            email: 'Email Address',
            phone: 'Phone Number',
            username: 'Username',
            password: 'Password',
            confirmpassword: 'Confirm Password'
        };
        
        self.placeholders = {
            firstname: 'Please enter your first name',
            lastname: 'Please enter your last name',
            email: 'Please enter your email address',
            phone: 'Please enter your phone number',
            username: 'Please enter your desired username',
            password: 'Please enter your desired password',
            confirmpassword: 'Please re-enter your password'
        };
        
        self.helpInstructions = {
            password: 'Please enter a combination of uppercase, lowercase, digits and special characters.',
            phone: 'Please enter 10 digits only.',
            username: 'Please enter at least one alphabet.'
        };
        
        self.textValidators = [
            new AsyncRegExpValidator({
                pattern: '[a-zA-Z]+',
                messageDetail: 'Please enter alphabets only.'
            })
        ];
        
        self.phoneValidators = [
            new AsyncRegExpValidator({
                pattern: '\\d{10}',
                messageDetail: 'Your phone number must contain 10 digits only.'
            })
        ];
        
        self.usernameValidators = [
            new AsyncRegExpValidator({
                pattern: '^(?=.*[a-zA-Z]+)(?=.*.).*$',
                messageDetail: 'Your username must contain at least one alphabet.'
            })
        ];
        
        self.passwordValidators = [
            new AsyncRegExpValidator({
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).*$',
                messageSummary: 'Password is not strong enough',
                messageDetail: 'Your password must contain a combination of uppercase, lowercase, digits and special characters.'
            }),
            new AsyncRegExpValidator({
                pattern: '^(?=.*\\D$)(?=.*^\\D).*$',
                messageDetail: 'Your password cannot begin or end with digits.'
            })
        ];
        
        self.emailValidators = [
            new AsyncRegExpValidator({
                pattern: '([^@]+)([@])([a-zA-Z\d]+)([.])([a-zA-Z\d]+)',
                messageDetail: 'Please enter a valid email address.'
            })
        ];
        
        self.register = () => {
            var registrationValidationGroup = document.getElementById("registrationValidationGroup");
            if(registrationValidationGroup.valid != "valid"){
                registrationValidationGroup.showMessages();
                registrationValidationGroup.focusOn("@firstInvalidShown");
                return false;
            }

            console.log(self.request);

            $.post(JSON.parse(config).serviceUrl + '/register', self.request, (data, textStatus) => {
                console.log(data);
            });
        }
        
        self.isUsernameExists = () => {
            
        }
        
        self.connected = () => {
            routerUtil.showNavigationItems();
        }
        
        self.disconnected = () => {
            self.request.firstname("");
            self.request.lastname("");
            self.request.email("");
            self.request.phone("");
            self.request.username("");
            self.request.password("");
            self.request.confirmpassword("");
        }
        
        self.navLogin = () => {
            routerUtil.configureRoute({'login': {label: 'Login', isDefault: true}});
            routerUtil.setNavData([{name: 'Login', id: 'login', iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'}]);
            routerUtil.navigate('login');
        }
    }
    
    return new registrationProcessor();
    
});