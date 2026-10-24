---
command: extract
title: Tasarım sistemine çıkarma
source: reference/extract.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Kod tabanında tekrar eden bileşenleri, sabit yazılmış renk, boşluk ve tipografi değerlerini ve ortak kalıpları bulup tasarım sistemine taşır. Önce mevcut tasarım sistemini ve isimlendirme kurallarını inceler; sistem yoksa kendiliğinden kurmaz, sana nereye ve nasıl kurulacağını sorar. Yalnızca aynı amaçla 3 veya daha fazla kez kullanılan şeyleri çıkarır, sonra eski kullanımları yeni ortak bileşen ve token'lara geçirip ölü kodu siler ve dokümantasyonu günceller.

## Ne zaman kullanılır
- Aynı buton, kart veya input'un farklı sürümleri kod tabanına dağılmışsa.
- Hard-coded renk ve boşluk değerlerini anlamlı token'lara çevirmek istediğinde.
- Tasarım sapması (drift) birikmişse ve tutarlı bir sisteme dönmek istiyorsan.

## Örnek
```
/impeccable extract src/components/dashboard
```

## İlgili komutlar
- `document`: Sistemin son halini DESIGN.md olarak kaydeder.
- `polish`: Çıkarma sonrası son rötuşlar için.
