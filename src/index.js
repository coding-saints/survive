//INDEX.JS is your entry point where you BEGIN
// Main concepts like REDUX and REACT-ROUTER will be included here, wrapped around some HOC most of the time
import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './SassFileIndex.scss'
import {render} from 'react-dom'

//for help in seeing the "whole picture" I've included the whole app inside this one component
//After you get the hang of it, try SEPERATION OF CONCERNS --> keeping everything SEPERATE in Components...


//THis is the IMAGE OVERLAY that you want to 'click' in order to enter the site
class ImageOverlay extends React.Component { //we use the CLASS for handling STATE
    constructor(props) { //the constructor helps initialize the state (and more....read up on it)
        super(props) // --> is called on the constructor (ES6 javascript)
          this.state = {
              isClicked: false
          }
          this.onButtonChange = this.onButtonChange.bind(this)
        }
        onButtonChange() {
                let remove = document.getElementById('removeBox')
                remove.style.display = "none";
        }
         
            render() {
                return(
                    <div id="removeBox" className="overlay-container">
                        <div className="background-image">
                        <Link to="/home"><button className="btn-color" onClick={this.onButtonChange}>enter</button></Link>
                        </div>
                    </div>
                )
            }
} 

const Layout = (props) => (
    <div className="layout-container">
        <header><h1>this is a header</h1></header>
        <section>
        <p>section of content</p>
        </section>
        <footer>footer</footer>
    </div>
)
const Main = (props) => (
    <div className="main-container">
    <div className="content">
    <RouteContainer />
    </div>
    </div>
)
const RouteContainer = (props) => (
    <React.Fragment>
    <Route exact path='/' component={ImageOverlay} />
        <Switch>
            <Route path='/home' component={Layout} />
            <Route exact path='/' component={ImageOverlay} />
        </Switch>
    </React.Fragment>
)
export default class App extends React.Component {
    render() {
        return(
            <Router>
                <Main />
            </Router>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
)