'use client';

import { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      setLoading(false);
      return;
    }

    const success = isLogin 
      ? await login(form.email, form.password)
      : await register(form.name, form.email, form.password);

    if (success) {
      onClose();
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      setError(isLogin ? 'Email veya şifre hatalı!' : 'Kayıt başarısız!');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5 text-gray-400" />
        </button>

        <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        <p className="text-gray-500 mb-6">{isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}</p>

        {error && <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ad Soyad"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Şifre"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {!isLogin && (
            <input
              type="password"
              placeholder="Şifre Tekrar"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
            />
          )}

          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg" isLoading={loading}>
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 font-semibold hover:underline">
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>

        {isLogin && (
          <p className="mt-4 text-xs text-gray-400 text-center">Demo: test@test.com / 123456</p>
        )}
      </div>
    </div>
  );
}