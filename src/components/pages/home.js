import { connect } from 'redux-bundler-react'
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const HomePage = ( { baseDataStatus, baseData } ) => (
  <div style={{ flexGrow: 1, marginTop: 30 }}>
    <Grid container spacing={3}>
      <Grid item xs>
        <Card>
          <CardContent>
            <p>Open dev tools to see output of debug bundle. The current version of redux-bundler you're running, the list
              of
              installed bundles, etc.</p>
            <p>This app uses the awesome <a href='https://swapi.co/'>SWAPI</a> as an API to demonstrate how you can
              reactively
              trigger data fetching due to the the application's current state rather than by some arbitrary component being
              displayed.</p>

            <p>It will never fetch unless its data is stale, or it needs to retry to do a failed attempt to fetch</p>

            <p>This entire app with all dependencies and without any tree-shaking is approx 18.5 kbs min + gzip</p>

            <h3>Things to try</h3>
            <ul>
              <li>Leave this page open, and watch the log output in the console. The data will be refreshed
                if
                its older than one minute.
              </li>
              <li>While you have the page loaded, use devtools to force the app to go offline. It will keep
                showing the data it has, but will now retry more actively. These fetches will fail, but it will still show
                the
                data it has. Now, make it go online again, and you should see the data getting refreshed rather quickly.
              </li>
              <li>The "APP_IDLE" actions will only be dispatched when the tab is in focus. Test this out by
                opening the network tab in devtools and clearing it, now switching away to a different tab for a while. When
                you
                switch back you'll notice no fetches occurred while you were away, but as soon as you switch back to this tab
                a
                fetch is immediately triggered.
              </li>
              <li>Whenever there has been a successful fetch, the data is persisted to indexedDB via the
                localCaching bundle (including metadata about the fetch). So if you refresh and it successfully fetched data
                recently enough, no fetch is triggered at all.
              </li>
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs>
        <Card>
          <CardContent>
            <h3>Dynamically Fetched Data:</h3>
            <p>Source: https://swapi.co/api/</p>
            <p>Status: { baseDataStatus }</p>
            <p>result:</p>
            <pre><code>{ JSON.stringify( baseData, null, 2 ) }</code></pre>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
)

export default connect(
  'selectBaseDataStatus',
  'selectBaseData',
  HomePage
)
