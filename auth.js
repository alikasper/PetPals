function authFunc() {
    return fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: 'post',
        body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: pfapiKey,
            client_secret: pfapiSecret
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}