import express from 'express';

const app = express();

app.get('/login', (req, res) => {

    const loginParams = new URLSearchParams({ //Isso é transformado em uma querystring.
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback', //Essa rota capturará o resultado da autenticação.
        response_type: 'code' //Isso define que o fluxo é o "authorization code".
    });

    const url = "http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth"
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})