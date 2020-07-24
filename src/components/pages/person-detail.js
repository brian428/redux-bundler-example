import { connect } from 'redux-bundler-react'
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles( {
  card: {
    minWidth: 275,
    marginBottom: 30
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  tableContainer: {
    maxWidth: 400
  }
} );

/*
{
  "name": "Darth Vader",
  "height": "202",
  "mass": "136",
  "hair_color": "none",
  "skin_color": "white",
  "eye_color": "yellow",
  "birth_year": "41.9BBY",
  "gender": "male",
  "homeworld": "http://swapi.dev/api/planets/1/",
  "films": [
    "http://swapi.dev/api/films/1/",
    "http://swapi.dev/api/films/2/",
    "http://swapi.dev/api/films/3/",
    "http://swapi.dev/api/films/6/"
  ],
  "species": [],
  "vehicles": [],
  "starships": [
    "http://swapi.dev/api/starships/13/"
  ],
  "created": "2014-12-10T15:18:20.704000Z",
  "edited": "2014-12-20T21:17:50.313000Z",
  "url": "http://swapi.dev/api/people/4/",
  "id": "4"
}
 */

const PersonDetailPage = ( { routeParams, activePerson, doUpdateUrl } ) => {
  const classes = useStyles();
  let content = <h3>No data yet</h3>

  const humanize = ( str ) => {
    let i, frags = str.split( '_' );
    for( i = 0; i < frags.length; i++ ) {
      frags[ i ] = frags[ i ].charAt( 0 ).toUpperCase() + frags[ i ].slice( 1 );
    }
    return frags.join( ' ' );
  }

  if( activePerson ) console.log( Object.keys( activePerson ) );

  const displayKeys =  [ "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender" ]

  if( activePerson ) content = (
    <div>
      <Card className={ classes.card }>

        <CardContent>
          <Typography className={ classes.title } color="textSecondary" gutterBottom>
            { activePerson.name }
          </Typography>

          <TableContainer component={ Paper } className={ classes.tableContainer }>
            <Table className={ classes.table } aria-label="simple table">
              <TableBody>
                { displayKeys.map( ( key ) => (
                  <TableRow key={ key }>
                    <TableCell align="left">{ humanize( key ) }</TableCell>
                    <TableCell align="left">{ humanize( activePerson[ key ] ) }</TableCell>
                  </TableRow>
                ) ) }
              </TableBody>
            </Table>
          </TableContainer>

        </CardContent>

        <CardActions>
          <Button size="small" onClick={ () => doUpdateUrl( "/people" ) }>Back to List</Button>
        </CardActions>

      </Card>

      <pre><code>{ JSON.stringify( activePerson, null, 2 ) }</code></pre>
    </div>
  );

  return content;
}

/*

 */

export default connect(
  'selectRouteParams',
  'selectActivePerson',
  'doUpdateUrl',
  PersonDetailPage
)
