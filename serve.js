import 'dotenv/config';
import express from 'express';
import cors from "cors";
const __dirname = import.meta.dirname;
// cors
import { corsOptions } from './config/cors.config.js';
// Routes
import rtMergeImage from './routes/mergeImage.routes.js';
import rtGetFrames from './routes/getframes.routes.js';

const app= express();
const server= express();
const port= process.env.PORT || 3013;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/upload'));
app.use(express.static(__dirname + '/assets'));
// app.use( fileupload() );
// Custom routes
app.use( 
  rtMergeImage,
  rtGetFrames
);
server.use('/tipsyAPI', cors(corsOptions),  app);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
