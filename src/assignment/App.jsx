// import { useState } from "react";

// const initialImages = [
//   "https://fastly.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU",
//   "https://fastly.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU",
//   "https://fastly.picsum.photos/id/732/200/300.jpg?hmac=mBueuWVJ8LlL-R7Yt9w1ONAFVayQPH5DzVSO-lPyI9w",
//   "https://fastly.picsum.photos/id/633/200/300.jpg?hmac=TdUWNg34fjigifBBMXrwci0tVpiezw92QqwoO2oDJak",
// ];

// function App() {
//   const [index, setIndex] = useState(0);

//   const handlePrev = () => {
//     setIndex((currentIndex) => Math.max(currentIndex - 1, 0));
//   };

//   const handleNext = () => {
//     setIndex((currentIndex) =>
//       Math.min(currentIndex + 1, initialImages.length - 1),
//     );
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//       <button onClick={handlePrev} disabled={index === 0}>
//         Prev
//       </button>

//       <div style={{ width: "200px", height: "300px", overflow: "hidden" }}>
//         <div
//           style={{
//             display: "flex",
//             transform: `translateX(-${index * 200}px)`,
//             transition: "transform 300ms ease",
//           }}
//         >
//           {initialImages.map((image, imageIndex) => (
//             <img
//               key={`${image}-${imageIndex}`}
//               src={image}
//               alt={`Gallery image ${imageIndex + 1}`}
//               width="200"
//               height="300"
//               style={{ flex: "0 0 200px", objectFit: "cover" }}
//             />
//           ))}
//         </div>
//       </div>

//       <button onClick={handleNext} disabled={index === initialImages.length - 1}>
//         Next
//       </button>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Navigate, Routes, Route } from "react-router";

import Analytics from "../assignment 2/analytics.jsx";
import DashboardLayout from "../assignment 2/Dashboardlayout.jsx";
import DashboardHome from "../assignment 2/dashbord.jsx";
import Settings from "../assignment 2/setting.jsx";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;