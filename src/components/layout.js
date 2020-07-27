import React from "react";
import clsx from 'clsx';
import { connect } from 'redux-bundler-react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { getNavHelper } from "internal-nav-helper";

const drawerWidth = 240;

/*
The material-ui approach to styling may take some getting used to...
https://material-ui.com/styles/basics/
*/
const useStyles = makeStyles( ( theme ) => ( {
  title: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
  },
  appBarShift: {
    width: `calc(100% - ${ drawerWidth }px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
  menuButton: {
    marginRight: theme.spacing( 2 ),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing( 3 ),
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
    marginLeft: 0,
  },
} ) );

const Layout = ( { route, routeInfo, routeMatcher, pathname, doUpdateUrl } ) => {
  const [ open, setOpen ] = React.useState( true );
  const classes = useStyles();
  const theme = useTheme();

  const navItems = [
    { url: '/', label: 'Home' },
    { url: '/people', label: 'People List' },
    { url: '/people/1', label: 'Person Detail' },
    { url: 'https://github.com/henrikjoreteg/redux-bundler', label: 'GitHub' }
  ]

  const Page = route

  const handleDrawerOpen = () => setOpen( true );
  const handleDrawerClose = () => setOpen( false );
  const updateUrl = ( url ) => doUpdateUrl( url );

  const isNavSelected = ( candidateUrl, currentRouteInfo, currentRouteMatcher ) => {
    if( currentRouteInfo.url === candidateUrl ) return true;
    else if( currentRouteInfo.pattern === currentRouteMatcher( candidateUrl )?.pattern ) return true;
    else return false;
  }

  // Placing onClick() for getNavHelper() on root element will automatically handle any anchor tag that changes the route.
  // Click event bubbles up and this handler will try to update the state and route (via the route bundle).
  return (
    <div className={ classes.root } onClick={ getNavHelper( doUpdateUrl ) }>
      <CssBaseline/>

      <AppBar
        position="fixed"
        className={ clsx( classes.appBar, { [ classes.appBarShift ]: open } ) }>

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx( classes.menuButton, open && classes.hide ) }>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            Redux-Bundler Example with Material-UI
          </Typography>
        </Toolbar>

      </AppBar>

      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ { paper: classes.drawerPaper } }>

        <div className={ classes.drawerHeader }>
          <IconButton onClick={ handleDrawerClose }>
            { theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
          </IconButton>
        </div>

        <Divider/>

        <List>
          { navItems.map( ( item ) => (
            <ListItem button key={ item.url } onClick={ () => updateUrl( item.url ) }
                      selected={ isNavSelected( item.url, routeInfo, routeMatcher ) }>
              <ListItemText primary={ item.label }/>
            </ListItem>
          ) ) }
        </List>

        <Divider/>

        <List>
          <ListItem>
            <ListSubheader component="div">Dummy Items with Icons</ListSubheader>
          </ListItem>

          { [ 'All mail', 'Fake Trash', 'Fake Spam' ].map( ( text, index ) => (
            <ListItem button key={ text }>
              <ListItemIcon>{ index % 2 === 0 ? <InboxIcon/> : <MailIcon/> }</ListItemIcon>
              <ListItemText primary={ text }/>
            </ListItem>
          ) ) }
        </List>

      </Drawer>

      <main className={ clsx( classes.content, { [ classes.contentShift ]: open } ) }>
        <div className={ classes.drawerHeader }/>
        <Page/>
      </main>
    </div>
  )
}

export default connect( 'selectRoute', 'selectRouteInfo', 'selectRouteMatcher', 'selectPathname', 'doUpdateUrl', Layout )
