import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import FourZeroFour from "./pages/FourZeroFour";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init();
netlifyIdentity.on('login', user => {
  netlifyIdentity.close();
});

netlifyIdentity.on('init', user => {
  console.log(user)
});

function App() {
  const [data, setData] = React.useState([]);
  const [emailInput, setEmailInput] = React.useState("");
  const [opportunities, setOpportunities] = React.useState([]);

  netlifyIdentity.on('login', user => {

    setEmailInput(user.email);
    console.log("email input is", emailInput);
  });


  netlifyIdentity.on('logout', user => {
    setEmailInput("");
    netlifyIdentity.close();
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {netlifyIdentity.currentUser() ? <Redirect to="/profile" /> : <LandingPage
              emailInput={emailInput}
              setEmailInput={setEmailInput}
            />
            }
          </Route>
          <Route path="/profile">
            {netlifyIdentity.currentUser() ?
              <ProfilePage
                data={data}
                setData={setData}
                setEmailInput={setEmailInput}
                emailInput={emailInput}
              /> :
              <Redirect to="/" />}
          </Route>

          <Route path="/opportunities">
            <OpportunitiesPage
              opportunities={opportunities}
              setOpportunities={setOpportunities}
              setEmailInput={setEmailInput}
            />
          </Route>
          <Route path="*" component={FourZeroFour} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
