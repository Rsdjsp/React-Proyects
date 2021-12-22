import React from "react";

function Alert({ alert}) {
  const { msg, type } = alert;

  return <p className={`message-type-${type}`}>{msg}</p>;
}

export default Alert;
