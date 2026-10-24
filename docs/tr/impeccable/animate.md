---
command: animate
title: Amaçlı animasyon ekleme
source: reference/animate.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Bir arayüzü inceler ve yalnızca anlamı olan yerlere animasyon ekler: bir aksiyonu onaylamak, durum değişikliğini göstermek, navigasyonda sürekliliği korumak ya da dikkati doğru ana çekmek. Kod yazmadan önce kısa bir hareket planı çıkarır ve süreyi, easing'i, kullanılacak tekniği (CSS, Web Animations API, View Transitions) bu plana göre seçer. Her animasyon için `prefers-reduced-motion` alternatifi ekler ve performans bütçesini gözetir.

## Ne zaman kullanılır
- Arayüz durağan hissettiriyor ve geçişler ani görünüyorsa.
- Butonlar, formlar veya durum değişiklikleri kullanıcıya geri bildirim vermiyorsa.
- Sayfalar ya da paneller arası geçişte kullanıcı nerede olduğunu kaybediyorsa.
- Mikro etkileşim veya hover efekti eklemek istiyorsanız.

## Örnek
```
/impeccable animate checkout modal
```

## İlgili komutlar
- `delight`: Arayüze kişilik ve akılda kalan dokunuşlar ekler.
- `optimize`: Takılan animasyonlar dahil UI performans sorunlarını çözer.
- `polish`: Hareket yerine oturduktan sonra son geçişi yapar.
