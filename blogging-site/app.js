const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

let blogs = [
  {
    id: 1,
    title: 'Margherita Pizza',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0HbRY0SsECXq3XHqjXUBw3CqK1VfE5PX1w&s',
    content:
      'Margherita pizza is a classic Italian pizza made with fresh tomatoes, mozzarella cheese, basil, and olive oil. It has a simple and fresh taste.',
  },
  {
    id: 2,
    title: 'Pepperoni Pizza',
    image:
      'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg',
    content:
      'Pepperoni pizza is one of the most popular pizza varieties. It is topped with spicy pepperoni slices, mozzarella cheese, and tomato sauce.',
  },
]

// Home Page
app.get('/', (req, res) => {
  res.render('index', { blogs })
})

//Create new blog
app.post('/newblog', (req, res) => {
  const { title, image, content } = req.body

  blogs.push({
    id: blogs.length + 1,
    title,
    image,
    content,
  })

  res.redirect('/blogList')
})

//Blog list
app.get('/blogList', (req, res) => {
  res.render('blogList', { blogs })
})

//Edit page
app.get('/edit/:i', (req, res) => {
  const index = req.params.i
  const blog = blogs[index]

  if (blog) {
    res.render('editBlog', { blog, index })
  } else {
    res.send('Blog not found')
  }
})

// Update blog
app.post('/edit/:index', (req, res) => {
  const index = req.params.index
  const { title, image, content } = req.body

  if (blogs[index]) {
    blogs[index] = { ...blogs[index], title, image, content }
    res.redirect('/blogList')
  } else {
    res.send('Blog Not found')
  }
})

app.post('/delete/:i', (req, res) => {
  const id = req.params.i
  blogs.splice(id, 1)
  res.redirect('/blogList')
})

module.exports = { app }
