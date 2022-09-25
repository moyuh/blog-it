const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
   try{
    const postData = await Post.findAll({
      attributes: ['id', 'name', 'details'],
      order: [['creation_data', 'DESC']],
      include: [{
        model: User,
        attributes: ['name'],
      }, 
      {
        model: Comment,
        attributes: ['id', 'comment_details', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['name']
        },
      },
    ],
    });
    res.status(200).json(postData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'name', 'details'],
    include: [{
      model: User,
      attributes: ['names'],
    },
    {
      model: Comment,
      attributes: ['id', 'comment_details', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['name']
        },
    },
  ],
    });
    res.status(200).json(postData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
     name: req.body.name,
     details: req.body.details,
     user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
      name: req.body,name,
      details: req.body.details,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatePost)
  }catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

