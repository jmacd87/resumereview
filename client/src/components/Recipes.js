import React from 'react'
import './recipes.scss'
import { connect } from 'react-redux'
import Recipe from './Recipe'
import Loader from 'react-loader-spinner'
import { Spring } from 'react-spring/renderprops'
import PropTypes from 'prop-types'
import { getRecipes } from '../actions/recipeActions'
import { loadUser } from '../actions/authActions'

class Recipes extends React.Component {
    static propTypes = {
        getRecipes: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired,
        recipe: PropTypes.array,
        auth: PropTypes.object,
    };

    render() {
        const user = this.props.auth.user
        if (user) {
            const { recipes } = this.props.recipe
            let content
            if (this.props.loading) {
                content = <div className='errorMessage'>
                    <Loader
                        type="ThreeDots"
                        color="rgb(214, 95, 95)"
                        height={100}
                        width={100}
                        timeout={3000} />
                </div>
            }

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
            }
            if (!this.props.loading && !recipes) {
                content = <h1 className='errorMessage'>Add recipes to view here</h1>
            }
        } else {
            content = <h1>Please sign in to see recipes</h1>
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
    auth: state.auth,
    loading: state.auth.isLoading,
    recipe: state.recipe
})
export default connect(
    mapStateToProps,
    { getRecipes, loadUser }
)(Recipes)

