define(['jquery', 'text!config/configuration.json'], function($, config) {
    function jwtUtil(){
        var self = this;

        self.verify = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: JSON.parse(config).SERVICE_URL + '/verify',
                    method: 'GET',
                    beforeSend: (xhr) => {
                        xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("fvgf"))
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    error: (err) => {
                        reject(err);
                    }
                });
            });
        };
    }
    return new jwtUtil();
    
});