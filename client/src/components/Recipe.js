import React from 'react'
import style from './recipe.scss'
import LikeButton from './LikeButton'

const Recipe = ({ title, calories, image, ingredients, liked, id }) => {
    return (
        <div className="recipe">
            <img src={image} alt="" />
            <LikeButton ingredients={ingredients} title={title} image={image} calories={calories} liked={liked} id={id} />
            <h1 className="recipeTitle">{title}</h1>
            <h3 style={{ margin: 0, padding: 5, color: 'rgb(214, 95, 95)' }}>Ingredients</h3>
            <ol>
                {/* {ingredients.map(ingredient => (
                    <li key={Math.random()} className={style.ingredients}>{ingredient.text}</li>
                ))} */}
            </ol>
            <p style={{ fontWeight: 'bold', margin: 0 }}>Calories: {Math.round(calories)}</p>
        </div>
    )
}

export default Recipe