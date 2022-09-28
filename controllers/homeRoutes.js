const router = require('express').Router();
const sequilize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
          attributes: ['id', 'name', 'details'],
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
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
          where: {
            id: req.params.id, },
          attributes: ['id', 'name', 'details'],
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
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router;
