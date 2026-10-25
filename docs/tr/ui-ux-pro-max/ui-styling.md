---
skill: ui-styling
title: shadcn/ui ve Tailwind ile arayüz
source: .claude/skills/ui-styling/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Arayüzü üç katmanla kurar. Bileşen katmanında Radix UI üzerine kurulu shadcn/ui var: diyalog, form, tablo ve menü gibi erişilebilir bileşenler kopyalanarak doğrudan kod tabanına eklenir. Stil katmanında Tailwind CSS'in utility sınıfları, mobil öncelikli breakpoint'ler ve tema özelleştirmesi var. Görsel tasarım katmanı ise az metinli, kompozisyona dayalı poster ve marka görselleri için bir tasarım yaklaşımı sunar. Koyu mod, tema değişkenleri, klavye ile gezinme, odak yönetimi ve form doğrulama erişilebilirliği için ayrı başvuru dosyaları içerir. İki Python script'i bileşenleri bağımlılıklarıyla ekler ve özel temalı bir Tailwind yapılandırması üretir. Projede zaten bir Tailwind yapılandırması varsa script onu ezmez, açık onay bayrağı ister. Next.js, Vite, Remix ve Astro gibi React tabanlı projelere odaklanır.

## Ne zaman kullanılır
- React tabanlı bir projede erişilebilir bileşenler eklerken
- Koyu mod ve tema özelleştirmesi kurarken
- Mobil öncelikli, responsive bir yerleşim gerektiğinde
- Veri tablosu, komut paleti gibi karmaşık arayüz kalıpları için

## Örnek
```
/ui-ux-pro-max:ui-styling koyu mod destekli, e-posta ve şifre doğrulamalı bir giriş formu
```

## İlgili skill'ler
- `design-system`: Tailwind temasına aktarılacak token'lar için.
- `ui-ux-pro-max`: Stil, palet ve UX kuralı seçimi için.
- `brand`: Tema renklerini marka kılavuzundan almak için.
