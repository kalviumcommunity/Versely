import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error-container">
      <h1>Uh-Oh...</h1>
      <h4>
        The page you are looking for may have been moved, deleted,
        <br />
        or possibly never existed.
      </h4>
      <h1 className="error404">404</h1>
      <div className="backtohome">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Error;
