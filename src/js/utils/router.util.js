define(["../appController", "ojs/ojrouter"],
function(app, Router){
    function processRoute(){
        var self = this;
        
        self.navigate = function(stateId){
            app.router.go(stateId);
        }
        
        self.configureRoute = function(routeConfig){
            app.router = Router.rootInstance;
            app.router.configure(routeConfig);
        }
        
        self.setNavData = function(navData){
            hideNavigationItems();
            app.navData(navData);
        }
        
        self.showNavigationItems = function(){
            document.getElementById('ui-id-2').style.visibility = "visible";
        }
        
        function hideNavigationItems(){
            Array.from(document.getElementById('ui-id-2').children).forEach(li => li.style.visibility = "hidden");
            document.getElementById('ui-id-2').style.visibility = "hidden";
        }
    }
    return new processRoute();
});