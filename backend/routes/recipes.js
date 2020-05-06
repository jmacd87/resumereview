const router = require('express').Router()
let Recipe = require('../models/recipe.model')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        if (!recipes) throw Error('No items');

        res.status(200).json(recipes);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
})

router.post('/add', auth, async (req, res) => {

    // Recipe.find(req.body.title)
    //     .then(recipe => {
    //         if (recipe) return res.status(400).json({ msg: 'Recipe already added' })

    const title = req.body.title
    const image = req.body.image
    const ingredients = req.body.ingredients
    const calories = req.body.calories
    const user = req.body.user
    const newRecipe = new Recipe({
        title,
        image,
        ingredients,
        calories,
        user
    })

    try {
        const recipe = await newRecipe.save();
        if (!recipe) throw Error('Something went wrong saving the item');

        res.status(200).json(recipe);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
})
router.delete('/:id', auth, async (req, res) => {
    console.log('route hit')
    try {
        const recipe = await Recipe.findById(req.params.id);
        console.log('finding recipe', recipe)
        if (!recipe) throw Error('No recipefound');

        const removed = await Recipe.deleteOne(recipe);
        console.log('deleteing recipe', removed)
        if (!removed) throw Error('Something went wrong while trying to delete the recipe');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
});

module.exports = router