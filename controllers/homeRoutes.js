const router = require('express').Router();
const sequilize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
          attributes: ['id', 'name', 'details', 'creation_data'],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_details', 'post_id', 'user_id', 'creation_data'],
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
    const postData = await Post.findByPk(req.params.id, {
          attributes: ['id', 'name', 'details', 'creation_data'],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_details', 'post_id', 'user_id', 'creation_data'],
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
      ...post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true
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
