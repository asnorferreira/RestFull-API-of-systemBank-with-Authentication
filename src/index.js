import { app } from './server.js'
import { config } from './configs/env.js'

app.listen(config.http_port, () => {
    console.log(`Listening on http://localhost:${config.http_port}`);
})