import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
import { DisplayStyles } from "../styles/Styles";

const DisplayHistory = () => {
  const { history } = useContext(NumberContext);
  return (
    <div>
     <h1>History Details</h1>
      {history.length > 0 ? history.map((element, index) => (
        <li key={index+element.result}>
          {element.operand1} {element.operator} {element.operand2} = {element.result}
        </li>
      )): <span></span>}
      
    </div>
  );
};

export default DisplayHistory;
