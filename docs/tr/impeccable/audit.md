---
command: audit
title: Teknik kalite denetimi
source: reference/audit.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Arayüzün kodunu beş boyutta denetler: erişilebilirlik, performans, theming, responsive tasarım ve uygulama bütünlüğü. Her boyuta 0-4 arası puan verir, toplamda 20 üzerinden bir sağlık skoru çıkarır. Bulunan her sorunu P0-P3 önem derecesiyle etiketler ve hangi komutla düzeltileceğini önerir. Sorunları kendisi düzeltmez, sadece raporlar. Bu bir tasarım eleştirisi değil, ölçülebilir ve doğrulanabilir şeylere bakan bir kod denetimidir.

## Ne zaman kullanılır
- Yayına çıkmadan önce erişilebilirlik (WCAG kontrast, klavye navigasyonu, ARIA) kontrolü yapmak istiyorsanız.
- Hard-coded renkler, bozuk dark mode veya tutarsız token kullanımından şüpheleniyorsanız.
- Hangi sorunun önce çözülmesi gerektiğine dair önceliklendirilmiş bir liste istiyorsanız.
- Düzeltmelerden sonra skorun ne kadar iyileştiğini görmek için.

## Örnek
```
/impeccable audit settings page
```

## İlgili komutlar
- `critique`: Kod yerine UX ve tasarım tarafını puanlayarak değerlendirir.
- `harden`: Hata durumları, i18n ve uç durumlar için arayüzü sağlamlaştırır.
- `polish`: Önerilen düzeltmelerden sonra son adım olarak çalıştırılır.
