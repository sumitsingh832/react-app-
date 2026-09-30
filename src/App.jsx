// import Header from "./components/Header";
// import Main from "./components/Main";
// import Footer from "./components/Footer";

// function App(){
//   <>
//   <Header />
//   <Main />
//   <Footer />
//   </>
// }

// export default  App;

import Profile from "./profile card/profile";

function App(){
    const user1={
     name :"Sumit",
     age :"20",
     role:"backend developer",
    };
    const user2={
     name :"Alice",
     age :"25",
     role:"frontend developer",
    }
    const user3={
     name :"charlie",
     age :"18",
     role:"ui/ux designer",
    }

    return(
        <div>
            <h1>user profile </h1>
         
        <Profile
         name={user1.name}
         age={user1.age}
         role={user1.role}
         />
        <Profile
         name={user2.name}
         age={user2.age}
         role={user2.role}
         />
          <Profile
         name={user3.name}
         age={user3.age}
         role={user3.role}
         />
        </div>
    )
}
export default App;

