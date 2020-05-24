define(['jquery', 'knockout', 'utils/router.util', 'cryptojs/crypto-js', 'text!config/configuration.json', 'accUtils', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup', 'ojs/ojdataprovider'],
function($, ko, routerUtil, cryptojs, config, accUtils){
    
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
            var loginRequest = {
                username: self.username,
                password: cryptojs.SHA512(self.password()).toString(cryptojs.enc.Base64)
            };
            $.post(JSON.parse(config).serviceUrl + '/login', loginRequest, (data, textStatus, request) => {
                return data;
            }).done((data) => {
                self.navLanding(data.pageDataArray);
                accUtils.announce(data.messageDetail, 'assertive');
            }).fail((data) => {
                if(data.responseJSON.messageDetail){
                    accUtils.announce(data.responseJSON.messageDetail, 'error');
                }else{
                    accUtils.announce("Something went wrong. Please try again later", 'error');
                }
            });
        };
        
        self.navRegister = () => {
            routerUtil.configureRoute({'register': {label: 'Register', isDefault: true}});
            routerUtil.setNavData([{name: 'Register', id: 'register', iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'}]);
            routerUtil.navigate('register');
        };

        self.navLanding = (pageDataArray) => {
            var navData = [];
            var routeConfig = {};
            var routeConfigElement = {};
            pageDataArray.forEach(element => {
                navData.push({name: element.name, id: element.id, iconClass: element.iconClass});
                routeConfigElement.label = element.dashboard;
                if(element.isDefault){
                    routeConfigElement.isDefault = true;
                }
                routeConfig[element.id] = routeConfigElement;
            });
            routerUtil.configureRoute(routeConfig);
            routerUtil.setNavData(navData);
            routerUtil.navigate('dashboard');
        }
        
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


