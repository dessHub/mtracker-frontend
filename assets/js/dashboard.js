import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");

    // Load requests page 
    dashboard();

    function dashboard(){
        let endpoint = "/dashboard";

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
                    let data = resp.pending;
                    let pending = data.length;
                    let approved = resp.approved.length;
                    let users = resp.users.length;
                    
                    document.getElementById("pending").innerHTML = pending;
                    document.getElementById("approved").innerHTML = approved;
                    document.getElementById("users").innerHTML = users;         

                    for(let i = 0; i < data.length; i++){
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
                        no.innerHTML = i+1;
                        category.innerHTML = data[i].category;
                        location.innerHTML = data[i].location;
                        description.innerHTML =data[i].description;
                        status.innerHTML = "<span id=\"status-pending\">" + data[i].status + "</span>";                  
                        action.innerHTML = "<a href=\"request.html?reqId="+ data[i].id + "\">Approve</a>";
                        
                        
                        
                    }
                }
            });

    }
};