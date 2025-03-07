import 'dotenv/config';
import express from 'express';
import exhttps from 'https-localhost'

import cors from "cors";
const __dirname = import.meta.dirname;
// cors
// import { corsOptions } from './config/cors.config.js';
// Routes
import rtMergeImage from './routes/mergeImage.routes.js';
import rtGetAssets from './routes/getAssets.routes.js';


const app= express();
const server= exhttps();
const port= process.env.PORT || 3013;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/upload'));
app.use(express.static(__dirname + '/assets'));
// Custom routes
app.use( 
  rtMergeImage,
  rtGetAssets
);

app.get('/', function(req, res) {
  res.status(404).json({error:'Not allowed'});
});
server.use('/tipsyAPI', cors(),  app);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
