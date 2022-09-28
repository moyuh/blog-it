const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try{
  const userData = await User.findAll({
    attributes: {
      exculude: ['password']
    }
  });
  res.status(200).json(userData);
  }catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) =>{
  try {
  const userData = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id', 'name', 'details']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_details'],
          include: {
            model: Post,
            attributes: ['name']
          }
        }
      ]
  });
  res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// ERROR IS HERE AHHHHH
router.post('/signup', async (req, res) => {
  console.log(req.body.name, req.body.password);
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password
    });
    
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(403).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(401)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

