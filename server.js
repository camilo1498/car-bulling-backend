const express = require('express');
const http = require('http');
const cors = require('cors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

require('./database/db_connection')

const app = express();
const server = http.createServer(app);

/// routes
const userroutes = require('./routes/userRoutes')

Sentry.init({
    dsn: 'https://ac034ebd99274911a8234148642e044c@o537348.ingest.sentry.io/5655435',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app })
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
  })
  
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(cors())
app.use(express.json())
userroutes(app)

const port = process.env.PORT || 3001

server.listen(port, function() {
    console.log('Anitialize server aplication ' + port)
})