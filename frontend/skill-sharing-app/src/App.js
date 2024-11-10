import './App.css';
import Header from "./Components/Header.js";
import Home from "./Pages/Home.js";
import SkillRequestForm from "./Components/SkillRequestForm.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* <SkillRequestForm />  */}
    </div>
  );
}

export default App;
