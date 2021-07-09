import app from './app';
import './database';
import router from './routes';

// run server, this is the base url
app.use("/test/", router);
app.set("port", process.env.PORT || 4000);
//app.listen(4000);
const server = app.listen(app.get("port"), () => {
  console.log("server running in port --> ", app.get("port"));
});

