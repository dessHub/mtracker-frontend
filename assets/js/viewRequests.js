import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");

    // Load requests page 
    requestsList();

    function requestsList(){
        let endpoint = "/users/requests";

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                if(resp.response) {
                    document.getElementById("myDiv").style.display = "block";
                    document.getElementById("loader").style.display = "none";
                    let table = document.getElementById("table"); 
                    let list = resp.response;         

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
                        no.innerHTML = list.indexOf(data);
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

                        if(data.status == "Pending"){
                            action.innerHTML = "<a href=\"requestUpdate.html?reqId="+ data.id + "\">Edit</a>";
                        }
                        
                        
                    });

                }else{
                    
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = "../auth/login.html";
                }
            });

    }
};