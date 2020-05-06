import React from 'react'
import './recipes.scss'
import { connect } from 'react-redux'
import Recipe from './Recipe'
import Loader from 'react-loader-spinner'
import { Spring } from 'react-spring/renderprops'
import PropTypes from 'prop-types'
import { getRecipes } from '../actions/recipeActions'
import axios from 'axios';
class Recipes extends React.Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            isLoaded: false,
            msg: null
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    componentDidMount = () => {
        this.getAllRecipes()
    }

    getAllRecipes = async () => {
        this.setState({ isLoaded: false })
        await axios
            .get('http://localhost:5000/recipes/')
            .then(res => {
                this.setState({ recipes: res.data, isLoaded: true })
                console.log('loaded')
                console.log('recipes', this.state.recipes)
            })
            .catch(err => {
                console.log(err + 'what')
                this.setState({ isLoaded: true })
            })
        if (this.state.recipes.length === 0) {
            console.log('ERRO MSG')
            this.setState({ msg: 'Please add a recipe to view', isLoaded: true })
        }
    }
    render() {
        console.log('msg', this.state.msg)
        console.log('recipes', this.state.recipes)
        let content
        if (this.state.isLoaded) {
            content = <Spring
                from={{ opacity: 0, marginTop: 1500 }}
                to={{ opacity: 1, marginTop: 0 }}
            >
                {props => <div className="recipes" style={props} >
                    {this.state.recipes.map(recipe => (
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
        if (this.state.isLoaded && this.state.msg) {
            console.log('msg', this.state.msg)
            content = <h1 className='errorMessage'>{this.state.msg}</h1>
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