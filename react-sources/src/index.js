import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './styles/styles.sass';

import Header from './components/common/header/header'
import AssetsList from './components/assets/list/index';
import AssetsEditPage from './components/assets/edit/index';
import TemplatesList from './components/templates/list/index';
import TemplatesEditPage from './components/templates/edit/index';


const Home = () => (
    <div>
        <div className="container">
            
                <div className="wrapper-md">
                    <h2>Home page</h2>

                    <ul>            
                        <li>
                            <Link to="/assets">Admin Assets</Link>
                        </li>
                        <li>
                            <Link to="/assets_edit">Create / Edit Admin Asset</Link>
                        </li>
                        <li>
                            <Link to="/templates">Admin Templates</Link>
                        </li>
                        <li>
                            <Link to="/templates_edit">Create / Edit Admin Template</Link>
                        </li>
                    </ul> 
                </div>
             
        </div>        
    </div>
);

class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Header />
                
                <Route exact path='/' component={Home} />
                <Route path='/assets' component={AssetsList} />
                <Route path='/assets_edit' component={AssetsEditPage} />
                <Route path='/templates' component={TemplatesList} />
                <Route path='/templates_edit' component={TemplatesEditPage} />                
            </div>                
        </Router>  
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();