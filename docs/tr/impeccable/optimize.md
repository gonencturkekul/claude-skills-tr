---
command: optimize
title: Arayüz performansını iyileştirme
source: reference/optimize.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Arayüzdeki performans sorunlarını bulur ve düzeltir: yükleme hızı, render, animasyonlar, görseller ve bundle boyutu. Önce ölçer, gerçek darboğazı tespit eder, sonra yalnızca yavaş olan kısma dokunur. Görsel formatları, code splitting, font yükleme, layout thrashing ve Core Web Vitals (LCP, INP, CLS) gibi başlıkları ele alır. İşi önce/sonra ölçümleriyle doğrular; işlevi veya erişilebilirliği performans uğruna bozmaz.

## Ne zaman kullanılır
- Sayfa yavaş açılıyor, etkileşimler gecikmeli ya da animasyonlar takılıyorsa
- Bundle boyutu veya yükleme süresi fazla büyüdüyse
- Lighthouse skorlarında LCP, INP veya CLS kötü çıkıyorsa
- Mobil cihazlarda ve yavaş bağlantılarda deneyim zayıfsa

## Örnek
```
/impeccable optimize ürün listeleme sayfası
```

## İlgili komutlar
- `polish`: Performans düzeldikten sonra yapılan son kalite turu.
- `animate`: Akıcı ve amaçlı hareket eklemek için.
- `harden`: Uç durumlar ve dayanıklılık için.
