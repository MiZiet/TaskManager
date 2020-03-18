const express = require('express');
const router = express.Router();

const Workers = require('../../models/Workers.js');

router.get('/', (req, res) => {
    Workers.find()
        .then(workers => res.json(workers))
        .catch(err => res.status(400).json('Error:' + err));
});
router.post('/', (req, res) => {
    const newWorker = new Workers({
        name: req.body.name,
        position: req.body.position
    })
    newWorker.save()
        .then(workers => res.json(workers))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.delete('/:id', (req, res) => {
    Workers.findById(req.params.id)
        .then(workers => workers.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));

});

module.exports = router;