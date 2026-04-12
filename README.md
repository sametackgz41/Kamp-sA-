# 🏫 KampüsAğ – Üniversite Topluluk Platformu

KampüsAğ, üniversite öğrencileri, mezunları ve yöneticileri bir araya getiren modern bir web platformudur. Etkinlik takibi, kariyer rehberliği, ders notu paylaşımı ve mezun iletişimi gibi birçok özelliği tek çatı altında sunar.

### 🔗 [Canlı Demo → kampusag.vercel.app](https://kampusag.vercel.app)

---

## 🚀 Özellikler

### 👤 Rol Tabanlı Kullanıcı Sistemi
- **Öğrenci:** Bölüm seçimi ile kayıt, etkinliklere katılım, staj başvurusu
- **Mezun:** Mezuniyet yılı seçimi ve belge doğrulaması ile kayıt, MezunTalk'ta deneyim paylaşımı
- **Yönetici:** Duyuru/etkinlik oluşturma & silme, staj ilanı yönetimi, kariyer haritası ekleme

### 📢 Duyurular ve Etkinlikler
- Bölüm ve komite bazlı filtreleme
- Etkinliklere kayıt olma / iptal etme
- Yönetici tarafından yeni etkinlik oluşturma ve silme

### 💼 Staj / Kariyer
- İş ve staj ilanlarını listeleme
- Başvuru yapma ve takip etme
- Yönetici tarafından yeni ilan ekleme ve silme

### 🗺️ Kariyer Rehberi
- Bölümlere özel kariyer yol haritaları (akordeon görünüm)
- **Luminia AI** – Gemini tabanlı yapay zeka kariyer koçu
- Yönetici tarafından yeni kariyer rotası ekleme

### 🎓 Akademi – Ders Notları
- Kullanıcılar arası ders notu paylaşımı
- Gerçek dosya yükleme, indirme ve görüntüleme
- Kendi notlarını silme yetkisi

### 💬 MezunTalk
- Mezunların kariyer deneyimlerini paylaştığı forum
- Beğeni ve yorum sistemi
- Yeni gönderi oluşturma

### ⚙️ Ek Özellikler
- 🌙 **Karanlık / Aydınlık Tema** desteği
- 📱 **Responsive tasarım** (masaüstü sidebar + mobil bottom nav)
- 👤 **Profil yönetimi** – katıldığı etkinlikler, başvurduğu ilanlar, puanlama
- 🔔 **Bildirim tercihleri** ayarları
- 🔐 **Şifre değiştirme** ekranı

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Kullanım |
|-----------|----------|
| **React** | Kullanıcı arayüzü |
| **Vite** | Geliştirme sunucusu ve build aracı |
| **Vanilla CSS** | Tema değişkenleri ile özelleştirilmiş stil sistemi |
| **Google Gemini API** | Luminia AI kariyer koçu |
| **React Portal** | Modal ve toast yönetimi |

---

## 📦 Kurulum

```bash
# 1. Projeyi klonlayın
git clone https://github.com/KULLANICI_ADINIZ/KampusAg.git
cd KampusAg

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini ayarlayın
#    Proje kök dizininde .env dosyası oluşturun:
echo VITE_GEMINI_API_KEY=your_gemini_api_key_here > .env

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

> **Not:** Luminia AI özelliğini kullanabilmek için [Google AI Studio](https://aistudio.google.com/apikey) üzerinden ücretsiz bir Gemini API anahtarı almanız gerekmektedir.

---

## 📁 Proje Yapısı

```
KampüsAğ Proje/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── data/
│   │   └── mockData.js        # Başlangıç verileri
│   ├── App.jsx                # Ana uygulama bileşeni
│   ├── App.css
│   ├── index.css              # Tema değişkenleri ve global stiller
│   └── main.jsx               # Giriş noktası
├── .env                       # API anahtarları (git'e dahil değil)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 Test Hesapları

| Rol | E-Posta | Şifre |
|-----|---------|-------|
| Öğrenci | `numara@ogr.uludag.edu.tr` | herhangi |
| Yönetici | `admin@ogr.uludag.edu.tr` | herhangi |
| Mezun | `kisisel@email.com` | herhangi |

> Kayıt Ol sekmesinden yeni hesap oluşturabilirsiniz. Mezunlar için mezuniyet yılı seçimi ve belge yüklemesi zorunludur.

---

## 📸 Ekran Görüntüleri

> Projeyi çalıştırdıktan sonra ekran görüntüleri eklenebilir.

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

## 👨‍💻 Geliştirici

Bursa Uludağ Üniversitesi – İnegöl İşletme Fakültesi
