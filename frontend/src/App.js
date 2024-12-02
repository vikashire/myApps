import LoginPage from './employee/pages/LoginPage';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Employee from './employee/pages/Employee';
import AddEmployee from './employee/components/AddEmployee';

function App() {
  const { token, login, logout, employeeId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        employeeId: employeeId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>
          <Routes>
            {/* Routes for authenticated employee */}
            {token && (
              <>
                <Route path="/" element={<Employee />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/add-employee" element={<AddEmployee />} />
              </>
            )}

            {/* Routes for unauthenticated employee */}
            {!token && (
              <>
                <Route path="/auth" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            )}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
