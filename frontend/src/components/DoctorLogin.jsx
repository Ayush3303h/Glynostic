import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const logo = 'https://www.figma.com/api/mcp/asset/1c6213eb-a0bd-4d3e-b074-11129c54703f';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('doctorToken', data.token);
        navigate('/doctor/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27] antialiased">
      <div className="w-full max-w-[400px] rounded-[12px] border border-solid border-[#f1f5f9] bg-white p-8 shadow-[0px_32px_64px_-12px_rgba(0,109,91,0.08)]">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="Glynostic" className="h-8 w-[133px] object-contain mb-4" />
          <h1 className="text-xl font-bold text-[#005344]">Doctor Portal Login</h1>
        </div>
        
        {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#475569]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[48px] rounded-lg border border-solid border-[#e2e8f0] px-4 text-base focus:border-[#003d9b] focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#475569]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[48px] rounded-lg border border-solid border-[#e2e8f0] px-4 text-base focus:border-[#003d9b] focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-full bg-[#003d9b] py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
