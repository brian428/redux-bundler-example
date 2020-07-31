import { createSelector } from 'redux-bundler'
import { RoutePathMap } from "./routes";

// just being lazy here and only fetching people once
// with no error handling. Again, in a real app you
// can create abstractions for resource bundles like this
// one and then extend them to include the particulars
// for your app.

// Main thing I'm wanting to highlight here is how
// we grab the "active" person for the person detail view
// see the `selectActivePerson` selector below

export const PeopleActions = {
  FETCH_PEOPLE_START: "FETCH_PEOPLE_START",
  FETCH_PEOPLE_SUCCESS: "FETCH_PEOPLE_SUCCESS",
  FETCH_PEOPLE_ERROR: "FETCH_PEOPLE_ERROR",
  REFRESH_PEOPLE: "REFRESH_PEOPLE"
};

const debugLog = true;

export default {
  name: 'people',

  getReducer: () => {
    const initialState = {
      data: null,
      loading: false,
      lastError: null,
      lastFetch: null
    };

    return ( state = initialState, { type, payload } ) => {
      if( type === PeopleActions.FETCH_PEOPLE_START ) {
        if( debugLog ) console.log( "people bundle: reducer handling FETCH_PEOPLE_START" );
        return Object.assign( {}, state, {
          loading: true
        } )
      }
      if( type === PeopleActions.FETCH_PEOPLE_ERROR ) {
        return Object.assign( {}, state, {
          lastError: Date.now(),
          loading: false
        } )
      }
      if( type === PeopleActions.FETCH_PEOPLE_SUCCESS ) {
        if( debugLog ) console.log( "people bundle: reducer handling FETCH_PEOPLE_SUCCESS" );
        return Object.assign( {}, state, {
          loading: false,
          lastFetch: Date.now(),
          lastError: null,
          // we'll just extract an ID here and insert it as a property
          // on the data for this person.
          // Normally API will include an id attribute of some kind
          // for each object in the results, but not so for this API.
          data: payload.results.map( person => {
            const split = person.url.split( '/' )
            const id = split[ split.length - 2 ]
            return Object.assign( person, { id } )
          } )
        } )
      }
      if( type === PeopleActions.REFRESH_PEOPLE ) {
        if( debugLog ) console.log( "people bundle: reducer handling REFRESH_PEOPLE" );
        return Object.assign( {}, state, {
          data: null
        } )
      }

      return state
    }
  },

  doRefreshPeople: () => ( { dispatch, swapiFetch } ) => {
    if( debugLog ) console.log( "people bundle: doRefreshPeople()" );
    dispatch( { type: PeopleActions.REFRESH_PEOPLE } );
  },

  doFetchPeople: () => ( { dispatch, swapiFetch } ) => {
    if( debugLog ) console.log( "people bundle: doFetchPeople()" );
    dispatch( { type: PeopleActions.FETCH_PEOPLE_START } );
    swapiFetch( '/people' )
      .then( payload => {
        dispatch( { type: PeopleActions.FETCH_PEOPLE_SUCCESS, payload } )
      } )
      .catch( error => {
        dispatch( { type: PeopleActions.FETCH_PEOPLE_ERROR, error } )
      } );
  },

  selectPeopleRaw: state => {
    if( debugLog ) console.log( "people bundle: selectPeopleRaw()" );
    return state.people;
  },

  selectPeopleData: state => {
    if( debugLog ) console.log( "people bundle: selectPeopleData()" );
    return state.people.data;
  },

  selectActivePerson: createSelector(
    'selectRouteParams',
    'selectPathname',
    'selectPeopleData',
    ( routeParams, pathname, peopleData ) => {
      if( !pathname.includes( RoutePathMap.PEOPLE ) || !routeParams.id || !peopleData ) {
        return null
      }
      if( debugLog ) console.log( "people bundle: selectActivePerson()" );
      return peopleData.find( person => person.id === routeParams.id ) || null
    }
  ),

  // BK: This gets run automatically by redux-bundler but I'm not sure how it decides when to trigger it.
  // Nothing in the app calls it directly. My *guess* is that it sets itself up so any time something tries to call
  // `selectPeopleRaw`, it automatically runs this and if needed it triggers the action creator.
  // The docs emphasize that this MUST change the condition it is using or it can trigger an infinite loop.
  // In this case, triggering `doFetchPeople` sets loading to true and eventually populates `people`, so subsequent
  // calls to this will return false.
  reactShouldFetchPeople: createSelector(
    'selectPeopleRaw',
    'selectPathname',
    ( peopleData, pathname ) => {
      if( debugLog ) console.log( "people bundle: reactShouldFetchPeople() checking for `doFetchPeople`" );
      if( !pathname.includes( RoutePathMap.PEOPLE ) || peopleData.loading || peopleData.data ) return false;
      if( debugLog ) console.log( "people bundle: reactShouldFetchPeople() triggering `doFetchPeople`" );
      return { actionCreator: 'doFetchPeople' };
    }
  ),

  // we'll extract a status string here, for display, just to show
  // the type of information available about the data
  selectPeopleDataStatus: createSelector(
    'selectPeopleRaw',
    peopleData => {
      const { data, lastError, lastFetch, loading } = peopleData

      let result = ''

      if( data ) {
        result += 'Has data'
      } else {
        result += 'Does not have data'
      }

      if( loading ) {
        return result + ' and is fetching currently'
      }

      if( lastError ) {
        return result + ` but had an error at ${ new Date( lastError ).toLocaleString() }`
      }

      if( lastFetch ) {
        return result + ` that was fetched at ${ new Date( lastFetch ).toLocaleString() }`
      }
    }
  ),
}
