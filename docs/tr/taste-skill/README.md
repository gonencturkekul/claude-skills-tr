---
tagline: Web sayfalarına ve uygulama ekranlarına şablon görüntüsü yerine bilinçli bir sanat yönetmenliği getirir.
---
# taste-skill

Orijinal skill: [Leonxlnx](https://github.com/Leonxlnx) ([GitHub](https://github.com/Leonxlnx/taste-skill), MIT)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, taste-skill'in Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'in kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## taste-skill nedir?

taste-skill, yapay zekanın ürettiği sayfaların hep aynı görünmesine karşı yazılmış bir sanat yönetmenliği skill'i. Ortalanmış başlık, üstünde küçük bir etiket, ikonlu üç kart, yumuşak bir gradyan: hiçbiri yanlış değil ama hiçbiri de bilinçli bir karar değil. Skill bu varsayılanları kararlarla değiştiriyor. Bir script, 247 galeri sitesinin incelenmesinden çıkarılmış bir kütüphaneden sana üç tasarım yönü dağıtıyor, sen konuna uyanı seçiyorsun. Süssüz bir ev stili gerçek bir tarayıcıda ölçülüyor, sonra ekran görüntülerine bakıp düzeltiyorsun.

İki tür işi ayırıyor: okunan ve kaydırılan sayfalar (landing page, ürün sitesi, portfolyo) ve içinde çalışılan uygulama ekranları (dashboard, admin, ayarlar). Uygulama ekranlarının kendi akışı ve kuralları var.

Script'ler Node 22+ ve kurulu bir Chrome, Edge ya da Chromium istiyor, hiçbir şey kurmuyor. Görsel arayan `assets.mjs` internet erişimi istiyor ama API anahtarı kullanmıyor.

## Claude bunu ne zaman kullanır?

Alt komutu yok. Bir sayfa ya da ekran kurduğunda, yeniden tasarladığında, stilini değiştirdiğinde, cilaladığında ya da incelemesini istediğinde Claude skill'i kendiliğinden devreye alır. "Bu sayfa çok yapay zeka yapmış gibi duruyor" demen de yeter. İstersen elle de çağırabilirsin:

```
/taste-skill:design-taste-frontend
```

## Bir sayfa nasıl kurulur?

Skill bir sayfa için şu on adımı sırayla izler:

1. **Brief ve projeyi okur.** Konuyu, kitleyi, sayfanın tek hedefini ve elinde gerçekten hangi görsellerin olduğunu çıkarır, konuya özgü 8-12 şeylik bir envanter yazar.
2. **Argümanı yazar.** Sayfayı bölüm bölüm iddia ve kanıt olarak listeler, iddiası olmayan bölümü siler.
3. **Yönü çeker.** `draw.mjs` üç yön dağıtır, konuya en uyanı seçilir ve tam yön sayfası (tipografi, palet, hero, bölümler) alınır.
4. **Fikri bulur.** "Bu sayfada [konuya ait bir şey], [yönün istediği araç] olur" cümlesini doldurur ve ziyaretçinin oynayabileceği tek bir canlı öğe tasarlar.
5. **Metni yazar.** Tüm sayfayı işaretlemeden önce düz metin olarak yazar, başlıklar her genişlikte en fazla iki satır.
6. **Hareketsiz halini kurar.** Token'lar, hero, bölümler, gerçek görseller, canlı öğe, kaydırma sahneleri ve boş alan kontrolü.
7. **Kapıdan geçirir.** `lint.mjs` ve `inspect.mjs` ile 1440, 768 ve 390 pikselde ölçer, her `FAIL` düzeltilir.
8. **Bakar.** Ekran görüntülerini puanlı bir eleştiriyle değerlendirir, en büyük üç sorunu düzeltir, en fazla üç tur.
9. **Hareketi ekler.** İmza hareketi, bölüm girişleri, kontrol geri bildirimleri ve hareketli bir görsel, hepsi azaltılmış hareket desteğiyle.
10. **Raporlar.** Seçilen yönü, fikri, son puanları, kullanılan görsellerin kredilerini ve değiştirilmesi gereken örnek içerikleri sana bildirir.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install taste-skill@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

taste-skill'i zaten yazarın kendi marketplace'inden (`/plugin marketplace add Leonxlnx/taste-skill`) kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Konular

Skill, ayrıntıları `references/` klasöründeki konu dosyalarında tutar ve gerektiğinde okur. Her birinin Türkçe özeti:

| Konu | Ne anlatır |
|------|------------|
| [app-screens](./app-screens.md) | Dashboard ve admin gibi uygulama ekranlarının kendi akışı ve kuralları. |
| [colour](./colour.md) | Paleti rollere ve oranlara göre kullanmak. |
| [copy](./copy.md) | Tasarımdan önce metni iddia ve kanıt olarak yazmak. |
| [critique](./critique.md) | Ekran görüntülerini puanlı bir jüri gibi değerlendirmek. |
| [imagery](./imagery.md) | Görselleri bulmak, lisanslamak, kırpmak ve yerleştirmek. |
| [layout](./layout.md) | Grid, kenar boşlukları ve bölüm kompozisyonu. |
| [motion](./motion.md) | Hareket katmanı, token'lar ve denenmiş tarifler. |
| [research](./research.md) | Skill'deki sayıların dayandığı galeri araştırması. |
| [scenes](./scenes.md) | Kaydırmayla ilerleyen büyük sahneler. |
| [tells](./tells.md) | Sayfayı yapay zeka üretimi gibi gösteren kalıplar. |
| [type](./type.md) | Font seçimi, boyutlar ve tipografi kuralları. |

## Hata ve öneriler

- Skill'in kendisiyle ilgili hata ya da özellik istekleri: [Leonxlnx/taste-skill issues](https://github.com/Leonxlnx/taste-skill/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

taste-skill, Leonxlnx tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
