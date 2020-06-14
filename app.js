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

/*********************
 * 404 Error Handler followed by a custom error handler that points 
 * to the error.pug file and renders it if an error occurs. 
*********************/

app.use((req, res, next) => {
    const err = new Error('Uh-oh! This page doesn\'t exist! Try again.');
    err.status = 404;
    console.log('That page doesn\'t exist in the app.')
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.render('error');
    res.status(err.status);
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000!');
});