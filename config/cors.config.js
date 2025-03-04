const whitelist = ['http://localhost:3013']

export const corsOptions = {
  origin: (origin, callback)=> {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  methods: 'GET,POST'
}