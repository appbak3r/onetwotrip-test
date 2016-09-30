import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Container from './containers/container'
import Main from './components/main'
import configureStore from './store/configureStore'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
/**
 * Application store
 * @type {Store}
 */
const store = configureStore()

/**
 * Application route history
 */
const history = syncHistoryWithStore(browserHistory, store)

/**
 * Class representing Main application container
 */
class App extends React.Component {

  render () {
    return (<Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Container}>
          <IndexRoute component={Main} />
        </Route>
      </Router>
    </Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
