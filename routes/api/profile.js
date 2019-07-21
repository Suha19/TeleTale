const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post(
    '/',
    [
        auth,
        [
            check('age', 'Age is required')
            .not()
            .isEmpty(),
            check('position', 'Job Position is required')
            .not()
            .isEmpty(),
            check('location', 'location is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            age,
            position,
            location
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if (age) profileFields.age = age;
        if (position) profileFields.position = position;
        if (location) profileFields.location = location;
        console.log(profileFields)

        try {
            let profile = await Profile.findOne({
                user: req.user.id
            });

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                });

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

);

// @route GET api/profile
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route GET api/profile/user/:user_id

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found'
            });
        }
        res.status(500).send('Server Error');
    }

    // @route DELETE api/profile

    router.delete('/', auth, async (req, res) => {
        try {
            // Remove profile
            await Profile.findOneAndRemove({
                user: req.user.id
            });
            // Remove user
            await User.findOneAndRemove({
                _id: req.user.id
            });

            res.json({
                msg: 'User deleted'
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
});


module.exports = router;