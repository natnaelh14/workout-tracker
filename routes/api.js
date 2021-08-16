const router = require('express').Router();
const Workout = require('../models/workout.js');

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
        if (err) throw err;
      });
  });

  router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((workout) => {
        console.log(workout);
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
        if (err) throw err;
      });
  });

  router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  module.exports = router;