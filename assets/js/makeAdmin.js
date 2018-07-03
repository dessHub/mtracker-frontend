import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");
    let url = new URL(window.location.href);
    let username = url.searchParams.get("username");

    // Load requests page 
    makeadmin();

    function makeadmin(){
        let endpoint = "/users/" + username + "/admin";

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                if(resp.response) {
                    localStorage.setItem("error",resp.response);
                    window.location.href = "../errors/error.html";


                }else if(resp.message){
                    if(resp.message == "Successful"){
                        window.location.href = "users.html";

                    }else{

                        localStorage.setItem("msg","Login To Continue");
                        window.location.href = "../auth/login.html";
                    }

                }
            });

    }
};