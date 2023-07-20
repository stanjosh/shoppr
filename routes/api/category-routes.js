const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let categories = await Category.findAll()
  let products = await Product.findAll()
  if (categories) {
    res.json(categories)
  }
  else {
    res.status(404).send('No categories found')
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let category = await Category.findAll({
    where: {
      id: req.params.id
    },
    include: { model: Product }
  })
  
  if (category) {
    res.json(category)
  }
  else {
    res.status(404).send('Category not found')
  }
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {where: {
    id: req.params.id
    }})
    .then((category) => {
      res.status(200).json(category);
    }
  )
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryID = req.params.id // Delete http requests usually use a query and not a body

    await Category.destroy({
        where: {
            id: categoryID,
        }
    })
    res.status(200).send("Successfuly deleted category")
  } catch (err) {
      console.log(err)
      res.status(500).send("There was an error deleting this category")
  }
});

module.exports = router;
