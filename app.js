/*********************
 * Variables for the necessary dependencies
*********************/

const express = require("express");
const app = express();
const data = require("./data.json");

/*********************
 * Sets Pug as the view engine
*********************/

app.set('view engine', 'pug');

/*********************
 * Sets up static server to supply CSS files. 
*********************/

app.use('/static', express.static('public'));

/*********************
 * Sets routes to the pages to be rendered.
*********************/

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const thisProject = data.projects[id];
    console.log(thisProject);
    const templateData = { thisProject };
    res.render('project', templateData);
});

app.use((req, res, next) => {
    const error = new Error('<h1>The page was not found.</h1>');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status);
    res.send(`${error.message} <h1>${error.status}</h1>`);
})




app.listen(3000, () => {
    console.log('The app is running on localhost:3000!');
});