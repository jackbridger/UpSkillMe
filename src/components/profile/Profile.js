import React from "react";
import styled from "styled-components";
import LogOutButton from "../log-out-button/log-out-button";
import netlifyIdentity from "netlify-identity-widget";
import Avatar from "react-avatar";

// Styled components
const ProfileStyle = styled.section`
  flex-direction: column;
  text-align: center;
  background-color: #109cf117;
  padding: 1rem;
`;

const EmailStyle = styled.h3`
  padding: 0;
  margin: 0;
`;
const PointsStyle = styled.h2`
  color: #109cf1;
`;

const ColoredLine = styled.hr`
  height: 0.25rem;
  width: 25%;
  background: #ff5964;
  border: none;
  transition: 0.3s ease-in-out;
`;

export default function Profile({ data, emailInput, setEmailInput }) {
  const [avatar] = React.useState("assets/avatarAlien.svg");
  const [totalScore, setTotalScore] = React.useState(10);

  // Runs every time the data changes/page loads, update the total score
  React.useEffect(() => {
    if (data) {
      let tempTotalPoints = 0;
      data.forEach(activity => {
        tempTotalPoints +=
          activity.fields["totalPoints (Activity points x duration)"];
      });
      setTotalScore(tempTotalPoints);
    }
  }, [data]);

  if (!data) {
    return <p>Loading</p>;
  }
  return (
    <ProfileStyle>
      <Avatar
        // color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
        round={true}
        color={"#109cf1"}
        size={"8rem"}
        // alt="this is our avatar pic"
        // style={{ "border-radius": "10px" }}
        name={netlifyIdentity.currentUser().user_metadata.full_name}
      />
      <EmailStyle>
        {netlifyIdentity.currentUser().user_metadata.full_name}
      </EmailStyle>
      <ColoredLine></ColoredLine>
      <PointsStyle>{totalScore} total points</PointsStyle>
    </ProfileStyle>
  );
}
