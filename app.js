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
    const error = new Error('The page was not found. Please enter a valid URL.');
    err.status = 404;
    next(err);
})

app.use((error, req, res, next) => {
    res.status(error.status);
    res.send(`An error occured! (${error.status})`);
})




app.listen(3000, () => {
    console.log('The app is running on localhost:3000!');
});