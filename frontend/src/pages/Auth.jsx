import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Store, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES, getRoleHomePath, getRoleLabel } from '../permissions/permissions';

const roleOptions = [
  { value: ROLES.CUSTOMER, label: 'Customer', icon: User, defaultName: 'Aarav Customer', defaultEmail: 'customer@mittimart.test' },
  { value: ROLES.SELLER, label: 'Seller', icon: Store, defaultName: 'Sunita Devi', defaultEmail: 'seller@mittimart.test' },
  { value: ROLES.ADMIN, label: 'Admin', icon: ShieldCheck, defaultName: 'MittiMart Admin', defaultEmail: 'admin@mittimart.test' },
];

const AuthPage = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [formMode, setFormMode] = useState(mode);
  const [role, setRole] = useState(searchParams.get('role') || ROLES.CUSTOMER);
  const selectedRole = useMemo(() => roleOptions.find((item) => item.value === role) || roleOptions[0], [role]);
  const [formData, setFormData] = useState({
    name: selectedRole.defaultName,
    email: selectedRole.defaultEmail,
    password: '',
  });

  useEffect(() => {
    setFormMode(mode);
  }, [mode]);

  useEffect(() => {
    const nextRole = searchParams.get('role');
    if (nextRole) {
      setRole(nextRole);
    }
  }, [searchParams]);

  useEffect(() => {
    const nextRole = roleOptions.find((item) => item.value === role) || roleOptions[0];
    setFormData((prev) => ({
      ...prev,
      name: prev.name || nextRole.defaultName,
      email: prev.email || nextRole.defaultEmail,
    }));
  }, [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextUser = login({
      id: `user-${Date.now()}`,
      name: formData.name || selectedRole.defaultName,
      email: formData.email || selectedRole.defaultEmail,
      role,
      language: role === ROLES.SELLER ? 'hi-IN' : 'en',
    });

    navigate(getRoleHomePath(nextUser.role));
  };

  const roleMeta = roleOptions.find((item) => item.value === role) || roleOptions[0];

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium"
        >
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold text-brand-brown">
              {formMode === 'login' ? 'Welcome back to MittiMart' : 'Create your MittiMart account'}
            </h1>
            <p className="text-sm text-brand-muted mt-2">
              Select a role, sign in, and test the matching protected routes.
            </p>
          </div>

          <div className="flex gap-2 mb-5 bg-brand-cream rounded-full p-1.5 border border-brand-brown/10">
            <button
              onClick={() => {
                setFormMode('login');
                navigate('/login');
              }}
              className={`flex-1 py-2 rounded-full font-semibold text-sm ${
                formMode === 'login'
                  ? 'bg-gradient-to-r from-brand-brown to-brand-orange text-white'
                  : 'text-brand-brown'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setFormMode('register');
                navigate('/register');
              }}
              className={`flex-1 py-2 rounded-full font-semibold text-sm ${
                formMode === 'register'
                  ? 'bg-gradient-to-r from-brand-brown to-brand-orange text-white'
                  : 'text-brand-brown'
              }`}
            >
              Register
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const active = role === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    active
                      ? 'bg-brand-brown text-white border-brand-brown shadow-md'
                      : 'bg-brand-cream border-brand-brown/10 text-brand-brown'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-2" />
                  <div className="text-xs font-bold uppercase tracking-wider">{option.label}</div>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={roleMeta.defaultName}
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={roleMeta.defaultEmail}
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md hover:scale-102 transition-transform"
            >
              {formMode === 'login' ? `Login as ${getRoleLabel(role)}` : `Register as ${getRoleLabel(role)}`}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;