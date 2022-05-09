import AppBar from '../../../frontend/AppBar.js';
import Posts from '../../../frontend/Posts.js';
import ShortPost from '../../../frontend/ShortPost.js';
import Container from '@mui/material/Container';
import { Box, Toolbar, Typography, IconButton } from '@mui/material';
import { useState } from 'react'
import { useRouter } from 'next/router';
import categories from '../../../frontend/helper/categories.js'
import { searchPosts } from '../../../frontend/helper/fetchcalls.js'
import CategoryDisplay from '../../../frontend/CategoryDisplay.js'
import ClearIcon from '@mui/icons-material/Clear'

const loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam orci dui, porta maximus ante eu, maximus ullamcorper lectus. Phasellus non risus massa. In ut orci sed ex convallis tincidunt. Proin fermentum sapien ac enim finibus, vitae iaculis velit molestie. In hac habitasse platea dictumst. Pellentesque rutrum auctor purus, nec cursus nunc semper non. Maecenas vel ornare quam. In at condimentum lorem, ac vehicula lectus. Ut bibendum, turpis eu efficitur commodo, lorem odio scelerisque dolor, ut congue ipsum nunc ut sapien. Aliquam ac diam pellentesque, dictum dui sed, consequat sapien. Duis id diam purus. Nulla id lectus pellentesque, pharetra orci ut.'

export default function Feed(props) {
  const router = useRouter()

  const { category, subcategory, search } = router.query
  const [searchText, setSearch] = useState(search)
  const _category = {
    bodyCategory : category,
    bodyPart : subcategory
  }

  const mockPost = {
    _id : '123123',
    gender: 'm',
    age: 22,
    weight: 70,
    height: 175,
    pictures: {
      pre_op: null,
      during_op: null,
      post_op: null
    },
    title: 'Hello World',
    med_history: loremipsum,
    current_treatment: 'hello',
    analysis: 'lorem ipsum',
    recommendation: 'lorem ipsum',
    category: categories[0],
    tags: ['lorem', 'ipsum'],
    consent: true //do we need this?
  }
  const posts = [mockPost, mockPost, mockPost, mockPost, mockPost]
  const post_elems = posts.map(post => (<ShortPost data={post}/>))

  return (
    <Box>
      <Box
        component="main"
        sx={{
          //flexGrow:1,
        }}
      >
        <AppBar onSearch={setSearch}/>
        <Toolbar/>
        <CategoryDisplay 
        size={20}
        primary={true}
        category={_category}
        sx = {{m : 3, fontSize : 30}}
        />
        {
          searchText ? 
          <Box sx = {{
            mx : 3,
            display : 'flex',
            flexAlign : 'row'
          }}>
            <Typography sx={{
              width : 'fit-content'
            }}>
              Search: '{searchText}'
            </Typography>
            <IconButton 
            sx={{
              p : 0,
              ml : 2
            }}
            onClick={() => {
              setSearch('')
            }}
            >
              <ClearIcon/>
            </IconButton>
          </Box>
          : 
          null
        }
        { post_elems }
        {/*<Posts />*/}
      </Box>
    </Box>
  )
}

