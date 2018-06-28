window.onload = function() {

    const sub = "http://0.0.0.0:5000/api/v2"
    localStorage.setItem('sub', sub)
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

}