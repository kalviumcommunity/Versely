import React from "react";

// function Error() {
//   return (
//     <div className="error-container">
//       <h1>Uh-Oh...</h1>
//       <h4>
//         The page you are looking for may have been moved, deleted,
//         <br />
//         or possibly never existed.
//       </h4>
//       <h1 className="error404">404</h1>
//     </div>
//   );
// }

// export default Error;
import Spline from "@splinetool/react-spline";

export default function App() {
  return (
    <div style={{ margin: "10vh", width: "90%" }}>
      <Spline scene="https://prod.spline.design/hcE7aX7c93B4C7Ya/scene.splinecode" />
    </div>
  );
}
