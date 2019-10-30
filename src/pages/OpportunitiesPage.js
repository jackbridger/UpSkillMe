import React from "react";
import OpportunitiesList from "../components/opportunitiesList/OpportunitiesList";
import { Redirect, Route } from "react-router-dom";
import LogOutButton from "../components/log-out-button/log-out-button";
import activityConverter from "../utils/activityConverter";
import { Navbar } from '../components/common/common';
import BackButton from '../components/back-button/BackButton';
export default function OpportunitiesPage({
  opportunities,
  setOpportunities,
  setEmailInput
}) {

  React.useEffect(() => {
    let URLCall = process.env.DEV ?
      `http://localhost:9000/GetOpportunitiesData`
      : `/.netlify/functions/GetOpportunitiesData`
    fetch(URLCall)
      .then(res => res.json())
      .then(res => {
        if (res.records) {
          res.records.forEach(e => {
            e.fields.activityType = activityConverter(e.fields.activityType[0]);
          });
          setOpportunities(res.records);
        }
      });
  }, []);


  return (
    <div>
      <Navbar>
        <LogOutButton setEmailInput={setEmailInput} />
        <BackButton></BackButton>
      </Navbar>
      <OpportunitiesList opportunities={opportunities} />
    </div>
  );
}
