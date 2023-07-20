const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let tags = await Tag.findAll();
  if (tags) {
    res.json(tags)
  }
  else {
    res.status(404).send('No tags found')
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let tag = await Tag.findByPk(req.params.id);
  if (tag) {
    res.json(tag)
  }
  else {
    res.status(404).send('Tag not found')
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, { where: { id: req.params.id } })
    .then((tag) => {
      res.status(200).json(tag);
    })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagID = req.params.id

    await Tag.destroy({
        where: {
            id: tagID,
        }
    })
    res.status(200).send("Successfuly deleted tag")
  } catch (err) {
      console.log(err)
      res.status(500).send("There was an error deleting this tag")
  }
});

module.exports = router;
