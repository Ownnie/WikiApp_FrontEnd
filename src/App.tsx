import { AuthProvider } from './context/AuthContext';
import { WikiProvider } from './context/WikiContext';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <AuthProvider>
      <WikiProvider>
        <AppRouter />
      </WikiProvider>
    </AuthProvider>


  );
};

export default App;
