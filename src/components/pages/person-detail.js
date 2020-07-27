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
import Grid from "@material-ui/core/Grid";

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

const PersonDetailPage = ( { peopleDataStatus, routeParams, activePerson, doUpdateUrl } ) => {
  const classes = useStyles();
  let content = <h3>No data yet</h3>

  const humanize = ( str ) => {
    let i, frags = str.split( '_' );
    for( i = 0; i < frags.length; i++ ) {
      frags[ i ] = frags[ i ].charAt( 0 ).toUpperCase() + frags[ i ].slice( 1 );
    }
    return frags.join( ' ' );
  }

  const displayKeys =  [ "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender" ]

  if( activePerson ) content = (
    <div style={{ flexGrow: 1, marginTop: 30 }}>
      <Grid container spacing={3}>
        <Grid item xs>
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
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent>
              <h3>Dynamically Fetched Data:</h3>
              <p>Source: https://swapi.co/api/</p>
              <p>Status: { peopleDataStatus }</p>
              <p>result:</p>
              <pre><code>{ JSON.stringify( activePerson, null, 2 ) }</code></pre>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  return content;
}

export default connect(
  'selectPeopleDataStatus',
  'selectRouteParams',
  'selectActivePerson',
  'doUpdateUrl',
  PersonDetailPage
)
