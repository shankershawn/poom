/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(["../appController"],
function(app){
    function processRoute(){
        var self = this;
        
        self.navigate = function(stateId){
            app.router.go(stateId);
        }
        
        self.configureRoute = function(routeConfig){
            app.router.configure(routeConfig);
        }
        
        self.setNavData = function(navData){
            app.navData(navData);
        }
    }
    return new processRoute();
});