/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery', 'knockout', '../appController', 'ojs/ojcore', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojformlayout', 'ojs/ojvalidationgroup'],
function($, ko, app){
    
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
            app.router.go('dashboard');
        }.bind(self);
        
        self.register = function(){
            
        }.bind(self);
        
        self.forgotPassword = function(){
            
        }.bind(self);
        
        
    }
    
    return new loginProcessor();
    
});


