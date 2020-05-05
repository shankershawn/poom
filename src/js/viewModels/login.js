define(['jquery', 'knockout', 'utils/router.util', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup', 'ojs/ojdataprovider'],
function($, ko, routerUtil){
    
    function loginProcessor(){
        var self = this;
        self.username = ko.observable("");
        self.password = ko.observable("");
        
        self.placeholders = {
            username: 'Please enter your username',
            password: 'Please enter your password'
        };
        
        self.labels = {
            username: 'Username',
            password: 'Password'
        };
        
        self.validateCredentials = (event) => {
            var loginValidationGroup = document.getElementById("loginValidationGroup");
            if(loginValidationGroup.valid != "valid"){
                loginValidationGroup.showMessages();
                loginValidationGroup.focusOn("@firstInvalidShown");
                return false;
            }
            //call login server
            routerUtil.configureRoute({
                'dashboard': {label: 'Dashboard', isDefault: true},
                'timeline': {label: 'Timeline'},
                'documents': {label: 'Documents'},
                'about': {label: 'About'}
            });
            routerUtil.setNavData([
               {name: 'Dashboard', id: 'dashboard',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
               {name: 'Timeline', id: 'timeline',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
               {name: 'Documents', id: 'documents',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
               {name: 'About', id: 'about',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
            ]);
            routerUtil.navigate('dashboard');
        };
        
        self.navRegister = () => {
            routerUtil.configureRoute({'register': {label: 'Register', isDefault: true}});
            routerUtil.setNavData([{name: 'Register', id: 'register', iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'}]);
            routerUtil.navigate('register');
        };
        
        self.forgotPassword = () => {
            
        };
        
        self.connected = () => {
            routerUtil.showNavigationItems();
        }
        
        self.disconnected = () => {
            self.username("");
            self.password("");
        }
        
    }
    
    return new loginProcessor();
    
});


