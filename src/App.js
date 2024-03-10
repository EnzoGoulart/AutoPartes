import './App.css';
import RoutesWrapper from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <RoutesWrapper/>
      <ToastContainer/>
    </div>
  );
}

export default App;
