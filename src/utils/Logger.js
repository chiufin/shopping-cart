import bunyan from 'bunyan'

const ExpressLogger = bunyan.createLogger({
  name: 'ExpressLogger',
})
ExpressLogger.info('Logger created')

export default ExpressLogger
