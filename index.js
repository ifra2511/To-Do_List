import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];
app.get('/', (req,res)=>{
    res.render('index.ejs', {tasks: tasks});
});

app.post('/addtask', (req,res)=>{
    let task = req.body.newtask;
    tasks.push(task);
    res.redirect('/');
});

app.post('/deletetask', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex);
    if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect('/');
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
