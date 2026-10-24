---
command: overdrive
title: Sınırları zorlayan efektler
source: reference/overdrive.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Arayüzü alışılmış sınırların ötesine taşımak için teknik olarak iddialı çözümler uygular: shader'lar, spring fizik, scroll'a bağlı animasyonlar, View Transitions, sanal kaydırma, WebGL ve Web Workers gibi. Kodlamaya geçmeden önce 2-3 farklı yön önerir ve kullanıcının seçimini bekler. Her efekt progressive enhancement ile yazılır, desteklemeyen tarayıcıda da düzgün çalışan bir fallback bırakılır. Hedef 60fps'tir; sonuç tarayıcıda zamanlama ve akıcılık açısından kontrol edilir.

## Ne zaman kullanılır
- Bir landing page veya portfolyoda gerçekten etkileyici bir an yaratmak istediğinizde
- Bir tablo, form ya da diyaloğun "hissini" sıra dışı yapmak istediğinizde
- Büyük veri setleriyle akıcı grafik veya liste deneyimi gerektiğinde

Ürünün ne yaptığını değiştirmez, mevcut özellikleri daha etkileyici hissettirir. Zayıf tasarım temellerini örtmek için kullanılmamalıdır.

## Örnek
```
/impeccable overdrive ana sayfa hero bölümü
```

## İlgili komutlar
- `animate`: Daha ölçülü, amaçlı animasyonlar için.
- `bolder`: Sönük bir tasarımı güçlendirmek için.
- `optimize`: Efektler performansı düşürürse.
