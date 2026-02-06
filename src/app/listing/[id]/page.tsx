// src/app/listing/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { getListingById } from '@/src/data/mockListings';
import { formatPrice, formatRelativeTime, cn } from '@/src/lib/utils';
import { useFavoritesContext } from '@/src/context/FavoritesContext';
import { useCartContext } from '@/src/context/CartContext';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Shield, 
  MessageCircle, 
  Phone,
  ChevronLeft,
  Flag,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Package,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon
} from 'lucide-react';

// Mock veriye daha fazla görsel ekleyelim (gerçek projede API'den gelecek)
const getProductImages = (listing: any): string[] => {
  // Ana görsel + 3 ek görsel (mock için random)
  const baseImage = listing.images[0];
  return [
    baseImage,
    `https://picsum.photos/400/400?random=${parseInt(listing.id) + 10}`,
    `https://picsum.photos/400/400?random=${parseInt(listing.id) + 20}`,
    `https://picsum.photos/400/400?random=${parseInt(listing.id) + 30}`,
  ];
};

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;
  const listing = getListingById(listingId);
  
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { addToCart, isInCart, getCartQuantity } = useCartContext();
  
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">İlan Bulunamadı</h1>
            <p className="text-gray-500 mb-4">Aradığınız ilan mevcut değil veya kaldırılmış.</p>
            <Link href="/">
              <Button>Ana Sayfaya Dön</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const maxStock = listing.stock;
  const images = getProductImages(listing);
  const cartQuantity = getCartQuantity(listing.id);
  const remainingStock = maxStock - cartQuantity;
  const isMaxReached = cartQuantity >= maxStock;
  const favorite = isFavorite(listing.id);

  useEffect(() => {
    if (remainingStock <= 0 && quantity > 0) {
      setQuantity(0);
    } else if (quantity > remainingStock) {
      setQuantity(remainingStock);
    }
  }, [cartQuantity, remainingStock, quantity]);

  // Slayt fonksiyonları
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const increaseQuantity = () => {
    if (quantity < remainingStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0 || isMaxReached) return;
    
    addToCart({
      listingId: listing.id,
      price: listing.price,
      title: listing.title,
      image: listing.images[0],
      stock: maxStock,
    }, quantity);
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setQuantity(1);
  };

  const totalPrice = listing.price * quantity;
  const cartTotalPrice = listing.price * (cartQuantity + quantity);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors">
          <ChevronLeft className="h-5 w-5" />
          <span>Geri Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Görsel Galeri */}
          <div className="space-y-4">
            {/* Ana Görsel - Slayt */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
              <Image
                src={images[currentImageIndex]}
                alt={`${listing.title} - Görsel ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              
              {/* Slayt Ok Butonları */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}

              {/* Görsel Sayacı */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Favori Butonu */}
              <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id); }}
                className={cn(
                  "absolute top-4 right-4 p-3 rounded-full transition-all duration-200 shadow-lg",
                  favorite ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
                )}
              >
                <Heart className={cn("h-6 w-6", favorite && "fill-current")} />
              </button>

              {/* Paylaş Butonu */}
              <button 
                onClick={(e) => e.preventDefault()}
                className="absolute top-4 right-16 p-3 bg-white/90 hover:bg-white rounded-full text-gray-600 transition-all shadow-lg"
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Küçük Thumbnail'ler - 3 veya 4 adet */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                    className={cn(
                      "relative aspect-square rounded-xl overflow-hidden transition-all duration-200",
                      currentImageIndex === idx 
                        ? "ring-3 ring-orange-500 ring-offset-2 scale-105" 
                        : "hover:opacity-80 border-2 border-transparent hover:border-orange-300"
                    )}
                  >
                    <Image 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                    {/* Seçili Gösterge */}
                    {currentImageIndex === idx && (
                      <div className="absolute inset-0 bg-orange-500/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Taraf - Bilgiler */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{listing.title}</h1>
                {listing.status !== 'active' && (
                  <Badge variant={listing.status === 'sold' ? 'danger' : 'warning'} className="text-sm px-3 py-1">
                    {listing.status === 'sold' ? 'SATILDI' : 'REZERVE'}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-gray-500">Birim Fiyatı:</span>
                <span className="text-xl font-semibold text-gray-700">{formatPrice(listing.price)}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 py-4 border-y border-gray-200">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatRelativeTime(listing.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>Stok: {maxStock} adet</span>
              </div>
            </div>

            {/* Stok Durumu */}
            {cartQuantity > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-medium flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Sepetinizde {cartQuantity} adet var
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Bu üründen toplam {maxStock} adet alabilirsiniz. 
                  {remainingStock > 0 ? ` Kalan: ${remainingStock} adet` : ' Limit doldu!'}
                </p>
              </div>
            )}

            {isMaxReached && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-medium flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Maksimum adete ulaştınız! ({maxStock} adet)
                </p>
              </div>
            )}

            {/* Adet Seçimi */}
            <div className={cn(
              "rounded-xl p-4 border",
              isMaxReached ? "bg-gray-100 border-gray-200" : "bg-orange-50 border-orange-100"
            )}>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Adet Seçin {cartQuantity > 0 && `(Sepette: ${cartQuantity})`}
              </label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={decreaseQuantity} 
                  disabled={quantity <= 1 || isMaxReached}
                  className={cn("w-10 h-10 rounded-lg flex items-center justify-center", quantity <= 1 || isMaxReached ? "bg-gray-100 text-gray-400" : "bg-white text-orange-500 border border-orange-200")}
                >
                  <Minus className="h-5 w-5" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  disabled={isMaxReached}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setQuantity(Math.max(0, Math.min(remainingStock, val)));
                  }}
                  className="w-20 h-10 text-center text-lg font-bold text-gray-900 bg-white border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
                />
                <button 
                  onClick={increaseQuantity} 
                  disabled={quantity >= remainingStock || isMaxReached}
                  className={cn("w-10 h-10 rounded-lg flex items-center justify-center", quantity >= remainingStock || isMaxReached ? "bg-gray-100 text-gray-400" : "bg-white text-orange-500 border border-orange-200")}
                >
                  <Plus className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-500">
                  {isMaxReached ? 'Limit doldu' : `Max: ${maxStock}`}
                </span>
              </div>
            </div>

            {/* Fiyat Özeti */}
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Seçilen Adet:</span>
                <span className="text-lg font-semibold">{quantity} adet</span>
              </div>
              {cartQuantity > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-400">Sepetteki:</span>
                  <span className="text-gray-300">{cartQuantity} adet</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Birim Fiyat:</span>
                <span className="text-lg">{formatPrice(listing.price)}</span>
              </div>
              <div className="border-t border-gray-700 my-3"></div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">Toplam:</span>
                <span className="text-3xl font-bold text-orange-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Açıklama</h2>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Satıcı Bilgileri</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200" style={{ flexShrink: 0 }}>
                  <Image src={listing.seller.avatar} alt={listing.seller.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{listing.seller.name}</h3>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                  <div className="flex items-center gap-1 mt-1 text-yellow-500">
                    {'★'.repeat(Math.floor(listing.seller.rating))}
                    <span className="text-gray-400 text-sm ml-1">({listing.seller.rating})</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Profil</Button>
              </div>
            </div>

            <div className="space-y-3 sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 lg:static lg:shadow-none lg:border-none lg:p-0">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowPhone(!showPhone)}>
                  <Phone className="h-5 w-5" />
                  {showPhone ? '0555 123 45 67' : 'Telefonu Göster'}
                </Button>
                
                <Button 
                  className={cn("flex-1 gap-2", addedToCart ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600")} 
                  onClick={handleAddToCart}
                  disabled={addedToCart || isMaxReached || quantity <= 0}
                >
                  {addedToCart ? (
                    <><Check className="h-5 w-5" /> Eklendi</>
                  ) : isMaxReached ? (
                    <><ShoppingCart className="h-5 w-5" /> Limit Doldu</>
                  ) : (
                    <><ShoppingCart className="h-5 w-5" /> Sepete Ekle</>
                  )}
                </Button>
              </div>

              <Button className="w-full gap-2 bg-gray-900 hover:bg-gray-800">
                <MessageCircle className="h-5 w-5" />
                Satıcıya Mesaj Gönder
              </Button>

              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5" style={{ flexShrink: 0 }} />
                <p>Güvenliğiniz için lütfen kapıda ödeme yapın ve ürünü kontrol edin.</p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
              <Flag className="h-4 w-4" />
              <span>Bu ilanı şikayet et</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}