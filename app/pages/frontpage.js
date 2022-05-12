import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Paper } from "@mui/material";
import AppBar from "../frontend/AppBar";
import Link from 'next/link'
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { isLoggedIn } from "../frontend/helper/fetchcalls";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardButton from '../frontend/DashboardButton.js'
import HailIcon from '@mui/icons-material/Hail';
import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { format, category_tree } from '../frontend/helper/categories.js'

const paperspecs = 180;

const color = 'primary.main';
const iconSize = 90;
const textSize = 20;

const buttonSettings = {
  color : color,
  iconSize : iconSize,
  textSize : textSize,
  paperspecs : paperspecs
}

const categoryButtonSettings = {
  color : 'primary.main',
  iconSize : iconSize,
  textSize : textSize,
  paperspecs : paperspecs
}

export default function FrontPage(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(async () => {
    var loggedIn = await isLoggedIn()
    if (!loggedIn) {
      router.push('login')
    }
    else {
      setLoading(false)
    }
  })

  useEffect(async () => {
    if (router.isReady) {
      setQuery(router.query.query ? router.query.query : '')
    }
  }, [router.isReady])

  const onSearch = (text) => {
    router.push(`/category/all/all?search=${text}`)
  }

  if (loading) {
    return <Box>... loading</Box>
  } else if (query == '') {
      return(
        <Box>
          <AppBar onSearch={onSearch}/>
          <Toolbar/>
          <Container sx={{padding:2, }}>
            <Grid container spacing={2}>
              <DashboardButton 
              link='/category/all/all' 
              text='All Posts' 
              IconProp={AllInboxIcon} 
              settings={buttonSettings}
              />
              
              <DashboardButton 
              link='/category/all/all' 
              text='Liked Posts'
              IconProp={ThumbUpIcon} 
              settings={buttonSettings}
              />

              <DashboardButton 
              link='/newpost'
              text='New Post'
              IconProp={AddIcon}
              settings={buttonSettings}
              />

              {/*
              <DashboardButton 
              link='/'
              text='Patients'
              IconProp={FaceIcon} 
              settings={buttonSettings}
              />
              */}

              <DashboardButton 
              link='/category?query=upper-extremity'
              text={format['upper-extremity']}
              IconProp={HailIcon} 
              settings={categoryButtonSettings}
              />

              <DashboardButton 
              link='/category?query=abdomen'
              text={format['abdomen']}
              IconProp={AccessibilityIcon} 
              settings={categoryButtonSettings}
              />

              <DashboardButton 
              link='/category?query=lower-extremity'
              text={format['lower-extremity']}
              IconProp={AirlineSeatLegroomExtraIcon} 
              settings={categoryButtonSettings}
              />
            </Grid>
          </Container>
        </Box>
      );
    } else {
      console.log(query)
      const subcategories = category_tree[query]
      const subcategoryButtons = subcategories.map(category => {
        return(
          <DashboardButton 
          link={`/category/${query}/${category}`}
          text={format[category]}
          IconProp={AccessibilityIcon}
          settings={categoryButtonSettings}
          />
          )
      })

      return(
        <Box>
          <AppBar onSearch={onSearch}/>
          <Toolbar/>
          <Container sx={{padding:2, }}>
            <Grid container spacing={2}>
              {subcategoryButtons}
            </Grid>
          </Container>
        </Box>
        )
    }

};