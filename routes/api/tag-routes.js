const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let tags = await Tag.findAll();
  if (tags) {
    return res.json(tags)
  }
  else {
    return res.status(404).send('No tags found')
  }

});

router.get('/:name', async (req, res) => {
  // find a single tag by its `name`
  // be sure to include its associated Product data
  let tag = await Tag.findAll(
    {
      where: {
        tag_name: req.params.name
      },
      include: { 
        model: Product 
      } 
  });
  if (tag) {
    res.json(tag)
  }
  else {
    res.status(404).send('Tag not found')
  }

});

router.get('/id/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let tag = await Tag.findByPk(req.params.id, {
    include: { 
      model: Product 
    } 
  });
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
      return res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('There was an error creating a new tag')
    })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, { where: { id: req.params.id } })
    .then((tag) => {
      return res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('There was an error updating this tag')
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
    .then((tag) => {
      return res.status(200).send("Successfuly deleted tag")
    })
  } catch (err) {
      console.log(err)
      return res.status(500).send("There was an error deleting this tag")
  }
});

module.exports = router;
