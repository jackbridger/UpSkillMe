import React from "react";
import styled from "styled-components";
import netlifyIdentity from 'netlify-identity-widget';

const ButtonStyle = styled.button`
background-color: inherit;
border: none;
color: white;

`;

export default function LogOutButton({ setLoggedOut, setEmailInput }) {
  function logout(e) {
    if (netlifyIdentity.currentUser()) {
      netlifyIdentity.logout()
    }
    setEmailInput("");
    window.location.href = "/";
  }

  return <ButtonStyle onClick={logout} > Log Out</ButtonStyle>;
}
