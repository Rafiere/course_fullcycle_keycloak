import express from 'express';

const app = express();

/* Com o authentication code, não perdemos o SSO. */

app.get('/login', (req, res) => {

    const loginParams = new URLSearchParams({ //Isso é transformado em uma querystring.
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback', //Essa rota capturará o resultado da autenticação.
        response_type: 'code', //Isso define que o fluxo é o "authorization code".
        scope: 'openid'
    });

    /* A URL abaixo é a URL do Keycloak. Em cada aplicação, essa URL pode mudar. */
    const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`

    console.log(url)

    res.redirect(url) //Estamos redirecionando o usuário para o Keycloak.
})

app.get('/callback', async (req, res) => {

    console.log(req.query)

    const bodyParams = new URLSearchParams({
        grant_type: 'authorization_code', //Estamos informando o fluxo de autenticação utilizado.
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback',//Essa rota capturará o resultado da autenticação.
    })

    const url = `http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString()
    })

    const result = await response.json();

    console.log(result);

    res.json();
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})