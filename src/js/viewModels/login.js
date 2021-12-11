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

        self.setTopMenu = () => {
            $.ajax({
                url: JSON.parse(config).SERVICE_URL + '/topmenu',
                method: "GET",
                headers: {
                    "authorization": "Bearer " + window.localStorage.getItem("fvgf"),
                    "x-auth-type": window.localStorage.getItem("tfdv")
                },
                success: (data1) => {
                    self.navLanding(data1.pageDataArray);
                },
                error: (err) => {
                    //console.error(err);
                    //accUtils.announce("Something went wrong. Please try again later", 'error');
                }
            });

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
            $.post(JSON.parse(config).SERVICE_URL + '/login', loginRequest, (data, textStatus, request) => {
                window.localStorage.setItem("fvgf", request.getResponseHeader("X-Bixi"));
                window.localStorage.setItem("tfdv","n");
                return data;
            }).done((data) => {
                self.setTopMenu();
                routerUtil.toggleProfileMenuDisplay(true);
                accUtils.announce(data.messageDetail, 'assertive');
            }).fail((data) => {
                if(data.responseJSON && data.responseJSON.messageDetail){
                    accUtils.announce(data.responseJSON.messageDetail, 'error');
                }else{
                    accUtils.announce("Something went wrong. Please try again later", 'error');
                }
            });
        };

        self.proceedGoogleSSO = (event) => {
            window.open(JSON.parse(config).GAPI_URL, "_self");
        };

        self.logout = () => {
            $.ajax({
                url: JSON.parse(config).SERVICE_URL + '/logout',
                method: "GET",
                headers: {
                    "authorization": "Bearer " + window.localStorage.getItem("fvgf"),
                    "x-auth-type": window.localStorage.getItem("tfdv")
                },
                complete: () => {
                    routerUtil.navLogin();
                    routerUtil.toggleProfileMenuDisplay(false);
                    self.showLoadingImage(false);
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
            //history.pushState('','','/')
            routerUtil.navigate('dashboard');
        }
        
        self.forgotPassword = () => {
            
        };
        
        self.connected = () => {
            routerUtil.showNavigationItems();
            var loginMenuOption = document.getElementsByClassName("oj-navigationlist-item-element oj-navigationlist-item oj-navigationlist-item-last-child")[0];
            if(loginMenuOption){
                loginMenuOption.classList.remove('oj-default');
                loginMenuOption.classList.add('oj-selected');
            }
        }
        
        self.disconnected = () => {
            self.username("");
            self.password("");
        }

        self.showLoadingImage = ko.observable(true);
        
        require(['utils/jwt.util'], (jwtUtil) => {
            jwtUtil.verify()
            .then(() => {
                self.setTopMenu();
            })
            .catch(() => {
                self.showLoadingImage(false);
            });
        });
        
    }
    
    return new loginProcessor();
    
});


