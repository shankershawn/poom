define(['jquery', 'knockout', 'utils/router.util', 'ojs/ojasyncvalidator-regexp', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup', 'ojs/ojdataprovider'],
function($, ko, routerUtil, AsyncRegExpValidator){
    function registrationProcessor(){
        var self = this;
        self.firstname = ko.observable("");
        self.lastname = ko.observable("");
        self.email = ko.observable("");
        self.phone = ko.observable("");
        self.username = ko.observable("");
        self.password = ko.observable("");
        self.confirmpassword = ko.observable("");

        self.labels = ko.observable({
            firstname: 'First Name',
            lastname: 'Last Name',
            email: 'Email Address',
            phone: 'Phone Number',
            username: 'Username',
            password: 'Password',
            confirmpassword: 'Confirm Password'
        });
        
        self.placeholders = ko.observable({
            firstname: 'Please enter your first name',
            lastname: 'Please enter your last name',
            email: 'Please enter your email address',
            phone: 'Please enter your phone number',
            username: 'Please enter your desired username',
            password: 'Please enter your desired password',
            confirmpassword: 'Please re-enter your password'
        });
        
        self.textValidators = [
            new AsyncRegExpValidator({
                pattern: '[a-zA-Z]+',
                messageDetail: 'Please enter alphabets only.'
            })
        ];
        
        self.phoneValidators = [
            new AsyncRegExpValidator({
                pattern: '\\d{10}',
                messageDetail: 'Please enter 10 digits only.'
            })
        ];
        
        self.usernameValidators = [
            new AsyncRegExpValidator({
                pattern: '^(?=.*[a-zA-Z]+)(?=.*.).*$',
                messageDetail: 'Please enter at least one alphabet.'
            })
        ];
        
        self.passwordValidators = [
            new AsyncRegExpValidator({
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).*$',
                messageSummary: 'Password is not strong enough',
                messageDetail: 'Your password must contain a combination of uppercase, lowercase, digits and special characters'
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
        
        self.register = function(){
            
        }
        
        self.connected = function(){
            routerUtil.showNavigationItems();
        }
        
        self.disconnected = function(){
            self.username("");
            self.password("");
            self.firstname("");
            self.lastname("");
            self.email("");
            self.phone("");
            self.username("");
            self.password("");
            self.confirmpassword("");

        }
        
        self.navLogin = function(){
            routerUtil.configureRoute({'login': {label: 'Login', isDefault: true}});
            routerUtil.setNavData([{name: 'Login', id: 'login', iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'}]);
            routerUtil.navigate('login');
        }
        
        
    }
    
    return new registrationProcessor();
    
});