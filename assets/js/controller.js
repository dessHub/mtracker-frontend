window.onload = function() {

    const sub = "http://0.0.0.0:5000/api/v2"
    let msg = localStorage.getItem("msg");
    document.getElementById('flash').style.color = 'green'
    document.getElementById('flash').innerHTML = msg
    localStorage.removeItem( 'msg' );
    const token = localStorage.getItem("token");

    // POST user signup
    let singup_el = document.getElementById('signup')
    if (singup_el){
        singup_el.addEventListener
        ('submit', signup);
    }

    function signup(e){
        e.preventDefault();
    
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;        
        let password = document.getElementById('password').value;
        let cnfpass = document.getElementById('cnfpass').value;
    
        fetch(sub + '/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({username:username, email:email,
                password:password, cnfpass:cnfpass})
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Registered Successfully"){
                    if(data.response == "Username Is already taken"){
                        document.getElementById('flash').style.color = 'red'
                        document.getElementById('flash').innerHTML = data.response
                    }else {
                        localStorage.setItem("msg",data.message);
                        window.location.href = 'login.html'
                    }
                }else{
                    document.getElementById('flash').style.color = 'red'
                    document.getElementById('flash').innerHTML = data.message

                }
            })
    
        }

    // POST user login
    let login_el = document.getElementById('signin')
    if (login_el){
        login_el.addEventListener
        ('submit', signin);
        
    }

    function signin(e){
        e.preventDefault();
    
        let username = document.getElementById('username').value;        
        let password = document.getElementById('password').value;
            
        fetch(sub + '/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({username:username, password:password})
            })
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data)
                if(data.message == "Login Successfull.") {
                    console.log(data.Access_token)
                    localStorage.setItem("token",data.Access_token);
                    localStorage.setItem("msg",data.message);
                    window.location.href = 'request-form.html'

                }else{
                    document.getElementById('flash').style.color = 'red'
                    document.getElementById('flash').innerHTML = data.message
                }
            })
    
    }

    // Load create requests page 
    let reqform = document.getElementById('reqForm')
    if (reqform){
        reqform.addEventListener
        ('click', requestForm);
        
    }


    function requestForm(e){
        e.preventDefault();

        fetch(sub + '/users/requests', {
            method:"GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data)
                if(data.message) {
                    
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = 'login.html'
                }else{
                    window.location.href = 'request-form.html'
                }
            })
    
    }

    // Post requests 
    let req_form = document.getElementById('request_form')
    if (req_form){
        req_form.addEventListener
        ('submit', createRequest);
        
    }

    function createRequest(e){
        e.preventDefault();
    
        let location = document.getElementById('location').value;        
        let category = document.getElementById('category').value;        
        let description = document.getElementById('description').value;

        fetch(sub + '/users/requests', {
            method:"POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:JSON.stringify({category:category,
                location:location, description:description})
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message == "Successfully created") {
                    window.location.href = 'my-requests.html'

                }else{
                    document.getElementById('flash').style.color = 'red'
                    document.getElementById('flash').innerHTML = data.message
                }
            })
    
    }

    // Load requests page 
    let reqs = document.getElementById('reqs')
    if (reqs){
        reqs.addEventListener
        ('click', requestsList);
        
    }


    function requestsList(e){
        e.preventDefault();

        fetch(sub + '/users/requests', {
            method:"GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data.response[1])
                if(data.response) {
                    localStorage.setItem("reqList", JSON.stringify(data.response));
                    window.location.href = 'my-requests.html'

                }else{
                    localStorage.setItem("msg","Login To Continue");
                    window.location.href = 'login.html'
                }
            })
    
    }



}