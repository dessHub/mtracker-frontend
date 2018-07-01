import api from './api';
window.onload = function() {
    const token = localStorage.getItem("token");

    // Load requests page 
    logOut()

    function logOut(){
        let endpoint = '/auth/logout';

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp)
                if(resp.message == "logout successfuly.") {
                    localStorage.setItem("msg","logout successfuly."); 
                    window.location.href = 'login.html'        

                }else{
                    
                    localStorage.setItem("msg",resp.message); 
                    window.location.href = 'login.html' 
                }
            })

    }
}