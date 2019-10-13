import nconf from 'nconf'

// Initialise with arguments and env variables
nconf.argv().env()

// Set the default environment to production
nconf.defaults({
  NODE_ENV: 'production',
})

// Load environment constants for environment
nconf.file({ file: `./config/envconfig/envconfig.${nconf.get('NODE_ENV')}.json` })

// Pass all values into process.env
process.env = nconf.get()

export {
  nconf
}
