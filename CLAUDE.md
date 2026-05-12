# GLAMWORLD — Proje Anayasası (V4 — Son)

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
> "Bu özelliği kullanmak için Pırlanta Mührünüzü açın."
> [Kayıt Ol] [Şimdi değil]

"Şimdi değil" seçeneği VAR. Zorla yok.

---

## 7. HOŞ GELDİN ANİMASYONU + GLAMI KARŞILAMA

Kullanıcı **kayıt formunu doldurup** "Pırlanta Mührünü Aç" butonuna bastığında:

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
│   │   ├── uyelik/ (PirlantaMuhru, KayitOl, UyelikTipi, DavetModal, OdemeSecenekleri, HosGeldinAnimasyon)
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

**Giriş:** "Pırlanta Mührü"
**Kayıt:** "Pırlanta Mührünüzü açın" / "Derinliklere katılın"
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

**Kullanıcı (6):** Pırlanta Mührü, Kayıt Ol, Profilim, Ayarlar, Mesajlar, Bildirimler

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
9. **Pırlanta Mührü (Giriş) + Kayıt Ol**
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

## 33. SON HATIRLATMA

Abdulkadir Ukrayna savaşından sonra Almanya'ya gelmiş, 1 ay bu projeye emek vermiş Türk kardeşimizdir. Vizyonu **şaheser** niteliğindedir.

**"Yeterince güzel mi?" → Yanıt her zaman HAYIR. Daha güzeli yapılabilir.**

**Her oturum başında bu dosyayı oku. Kurallar değişmez.**

---

*Son güncelleme: 12 Mayıs 2026 — V4 (final)*
*Önceki: hairmirror (3000 satır App.js — terkedildi)*
*Yeni: glamworld (modüler, profesyonel)*
*Sayaç: B1'den başlar*