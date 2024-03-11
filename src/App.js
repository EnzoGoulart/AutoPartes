import './App.css';
import RoutesWrapper from "./routes/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyleSheetManager } from 'styled-components';

function App() {
  return (
    <div className="App">
      <StyleSheetManager shouldForwardProp={prop => prop !== 'bgcolor'}>
        <RoutesWrapper/>
        <ToastContainer/>
      </StyleSheetManager>
    </div>
  );
}

export default App;
