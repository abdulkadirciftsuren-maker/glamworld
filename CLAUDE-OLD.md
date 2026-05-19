# GLAMWORLD — Proje Anayasası (V5.32 — Son)

> Bu dosya Claude Code'un anayasasıdır. Her oturum başında MUTLAKA okunur.
> Bu dosyadaki kurallar değişmez. Sapma yasaktır. Pazarlık yapılmaz.

---

## 1. PROJE SAHİBİ

- **İsim:** Abdulkadir Çiftsüren
- **Konum:** Almanya (Türk, eşi Ukraynalı, Ukrayna'dan savaş sonrası geldi)
- **İletişim dili:** TÜRKÇE (her zaman, istisnasız)
- **Hedef:** Dünyada 1 numara güzellik platformu — ŞAHESER

---

## 2. VİZYON

GLAMWORLD basit bir site DEĞİLDİR. Bu bir **şaheser** projesidir.

**Hedef:** Kullanıcı siteye girdiğinde "Vaaay, bu nasıl yapılmış?" diyecek.

**Marka kimliği:**
- Lüks, premium, altın, elmas, sümbül
- Gece teması (siyah arka plan)
- Altın detaylar (#FFD700, gradient gold)
- Cam-mavi pırlanta vurguları (#dg1, #dg2 gradient)
- Cormorant Garamond fontu (logo için)
- Profesyonel, prestijli, zarif

**Dandik DEĞİL — Şaheser.**

**Rakipler (ama daha iyiyiz):** Facebook, Instagram, TikTok, Booksy, Fresha, LinkedIn

---

## 3. KESİN YASAKLAR — İHLAL ETME

1. **EMOJİ KULLANMA.** GLAMWORLD özel SVG ikonları (sümbül, elmas, altın toz, makas, ruj) kullanılır.
2. **ESKİ KODU GİZLEME.** Kullanılmayacak kod TAMAMEN silinir. Yorum satırına alma yok.
3. **YENİ DOSYA AÇMA — SORMADAN.**
4. **YEDEK DOSYA OLUŞTURMA.** `.backup`, `_old`, `_v2` YASAK.
5. **300 SATIRDAN UZUN DOSYA YOK.**
6. **PLACEHOLDER YOK.** "TODO", "Lorem ipsum" YASAK.
7. **BOŞ SAYFA YOK.** Her sayfa sonuna kadar dolu.
8. **HALF-FUNCTIONAL BUTON YOK.** Buton görünüyorsa gerçekten çalışıyor.
9. **ROBOTİK YAZILIM YOK.** Her butona GLAMWORLD imzası animasyon.
10. **YALANCI "SİLDİM" YOK.** Söylediğin gerçek.
11. **ZORLA ÜYE OL YOK.** Şeffaf site (madde 6).

---

## 4. ÇALIŞMA KURALLARI

1. Bölüm bölüm git, onay al, sonra devam et.
2. Her değişiklik öncesi `git commit`.
3. Her başarılı değişiklik sonrası deploy.
4. **11 dile** çeviri ekle.
5. **4 ekran boyutu** için ayrı tasarım.
6. Her özellikten sonra tarayıcıda test et.
7. Açıklama yapma — iş yap.
8. Türkçe yorum yaz.
9. Duplicate kod birleştir.
10. Site KASMAZ.

---

## 5. NAVİGASYON KURALLARI

### A) Her Sayfada Android Tarzı Geri Dönüş

- **Sol üstte altın geri tuşu** (altın daire içinde altın ok)
- **Telefonun Android geri tuşu da çalışır** (popstate event)
- **Her zaman bir önceki sayfaya** götürür — asla anasayfaya atmaz
- Basınca sümbül dağılma animasyonu

### B) Modal/Pencerelerde Çarpı (X)

- **Sağ üstte altın çarpı (X)**
- Çarpıya basınca **anasayfaya** döner
- **Pencere dışına tıklayınca da kapanır**
- Basınca shimmer animasyonu

### C) Üst Menü — Sağa Açılan Pencereler

- Üstte yatay ikon menüsü
- İkona tıklayınca o bölüm **SAĞDAN KAYARAK** açılır (slide-in)
- Anasayfa arkada kalır
- Snap scroll, sticky

**📱 Telefon (5 ikon):** Anasayfa, Keşfet, Canlı, Reels, Harita

**💻 Bilgisayar:** Anasayfa, Keşfet, Berberler, Kuaförler, Masaj, Makyaj, Tırnak, Eğitimler, İş İlanları, Harita, Canlı, Mesajlar, Profilim, Ayarlar

### D) Alt Menü (Telefon — 5 ikon)

1. Anasayfa
2. Arama
3. **GLAMI** (orta, büyük, parlayan)
4. Mesajlar
5. Profil

### E) Sağa Açılan Sayfalar — Ortak Tema, Farklı Düzen

- **Logo, üst bar, renk teması SABİT** (marka tutarlılığı)
- **İçerik tasarımı her sayfada farklı**
- Renkler hep altın-siyah
- Her sayfa kendine özel **düzen ve özellikler**

---

## 6. ŞEFFAF SİTE — Üye Olmadan Görünür

**ÖNEMLİ:** GLAMWORLD üyelik dayatmayan **şeffaf** sitedir.

### Üye olmayan kullanıcı:

✅ **Görür:** Anasayfa, akış, postlar, canlı yayınlar (izler), Reels (izler), profesyonel profilleri, kategoriler, harita, iş ilanları, eğitimler önizleme

❌ **Yapamaz:** Yorum, beğeni, mesaj, randevu, hediye, post paylaşım, canlı yayın açma

### Davet Mesajı:

Etkileşim isteyince şık modal:
> "Bu özelliği kullanmak için üye olun."
> [Kayıt Ol] [Şimdi değil]

"Şimdi değil" seçeneği VAR. Zorla yok.

---

## 7. HOŞ GELDİN ANİMASYONU + GLAMI KARŞILAMA

Kullanıcı **kayıt formunu doldurup** "Üye Ol" butonuna bastığında:

### Aşama 1: Karşılama Animasyonu (3-4 saniye)

- Ekran **kararır** (overlay)
- **Altın yağmuru** + **pırlanta parıltıları** dağılır
- **"Hoş Geldin [İsim]"** yazısı altın parlayarak büyür
- **glamRay** ışık taraması efekti
- GLAMWORLD logosu görünür

### Aşama 2: Glami Karşılaması

Animasyon bitince **Glami modal** açılır:

> **"Merhaba [İsim], hoş geldin!"**
>
> "Sana nasıl yardımcı olabilirim?"
>
> "Bana arkadaş gibi her şeyi sorabilirsin —
> Profilini düzenlemek, randevu almak,
> AI Sanal Ayna ile saç/makyaj denemek,
> profesyonel bulmak..."
>
> [💬 Konuş] [🌟 Site Turu] [✕ Şimdi değil]

### Kullanıcı Seçimleri:

- **Konuş:** Glami sohbet modu açılır
- **Site Turu:** Glami sayfa sayfa rehberlik eder
- **Şimdi değil (✕):** Modal kapanır, anasayfaya geçer

**Zorlama yok. Kullanıcı isterse parmakla geçer.**

---

## 8. GELİŞTİRİCİ WIDGET — Sayaç & Bilgi Kutusu

**Önceki projede sayaç (A28) vardı, Abdulkadir'in çok hoşuna gidiyordu. Yeni versiyonda DAHA İYİSİNİ yapacağız.**

### Widget İçeriği:

```
┌─────────────────────────┐
│  💎 GLAMWORLD V2.B1     │  ← Versiyon + sayaç
│  12 Mayıs 2026          │  ← Tarih
│  14:25:33               │  ← Saat (canlı)
│  🟢 Senkron: TAMAM      │  ← Firebase durumu
│  📍 Sayfa: Anasayfa     │  ← Aktif sayfa
│  [☰ Taşı] [— Gizle]     │  ← Butonlar
└─────────────────────────┘
```

### Özellikler:

- **Sürüklenebilir** (mouse veya parmakla)
- **Altın çerçeve + siyah şeffaf arka plan**
- **Şeffaf** (arka plan görünür)
- **Gizle butonu** — istemezsen kapatırsın
- **Sadece geliştirici görür** — production'da otomatik gizli
- **Sayaç numarası:** B1'den başlar (B1, B2, B3...)
- Her commit/deploy sonrası **otomatik artar**
- Site bitince **tamamen silinir**

### Sayaç Mantığı:

- **B1:** İlk başlangıç
- **B2, B3...:** Her başarılı güncelleme
- **B100, B200...:** Büyük milestone
- Yanlış olursa: `git checkout` ile geri al, sayaç değişmez

---

## 9. PROJE DOSYA YAPISI

```
glamworld/
├── public/
│   ├── index.html, favicon.ico, manifest.json
│   └── icons/ (özel SVG: sumbul, elmas, altin-toz, makas, ruj, ...)
├── src/
│   ├── index.js, App.js (~50 satır routing)
│   ├── firebase-config.js
│   ├── components/
│   │   ├── layout/ (Header, AltMenu, HamburgerMenu, GeriTusu, KapatX, SagSerit, GelistirciWidget)
│   │   ├── anasayfa/ (Hero, CanliYayinlar, Reels, Kategoriler, Hikayeler, PostAkisi, SehirBandi)
│   │   ├── glami-ai/ (GlamiButon, GlamiSohbet, GlamiSanalAyna, GlamiCeviri, GlamiEslestime, GlamiKarsilama)
│   │   ├── uyelik/ (Login, SignUp, AuthChoice, DavetModal, OdemeSecenekleri, HosGeldinAnimasyon)
│   │   ├── profil/ (KullaniciProfili, ProfesyonelProfili, ProfilDuzenle)
│   │   ├── dashboard/ (ProfesyonelDashboard, GunlukRandevular, Gelir, Musterilerim, Galeri, Istatistikler, Sertifikalarim)
│   │   ├── sayfalar/ (Kesfet, Mesajlar, Bildirimler, Harita, IsIlanlari, Egitimler, Randevularim, Takvim, Ayarlar)
│   │   ├── pirlanta-ekonomi/ (HediyeYagmuru, AltinTozu, Safir, BuyukPirlanta, VipGlamElite)
│   │   └── ortak/ (AltinButon, PirlantaRozet, SumbulIkon, ElmasIkon, DilSecici)
│   ├── animasyonlar/ (sumbulAcilma, elmasParlatma, altinTozDagilma, glamRay, shimmer, snapSlide, hosGeldinPatlama)
│   ├── stiller/ (global, degiskenler, animasyonlar, responsive)
│   ├── dil/ (tr, en, de, es, ru, ar, ukr, zh, ja, fr, it)
│   ├── sabitler/ (ulkeler, kategoriler, renkler, gradientler)
│   └── yardimcilar/ (firebase, auth, sync, api, formatla, konum)
├── package.json, README.md, CLAUDE.md
```

**HER DOSYA MAKSİMUM 300 SATIR.**

---

## 10. ŞEHİR BANDI (Strip2) — Sadece Anasayfada

- **Üstte yatay kayan ülke+şehir şeridi**
- **Bayrak resmi + ülke kodu + şehir ismi**
- flagcdn.com bayrakları (emoji DEĞİL, gerçek resim)
- Altın ülke kod yazısı

### KURAL:

- **SADECE anasayfada** görünür
- Diğer sayfalara girince **kaybolur** (display: none)
- **İnce şerit** olacak (telefonda da bilgisayarda da)
- Önceki sürümde çok kalındı, INCE olmalı
- Mobilde de aynı incelik (responsive)

---

## 11. OTOMATİK SENKRONİZASYON — Firebase

### Mantık:

Telefondan giriş → bilgisayarı aç → **anında** isim, profil, mesajlar görünür.

### Teknoloji:

- **Firebase Authentication** (giriş sistemi)
- **Firestore** (gerçek zamanlı veritabanı)
- **Realtime Database** (canlı mesajlaşma)
- **Storage** (fotoğraf/video)

### Real-time Sync:

- Cihazlar listener ile dinler
- Değişiklik anında diğerlerine gider
- Offline destek

---

## 12. ÜYELİK SİSTEMİ

**Müşteri:** Ücretsiz, randevu, yorum/beğeni, AI sınırlı.

**Profesyonel:**
- **PIRLANTA (Premium):** Tam profil, gelir takibi, AI önceliği, "Pırlanta Üye" rozeti, VIP Glam-Elite, reklamsız.
- **GÜMÜŞ (Ücretsiz):** Temel profil, 5 fotoğraf, reklamlı.

**Giriş:** "Giriş Yap"
**Kayıt:** "Üye Ol"
**Hızlı:** Google, Apple, Facebook
**Ödeme:** Kart, Pay, Mobil, Banka

---

## 13. PIRLANTA EKONOMİSİ

Hediyeler:
1. **Altın Tozu** (ucuz)
2. **Safir** (orta — mavi kristal animasyon)
3. **Büyük Pırlanta** (pahalı — ekran patlatan elmas yağmuru)

**VIP Glam-Elite:** En çok hediye, isim shimmer parlar, özel sohbet, premium içerik.

---

## 14. GLAMI AI

Parlayan altın daire (sol alt, her sayfada):

1. **AI Sanal Ayna** (DÜNYADA YOK) — konuşan AI
2. **AI Saç & Sakal Deneme**
3. **AI Saç, Makyaj & Tırnak Deneme**
4. **AI Salon Eşleştirme** — paket + 3 profesyonel
5. **AI Çeviri** (mesajlaşma + görüntülü)
6. **AI Profil Analizi**
7. **AI Sohbet 24/7**
8. **Hoş Geldin Karşılaması** (kayıt sonrası)

---

## 15. 11 DİL — Tam Çalışır

```js
const DILLER = {
  TR:  {kod:'tr', isim:'Türkçe',     renk:'#FF4444', bayrak:'tr'},
  EN:  {kod:'en', isim:'English',    renk:'#4499FF', bayrak:'gb'},
  DE:  {kod:'de', isim:'Deutsch',    renk:'#FFD000', bayrak:'de'},
  ES:  {kod:'es', isim:'Español',    renk:'#FF8800', bayrak:'es'},
  RU:  {kod:'ru', isim:'Русский',    renk:'#FF5544', bayrak:'ru'},
  AR:  {kod:'ar', isim:'العربية',    renk:'#33BB66', bayrak:'sa'},
  UKR: {kod:'uk', isim:'Українська', renk:'#55AAFF', bayrak:'ua'},
  ZH:  {kod:'zh', isim:'中文',        renk:'#DC143C', bayrak:'cn'},
  JA:  {kod:'ja', isim:'日本語',      renk:'#BC002D', bayrak:'jp'},
  FR:  {kod:'fr', isim:'Français',   renk:'#0055A4', bayrak:'fr'},
  IT:  {kod:'it', isim:'Italiano',   renk:'#009246', bayrak:'it'}
};
```

**Arapça için RTL (sağdan sola) zorunlu. Hiçbiri gizli kalmaz. Hepsi tam çalışır.**

---

## 16. RESPONSIVE — 4 EKRAN BOYUTU

```css
/* Telefon dikey */    @media (max-width: 480px) { ... }
/* Telefon yatay */    @media (min-width: 481px) and (max-width: 768px) { ... }
/* Tablet (iPad) */    @media (min-width: 769px) and (max-width: 1024px) { ... }
/* Bilgisayar */       @media (min-width: 1025px) { ... }
```

**Her boyut için ayrı tasarım. Sadece küçültüp büyütme YASAK.**

---

## 17. ALTIN SİSTEM — KESİNLİKLE KORU

- Strip2 (üst şerit, INCE, sadece anasayfa)
- GP_DATA partikülleri (goldDrop)
- GC_DATA konfeti (giriş animasyonu)
- Altın düğmeler `.bin` `.bup` (gradient gold + shimmer)
- Logo (cam-mavi pırlanta + Cormorant Garamond)
- glamRay (8 saniyede ışık taraması)

---

## 18. SVG GRADIENT ID'LERİ

- `#dg1`, `#dg2` — Cam-mavi elmas (navbar)
- `#vdg` — Versiyon rozeti
- Tüm ID'ler unique.

---

## 19. SAYFA LİSTESİ — 32 Sayfa

**Genel (13):** Anasayfa, Keşfet, Berberler, Kuaförler, Masaj, Makyaj, Tırnak, Cilt Bakım, Eğitimler, İş İlanları, Harita, Canlı Yayın, Reels

**Kullanıcı (6):** Giriş Yap, Üye Ol, Profilim, Ayarlar, Mesajlar, Bildirimler

**Profesyonel (8):** Dashboard, Randevularım, Müşterilerim, Galeri, İstatistikler, Gelir, Sertifikalarım, Takvim

**Etkileşim (5):** Post Detay, Hikaye Görüntüleyici, Randevu Al, AI Sanal Ayna, GLAMI Sohbet

**Her sayfa kendine özel profesyonel tasarımla. Boş/yarım YASAK. Tüm butonlar çalışır.**

---

## 20. YAPILACAKLAR SIRASIYLA

1. **Proje iskeleti** (React + dosya yapısı)
2. **Geliştirici Widget** (sayaç B1, sürüklenebilir)
3. **Firebase kurulumu** (Auth + Firestore + Storage)
4. **Header + Üst menü + Alt menü** (3 cihaz)
5. **Geri Tuşu + Çarpı (X) sistemi**
6. **Şehir Bandı** (ince, sadece anasayfa)
7. **Anasayfa** (Hero + tüm bölümler)
8. **Hamburger menü**
9. **Giriş Yap + Üye Ol**
10. **Hoş Geldin Animasyonu + Glami Karşılaması**
11. **Davet Modal** (üye olmayan için)
12. **Profil sayfası**
13. **Profesyonel Dashboard**
14. **Sağ Şerit Widget**
15. **Mesajlar + AI Çeviri**
16. **Randevu Sistemi**
17. **Harita**
18. **İş İlanları**
19. **Eğitimler**
20. **Pırlanta Ekonomisi (hediyeler)**
21. **AI Sanal Ayna**
22. **AI Salon Eşleştirme**
23. **VIP Glam-Elite**
24. **GLAMWORLD özel SVG ikonlar**

---

## 21. NASIL ÇALIŞACAĞIZ

### Süreç:

1. Abdulkadir → Web Claude'a ne istediğini söyler
2. Web Claude → Claude Code'a tam komut hazırlar
3. Abdulkadir → komutu kopyala-yapıştır
4. Claude Code → uygular
5. Abdulkadir → test eder, fotoğraf gönderir
6. Web Claude → kontrol eder
7. Tamam → sıradaki. Sorun var → düzeltme.

**Her komut bir tek görev içerir.**

---

## 22. GIT KULLANIMI

Sayaç widget VAR (yukarıda anlatıldı). Git de var:
- `git add . && git commit -m "B1 başlangıç"` (her adımdan sonra)
- `git checkout .` (yanlış giderse geri al)
- `git tag v1.0` (büyük versiyonlar)

---

## 23. CİHAZ UYUMU — Her Sayfada Geçerli

Her sayfa telefon (dikey/yatay), tablet ve bilgisayarda **profesyonel ve uyumlu** çalışır.
Bu kural otomatik uygulanır — her sayfada ayrıca söylenmez.
Sadece küçültüp büyütme YASAK. Her cihaz için ayrı düzen.

---

## 24. TOOLTIP SİSTEMİ

İkonların üzerine parmak yaklaşınca ikon ismi **üstünde** küçük kutuda görünür.
Parmağın altında DEĞİL — parmağın üstünde, görünür olacak şekilde.

**TOOLTIP X (ÇARPI) KURALI:** Yazı "Kapat", butonun tam altında 8px, PC 15px font, telefon 13px. Ekran köşesine değil butona yapışık.
**TOOLTIP GERİ BUTONU:** Yazı "Geri Dön", butonun tam üstünde 8px.

---

## 24-B. TOOLTIP YENİ DAVRANIŞ KURALI (B89 itibariyle)

`src/components/Tooltip.jsx` yeniden yazıldı. Yeni davranış:

- **Parmak çekildikten sonra yazı KALIR** (5 saniye) — kullanıcı okuyabilir
- **5 saniye sonra otomatik kapanır**
- **Boş yere dokunulursa kapanır** (document touchstart/mousedown)
- **Sayfa değişiminde kapanır** (IkonSeridi useEffect ile)
- **position: absolute** kullanılır — butonla beraber scroll'da hareket eder, ekranda asılı kalmaz
- **PC:** mouseenter → görünür, mouseleave → kapanır (5 saniye beklemez)
- **Mobil:** touchstart → görünür, dışarıya dokununca kapanır
- **Animasyon:** yumuşak fade-in (0.15s)
- **Stil:** siyah arka plan + altın çerçeve + altın yazı

---

## 25. PİYASA ŞERİDİ — Canlı Veriler

Sayfanın **en üstünde** ince bir şerit (şehir bandının üzerinde):

- USD/TRY, EUR/TRY
- Altın (gram, TRY)
- Bitcoin (USD)

**Özellikler:**
- 30 saniyede bir güncellenir
- API: ExchangeRate-API veya CoinGecko (ücretsiz)
- Yön oku: yeşil yukarı, kırmızı aşağı
- Sadece anasayfada veya her sayfada — tasarım aşamasında karar verilir

---

## 26. AÇILIŞ KARTI (SPLASH)

Site **ilk açıldığında** ortada davetkar bir kart görünür:

- GLAMWORLD logosu (altın, küçük)
- Kısa karşılama metni
- İki buton: **"Siteyi İncele"** (kayıt olmadan) + **"Üye Ol"** (kayıt sayfası)
- Karanlık değil, davetkar atmosfer
- **Bir kez gösterilir** — localStorage ile hatırlanır, tekrar açılmaz
- Zorla değil, davet eder

---

## 27. MARKETPLACE

Facebook Marketplace tarzı alışveriş bölümü:

- Akan kart sistemi (masonry grid)
- Kartlarda **satıcı ismi YOK** — sadece ürün, fiyat, fotoğraf
- Karta tıklayınca detay sayfası açılır
- Detayda: Satın Al + Mesaj Gönder butonları
- Kategori filtreleme

---

## 28. MESSENGER

Facebook Messenger tarzı mesajlaşma:

- Yazılı mesaj
- Sesli mesaj (basılı tut, bırak gönder)
- Sesli görüşme
- Görüntülü görüşme
- Fotoğraf / video / dosya paylaşımı
- Online / offline durumu (yeşil nokta)
- Okundu işareti (çift tik)
- AI çeviri (farklı dil konuşanlar için otomatik)

---

## 29. TELEFON REHBERİ SENKRON

WhatsApp tarzı rehber entegrasyonu:

- Kayıt sırasında telefon numarası alınır
- Kullanıcı **izin verirse** rehber okunur
- Rehberdeki GLAMWORLD üyeleri otomatik bulunur
- "Tanıdıkların GLAMWORLD'de" olarak önerilir
- İzin vermezse zorlama yok

---

## 30. ÖDEME SİSTEMİ — Çok Yöntemli

Otomatik işler, manuel onay YOK:

- Kredi / Banka kartı
- Bitcoin
- Ethereum, USDT (kripto)
- Havale / EFT
- Apple Pay / Google Pay
- PayPal

Tüm ödemeler anlık işlenir. Başarısız işlem kullanıcıya bildirilir.

---

## 31. İKİ AI SİSTEMİ — Farklı Kişilik

### SITE NAVIGATOR (Arama İkonu — Üst bar):
- Sitenin işletim sistemi
- Site içi arama ve yönlendirme
- Fotoğraf analiziyle sayfa açma
- Sesli komutla site yönetimi
- Karakter: teknik, hızlı, soğuk, verimli

### GLAMI (Sağ alt köşe — sabit, her sayfada):
- Duygusal zeka — sohbet, felsefe, günlük konuşma
- Randevu, profil, öneri yardımı
- Karakter: samimi, sıcak, dost, sabırlı
- Hoş Geldin karşılaması (kayıt sonrası)

---

## 32. SADE ŞIKLIK — Tasarım İlkesi

- Kartlar karmaşık değil — sade ve güçlü
- Renk az, etki çok
- Boşluk önemli (white space — nefes aldırır)
- Her elementin bir amacı var — gereksiz süsleme yok
- Profesyonel, lüks his — dandik değil

---

## 34. GERİ DÖNÜŞ DÜĞMESİ — Her Sayfada Zorunlu

- **SAĞ ALTTA altın geri ok düğmesi** (her sayfada)
- **SÜRÜKLENEBİLİR** — kullanıcı parmakla taşıyabilir
- **Konum HATIRLANMAZ** (localStorage YOK) — her sayfa açılışında sağ alta sıfırlanır
- `useLocation` ile route izlenir, değişince konum sıfırlanır
- orientationchange (telefon dönüşü) → otomatik sağ alta sıfırlanır
- resize (bilgisayar ekran değişimi) → otomatik sağ alta sıfırlanır
- Boyut: telefon dikey 48px | telefon yatay 44px | tablet 52px | PC 56px
- `window.history.back()` ile çalışır
- Tooltip: "Geri Dön" — butonun tam üstünde 8px
- **Her sayfada ve her modalde görünür** (anasayfa dahil)
- Modal açıkken: pushState yapılır → geri butonu modal kapatır
- **z-index: 9999** her zaman üstte

---

## 35. X (ÇARPI) — MODAL / SAYFA KAPATMA

- Modal/popup açıldığında **sağ üstte altın çarpı (X)**
- Tooltip: "Kapat" — parmağın üstünde
- Modal **dışına tıklama** da kapatır
- **ESC tuşu** da kapatır
- Kapatma animasyonu: 200ms fade-out
- **Giriş Yap ve Üye Ol kartlarında X her zaman var**

---

## 36. SAYAÇ — OTOMATİK ARTMA SİSTEMİ

Sayaç `src/sayac.json` dosyasından okunur. DevWidget hardcoded değer YOKTUR, dinamik okur.

**Her commit öncesi zorunlu adımlar:**
1. `npm run bump` → sayac.json buildNumber +1 artar
2. `git add src/sayac.json && git commit -m "..."` → commit yapılır

**MANUEL DEĞİŞTİRME YASAK.** Script dışında sayac.json'a el atılmaz.

**Dosyalar:**
- `src/sayac.json` — buildNumber, version, lastUpdated, lastCommit
- `scripts/increment-counter.js` — Node.js script, +1 artırır
- `package.json` → `"bump": "node scripts/increment-counter.js"`

**Format:** `GLAMWORLD V2.B{buildNumber}` — DevWidget otomatik gösterir.

**Mevcut sayaç:** B13 (B13.1 son commit)

---

## 37. FORM ALANLARI — AUTOCOMPLETE ZORUNLU

Her input'ta autocomplete attribute olacak:

- `autocomplete="email"` — e-posta
- `autocomplete="current-password"` — giriş şifresi
- `autocomplete="new-password"` — kayıt şifresi
- `autocomplete="tel"` — telefon
- `autocomplete="name"` — ad soyad

---

## 38. GOOGLE BUTONU — RESMİ LOGO ZORUNLU

- **4 renkli resmi Google "G" logosu** (mavi/kırmızı/sarı/yeşil)
- Beyaz arka plan, gri çerçeve
- Yazı: "Google ile Giriş Yap" veya "Google ile Üye Ol"
- **Emoji veya tek renkli G YASAK**

---

## 39. ESKİ KOD SİLME — VURGU

- Hiçbir kod `//` veya `/* */` ile yorum satırına alınmaz
- Eski kod **TAMAMEN SİLİNİR**
- Yedek dosya yaratılmaz (`.backup`, `_old`, `_v2` YASAK)
- Git zaten her sürümü saklıyor — ekstra yedek gereksiz

---

## 40. GİRİŞ KARTI TASARIMI — Tam Spec

- Ortada modal kart: telefonda tam ekran, PC'de orta kutu
- **Sağ üstte altın X** (madde 35)
- Üstte GLAMWORLD logosu (küçük, altın)
- Başlık: **"Hoş Geldin"** (altın)
- E-posta + Şifre (autocomplete zorunlu, madde 37)
- "Beni Hatırla" checkbox
- "Şifremi Unuttum" linki
- Büyük altın "Giriş Yap" butonu (shimmer)
- "veya" ayracı
- Google ile Giriş (resmi logo, madde 38)
- Telefon ile Giriş (telefon ikonu)
- Alt link: "Üye değil misin? Üye Ol"

---

## 41. ÜYE OL KARTI TASARIMI — Tam Spec

- Aynı kart yapısı (X, logo, başlık)
- Başlık: **"GLAMWORLD'e Katıl"** (altın)
- Form alanları: İsim + Soyisim, E-posta, Şifre, Şifre Tekrar, Telefon (ülke kodu)
- **Müşteri / Profesyonel seçimi** — 2 büyük kart (SignUp içinde)
- Telefon dikey `@media (max-width:480px) and (orientation:portrait)`: kart yüksekliği (padding-top/bottom, ikon) küçülür — GENİŞLİK DOKUNULMAZ
- Kullanım şartları onayı checkbox
- Altın "Üye Ol" butonu (shimmer)
- Google / Telefon alternatifleri
- Başarılı kayıt sonrası: Hoş Geldin animasyonu + Glami karşılaması (madde 7)

---

## 46. TOOLTIP HASSASİYETİ

- Mobile: `touchstart` anında göster (100ms gecikme) — uzun basma DEĞİL
- Parmak çekilince (`touchend`) hemen kaybolsun
- Desktop: `mouseenter` anında göster (150ms gecikme)
- `mouseleave` anında hemen gizle

---

## 47. TOOLTIP BOYUTU

- Mobile (max 480px): font-size 13px
- Tablet (481–1024px): font-size 14px
- Desktop (1025px+): font-size 15px

---

## 48. TOOLTIP KONUM ZEKASI

- Ekran dışına taşacaksa OTOMATİK konum değiştir
- Üstte yer yok → alta al
- Altta yer yok → üste al
- Yan kenara çok yakın → ortaya kaydır
- Hiçbir zaman görünmeyecek yere koyma

---

## 49. BUTON HİZALAMA

- Yan yana butonlar HER ZAMAN aynı boy
- Aralarında en az 8px boşluk
- Üst üste binme YASAK
- "Beni Hatırla" + "Şifremi Unuttum": `display:flex; justify-content:space-between`
- "Google ile Giriş" + "Telefon ile Giriş": alt alta, aralarında 12px gap

---

## 50. KART BOYUTLARI — Responsive

- Müşteri/Profesyonel kartları her ekranda YAN YANA (%48 genişlik)
- Telefon dikey: padding 10px, font-size 12px, ikon 40x40px
- Tablet: padding 15px, font-size 13px
- PC: padding 20px, font-size 14px
- ASLA ekranı kaplayacak kadar büyük olmasın

---

## 51. PIRLANTA LOGO SİSTEMİ

- GLAMWORLD logosunun iki yanına pırlanta SVG'leri eklenir
- Component: `src/components/Pirlanta.jsx`, `src/components/Pirlanta.css`
- 4 renk: `beyaz`, `altin`, `mavi`, `gumus`
- İçten dışa ışıltı (`drop-shadow`) + nefes alan animasyon (3sn döngü), hover'da hızlanır
- Anasayfa: BEYAZ pırlanta, 32px
- Giriş Yap kartı: ALTIN pırlanta, 22px
- Üye Ol kartı: GÜMÜŞ (sol) + MAVİ (sağ), 22px
- SVG kullanılır, EMOJI YASAK

---

## 52. SOSYAL GİRİŞ BUTONLARI

- 5 yöntem: Google, Apple, Facebook, Instagram, Telefon
- Component: `src/components/SosyalButon.jsx`
- Şekil: pill (border-radius: 999px), marka rengi
- Düzen: 2+3 grid (Google+Apple üste, Facebook+Instagram+Telefon alta)
- Press efekti: scale(0.97) + ripple, hover: translateY(-2px)
- Logolar SVG — emoji YASAK

---

## 53. ÜYE OL AKIŞ SIRASI

1. Hesap Türü seçimi (Müşteri/Profesyonel) — EN ÜSTTE
2. Sosyal butonlar 5 yöntem (2+3 grid)
3. "veya" ayracı
4. Email + Şifre formu
5. Profesyonel seçilirse EK ALANLAR (Uzmanlık, Şehir, Deneyim, Çalışma Durumu) slide-down

---

## 54. PROFESYONEL EK ALANLAR

- Uzmanlık (dropdown: Berber, Kuaför, Makyaj Sanatçısı, Manikürcü, Estetisyen, Masöz, Diğer)
- Şehir (text)
- Deneyim (0–60 yıl)
- Çalışma Durumu (radio: Çalışıyor / Kendi işi / İş arıyor)
- Slide-down animasyon 0.35s

---

## 55. GİRİŞ YAP AKIŞ SIRASI

1. Sosyal butonlar (5 yöntem, 2+3 grid)
2. "veya" ayracı
3. Email + Şifre formu
4. Beni Hatırla + Şifremi Unuttum
5. Alt link: Üye Ol

---

## 56. PROFESYONEL ÜYELİK PAKETLERİ

**TEMEL PAKET (Ücretsiz):**
- Aylık 3 randevu sınırı
- Standart profil
- Müşteri ödemesinden %15 komisyon
- Reklam görünür, standart destek

**PIRLANTA PAKET (Launch: 4.99€/ay):**
- Sınırsız randevu
- Arama sonuçlarında öne çıkma
- %10 komisyon
- Basit analitik (gelir takibi, randevu sayısı)
- Pırlanta rozet, e-posta desteği

**MAVİ PIRLANTA PAKET (Launch: 9.99€/ay):**
- Pırlanta paketteki her şey
- AI yardımcı (Glami) tam erişim
- Detaylı analitik (gelir, müşteri davranışı, trend)
- Reklamsız, öncelikli destek (24 saat)
- %5 komisyon
- Mavi Pırlanta rozet — en prestijli
- Öne çıkma garantisi (premium yerleştirme)

---

## 57. LAUNCH FİYAT STRATEJİSİ

**İlk 1 Yıl (Launch Dönemi):** Pırlanta 4.99€/ay | Mavi Pırlanta 9.99€/ay

**2. Yıldan İtibaren (Normal Fiyat):** Pırlanta 14.99€/ay | Mavi Pırlanta 29.99€/ay

**Erken Üye Sadakati:** İlk 1 yılda üye olan profesyoneller aboneliklerini kesmediği sürece HAYAT BOYU launch fiyatında kalır. Abonelik kesip yeniden alınırsa normal fiyat geçer.

**Pazar Karşılaştırması:** Booksy ~30€, Fresha ~25€ — GLAMWORLD launch 4.99-9.99€ (6 kat ucuz). Hedef: hızlı kullanıcı kazanımı.

---

## 58. 30 GÜN ÜCRETSİZ DENEME

- Yeni profesyonel üye olunca otomatik 30 gün Pırlanta paket aktif
- Kart bilgisi kayıt ANINDA istenmez
- Deneme bitiminde 3 seçenek: Temel (ücretsiz) | Pırlanta | Mavi Pırlanta
- 30 gün boyunca tüm özellikler açık

---

## 59. MÜŞTERİ ÖDEME MODELİ

- Müşteri üyeliği TAMAMEN ÜCRETSİZ (hep böyle kalacak)
- Müşteri sadece randevu/hizmet aldığında öder
- Ödeme profesyonele gider, GLAMWORLD komisyon alır:
  * Temel profesyonel → %15
  * Pırlanta → %10
  * Mavi Pırlanta → %5

---

## 60. ÖDEME YÖNTEMLERİ (Detay)

Profesyonel paket ve müşteri randevu ödemeleri için:
- Kredi kartı (Visa, Mastercard, Amex)
- Apple Pay
- Google Pay
- PayPal
- Klarna (Almanya/AB için popüler)
- SEPA havale (AB içi)
- Bitcoin / Ethereum / USDT

---

## 61. ANASAYFA YAPISI (Genel)

Anasayfa yukarıdan aşağı sırayla:

1. **HEADER** (Madde 62) — sticky, üstte sabit
2. **YATAY MENÜ ŞERİDİ** (Madde 65) — header'ın altında
3. **HERO BÖLÜMÜ** (Madde 66) — büyük karşılama
4. **TANITIM KARTLARI** — 3 kart yan yana:
   - Müşteri: "Randevu al, profesyonelleri keşfet"
   - Profesyonel: "İşini büyüt, müşteri kazan"
   - Premium: "AI yardım, analitik, öne çıkma"
5. **AKIŞ BÖLÜMÜ** — Reels, Canlı yayınlar, Öne çıkan profesyoneller (B8'de detaylanacak)
6. **FOOTER** — Hakkımızda, İletişim, Yardım, Şartlar, Gizlilik, Sosyal medya

Madde 7 (Hoş Geldin animasyonu) + Madde 10 (Şehir Bandı) + Madde 25 (Piyasa Şeridi) ile uyumlu.

---

## 62. HEADER (Üst Başlık)

- Yükseklik: 60-70px (telefon), 70-80px (PC)
- Arka plan: `rgba(0,0,0,0.95)` + alt çizgi altın 1px
- Sticky: scroll'da yukarıda sabit — z-index: 1000

**Düzen (soldan sağa):**

- SOL: Hamburger (☰) — 28x28px, altın
- ORTA: GLAMWORLD logosu + iki yanında pırlanta (Pirlanta.jsx, Madde 51)
- SAĞ: 4 ikon → Arama, Bildirim (kırmızı badge), Mesaj (badge), Profil avatarı

**Telefon:** Sadece Hamburger + Logo + Profil görünür; Arama/Bildirim/Mesaj hamburger menü içinde.

**İkon boyutu:** Telefon 22-24px | PC 26-28px

**Hover:** altın glow + Tooltip (Madde 24)

---

## 63. HAMBURGER MENÜ PANELİ

**Açılma:** Soldan slide-in (0.3s ease-out), arkasında `rgba(0,0,0,0.6)` overlay, fade-in. Overlay tıklama / X / ESC ile kapanır.

**Genişlik:** Telefon %85 | Tablet 360px | PC 320px | Yükseklik: 100vh

**Üst Bölüm (Kullanıcı):**
- Giriş yapılmışsa: Profil resmi (60x60, altın çerçeve), Ad Soyad (altın), Üyelik tipi
- Giriş yapılmamışsa: "Misafir Kullanıcı" + "Giriş Yap" / "Üye Ol" butonları yan yana

**Menü Maddeleri:**
Profilim | Mesajlarım (badge) | Randevularım | Üyelik Paketim | Bildirimler | Ayarlar | Dil Seçimi (11 dil, bayraklı alt menü) | Yardım & Destek | Kullanım Şartları & Gizlilik

**Alt Bölüm:** Çıkış Yap (kırmızı) | Versiyon bilgisi (küçük)

**Her madde:** Sol küçük pırlanta (Pirlanta.jsx 12-14px) | Beyaz 15px yazı | Hover: yazı altın + pırlanta parlar | Aktif sayfa: `rgba(255,215,0,0.1)` arka plan

---

## 64. SWIPE GESTURE (Parmakla Açma)

Native touch event'ler (Hammer.js vb. kütüphane YASAK — gereksiz şişirme).

**Sağa Kaydır → Hamburger menü açılır:**
- touchstart x: 0-30px arası (sol kenar)
- touchend x: en az 80px sağda
- Süre: 500ms'den kısa
- Panel parmakla birlikte kayar (touchmove takibi)

**Sola Kaydır → Bildirim paneli açılır:**
- touchstart x: `window.innerWidth - 30`'dan büyük (sağ kenar)
- Aynı eşik mantığı

**Performans:** `requestAnimationFrame` + `passive: true` listener (scroll engellenmez)

**PC:** Swipe çalışmaz — hamburger ikonu ile açılır.

---

## 65. YATAY MENÜ ŞERİDİ

- Header'ın hemen altında, yükseklik 50-55px
- Sticky DEĞİL (scroll'da yukarı kayar)
- Arka plan: `rgba(0,0,0,0.8)` + alt çizgi altın 1px

**Maddeler (soldan sağa):**
Anasayfa | Keşfet | Berberler | Kuaförler | Marketplace | Mesajlar | Randevular | Cüzdan | Profil

**Her madde:** Küçük pırlanta ikonu (10-14px) + Beyaz 14px yazı + Padding 8x16px

**Hover:** Yazı altın (0.2s transition) + pırlanta hızlanır + alttan ince altın çizgi

**Aktif sayfa:** Yazı altın gradient + kalın alt çizgi (3px) + glow

**Telefon:** Yatay scroll (overflow-x: auto), scrollbar gizli, sağda fade gölge

**PC:** Hepsi yan yana sığar, ortalı veya space-around

---

## 66. HERO BÖLÜMÜ (Karşılama)

- Menü şeridinin hemen altında
- Yükseklik: ekran %60-70 (PC), %50 (telefon)

**Arka Plan:**
- Siyah zemin + uçuşan yarı saydam pırlantalar (CSS animation, parallax)
- Hafif altın ışık huzmeleri + yıldız tozu (CSS keyframes, JS ağır animasyon YASAK)

**Ana Başlık:** "GLAMWORLD'e Hoş Geldin"
- 48-64px (PC), 32-40px (telefon) | Altın gradient text
- Animasyon: fade-in + scale-up (1sn)

**Alt Başlık:** "Dünyanın en büyük güzellik platformu"
- 18-22px (PC), 14-16px (telefon) | Beyaz/açık gri
- Animasyon: fade-in (0.5s gecikme)

**CTA Butonlar (yan yana):**
1. "Üye Ol" — altın gradient pill, 180x52px (PC) / 160x48px (telefon), shimmer, hover translateY(-3px)
2. "Giriş Yap" — transparan + altın çerçeve, aynı boyut, hover altın dolar

Telefon dar ise: alt alta (margin-top: 12px)

**Alt Ok:** "Aşağı kaydır" animasyonlu chevron (hafif zıplama)

---

## 67. ANAYASA OKUMA ZORUNLULUĞU

- Code her büyük görev başlangıcında CLAUDE.md'yi BAŞTAN SONA OKUR
- Okuduğunu KANIT olarak gösterir (ilgili madde özetlerini yazar)
- KANIT VERMEDEN göreve başlanamaz
- Kanıtsız başlama = CİDDİ HATA, görev iptal edilir
- Görev bitince Madde 70'e göre uyum raporu verilir

---

## 68. HER BUTONA TOOLTIP ZORUNLU

- Yeni eklenen TÜM tıklanabilir elementlerde Tooltip OLMAK ZORUNDA
- `Tooltip.jsx` kullanılır — HTML `title` attribute YASAK
- Yazı kısa, net, Türkçe
- Position: top (varsayılan)
- Mobile: `touchstart` 100ms gecikme ile göster, `touchend` anında gizle
- Desktop: `mouseenter` 150ms gecikme, `mouseleave` anında gizle
- Madde 24, 46, 47, 48 detaylarına uy
- Tooltip eksik buton = ANAYASA İHLALİ

---

## 69. KOPYALAMA/SEÇİM ENGELLEME

- Tüm buton, kart, logo, başlık, paragraf metinleri `user-select: none !important` zorunlu
- `-webkit-touch-callout: none !important` — Android uzun basma menüsü engellenir
- `-webkit-tap-highlight-color: transparent !important`
- Resimler ve SVG: `user-drag: none !important` — sürükleme engellenir
- **İSTİSNA:** `input`, `textarea`, `select` → kopyalama/seçim SERBEST (`!important` ile)
- JS (App.js useEffect): `contextmenu`, `copy`, `cut`, `dragstart` → `preventDefault` (form harici)
- Sağ tık menüsü, Ctrl+C, Ctrl+X → engellendi
- Yeni eklenen her component bu kurala otomatik uyar (index.css global kural)

---

## 70. GÖREV BİTİMİ ANAYASA UYUM RAPORU

Code her görev bittikten sonra şu raporu verir:
1. Hangi maddeler için iş yapıldı?
2. Hangi maddelere uyuldu?
3. Hangi maddelere uyulamadı ve neden?
4. Yarım kalan veya karışık kod var mı?
5. Eski kod tamamen silindi mi? (Kural F)

---

## 71. KARIIŞIK KOD TEMİZLEME (Kural F Güçlendirme)

- Hiçbir kod `//` veya `/* */` ile yorum satırına alınamaz
- Eski kod TAMAMEN SİLİNİR
- `.backup`, `_old`, `_v2` dosya yaratmak YASAK
- `TODO` veya `FIXME` yorum satırı YASAK (açıklamalar anayasaya yazılır)
- Git zaten her sürümü saklıyor — ekstra yedek gereksiz

---

## 72. DOKUNULMAZ DOSYALAR LİSTESİ (B110 itibariyle GÜNCELLENDİ)

Aşağıdaki dosyalar KORUMA ALTINDA. Code yeni iş yaparken bu dosyalara **DOKUNAMAZ**.

**KORUNAN DOSYALAR:**
1. `src/components/uyelik/Login.js` — Giriş Yap kartı
2. `src/components/uyelik/Login.css`
3. `src/components/uyelik/SignUp.js` — Üye Ol kartı
4. `src/components/uyelik/SignUp.css`
5. `src/components/uyelik/ProfesyonelAlanlar.jsx`
6. `src/components/uyelik/ProfesyonelAlanlar.css`
7. `src/components/SosyalButon.jsx`
8. `src/components/SosyalButon.css`
9. `src/components/Pirlanta.jsx`
10. `src/components/Pirlanta.css`
11. `src/components/GeriButon.jsx`
12. `src/components/Tooltip.jsx` — Madde 24-B'ye uygun olduğu sürece değiştirilebilir
13. `src/components/DevWidget.jsx` — sayaç sistemi
14. `src/sayac.json`
15. `scripts/increment-counter.js`
16. `src/components/CikisOnayModal.jsx` + `CikisOnayModal.css` — B85
17. `src/icons/` klasörü (tüm 13 ikon jsx dosyası) — B86/B104
18. `src/components/AltinImza.jsx` + `AltinImza.css` — B103
19. `src/utils/kullaniciProfili.js` — B105
20. `src/components/SwipeNavigator.jsx` — B106
21. `src/components/IkonSeridi.jsx` + `IkonSeridi.css` — B107
22. `src/components/AnaMenu.jsx` + `AnaMenu.css` — B63
23. `src/components/HosGeldinKarti.jsx` + `HosGeldinKarti.css`

**KURAL:**
- Yeni iş yaparken bu dosyalar DEĞİŞTİRİLEMEZ
- Abdulkadir AÇIK olarak izin verirse değiştirilebilir (örn: "Login'i değiştir")
- Hata düzeltmesi gerekirse ÖNCE izin alınır
- İzinsiz dokunma = ANAYASA İHLALİ

---

## 73. YENİ ÖZELLİK EKLEMESİ KURALI

Yeni özellik isteğinde Code şu adımları uygular:

1. **KONTROL:** İstek Madde 72'deki dosyalara dokunmayı gerektiriyor mu?
   - EVET → ÖNCE Abdulkadir'den izin iste
   - HAYIR → Devam et

2. **YÖNTEM:** Mümkünse YENİ DOSYA/COMPONENT oluştur
   - Mevcut dosyaya eklemek yerine modüler yapıyı koru
   - 300 satır kuralına uy

3. **RAPOR:** Her görev sonunda hangi dosyalara dokunulduğunu listele
   - "Madde 72 dosyalarına dokunulmadı" garantisi ver

---

## 74. ÜST İNCE ŞERİT (TICKER)

- Sayfanın EN ÜSTÜNDE, header'dan önce, `position: fixed; top: 0; z-index: 1001`
- Yükseklik: 24px (telefon), 28px (PC)
- Arka plan: `linear-gradient(90deg, #0a0a0a, #1a1a1a, #0a0a0a)` + alt çizgi altın 1px
- İçerik sağdan sola yumuşak kayar (CSS keyframes, 55s döngü)
- Hover/touch → animasyon durur (kullanıcı okuyabilir)
- Emoji YASAK — flagcdn.com bayrakları + metin kullanılır
- Component: `src/components/UstSerit.jsx` + `src/components/UstSerit.css`
- Body padding-top: 24px (telefon), 28px (PC) eklenir ki içerik altına gizlenmesin

**24 ÜLKE / 5 KITA + 24 PARA BİRİMİ (B20 itibariyle):**
Avrupa: Almanya, İngiltere, İsviçre, Rusya, Ukrayna | Orta Doğu/Afrika: Türkiye, S.Arabistan, Mısır, BAE, Güney Afrika, Nijerya, Fas | Amerika: ABD, Brezilya, Arjantin, Meksika, Kolombiya | Asya: Japonya, Çin, Hong Kong, Malezya, Hindistan, Pakistan | Okyanusya: Avustralya

**İçerik yapısı (B20):**
1. Kullanıcı saati (altın, büyük)
2. Kullanıcı şehri (Pırlanta mavi + BURADASIN rozeti + altın)
3. 24 ülke BLOK (bayrak + şehir altın + saat + para kodu)
4. PİYASA bölümü (altın çerçeveli başlık)
5. 12 döviz çifti (otomatik baz para)
6. ALTIN + GÜMÜŞ (statik fiyat)
7. BTC (turuncu) + ETH (mavi)

**Güncel yapı (B42 - 10'ar gruplar, renkli döviz):**
[BURADASIN (tıklanabilir→harita) + saat + USD + EUR + GBP + ALTIN + GÜMÜŞ + BTC] → [10 ülke] → tekrar...
Her 10 ülkede bir BURADASIN+döviz tekrar. USD yeşil | EUR mavi | GBP mor | ALTIN sarı | GÜMÜŞ gri | BTC turuncu.

**Modal (Login/SignUp) açıkken:** `return null` — şerit tamamen gizlenir

**İçerik sırası:**
1. Kullanıcı saati (saat SVG ikonu)
2. Kullanıcı şehri (ÖZEL VURGU: Pırlanta mavi + "BURADASIN" altın rozeti + parlama animasyonu)
3. Döviz çiftleri — otomatik baz para (kullanıcı ülkesine göre TRY/USD/EUR/diğer)
4. Bitcoin (turuncu #F7931A)
5. 15 diğer ülkenin şehir saatleri (bayrak + şehir altın + saat beyaz)

---

## 75. KONUM API (Otomatik Şehir/Ülke Tespiti)

- Öncelik: 1) Tarayıcı Geolocation 2) ipapi.co (IP-based) 3) Varsayılan: Berlin, DE
- Endpoint: `https://ipapi.co/json/`
- localStorage cache: `glamworld_user_location`, 24 saat geçerli
- Hata olursa: Berlin, Almanya varsayılan

---

## 76. DÖVİZ API (Gerçek Kurlar)

- Endpoint: `https://open.er-api.com/v6/latest/USD` (ücretsiz)
- Güncelleme: 30 dakika, localStorage cache: `glamworld_exchange_rates`
- Gösterilecek: USD/TRY, EUR/TRY, GBP/TRY
- Bitcoin: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
- Hata varsa: cache göster, cache yoksa "---" göster, çökmez

---

## 77. TICKER ANİMASYONU

```css
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
```
- İçerik 2 kere render edilir (seamless loop için)
- Hover + touch → `animation-play-state: paused`

---

## 78. ANDROID GERİ TUŞU — TARAYICI DOĞAL (B134)

GLAMWORLD Android Geri tuşuna HİÇBİR MÜDAHALE YAPMAZ.

1. popstate event listener YASAK
2. window.history.pushState YASAK
3. URL search params ile modal yönetimi YASAK
4. Modaller useState ile yönetilir
5. Modal X butonu veya bizim Geri butonu ile kapatılır
6. Android Geri → tarayıcı default (Facebook, Instagram, Twitter gibi)
7. Bizim Geri butonu (sağ alt sarı) sadece navigate kullanır

NEDEN: Web tarayıcılarında Android Geri tam kontrol edilemez. B125-B134 dersler: karmaşık özel kod karışıklık yaratır. Tüm dünyada web siteleri tarayıcı default kullanır.

---

## 79. ALTIN ÇERÇEVE (Sayfa Dekorasyonu)

- Component: `src/components/AltinCerceve.jsx` + `AltinCerceve.css`
- 4 ayrı `position: fixed` çubuk (üst, alt, sol, sağ) — 2px kalınlık, #C9A84C renk
- Visual Viewport API ile zoom'da sabit kalır (titremez)
- `pointer-events: none` — tıklamayı engellemez
- `z-index: 9990` — her zaman üstte
- `will-change: transform` — GPU hızlandırması
- App.js'te `<BrowserRouter>` içinde kullanılır, her sayfada görünür

---

## 80. MODAL VE ÜST ŞERİT İLİŞKİSİ

- Login (/giris) ve SignUp (/uye-ol) açıkken üst şerit `return null` ile TAMAMEN GİZLENİR
- `useLocation` ile URL bazlı kontrol (UstSerit.jsx içinde)
- Modal kapanınca şerit otomatik geri görünür
- Login/SignUp X butonu (position:fixed, top:16px) artık görünür

---

## 83. MODAL ANDROID GERİ BUTONU KURALI

Her modal/popup açıldığında:
1. `window.history.pushState({ modal: 'modalAdi' }, '')` çağrılır
2. `window.addEventListener('popstate', onKapat)` eklenir
3. Modal kapanınca listener kaldırılır
4. Bu sayede Android geri butonu → modal kapatır, sayfa kapanmaz

```js
useEffect(() => {
  window.history.pushState({ modal: 'xxx' }, '');
  const onPop = () => onKapat();
  window.addEventListener('popstate', onPop);
  return () => window.removeEventListener('popstate', onPop);
}, [onKapat]);
```

**Her yeni modal/overlay bileşenine bu pattern ZORUNLU eklenir.**

---

## 78. KART DIŞI TIKLAMA ZORUNLULUĞU

- TÜM modal, popup, dropdown, açılır panel'lerde kart DIŞINA tıklama → kapatır
- ESC tuşu → kapatır
- X butonu → kapatır (zaten var)
- Hook: `src/hooks/useKartDisiTiklama.js` — yeni modal yapan herkes kullanmak ZORUNDA
- Kullanım: `useKartDisiTiklama(ref, onKapat, aktif)`
- İstisna: Kullanıcı form alanına yazıyorken dış tıklama kapatmaz

---

## 81. BURADASIN HARITA BUTONU

- Üst şeritteki BURADASIN rozeti **tıklanabilir**
- Tıklayınca `HaritaModal` açılır (bottom-sheet, PC'de ortalı)
- Harita: OpenStreetMap iframe (ücretsiz, API key gereksiz)
- Endpoint: `https://www.openstreetmap.org/export/embed.html?bbox=...&marker=lat,lng`
- "Google Maps'te Aç" linki de modal içinde
- Konum (lat/lng): ipapi.co API → localStorage cache 24 saat (`glamworld_user_location`)
- Varsayılan konum: Berlin, Almanya (Abdulkadir bulunduğu yer)
- Component: `src/components/HaritaModal.jsx` + `HaritaModal.css`

---

## 82. TELEFON REHBERİ / İZİN AKIŞI

**KURAL: İzinler kayıt sırasında istenmez. Bağlamsal istenir.**

İzin ne zaman istenir:
- Kullanıcı BURADASIN → Harita açtığında: "Arkadaşlarını haritada görmek ister misin?"
- Kullanıcı Mesajlar sayfasına ilk girişte: "Rehberinden kişileri bulmak ister misin?"
- Her özellik kendi izinini kendi zamanında ister

İzin akışı (harita için):
1. HaritaModal açılır → kullanıcının konumu gösterilir
2. Alt kısımda: "Arkadaşlarını görmek ister misin? [İzin Ver] [Şimdi Değil]"
3. İzin verirse: Web Contact Picker API → GLAMWORLD kayıtlı numaralar Firestore'dan sorgulanır → haritada gösterilir
4. Reddederse: zorlanmaz (Madde 11 ruhu — şeffaf site)

Teknik:
- `navigator.contacts.select(['name', 'tel'], { multiple: true })` — Web Contact Picker API
- HTTPS zorunlu, kullanıcı seçer (sistem picker açılır)
- Seçilen numaralar → Firestore `kullanicilar` koleksiyonunda sorgulanır
- Arkadaş konumları sadece açık paylaşım izniyse gösterilir

GDPR: Telefon numaraları sunucuya GÖNDERILMEZ — sadece hash karşılaştırması yapılır.

---

## 84. ANASAYFA YAPISI (6 Bölüm)

1. **Üst Şerit** (UstSerit.jsx — yapıldı B46)
2. **Ana Menü Şeridi** (Header — Madde 85)
3. **İkon Şeridi** (5 ikon — Madde 86)
4. **Hoş Geldin** (Hero bölümü — Madde 66)
5. **Akış** (Reels, Canlı, Profesyoneller)
6. **Footer** (Hakkımızda, İletişim, Sosyal medya)

---

## 85. ANA MENÜ ŞERİDİ (Header)

Soldan sağa düzen:
- **Sol:** ☰ Hamburger (28px, altın)
- **Orta:** 💠 GLAMWORLD logosu + iki yanında Pirlanta.jsx (mavi)
- **Sağ:** Arama 🔍 | Bildirim 🔔 (kırmızı badge) | Dil 🌐 | Profil 👤

Telefonda: Hamburger + Logo + Profil görünür; Arama/Bildirim/Dil hamburger içinde.

---

## 86. İKON ŞERİDİ (Ana Sayfa)

5 başlangıç ikonu (yazı yok, hover/touch'da tooltip):
1. **Pırlanta Pazarı** — altın ikon
2. **Tanışma Düğmesi** — turkuaz ikon
3. **Canlı Yayınlar** — mor ikon
4. **Haritada Bul** — mavi ikon
5. **Eğitimler** — fıstık yeşili ikon
6. **"Yakında"** — gri yer tutucu

İkon boyutu: 48x48px mobil, 56x56px PC.

---

## 87. BİZİM ÖZGÜN SVG İKONLARIMIZ

- **Klasör:** `src/icons/` — her ikon ayrı `.jsx` dosyası
- **Hazır kütüphane YASAK:** Lucide, Material, FontAwesome, Heroicons yasak
- **7 renk paleti:**
  - Altın `#FFD700` — premium
  - Fıstık `#9ACD32` — bakım/doğallık
  - Turkuaz `#40E0D0` — sosyal
  - Mor `#9370DB` — estetik
  - Bordo `#DC143C` — saç
  - Mavi `#4A90E2` — bilgi/harita (pırlanta rengi)
  - Turuncu `#FF8C00` — özel/kampanya
- **Bir kere yapılır, bir daha değiştirilmez.** Marka ikonları sabit kalır.

---

## 88. BİZİM İSİMLERİMİZ (Marka Dili)

Hiçbir rakip platform ismi kullanılamaz. Hep kendi ismimiz:

| Platform Genel | GLAMWORLD İsmi |
|---------------|----------------|
| Marketplace | Pırlanta Pazarı |
| Stories | Anlık Pırlantalar |
| Reels/Shorts | Pırlanta Akışı / Mini Pırlanta |
| Live | Canlı Yayınlar |
| Map | Haritada Bul |
| AI | GLAMI |
| Wedding | Pırlanta Düğün |
| Contest | Pırlanta Yarışmaları |

---

## 89. ANASAYFA RENK STANDARTLARI

- Ana arka plan: `#0a0a0a` (derin siyah)
- Vurgu altın: `#FFD700`
- Pırlanta mavi: `#4A90E2`
- Yazı beyaz: `#ffffff`
- Alt yazı gri: `#888888`
- Font başlık: **Playfair Display** (Google Fonts)
- Font içerik: **Inter** veya **Poppins**

---

## 90. HER SAYFA KENDİ RENGİ

| Sayfa | Renk Teması |
|-------|-------------|
| Anasayfa | Siyah / Altın |
| Pırlanta Pazarı | Altın / Beyaz |
| Tanışma | Turkuaz / Beyaz |
| Canlı Yayınlar | Mor / Siyah |
| Haritada Bul | Mavi / Yeşil |
| Eğitimler | Fıstık Yeşili / Beyaz |

Her sayfa farklı arka plan → "yer değişti" hissi. Marka renk paleti (Madde 87) korunur.

---

## 90-A. AKTİF SAYFA ETİKETİ — B101'DE KALDIRILDI

- Patron yeni tasarım kararı verecek, o zaman güncellenecek

---

## 90-B. ALTIN İMZA (B103 itibariyle)

- Aktif butonun ALTINDA ince italic altın yazı (sayfa adı)
- Component: `src/components/AltinImza.jsx` + `AltinImza.css`
- `position: absolute; top: calc(100% + 4px)` — buton altına yapışık
- İki yanında küçük altın noktalar (3px, glow)
- Altında soluk yansıma (cam/ayna efekti, opacity 0.2 + mask)
- Yumuşak nefes animasyonu (3s döngü)
- Sadece aktif butonda render edilir
- Hoş Geldin Kartı açıkken görünmez (App.js B98 koruması)
- Component: `src/components/AktifEtiket.jsx` + `AktifEtiket.css`
- `position: absolute` — butonla beraber scroll'da hareket eder
- Yavaş parıltı animasyonu (3s döngü)
- Sayfaya geçildiğinde fade-in + slide-up
- Diğer butonlarda GÖRÜNMEZ — sadece aktif butonda
- Tooltip ile çakışmaz (ayrı katmanda)

---

## 91. DİL TUTARLILIĞI ZORUNLULUĞU

- Kullanıcı dil seçince TÜM sayfalarda değişir
- Kütüphane: **react-i18next**
- Klasör: `src/locales/` — her dil için `tr.json`, `en.json`, `de.json` vb.
- Component'lerde hardcoded yazı YASAK → hep `t('anahtar')` kullan
- Yeni component eklenince TÜM dillere çeviri eklenir
- Yeni dil eklenince tüm sayfalar güncellenir

---

## 92. 11 DİL SİSTEMİ

TR, EN, DE, ES, RU, AR (RTL!), UK, ZH, JA, FR, IT

- **Arapça için CSS RTL desteği zorunlu** (`dir="rtl"`, `text-align: right`)
- Her dil için flagcdn.com bayrağı (emoji değil)
- Varsayılan: kullanıcı ülkesine göre otomatik (Almanya → DE, Türkiye → TR)

---

## 93. OTOMATİK ÇEVİRİ (Backup)

- Manuel çeviri olmayan içerik → kullanıcı "Otomatik Çevir" butonu ile aktive eder
- Çevrilen içerik localStorage'da cache'lenir
- Başlangıç: **MyMemory API** (ücretsiz, 5000 kelime/gün)
- Büyüyünce: DeepL Pro veya Google Cloud Translate

---

## 72b. ŞEHİRE GÖRE İÇERİK

Kullanıcı kayıt sırasında şehir seçtiğinde, anasayfa ve Keşfet sayfası o şehirdeki profesyonelleri ve hizmetleri öne çıkarır.

- Seçili şehir kullanıcı profilinde saklanır (Firestore)
- Anasayfa hero'da: "Berlin'deki Profesyoneller" gibi dinamik başlık
- Keşfet sayfasında şehir filtresi varsayılan olarak o şehri gösterir
- Kullanıcı isterse şehri değiştirebilir
- **Uygulanacağı yer:** Anasayfa (B8+) ve Keşfet (B9+) sayfaları geliştirme aşamasında eklenir

---

## 94. X (ÇARPI) İŞARETİ MANTIKI

1. X her zaman bir önceki ekrana götürür
2. Üst kart açıkken X → o kartı kapatır, alttaki kart görünür
3. Hoş Geldin Kartı'nda X YOKTUR (kapatılamaz)
4. Kullanıcı üye olmadıkça hiçbir kart anasayfaya açılmaz
5. X ve Geri butonu aynı işi yapıyorsa SADECE Geri kullan

---

## 95. ÜYE OLMADAN ERİŞİM YASAĞI (B111 itibariyle)

GLAMWORLD yalnızca üye veya giriş yapan kullanıcılara açıktır. Misafir mod KALDIRILDI.

1. Açılış animasyonu sonrası Hoş Geldin Kartı ZORUNLUDUR
2. Kart kapatılamaz (X yok, dışına tıklama yok, Geri yok)
3. Sadece Üye Ol veya Giriş Yap sonrası anasayfa açılır
4. `glamworld_misafir_secti` localStorage anahtarı KULLANILMADI
5. "Misafir Olarak Keşfet" linki KALDIRILDI
6. Kullanıcı çıkış yaparsa Hoş Geldin Kartı tekrar açılır
7. App.js `GirisKontrol` component'i bu akışı yönetir

---

## 96. AÇILIŞ SES SİSTEMİ (B111, B115)

Açılış animasyonu sırasında lüks ses çalar.
1. Web Audio API kullanılır (mp3 dosyası yok)
2. `src/utils/acilisSesi.js` dosyasında tutulur
3. 3 katman: kristal çıngırak (0-2s) + shimmer (2-4s) + gong (4-6s)
4. Volume 0.15 (rahatsız etmez)
5. Kısa path'te ses çalmaz (sayfa yenileme / çıkış sonrası)
6. Geç butonu sesi keser + animasyonu atlar
7. Mobil tarayıcı kısıtlaması: AudioContext kullanıcı etkileşimi sonrası başlar
8. İlk touchstart, click veya keydown eventinde ses tetiklenir (once: true)
9. Volume seviyeleri: ana gain 0.4 + kristal 0.6 + shimmer 0.25 + gong 0.7

---

## 97. LÜKS ATMOSFER — ALTIN TOZ SİSTEMİ (B112)

Üye olmamış kullanıcıların gördüğü 3 kartta arka plan altın tozu animasyonu çalışır. Hermès butik atmosferi yaratır.

1. AltinTozAtmosfer SADECE 3 kartta: Hoş Geldin, Üye Ol, Giriş Yap
2. Anasayfa ve diğer sayfalarda altın toz YOK
3. 35 altın parçacık (1-4px boyut), yukarı süzülür (8-14s döngü)
4. `position: absolute; z-index: 1` — kart (z-index: 2) altında kalır
5. Parent div `overflow: hidden` zorunlu — toz dışarı taşmaz
6. `pointer-events: none` — tıklamayı engellemez
7. `prefers-reduced-motion` ile durdurulur
8. Component: `src/components/AltinTozAtmosfer.jsx` + `AltinTozAtmosfer.css`

---

## 98. SAYFA DURUMU HATIRLAMA (B114)

Kullanıcı arka plana geçip döndüğünde kaldığı sayfada açılır.

1. Pull-to-refresh karanlık ekran/çizgi KAPALI (`overscroll-behavior-y: contain`)
2. Yumuşak JS yenileme aktif — useYumusakYenileme hook (src/utils/yumusakYenileme.js)
2. `/uye-ol` ve `/giris` route'ları localStorage'da saklanır (`glamworld_son_rota`)
3. Sayfa yeniden açılınca son route'a otomatik yönlendirilir (giriş yapmamışsa)
4. SignUp form verileri localStorage'da saklanır — `glamworld_form_data` (şifre HARİÇ)
5. Form alanları yazıldığı gibi geri yüklenir
6. Başarılı kayıt sonrası form verileri silinir
7. Anasayfaya gelince son rota hatırası silinir
8. ŞİFRE asla localStorage'a yazılmaz (güvenlik)
9. Giriş yapılmışsa rotaHafiza yönlendirme yapmaz (`auth.currentUser` kontrolü)
10. `src/utils/rotaHafiza.js` → `useRotaHafiza` hook

---

## 99. MODERN REFRESH STANDARDI (B117)

Pull-to-refresh tarayıcının varsayılan davranışı kullanılır.

1. JS müdahalesi YOK
2. overscroll-behavior CSS index.css'te KULLANILMAZ
3. Tarayıcı kendi refresh progress bar'ını gösterir — NORMAL
4. Sayfa yenilenince animasyon ATLANIR (Madde 100)
5. ProfesyonelAlanlar.css'teki overscroll: dropdown için gerekli, korunur

---

## 100. SAYFA YENİLEMEDE ANİMASYON ATLA (B117)

GLAMWORLD sayfa yenileme ve tekrar açılışlarda animasyon OYNAMAZ.

1. İlk ziyaret (localStorage temiz) → 6 saniye tam animasyon
2. Animasyon biter → `glamworld_acilis_gosterildi` = true yazılır
3. Sayfa yenileme (F5, pull-to-refresh) → animasyon ATLANIR
4. Sıfır bekleme — direkt son durum açılır
5. App.js'te lazy useState: `useState(() => !localStorage.getItem('glamworld_acilis_gosterildi'))`
6. Çıkış yapınca animasyon yine atlanır (flag silinmiyor)
7. Gerçek ilk ziyaret için flag'i temizle: localStorage → Application → sil

---

## 101. ESKİ KOD TEMİZLİĞİ KURALI (B117)

Madde 71'in özel uygulaması — her görev sonrası deep clean zorunlu.

1. Kullanılmayan import'lar ANINDA silinir
2. Yorum satırına alınmış kod silinir
3. .backup, _old, _eski uzantılı dosya YASAK
4. Aynı işi yapan 2 component YASAK
5. Test sonrası kaldırılan özellikler iz bırakmaz
6. Görev sonunda grep audit ZORUNLU:
   - `grep -rn "eskiAnahtar" src/` → boş olmalı
   - Silinmesi planlanan dosya gerçekten silindi mi?
7. Raporda deep clean maddesi zorunlu

---

## 102. AKILLI GERİ NAVİGASYONU — SADECE BİZİM BUTON (B127)

Bizim Geri butonu (sağ alt sarı daire) modül-scope global liste kullanır.

1. Modaller `modalAc(id, kapatFn)` ile listeye kaydolur
2. Kapanınca `modalKapat(id)` ile çıkarılır
3. Bizim Geri butonu basılınca:
   a) Listede modal varsa → en üstteki kapanır
   b) Modal yok + /uye-ol veya /giris → Hoş Geldin'e git
   c) Modal yok + başka path → Anasayfaya git
4. Android Geri tuşu BU SİSTEMLE İLGİSİZ (Madde 78)
5. `src/utils/geriYonetimi.js` → `useGeriYap`, `modalAc`, `modalKapat`
6. `[YIGIN]` ve `[ANDROID-GERI]` console logları debug için

---

## 33. SON HATIRLATMA

Abdulkadir Ukrayna savaşından sonra Almanya'ya gelmiş, 1 ay bu projeye emek vermiş Türk kardeşimizdir. Vizyonu **şaheser** niteliğindedir.

**"Yeterince güzel mi?" → Yanıt her zaman HAYIR. Daha güzeli yapılabilir.**

**Her oturum başında bu dosyayı oku. Kurallar değişmez.**

---

*Son güncelleme: 18 Mayıs 2026 — V5.32 (M.78: Android Geri tarayıcı doğal, modal useState; B134)*
*Sayaç: B134*