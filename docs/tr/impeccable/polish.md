---
command: polish
title: Yayın öncesi son rötuş
source: reference/polish.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Yayına çıkmadan önce son kalite turunu yapar: hizalama, boşluklar, tutarlılık ve küçük detaylar. Önce DESIGN.md, token'lar ve ortak bileşenleri okuyup sistemden sapmaları sınıflandırır. Düzeltmeleri önem sırasıyla yapar: önce bozuk akışlar ve eksik state'ler (loading, empty, error), sonra hiyerarşi ve responsive sorunlar, en son görsel detaylar ve kod temizliği. Mevcut görsel dili korur; konsept yanlışsa gizlice yeniden tasarlamak yerine bunu açıkça söyler.

## Ne zaman kullanılır
- Özellik işlevsel olarak bitti ve yayına hazırlanıyorsa
- "Bir şeyler yanlış duruyor" ama tam olarak ne olduğu belli değilse
- İyi bir arayüzü daha da iyiye taşımak istediğinde
- Daha önce `critique` ile çıkan bulguları kapatmak için

## Örnek
```
/impeccable polish ödeme akışı
```

## İlgili komutlar
- `critique`: Polish öncesinde puanlı UX değerlendirmesi almak için.
- `bolder`: Konsept fazla sönükse, rötuş yerine.
- `typeset`: Tipografi sorunlarına odaklanmak için.
