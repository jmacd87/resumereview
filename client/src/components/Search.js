import React, { useEffect, useState } from 'react'
import Recipe from './Recipe'
import './search.scss'
import { Spring } from 'react-spring/renderprops'
import Loader from 'react-loader-spinner'

const Search = () => {
    const APP_ID = '557dfa09'
    const APP_KEY = 'ffb9b83fed6983fd7bc09a4ced75128f'

    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('asdf')
    const [isLoaded, setIsLoaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getRecipes = async () => {
            setIsLoaded(false)
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
            const data = await response.json()

            setRecipes(data.hits)

            if (data.hits.length === 0) {
                setErrorMessage('No results found, please try again')
            } else {
                setErrorMessage('')
                setSearch('')
                setIsLoaded(true)
            }
            if (query === 'asdf') {
                setErrorMessage('')
            }

        }
        getRecipes()
    }, [query])

    const updateSearch = e => {
        setSearch(e.target.value)
    }

    const getSearch = e => {
        e.preventDefault()
        setQuery(search)
    }
    let content

    if (isLoaded) {
        content = <div className="background"><Spring
            from={{ opacity: 0, marginTop: 1500 }}
            to={{ opacity: 1, marginTop: 0 }}
        >
            {props =>
                <div className="recipes" style={props}>
                    {recipes.map(recipe => (
                        <Recipe
                            key={Math.random()}
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}
                            liked={recipe.recipe.liked} />
                    ))}
                </div>

            }
        </Spring>
        </div>
    } else {
        if (errorMessage) {
            content = <h1 className='errorMessage'>{errorMessage}</h1>
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
    }
    if (!errorMessage && query === 'asdf') {
        content = <div className='searchLanding'><Spring
            from={{ opacity: 0, marginTop: 1500 }}
            to={{ opacity: 1, marginTop: 0 }}
        >
            {props => <div style={props}>

                <img src="https://i2.wp.com/www.nutracart.com/wp-content/uploads/2019/01/Healthy-eating-icon.png?ssl=1" alt='' />
                <h1>Find your recipes now</h1>
                {/* <div className="color-overlay"></div> */}
            </div>

            }
        </Spring>
        </div>
    }

    return (
        <div>
            <div style={{ backgroundColor: '#192c38' }}>
                <form onSubmit={getSearch} className="search-form">
                    <div className='search'>
                        <input onChange={updateSearch} className="search-bar" type="text" value={search} />
                        <button className="search-button" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {content}
        </div >
    )
}
export default Search