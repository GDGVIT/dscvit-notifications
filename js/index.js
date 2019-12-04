let portalLogoinButton = document.getElementById('enter-portal');
let portalLoginParaphraseValue =  document.getElementById('login-text-field');

if(sessionStorage.getItem('DSCNotifAdminLogin') === 'true'){
    window.location = "./portal.html";
}

portalLogoinButton.addEventListener('click',function(){
    
    fetch('https://dsc-notifs.herokuapp.com/login', {
            method:'POST',
            crossDomain:true,
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify ({
                passphrase:portalLoginParaphraseValue.value
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJSON){
            if(responseJSON.message === 'Invalid input'){
                alert('Enter Correct Password');
            }
            else{
                sessionStorage.setItem('DSCNotifAdminLogin', 'true');
                sessionStorage.setItem('DSCNotifAdminToken', responseJSON.token);
                window.location = "/portal.html";
            }

        })

})
