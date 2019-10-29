import React from "react";
import Activites from "../components/activities/Activities";
import ActivityButton from "../components/add-activity-button/ActivityButton";
import EventForm from "../components/add-event-form/EventForm";
import Badges from "../components/badges/Badges";
import Profile from "../components/profile/Profile";
import activityConverter from "../utils/activityConverter";
import skillsConverter from "../utils/skillsConverter";
import LogOutButton from "../components/log-out-button/log-out-button";
import OpportunitiesButton from "../components/opportunities-button/OpportunitiesButton";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "../components/common/common";
export default function ProfilePage({
  setData,
  data,
  emailInput,
  setEmailInput
}) {
  // setEmailInput(window.sessionStorage.getItem("emailInput", emailInput));
  const [dataRefresh, setDataRefresh] = React.useState(true);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const [isFormDisplayed, setFormDisplayed] = React.useState("none");
  const [activityButtonDisplay, setActivityButtonDisplay] = React.useState(
    "block"
  );
  const [closeButtonDisplay, setCloseButtonDisplay] = React.useState(
    "inline-block"
  );

  // Fetches the user data, convert the codes, set the Data,
  // update data refresh.
  // This should happen when the page loads and every time an activity
  // is added

  React.useEffect(() => {
    if (!window.sessionStorage.getItem("emailInput")) {
      window.sessionStorage.setItem("emailInput", emailInput);
    }

    const userData = JSON.stringify({
      email: window.sessionStorage.getItem("emailInput")
    });
    if (emailInput !== "") {
      // fetch(`http://localhost:9000/GetUserData?email=${userData}`)
      fetch(`/.netlify/functions/GetUserData?email=${userData}`)
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log('printing res', res);
          if (res.records) {

            let notAddedStarterActivity = true;
            const filteredRecords = [];

            res.records.forEach(activity => {
              if (
                activity.fields.nameOfActivity !== "My first activity" ||
                notAddedStarterActivity
              ) {
                filteredRecords.push(activity);
                if (activity.fields.nameOfActivity === "My first activity") {
                  notAddedStarterActivity = false;
                }
              }
            });

            filteredRecords.forEach(e => {
              e.fields.skills = skillsConverter(e.fields.skills);
              e.fields.activityType = activityConverter(
                e.fields.activityType[0]
              );
            });
            return filteredRecords;
          }
        })
        .then(filteredRecords => {
          setData(filteredRecords);
          setDataRefresh(false);
        });
    }
  }, [dataRefresh, emailInput]);

  return (
    <div>
      <Navbar>
        <LogOutButton
          setLoggedOut={setLoggedOut}
          setEmailInput={setEmailInput}
        />
        <OpportunitiesButton />
      </Navbar>
      <Profile
        data={data}
        emailInput={emailInput}
        setLoggedOut={setLoggedOut}
        setEmailInput={setEmailInput}
      />

      <Badges data={data} />
      <Activites activities={data} />
      <EventForm
        setDataRefresh={setDataRefresh}
        emailInput={emailInput}
        isFormDisplayed={isFormDisplayed}
        setFormDisplayed={setFormDisplayed}
        activityButtonDisplay={activityButtonDisplay}
        setActivityButtonDisplay={setActivityButtonDisplay}
        closeButtonDisplay={closeButtonDisplay}
        setCloseButtonDisplay={setCloseButtonDisplay}
      />
      <ActivityButton
        isFormDisplayed={isFormDisplayed}
        setFormDisplayed={setFormDisplayed}
        activityButtonDisplay={activityButtonDisplay}
        setActivityButtonDisplay={setActivityButtonDisplay}
        closeButtonDisplay={closeButtonDisplay}
        setCloseButtonDisplay={setCloseButtonDisplay}
      />
    </div>
  );
}
