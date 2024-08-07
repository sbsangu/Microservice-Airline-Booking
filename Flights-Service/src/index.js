const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
const PORT=ServerConfig.PORT|| 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/flightsService/api',apiRoutes)

app.listen(PORT, () => {
    console.log(`Successfully started the server on PORT : ${PORT}`);
});
