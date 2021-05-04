const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      included: [{ model: Product },]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

// router.put("/:id", async (req, res) => {
//   try {
//     const tagData = await Tag.update(req.body,
//       {
//         where: {
//           id: req.params.id
//         }
//       })
//       if (!tagData) {
//         res.status(404).json({ message: "No tags with this id found!" })
//       }
//       res.status(200).json(tagData);
//   } catch ({ message }) {
//     res.status(500).json({ message })
//   }
// });

router.put('/:id', async (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: "No tag found with that id!"});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
