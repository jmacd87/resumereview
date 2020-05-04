import React, { useEffect, useState } from 'react'
import './recipes.scss'
import axios from 'axios'
import Recipe from './Recipe'
import Loader from 'react-loader-spinner'
import { Spring } from 'react-spring/renderprops'
import { getRecipes } from '../actions/recipeActions'
import { connect } from 'react-redux'
const Recipes = ({ getRecipes }) => {
    const [recipes, setRecipes] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getAllRecipes()
    })

    const getAllRecipes = async () => {

        setIsLoaded(false)
        axios.get('http://localhost:5000/recipes/')
            .then(res => {
                setRecipes(res.data)
                setIsLoaded(true)
            })
        if (recipes.length === 0 && isLoaded) {
            setErrorMessage('Please add a recipe in order to view here.')
        }
        else {
            setErrorMessage('')
            setIsLoaded(true)
        }
    }

    let content
    if (isLoaded) {

        content = <Spring
            from={{ opacity: 0, marginTop: 1500 }}
            to={{ opacity: 1, marginTop: 0 }}
        >
            {props => <div className="recipes" style={props} >
                {recipes.map(recipe => (
                    <Recipe
                        key={recipe.image}
                        id={recipe._id}
                        title={recipe.title}
                        calories={recipe.calories}
                        image={recipe.image}
                        ingredients={recipe.ingredients}
                        liked={true} />
                ))}
            </div>}
        </Spring>
    } else {
        content = <div className='errorMessage'>
            <Loader
                type="ThreeDots"
                color="rgb(214, 95, 95)"
                height={100}
                width={100}
                timeout={3000} />
        </div>
    }
    if (isLoaded && errorMessage) {
        content = <h1 className='errorMessage'>{errorMessage}</h1>
    }


    return (
        <div >
            <div className="background">
                {content}
            </div>
        </div>
    )
}

export default connect(null, { getRecipes })(Recipes)