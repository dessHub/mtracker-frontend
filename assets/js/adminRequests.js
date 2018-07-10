import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");

    // Load requests page 
    dashboard();

    function dashboard(){
        let endpoint = "/requests";

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                if(resp.response) {
                    localStorage.setItem("error",resp.response);
                    window.location.href = "../errors/error.html";


                }else if(resp.message){
                    
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = "../auth/login.html";

                }else{
                    document.getElementById("myDiv").style.display = "block";
                    document.getElementById("loader").style.display = "none";
                    let table = document.getElementById("table"); 
                    let list = resp;

                    list.map((data) => {
                        // create a table row
                        let new_row = table.insertRow();
                        
                        // create a table cell
                        let no = new_row.insertCell(0);
                        let category = new_row.insertCell(1);
                        let location = new_row.insertCell(2);
                        let description = new_row.insertCell(3);
                        let status = new_row.insertCell(4);
                        let action = new_row.insertCell(5);

                        //add value to cell
                        no.innerHTML = list.indexOf(data)+1;
                        category.innerHTML = data.category;
                        location.innerHTML = data.location;
                        description.innerHTML =data.description;
                        if(data.status == "Pending"){
                            status.innerHTML = "<span id=\"status-pending\">" + data.status + "</span>";
                        }else if(data.status == "Resolved"){
                            status.innerHTML = "<span id=\"status-resolved\">" + data.status + "</span>";
                        }else{
                            status.innerHTML = "<span id=\"status-cancelled\">" + data.status + "</span>";
                        }                  
                        action.innerHTML = "<a href=\"request.html?reqId="+ data.id + "\">Update Status</a>";
                        
                        
                        
                    });
                }
            });

    }

    let search_req = document.getElementById("search");
    if (search_req){
        search_req.addEventListener("submit", search);
        
    }

    function search(e){
        e.preventDefault();

        let endpoint = "/requests/search";

        let status = document.getElementById("status").value;        
        let category = document.getElementById("category").value;  
        let rawdata = {category:category,status:status};

        api.post(endpoint, rawdata, token)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                if(resp.response) {
                    localStorage.setItem("error",resp.response);
                    window.location.href = "../errors/error.html";


                }else if(resp.message){
                    
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = "../auth/login.html";

                }else if(resp.data){
                    document.getElementById("tbody").innerHTML = "";
                    let table = document.getElementById("table"); 
                    let list = resp.data;        
                          

                    list.map((data) => {
                        // create a table row
                        let new_row = table.insertRow();
                        
                        // create a table cell
                        let no = new_row.insertCell(0);
                        let category = new_row.insertCell(1);
                        let location = new_row.insertCell(2);
                        let description = new_row.insertCell(3);
                        let status = new_row.insertCell(4);
                        let action = new_row.insertCell(5);

                        //add value to cell
                        no.innerHTML = list.indexOf(data) + 1;
                        category.innerHTML = data.category;
                        location.innerHTML = data.location;
                        description.innerHTML =data.description;
                        if(data.status == "Pending"){
                            status.innerHTML = "<span id=\"status-pending\">" + data.status + "</span>";
                        }else if(data.status == "Resolved"){
                            status.innerHTML = "<span id=\"status-resolved\">" + data.status + "</span>";
                        }else{
                            status.innerHTML = "<span id=\"status-cancelled\">" + data.status + "</span>";
                        }                  
                        action.innerHTML = "<a href=\"request.html?reqId="+ data.id + "\">Update Status</a>";
                        
                        
                        
                    });

                }
            });

    }

};