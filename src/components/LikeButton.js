import React from 'react'
import '../App.css'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addRecipe, deleteRecipe } from '../actions/recipeActions'


class LikeButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: false
        }
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
    }
    componentDidMount() {
        if (this.props.liked) {
            this.setState({ liked: true })
        }
    }

    toggleLike = () => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }))

    }

    handleLike = () => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => {
                const { user } = this.props.auth
                const { title, ingredients, image, calories, id } = this.props
                console.log('id', id)
                const newRecipe = { title, ingredients, image, calories, user }
                this.props.addRecipe(newRecipe)

            }
        )
    }
    handleDislike = () => {
        const { id } = this.props
        this.props.deleteRecipe(id)

    }

    render() {

        return (
            <div className="heartContainer">
                {this.state.liked ?
                    (<div onClick={this.handleDislike} className="heart"><FaHeart size={32} /></div>) :
                    (<div onClick={this.handleLike} className="heart"><FiHeart size={32} /></div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
})

export default connect(mapStateToProps, { addRecipe, deleteRecipe })(LikeButton)