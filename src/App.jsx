// function app() {
//   return (
//     <h1>Hello react </h1>
//   );
// }

// export default app;

// import Profilecard from "./profilecard";
// function App(){
//   return(
//     <div>
//       <Profilecard />
//    </div>
//   )
// }
// export default App

import "./index.css";
import "./App.css";
import Header from "./header";
import ProductList from "./ProductList";
import Footer from "./footer";
import { CartProvider } from "./CartProvider";

function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Footer />
    </CartProvider>
  );
}

export default App;