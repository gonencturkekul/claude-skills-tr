---
tagline: Arayüz kararları için aranabilir stil, palet, font ve UX kuralı veritabanı ile altı tasarım skill'i.
---
# ui-ux-pro-max

Orijinal skill: [nextlevelbuilder](https://github.com/nextlevelbuilder) ([GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [uupm.cc](https://www.uupm.cc/), MIT)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, ui-ux-pro-max'in Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'lerin kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## ui-ux-pro-max nedir?

ui-ux-pro-max, Claude'a arayüz kararlarında dayanabileceği yerel bir veritabanı veren bir tasarım paketi. Merkezinde aynı adlı skill var: 79 stil, 192 ürün türüne göre palet ve gerekçe profili, 74 font eşleşmesi, 119 UX kuralı, ikonlar, GSAP hazır ayarları, grafik türleri ve 22 teknoloji yığını için rehberler. Bir Python script'i bu veriler içinde arama yapar ve yeni bir proje için baştan sona bir tasarım sistemi önerisi çıkarır. Python 3 dışında bir şey kurman gerekmez.

Pakette altı skill daha var: marka kimliği, token mimarisi, shadcn/ui ve Tailwind ile arayüz, banner, HTML sunum ve logo, kurumsal kimlik, ikon gibi işleri toplayan genel bir tasarım skill'i. Logo, kurumsal kimlik maketi ve ikon üretimi bir Gemini API anahtarı ister, diğerleri anahtarsız çalışır.

## Claude bunu ne zaman kullanır?

Bir sayfa ya da bileşen tasarladığında, arayüz incelediğinde, renk, font veya yerleşim seçtiğinde Claude ilgili skill'i kendiliğinden devreye alır. "SaaS ürünüm için bir landing page tasarla" demen yeter. İstersen elle de çağırabilirsin:

```
/ui-ux-pro-max:ui-ux-pro-max
```

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install ui-ux-pro-max@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

Yazarın kendi marketplace'i de var (`/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`). ui-ux-pro-max'i zaten oradan kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Skill'ler

Her skill'in Türkçe özeti:

| Skill | Ne yapar |
|-------|----------|
| [banner-design](./banner-design.md) | Sosyal medya, reklam, web hero ve baskı için banner seçenekleri tasarlar. |
| [brand](./brand.md) | Marka sesini, görsel kimliği ve marka kılavuzunu yönetir, token'larla eşitler. |
| [design](./design.md) | Logo, kurumsal kimlik, sunum, banner, ikon ve sosyal medya görsellerini tek çatıda toplar. |
| [design-system](./design-system.md) | Üç katmanlı token mimarisi, bileşen tanımları ve token'a bağlı slaytlar. |
| [slides](./slides.md) | Chart.js grafikli, stratejik HTML sunumlar hazırlar. |
| [ui-styling](./ui-styling.md) | shadcn/ui ve Tailwind CSS ile erişilebilir arayüzler kurar. |
| [ui-ux-pro-max](./ui-ux-pro-max.md) | Ana skill: stil, palet, font ve UX kuralları veritabanında arama yapar. |

## Hata ve öneriler

- Skill'lerin kendisiyle ilgili hata ya da özellik istekleri: [nextlevelbuilder/ui-ux-pro-max-skill issues](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

ui-ux-pro-max, nextlevelbuilder tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
