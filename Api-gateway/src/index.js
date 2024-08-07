const express = require('express');
const rateLimit=require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');


const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	// standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})




const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(limiter)


//proxy

app.use(
    '/flightsService',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
  );

  app.use(
    '/flightsBooking',
    createProxyMiddleware({
      target: 'http://localhost:4000/',
      changeOrigin: true,
    }),
  );

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
