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
      });
  });

  module.exports = router;