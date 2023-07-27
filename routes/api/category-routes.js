const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let categories = await Category.findAll({
    include: { model: Product }
  })
  if (categories) {
    return res.json(categories)
  }
  else {
    return res.status(404).send('No categories found')
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let category = await Category.findByPk(req.params.id, {
    include: { model: Product }
  })
  
  if (category.length > 0) {
    return res.json(category)
  }
  else {
    req.params.idres.status(404).send('Category not found')
  }
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
    .then((category) => {
      return res.status(200).json(category);
      
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send("There was an error creating this category")
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id
    }})
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send("There was an error updating this category")
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((category) => {
      return res.status(200).send("Successfuly deleted category")
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send("There was an error deleting this category")
  });
});

module.exports = router;
