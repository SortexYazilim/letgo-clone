// src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              letgo<span className="text-orange-500">clone</span>
            </h2>
            <p className="text-gray-400 max-w-sm">
              Komşularınızdan güvenle alışveriş yapın. İkinci el eşyalarınızı kolayca satın.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/kategoriler" className="hover:text-orange-500 transition-colors">Kategoriler</Link></li>
              <li><Link href="/ilan-ver" className="hover:text-orange-500 transition-colors">İlan Ver</Link></li>
              <li><Link href="/yardim" className="hover:text-orange-500 transition-colors">Yardım</Link></li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li><Link href="/gizlilik" className="hover:text-orange-500 transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-kosullari" className="hover:text-orange-500 transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/cerezler" className="hover:text-orange-500 transition-colors">Çerez Politikası</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 Letgo Clone. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}