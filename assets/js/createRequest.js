import api from "./api";
window.onload = () =>{
    const token = localStorage.getItem("token");
    let msg = localStorage.getItem("msg");
    document.getElementById("flash").style.color = "green";
    document.getElementById("flash").innerHTML = msg;
    localStorage.removeItem( "msg" );
    requestForm();

    // Load create requests page 
    function requestForm(){
        let endpoint = "/check";
        api.get(endpoint, token)
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data);
                if(data.message == "Authenticated") {
                    console.log(data.message);
                    document.getElementById("myDiv").style.display = "block";
                }else{
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = "../auth/login.html";
                }
            });

    }

    // Post requests 
    let req_form = document.getElementById("request_form");
    if (req_form){
        req_form.addEventListener
        ("submit", createRequest);
        
    }

    function createRequest(e){
        e.preventDefault();

        let endpoint = "/users/requests";

        let location = document.getElementById("location").value;        
        let category = document.getElementById("category").value;        
        let description = document.getElementById("description").value;
        let rawdata = {category:category,
            location:location, description:description};

        api.post(endpoint, rawdata, token)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.message == "Successfully created") {
                    window.location.href = "my-requests.html";

                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }


};