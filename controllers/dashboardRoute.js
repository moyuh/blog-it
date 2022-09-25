const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) =>{
    Post.findAll({
        where:{
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'details'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_details', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['name']
            }
        },
        {
            model: User,
            attributes: ['name']
        }
    ]
    }).then(postData => {
        const posts = postData.map(post => post.get({
            plain:true
        }));
        res.render('dashboard', { posts, loggedIn: true });
    }).catch(err =>{console.log(err);
    res.status(500).json(err);

    });
});

router.get('/updatepost/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'details'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_details', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['name']
            }
        },
        {
            model: User,
            attributes: ['name']
        }
        ]
    }).then(postData => {
        if(!postData) {
            res.status(404).json({
                message: 'No post found with this id 😳'
            });
            return;
        }
        const post = postData.get({
            plain: true
        });

        res.render('updatepost', {
            post, loggedIn: true
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/new', (req, res) => {
    res.render('addpost', {
        loggedIn: true
    })
})

module.exports = router;