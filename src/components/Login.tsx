import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signed-in user:', user);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error('Login error:', error.code, error.message);
    }
  };

  return (
    <>
      <main>
        <section>
          <div>
            <p>FocusApp</p>

            <form onSubmit={onLogin}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button type="submit">Login</button>
              </div>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <p className="text-sm text-white text-center">
              No account yet?{' '}
              <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
