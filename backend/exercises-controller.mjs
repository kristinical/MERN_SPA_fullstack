import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller: POST method ******************************************
app.post ('/exercises', (req,res) => { 
    exercises.createExercise(
        // validate user input
        req.body.name ? req.body.name : undefined, 
        req.body.reps > 0 ? req.body.reps : undefined, 
        req.body.weight > 0 ? req.body.weight : undefined,
        req.body.unit !== "invalid" ? req.body.unit : undefined,
        req.body.date ? req.body.date : undefined
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of an exercise failed due to invalid syntax.' });
        });
});


// RETRIEVE controller: GET method ***********************************************
// GET exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve exercise failed' });
        });

});

// GET exercises filtered by its properties
app.get('/exercises', (req, res) => {
    let filter = {};
    // filter by exercise id
    if(req.query._id !== undefined){
        filter._id = req.query._id;
    }
    // filter by exercise name
    if(req.query.name !== undefined){
        filter.name = req.query.name;
    }
    // filter by reps
    if(req.query.reps !== undefined){
        filter.reps = req.query.reps;
    }
    // filter by weight
    if(req.query.weight !== undefined){
        filter.weight = req.query.weight;
    }
    // filter by unit
    if(req.query.unit !== undefined){
        filter.unit = req.query.unit;
    }
    // filter by date
    if(req.query.date !== undefined){
        filter.date = req.query.date;
    }
    exercises.findExercises(filter, '', 0)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve exercises failed' });
        });

});

// UPDATE controller: PUT method ************************************
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.status(200).json({ 
                _id: req.params._id, 
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Exercise not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update an exercise failed' });
    });
});


// DELETE Controller: DELETE method **********************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete an exercise failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});