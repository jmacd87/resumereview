import React from 'react'
import './recipes.scss'
import { connect } from 'react-redux'
import Recipe from './Recipe'
import Loader from 'react-loader-spinner'
import { Spring } from 'react-spring/renderprops'
import PropTypes from 'prop-types'
import { getRecipes } from '../actions/recipeActions'

class Recipes extends React.Component {

    static propTypes = {
        getRecipes: PropTypes.func.isRequired,
        recipe: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };
    async componentDidMount() {

        await this.props.getRecipes()
    }
    async componentDidUpdate() {
        await this.props.getRecipes()
    }

    render() {
        const { recipes } = this.props.recipe

        let content

        if (!this.props.loading && recipes) {
            content = <Spring
                from={{ opacity: 0, marginTop: 1500 }}
                to={{ opacity: 1, marginTop: 0 }}
            >
                {props => <div className="recipes" style={props} >
                    {recipes.map(recipe => (
                        <Recipe
                            key={recipe._id}
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
        if (!this.props.loading && recipes.length === 0) {
            content = <h1 className='errorMessage'>Add recipes to view here</h1>
        }

        return (
            <div className="app" >
                <div className="background">
                    {content}
                </div>
            </div>
        )

    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    recipe: state.recipe,
    loading: state.recipe.loading
})
export default connect(
    mapStateToProps,
    { getRecipes }
)(Recipes)



// const Recipes = () => {
//     const [recipes, setRecipes] = useState([])
//     const [isLoaded, setIsLoaded] = useState(false)
//     const [errorMessage, setErrorMessage] = useState('')

//     useEffect(() => {

//         getAllRecipes()

//     })
//     function usePrevious(value) {
//         const ref = useRef();
//         useEffect(() => {
//             ref.current = value;
//         });
//         return ref.current;
//     }

//     const prevRecipes = usePrevious(recipes)
//     const getAllRecipes = (prevRecipes) => {
//         if (prevRecipes != recipes) {
//             setIsLoaded(false)
//             axios.get('http://localhost:5000/recipes/')
//                 .then(res => {
//                     setRecipes(res.data)
//                     console.log('loaded')
//                 })
//                 .catch(err => {
//                     console.log(err + 'what')
//                     setIsLoaded(true)
//                 })

//             if (recipes.length === 0 && isLoaded) {
//                 setErrorMessage('Please add a recipe in order to view here.')

//             }
//             else {
//                 setErrorMessage('')
//                 setIsLoaded(true)
//             }
//         }
//     }

//     let content
//     if (isLoaded) {

//         content = <Spring
//             from={{ opacity: 0, marginTop: 1500 }}
//             to={{ opacity: 1, marginTop: 0 }}
//         >
//             {props => <div className="recipes" style={props} >
//                 {recipes.map(recipe => (
//                     <Recipe
//                         key={recipe.image}
//                         id={recipe._id}
//                         title={recipe.title}
//                         calories={recipe.calories}
//                         image={recipe.image}
//                         ingredients={recipe.ingredients}
//                         liked={true} />
//                 ))}
//             </div>}
//         </Spring>
//     } else {
//         content = <div className='errorMessage'>
//             <Loader
//                 type="ThreeDots"
//                 color="rgb(214, 95, 95)"
//                 height={100}
//                 width={100}
//                 timeout={3000} />
//         </div>
//     }
//     if (isLoaded && errorMessage) {
//         content = <h1 className='errorMessage'>{errorMessage}</h1>
//     }


//     return (
//         <div >
//             <div className="background">
//                 {content}
//             </div>
//         </div>
//     )
// }

// export default Recipes