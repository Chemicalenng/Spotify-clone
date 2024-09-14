import "./output.css";
import React, { Children, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/signup";
import HomeComponent from "./routes/home";
import LoggedHomeComponent from "./routes/loggedHome";
import { useCookies } from "react-cookie";
import UploadSong from "./routes/uploadsong";
import MyMusic from "./routes/myMusic";
import User from "./routes/user";
import { AudioProvider } from "./contexts/audiocontext";

function App() {
  const [cookie, setCookie] = useCookies('token');
  const [currentSong, setCurrentSong] = useState(null);
  console.log(cookie.token);
  return (
    <div className="App">
      {/* set up routes */}
      <div className="w-screen h-screen">
        <BrowserRouter>
          {cookie.token ? (
            //logged in
            <AudioProvider value={currentSong}>

              <Routes>

                <Route path="/" element={<div>Hello!</div>} />
                <Route path="/loggedHome" element={<LoggedHomeComponent />} />
                <Route path="/uploadSong" element={<UploadSong />} />
                <Route path="/myMusic" element={<MyMusic />} />
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/user" element={<User />} />


              </Routes>
            </AudioProvider>
          ) : (
            //logged out
            <Routes>
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
          )}
        </BrowserRouter>
      </div>
    </div >
  )
};

export default App;
