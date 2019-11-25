let notificationTitle = document.getElementById('title-text-field');
let notificationBody = document.getElementById('body-text-field');
let notificationUrl = document.getElementById('url-text-field');
let sendNotificationButton = document.getElementById('send-notification');

if(sessionStorage.getItem('DSCNotifAdminLogin') != 'true'){
    window.location = "/index.html";
}

sendNotificationButton.addEventListener('click', function(){
    
    
    fetch('https://dscrec19.herokuapp.com/notifs/send', {
        method: 'POST',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('DSCNotifAdminToken')
        },
        body: JSON.stringify({
            title: notificationTitle.value,
            body:notificationBody.value,
            url:notificationUrl.value
        })
    })
        .then(function (response) {
            if(response.status!=200){
                alert('Error Encountered');
            }
            return response.json();
        })
        .then(function (responseJSON) {
            console.log(responseJSON);
        })


})
