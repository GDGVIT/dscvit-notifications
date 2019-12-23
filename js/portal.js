let notificationTitle = document.getElementById('title-text-field');
let notificationBody = document.getElementById('body-text-field');
let notificationUrl = document.getElementById('url-text-field');
let sendNotificationButton = document.getElementById('send-notification');
let allowNotification = true;

let createlinksButton = document.getElementById('store-links');
let linksTitle = document.getElementById('title-text-field-links');
let linksBody = document.getElementById('body-text-field-links');
let linksUrl = document.getElementById('url-text-field-links');

if(sessionStorage.getItem('DSCNotifAdminLogin') != 'true'){
    window.location = "./index.html";
}

function timeOutNotification(){
    allowNotification = false;

    setTimeout(function(){
        allowNotification = true;
    },30000)
}

let userDownloadLink = "https://dsc-notifs.herokuapp.com/notifs/csv?token=" + sessionStorage.getItem('DSCNotifAdminToken');

document.getElementById('usersDetailsDownload').setAttribute('href',userDownloadLink);

fetch('https://dsc-notifs.herokuapp.com/notifs/past', {
    method: 'GET',
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(function (response) {
        if (response.status != 200) {
            alert('Error Encountered');
        }
        return response.json();
    })
    .then(function (responseJSON) {
        document.getElementById('notificationCount').innerHTML = responseJSON.registration_count;
    })


createlinksButton.addEventListener("click", function(){

				let body = {
            title: linksTitle.value,
            body:linksBody.value,
            url:linksUrl.value
        }
				console.log(sessionStorage.getItem("DSCNotifAdminToken"))
				console.log(JSON.stringify(body))
        fetch('https://dsc-notifs.herokuapp.com/links/store', {
        method: 'POST',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('DSCNotifAdminToken')
        },
        body: JSON.stringify(body)
    })
        .then(function (response) {
            if(response.status!=200){
                alert('Error Encountered');
            }
            return response.json();
        })
        .then(function (responseJSON) {
						alert("Link stored")
            console.log(responseJSON);
        })

        timeOutNotification();

})
sendNotificationButton.addEventListener('click', function(){
    
    if(allowNotification === true){

				let body = {
            title: notificationTitle.value,
            body:notificationBody.value,
            url:notificationUrl.value
        }
				console.log(sessionStorage.getItem("DSCNotifAdminToken"))
				console.log(JSON.stringify(body))
        fetch('https://dsc-notifs.herokuapp.com/notifs/send', {
        method: 'POST',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('DSCNotifAdminToken')
        },
        body: JSON.stringify(body)
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

        timeOutNotification();

    }

    else{
        alert('You are on 30 second timeout! Stop spamming.')
    }


})
