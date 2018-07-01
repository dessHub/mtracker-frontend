import api from './api';
window.onload = function() {
    const token = localStorage.getItem("token");

    // Load requests page 
    requestsList()

    function requestsList(){
        let endpoint = '/users/requests';

        api.get(endpoint, token)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp)
                if(resp.response) {
                    document.getElementById("myDiv").style.display = "block";
                    let table = document.getElementById('table'); 
                    let data = resp.response         

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
                        description.innerHTML ='<a href="request.html">'+ data[i].description + '</a>';
                        if(data[i].status == "Pending"){
                            status.innerHTML = '<span id="status-pending">' + data[i].status + '</span>';
                        }else if(data[i].status == "Resolved"){
                            status.innerHTML = '<span id="status-resolved">' + data[i].status + '</span>';
                        }else{
                            status.innerHTML = '<span id="status-cancelled">' + data[i].status + '</span>';
                        }

                        if(data[i].status == "Pending"){
                            action.innerHTML = '<a href="requestUpdate.html?reqId='+ data[i].id + '">Edit</a>';
                        }
                        
                        
                    }

                }else{
                    
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = '../auth/login.html'
                }
            })

    }
}