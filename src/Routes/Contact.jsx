import React, { useContext } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import Form from "../Components/Form";

const Contact = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className={`container ${state.theme === "dark" ? "dark" : "light"}`}>
      <h2>Want to know more?</h2>
      <p>Send us your questions and we will contact you</p>
      <Form />
    </div>
  );
};

export default Contact;