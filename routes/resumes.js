const router = require('express').Router()
const auth = require('../middleware/auth')

router.post('/upload', auth, async (req, res) => {

    // Recipe.find(req.body.title)
    //     .then(recipe => {
    //         if (recipe) return res.status(400).json({ msg: 'Recipe already added' })

    try {
        const resume = await newResume.save();
        if (!recipe) throw Error('Something went wrong saving the item');

        res.status(200).json(recipe);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
})