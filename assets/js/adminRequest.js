import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");
    let url = new URL(window.location.href);
    let reqId = url.searchParams.get("reqId");
    localStorage.removeItem("reqid");
    localStorage.setItem("reqid", reqId);
    console.log(reqId);
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
                    document.getElementById("category").innerHTML = data.category;
                    document.getElementById("location").innerHTML = data.location;
                    document.getElementById("description").innerHTML = data.description;
                    document.getElementById("status").innerHTML = data.status;

                    
                    if(data.status == "Pending"){
                        document.getElementById("myspan").style.display = "block";
                        document.getElementById("myspan2").style.display = "block";                        
                    } 
                    if(data.status == "Approved"){
                        document.getElementById("myresolve").style.display = "block";
                    }
                    

                }
            });

    }

    let req_form = document.getElementById("approve");
    if (req_form){
        req_form.addEventListener("submit", approve);
        
    }

    function approve(e){
        e.preventDefault();
        
        let endpoint = "/requests/" + reqId + "/approve";

        api.get(endpoint, token )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.message);
                if(data.message == "Approved Successfully") {
                    document.getElementById("flash").style.color = "green";
                    document.getElementById("flash").innerHTML = data.message;
                    window.location.href = "request.html?reqId=" + reqId;
                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }

    let dis_form = document.getElementById("disapprove");
    if (dis_form){
        dis_form.addEventListener("submit", disapprove);
        
    }

    function disapprove(e){
        e.preventDefault();
        
        let endpoint = "/requests/" + reqId + "/disapprove";

        api.get(endpoint, token )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.message);
                if(data.message == "Disapproved Successfully") {
                    document.getElementById("flash").style.color = "green";
                    document.getElementById("flash").innerHTML = data.message;
                    window.location.href = "request.html?reqId=" + reqId;
                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }

    let res_form = document.getElementById("resolve");
    if (res_form){
        res_form.addEventListener("submit", resolve);
        
    }

    function resolve(e){
        e.preventDefault();
        
        let endpoint = "/requests/" + reqId + "/resolve";

        api.get(endpoint, token )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if(data.message == "Resolved Successfully") {
                    document.getElementById("flash").style.color = "green";
                    document.getElementById("flash").innerHTML = data.message;
                    window.location.href = "request.html?reqId=" + reqId;
                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }

    let del_form = document.getElementById("delete");
    if (del_form){
        del_form.addEventListener("submit", remove);
        
    }

    function remove(e){
        e.preventDefault();
        
        let endpoint = "/requests/" + reqId + "/delete";

        api.get(endpoint, token )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.response);
                if(data.response == "Deleted Successfully") {
                    document.getElementById("flash").style.color = "green";
                    document.getElementById("flash").innerHTML = data.message;
                    window.location.href = "requests.html";
                }else{
                    document.getElementById("flash").style.color = "red";
                    document.getElementById("flash").innerHTML = data.message;
                }
            });

    }

};