---
skill: ui-ux-pro-max
title: Arayüz tasarımı veritabanı
source: .claude/skills/ui-ux-pro-max/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Arayüz kararlarını yerel bir veritabanına dayandırır: 79 stil, 192 ürün türü için palet ve gerekçe, 74 font eşleşmesi, 119 UX kuralı, ikonlar, GSAP hazır ayarları, grafik türleri ve 22 teknoloji yığını. Kuralları öncelik sırasıyla ele alır: önce erişilebilirlik ve dokunma hedefleri, sonra performans, stil seçimi ve responsive düzen, en son tipografi, animasyon, formlar, navigasyon ve grafikler. Yeni bir sayfa ya da proje için `--design-system` ile ürün türüne uygun stil, renk, tipografi, efekt ve kaçınılacak kalıpları tek seferde önerir. İstersen bunu `MASTER.md` ve sayfa bazlı ek dosyalar olarak projeye kaydeder. Cesaret, hareket ve yoğunluk için 1-10 arası üç ayar sunar. Kullandığın yığını projeden tespit eder, tahmin etmez. Arama sonuç vermezse veri uydurmaz, önerinin genel varsayılanlardan geldiğini açıkça söyler. Python 3 yeterli, ek paket gerekmez.

## Ne zaman kullanılır
- Yeni bir sayfa ya da ürün için görsel yön belirlerken
- Renk paleti, font eşleşmesi ya da stil seçemediğinde
- Bir arayüzü erişilebilirlik ve kullanılabilirlik açısından incelerken
- Yığına özel uygulama rehberi gerektiğinde (React, Flutter, SwiftUI ve diğerleri)

## Örnek
```
Bir spa ve wellness markası için landing page tasarım sistemi çıkar, projeye kaydet
```

## İlgili skill'ler
- `design-system`: Seçilen yönü token mimarisine dökmek için.
- `ui-styling`: shadcn/ui ve Tailwind ile uygulamak için.
- `brand`: Marka kılavuzu zaten varsa ona dayanmak için.
