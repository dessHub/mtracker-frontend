import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");
    let msg = localStorage.getItem("msg");
    document.getElementById("flash").style.color = "green";
    document.getElementById("flash").innerHTML = msg;
    localStorage.removeItem( "msg" );
    let url = new URL(window.location.href);
    let reqId = url.searchParams.get("reqId");
    requestForm();

    // Load create requests page 
    function requestForm(){
        let endpoint = "/users/requests/" + reqId;

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data);
                if(data.message) {
                    if(data.message == "The request doesnt exist"){
                        localStorage.setItem("error","The request doesnt exist");
                        window.location.href = "../errors/error.html";
               
                    }else{
                        localStorage.setItem("msg","Login To Continue");
                        window.location.href = "../auth/login.html";
                    }                    

                }else{
                    document.getElementById("myDiv").style.display = "block";
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("category").value = data.category;
                    document.getElementById("location").value = data.location;
                    document.getElementById("description").value = data.description;

                }
            });

    }

    // Post requests 
    let req_form = document.getElementById("request_form");
    if (req_form){
        req_form.addEventListener("submit", createRequest);
        
    }

    function createRequest(e){
        e.preventDefault();
        let endpoint = "/users/requests/" + reqId;

        let location = document.getElementById("location").value;        
        let category = document.getElementById("category").value;        
        let description = document.getElementById("description").value;

        let rawdata = {category:category,
            location:location, description:description};

        api.update(endpoint, rawdata, token )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if(data.message == "Update succesfful") {
                    window.location.href = "my-requests.html";

                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }

};