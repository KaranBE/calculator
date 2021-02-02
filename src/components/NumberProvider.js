import React, { useState } from "react";

export const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = useState("");
  const [storedNumber, setStoredNumber] = useState("");
  const [functionType, setFunctionType] = useState("");
  const [history, setHistory] = useState([]);

  const handleSetDisplayValue = (num) => {
    if ((!number.includes(".") || num !== ".") && number.length < 8) {
      setNumber(`${(number + num).replace(/^0+/, "")}`);
    }
  };

  const handleSetStoredValue = () => {
    setStoredNumber(number);
    setNumber("");
  };

  const handleClearValue = () => {
    setNumber("");
    setStoredNumber("");
    setFunctionType("");
  };

  const handleBackButton = () => {
    if (number !== "") {
      const deletedNumber = number.slice(0, number.length - 1);
      setNumber(deletedNumber);
    }
  };

  const handleSetCalcFunction = (type) => {
    if (number) {
      setFunctionType(type);
      handleSetStoredValue();
    }
    if (storedNumber) {
      setFunctionType(type);
    }
  };

  const handleToggleNegative = () => {
    if (number) {
      if (number > 0) {
        setNumber(`-${number}`);
      } else {
        const positiveNumber = number.slice(1);
        setNumber(positiveNumber);
      }
    } else if (storedNumber > 0) {
      setStoredNumber(`-${storedNumber}`);
    } else {
      const positiveNumber = storedNumber.slice(1);
      setStoredNumber(positiveNumber);
    }
  };

  const doMath = () => {
    let result = "";
    if (number && storedNumber) {
      switch (functionType) {
        case "+":
          result =
            Math.round(
              `${(parseFloat(storedNumber) + parseFloat(number)) * 100}`
            ) / 100;
          setHistory((prevItems) => [
            ...prevItems,
            {
              operator: functionType,
              operand1: Number(storedNumber),
              operand2: Number(number),
              result: result,
            },
          ]);
          break;
        case "-":
          result =
            Math.round(
              `${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`
            ) / 1000;
          setHistory((prevItems) => [
            ...prevItems,
            {
              operator: functionType,
              operand1: Number(storedNumber),
              operand2: Number(number),
              result: result,
            },
          ]);
          break;
        case "/":
          result =
            Math.round(
              `${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`
            ) / 1000;
          setHistory((prevItems) => [
            ...prevItems,
            {
              operator: functionType,
              operand1: Number(storedNumber),
              operand2: Number(number),
              result: result,
            },
          ]);
          break;
        case "*":
          result =
            Math.round(
              `${(parseFloat(storedNumber)  * parseFloat(number)) * 1000}`
            ) / 1000;
          setHistory((prevItems) => [
            ...prevItems,
            {
              operator: functionType,
              operand1: Number(storedNumber),
              operand2: Number(number),
              result: result
            },
          ]);
          break;
        default:
          break;
      }
      setStoredNumber(result);
      setNumber("");
    }
  };

  return (
    <NumberContext.Provider
      value={{
        doMath,
        functionType,
        handleBackButton,
        handleClearValue,
        handleSetCalcFunction,
        handleSetDisplayValue,
        handleSetStoredValue,
        handleToggleNegative,
        number,
        storedNumber,
        history,
        setNumber,
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
