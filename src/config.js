const host = process.env.HOST || 'localhost'
const port = '8080'

export default {
  host,
  port,
  app: {
    title: '',
    description: '',
    head: {
      titleTemplate: '',
      meta: [
        { name: 'description', content: '' },
        { charset: 'utf-8' },
      ],
    },
  },
}
