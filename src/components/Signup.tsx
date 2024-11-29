import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error('Error during signup:', error.code, error.message);
    }
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>FocusApp</h1>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <button type="submit">Sign up</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <p>
              Already have an account?{' '}
              <NavLink to="/login">Log in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
