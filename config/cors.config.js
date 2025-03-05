const whitelist = [
  'http://localhost:3013',
  'http://localhost:5173',
  'http://localhost:4433'
]

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