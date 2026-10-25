---
skill: design-system
title: Token mimarisi ve bileşen tanımları
source: .claude/skills/design-system/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Tasarımı üç katmanlı token yapısına oturtur: ham değerleri tutan temel katman, bunlara amaç adı veren anlamsal katman ve bileşene özel katman. Böylece açık ve koyu tema arasında geçiş ve bileşen bazında özelleştirme kolaylaşır. Bileşenlerin varsayılan, hover, aktif ve devre dışı hallerini tablo halinde tanımlar. Bir script JSON token tanımından CSS değişkenleri üretir, bir diğeri koddaki elle yazılmış renk ve değerleri yakalar. Token'a bağlı slaytlar da üretir: deste yapısı, yerleşim, tipografi, duyguya göre renk ve arka plan kararları CSV dosyalarından aranır, slaytlar sorun ve çözüm arasında gidip gelen bir duygu akışıyla kurulur. Her slayt token CSS dosyasını kullanır, grafikler Chart.js ile çizilir ve bir doğrulayıcı token uyumunu kontrol eder. Marka renklerinden temel değerleri çıkarmak için `brand`, Tailwind'e aktarmak için `ui-styling` ile birlikte çalışır.

## Ne zaman kullanılır
- Bir proje için tasarım token'ları oluştururken
- Bileşen hallerini ve varyantlarını tanımlarken
- Boşluk ve tipografi ölçeği kurarken
- Tailwind temasını yapılandırırken ya da markaya uygun sunum gerektiğinde

## Örnek
```
/ui-ux-pro-max:design-system buton bileşeni için token'ları ve tüm hallerini tanımla
```

## İlgili skill'ler
- `brand`: Token'ların dayanacağı marka renkleri için.
- `ui-styling`: Token'ları Tailwind ve shadcn/ui'a aktarmak için.
- `slides`: Sunum odaklı daha yalın bir akış için.
