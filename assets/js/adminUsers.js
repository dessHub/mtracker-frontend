import api from "./api";
window.onload = function() {
    const token = localStorage.getItem("token");
    localStorage.removeItem("msg");

    // Load requests page 
    dashboard();

    function dashboard(){
        let endpoint = "/users";

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
                    let table = document.getElementById("table"); 
                    let data = resp;       

                    for(let i = 0; i < data.length; i++){
                        // create a table row
                        let new_row = table.insertRow();
                        
                        // create a table cell
                        let no = new_row.insertCell(0);
                        let name = new_row.insertCell(1);
                        let email = new_row.insertCell(2);
                        let role = new_row.insertCell(3);
                        let action = new_row.insertCell(4);

                        //add value to cell
                        no.innerHTML = i+1;
                        name.innerHTML = data[i].username;
                        email.innerHTML = data[i].email;
                        role.innerHTML =data[i].role;  
                        if(data[i].role == "Normal"){
                            action.innerHTML = "<a href=\"user.html?username="+ data[i].username + "\"><button class=\"btn-success\">Grant Admin Rights</button></a>";
                        }else{
                            action.innerHTML = "<a href=\"user.html?username="+ data[i].username + "\"><button class='btn-warning'>Revoke Admin Rights</button></a>";

                        }             
                        
                    }
                }
            });

    }
};