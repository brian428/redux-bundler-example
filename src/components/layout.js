import React from "react";
import { connect } from 'redux-bundler-react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getNavHelper } from "internal-nav-helper";

/*
The material-ui approach to styling may take some getting used to...
https://material-ui.com/styles/basics/
*/
const useStyles = makeStyles( ( theme ) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing( 2 ),
  },
  title: {
    flexGrow: 1,
  },
}) );

const Layout = ( { doUpdateUrl, route, pathname } ) => {
  const [ anchorEl, setAnchorEl ] = React.useState( null );
  const classes = useStyles();

  const navItems = [
    { url: '/', label: 'Home' },
    { url: '/people', label: 'People List' },
    { url: '/people/1', label: 'Person Detail' },
    { url: 'https://github.com/henrikjoreteg/redux-bundler', label: 'GitHub' }
  ]

  const Page = route

  const openMenu = ( event ) => setAnchorEl( event.currentTarget );
  const closeMenu = () => setAnchorEl( null );

  const updateUrl = ( url ) => {
    closeMenu();
    doUpdateUrl( url );
  }

  return (
    <main onClick={ getNavHelper(doUpdateUrl) }>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu" onClick={ openMenu }>
            <MenuIcon/>
          </IconButton>

          <Menu id="app-menu" anchorEl={ anchorEl } keepMounted open={ Boolean( anchorEl ) } onClose={ closeMenu }>
            { navItems.map( item => <MenuItem key={item.url} onClick={ () => updateUrl( item.url ) }>{ item.label }</MenuItem> ) }
          </Menu>

          <Typography variant="h6" className={ classes.title }>
            Redux Bundler Example with Material-UI
          </Typography>

        </Toolbar>
      </AppBar>

      <Page/>

    </main>
  )
}

export default connect( 'selectRoute', 'selectPathname', 'doUpdateUrl', Layout )
