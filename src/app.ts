import express, {Express} from 'express'
import router from "./Routers/Router";
import connect from "./DB/connect";
const port  =  process.env.PORT || 5000;
const app : Express = express();
// app.use(cors({origin: true}))
connect

app.use(express.json())

app.use(router)

// export const server = app.listen(port, () => {
//         console.log('Running on port ' + port);
// });
app.listen(port, () => {
        console.log('Running on port ' + port);
});


export default app;