---
command: adapt
title: Farklı cihazlara uyarlama
source: reference/adapt.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Mevcut bir tasarımı başka bir ekran boyutuna, cihaza ya da kullanım bağlamına uyarlar: mobil, tablet, masaüstü, baskı veya e-posta gibi. Amaç pikselleri küçültüp büyütmek değil, deneyimi yeni bağlam için yeniden düşünmektir. Breakpoint'leri, akışkan layout'ları, dokunma alanlarını ve navigasyon değişikliklerini uygular. Yalnızca web için çalışır; native projelerde (`ios`, `android`) ayrı bir rehbere geçer.

## Ne zaman kullanılır
- Masaüstü için yapılmış bir sayfa mobilde dağılıyorsa.
- Hover'a bağlı etkileşimler dokunmatik ekranda çalışmıyorsa veya dokunma alanları 44x44px'ten küçükse.
- Bir sayfanın baskı ya da e-posta versiyonu gerekiyorsa.
- Slider veya sürüklenebilir kontroller gibi özel bileşenlerin dokunmayla gerçekten çalıştığını doğrulamak istiyorsanız.

## Örnek
```
/impeccable adapt pricing-table mobile
```

## İlgili komutlar
- `audit`: Responsive sorunları da içeren teknik kalite raporu çıkarır.
- `polish`: Uyarlama bittikten sonra son kalite geçişini yapar.
