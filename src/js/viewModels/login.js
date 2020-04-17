/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery', 'knockout', '../appController', 'utils/router.util', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup', 'ojs/ojdataprovider'],
function($, ko, app, routerUtil){
    
    function loginProcessor(){
        var self = this;
        self.username = ko.observable("");
        self.password = ko.observable("");
        
        self.placeholders = ko.observable({
            username: 'Username',
            password: 'Password'
        });
        
        self.validateCredentials = function(event){
            var loginValidationGroup = document.getElementById("loginValidationGroup");
            
            if(self.username() == "" || self.password() == ""){
                loginValidationGroup.showMessages();
                loginValidationGroup.focusOn("@firstInvalidShown");
                return false;
            }
            
            console.log(self.username());
            console.log(self.password());
            routerUtil.configureRoute({
                'dashboard': {label: 'Dashboard', isDefault: true},
                'timeline': {label: 'Timeline'},
                'documents': {label: 'Documents'},
                'about': {label: 'About'}
            });
            
            routerUtil.setNavData([{name: 'Login', id: 'login',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24', display: "none"},
               {name: 'Dashboard', id: 'dashboard',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24', display: "block"},
               {name: 'Timeline', id: 'timeline',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24', display: "block"},
               {name: 'Documents', id: 'documents',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24', display: "block"},
               {name: 'About', id: 'about',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24', display: "block"}
            ]);
            routerUtil.navigate('timeline');
        }.bind(self);
        
        self.register = function(){
            
        }.bind(self);
        
        self.forgotPassword = function(){
            
        }.bind(self);
        
        
    }
    
    return new loginProcessor();
    
});


