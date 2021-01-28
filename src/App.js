import routes from './Routes'
import AccNav from './Components/AccNav'
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import store from './redux/store'
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AccNav />
          {routes}
        </div>
      </Router>
    </Provider>
  );
}
export default App