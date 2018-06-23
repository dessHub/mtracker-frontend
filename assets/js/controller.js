window.onload = function() {

    // POST user signup
    let elemnt = document.getElementById('signup')
    if (elemnt){
        elemnt.addEventListener
        ('submit', signup);
    }

    function signup(e){
        e.preventDefault();
    
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;        
        let password = document.getElementById('password').value;
        let cnfpass = document.getElementById('cnfpass').value;
    
        fetch('https://mtracker28.herokuapp.com/api/v2/auth/register', {
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
                        window.location.href = 'login.html'
                        document.getElementById('flash').style.color = 'green'
                        document.getElementById('flash').innerHTML = data.message
                    }
                }else{
                    document.getElementById('flash').style.color = 'red'
                    document.getElementById('flash').innerHTML = data.message

                }
            })
    
        }



}