import { connect } from 'redux-bundler-react'
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

const PeopleListPage = ( { peopleData, doUpdateUrl } ) => {

  let content = (<h3>No data yet</h3>);

  if( peopleData ) {
    content = peopleData.map( person => (
      <ListItem>
        <Link href={ `/people/${ person.id }` }>
          <ListItemText primary={ person.name }/>
        </Link>
      </ListItem>
    ) );
  }

  return (
    <List>
      { content }
    </List>
  );
}

export default connect(
  'selectPeopleData',
  'doUpdateUrl',
  PeopleListPage
)
