import { createRouteBundle } from 'redux-bundler'
import HomePage from '../components/pages/home'
import PersonDetailPage from '../components/pages/person-detail'
import PeoplePage from '../components/pages/people'

export const RoutePathMap = {
  HOME: "/",
  PEOPLE: "/people",
  PERSON_DETAIL: "/people/:id"
}

export default createRouteBundle( {
  [ RoutePathMap.HOME ]: HomePage,
  [ RoutePathMap.PEOPLE ]: PeoplePage,
  [ RoutePathMap.PERSON_DETAIL ]: PersonDetailPage
} )
