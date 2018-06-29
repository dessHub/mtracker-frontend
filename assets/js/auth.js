import api from "./api";
window.onload = () =>{
    
    localStorage.setItem('sub', sub)
    let msg = localStorage.getItem("msg");
    document.getElementById('flash').style.color = 'green'
    document.getElementById('flash').innerHTML = msg
    localStorage.removeItem( 'msg' );
    
    const token = null;
    
    // POST user signup
    
    let singup_el = document.getElementById('signup');
    
    if (singup_el){
        singup_el.addEventListener
        ('submit', signup);
    }
    
    function signup(e){
        e.preventDefault();
    
        let endpoint = '/auth/register';
    
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;        
        let password = document.getElementById('password').value;
        let cnfpass = document.getElementById('cnfpass').value;
        let rawdata = {username:username, email:email,
            password:password, cnfpass:cnfpass}
    
        api.post(endpoint, rawdata, token)
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
    
    let singin_el = document.getElementById('signin');
    
    if (singin_el){
        singin_el.addEventListener
        ('submit', signin);
    }
    
    function signin(e){
        e.preventDefault();
    
        let endpoint = '/auth/login';
    
        let username = document.getElementById('username').value;        
        let password = document.getElementById('password').value;
        let rawdata = {username:username, password:password}
        api.post(endpoint, rawdata, token)
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
