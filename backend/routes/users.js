const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const jwt_secretToken = 'jwt_Secret1'


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const { email, password, first_name, last_name } = req.body

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' })

            const newUser = new User
            newUser.first_name = req.body.first_name,
                newUser.last_name = req.body.last_name,
                newUser.email = req.body.email,
                newUser.password = req.body.password,

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    { id: user.id },
                                    jwt_secretToken,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                email: user.email
                                            }
                                        })
                                    }
                                )
                            })
                            .catch(err => res.status(400).json('Error: ' + err))
                    })
                })
        })
})

// router.route('/login').post((req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields' })
//     }
//     User.findOne({ email })
//         .then(user => {
//             if (!user) return res.status(400).json({ msg: 'User Does not exist' })

//             // validate password
//             bcrypt.compare(password, user.password)
//                 .then(isMatch => {
//                     if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' })
//                     jwt.sign(
//                         { id: user.id },
//                         jwt_secretToken,
//                         { expiresIn: 3600 },
//                         function (err, token) {
//                             if (err) throw (err + 'cant sign');
//                             res.json({
//                                 token,
//                                 user: {
//                                     id: user.id,
//                                     email: user.email
//                                 }
//                             })
//                         }
//                     )
//                 })
//                 .catch(err => res.status(400).json('Error: ' + err + 'cant compare'))
//         })
// })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) throw Error('User Does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, jwt_secretToken, { expiresIn: 3600 });
        if (!token) throw Error('Couldnt sign the token');
        console.log('user', user)
        res.status(200).json({
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                created: user.createdAt
            }
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//@route GET users/token
//@desc Get user data from token
//@access Private
router.get('/token', auth, (req, res) => {
    console.log('user', req.user)
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router