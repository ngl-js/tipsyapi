const whitelist = [
  'https://tipsy-rrdx.onrender.com',
  'https://tipsyapi.onrender.com',
  'https://api.editframe.com'
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