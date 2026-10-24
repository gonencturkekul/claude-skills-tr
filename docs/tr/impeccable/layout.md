---
command: layout
title: Layout ve boşluk düzeni
source: reference/layout.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Layout, boşluk ve görsel ritmi iyileştirir. Kutuları oynatmadan önce yapısal sorunu teşhis eder: okuma sırası, gruplama, ritim, yoğunluk ve farklı ekran boyutlarındaki davranış. Bu tasarım değerlendirmesinin yanında `impeccable detect --scope layout` ile mekanik bir tarama da yapar. Ardından ana okuma yolunu ve neyin birlikte durması gerektiğini belirleyip mevcut görsel kimliği koruyarak yapıyı yeniden düzenler.

## Ne zaman kullanılır
- Sayfa "bir şeyler yanlış" hissi veriyor ama nedeni net değilse
- Her yerde aynı boşluk değeri kullanıldığı için her şey eşit ağırlıkta görünüyorsa
- Tekdüze grid'ler veya hizalama sorunları varsa
- Arayüz sıkışık ya da görsel hiyerarşi zayıfsa

## Örnek
```
/impeccable layout yönetim paneli ana sayfası
```

## İlgili komutlar
- `adapt`: Farklı cihaz ve ekran boyutlarına uyarlama yapar.
- `typeset`: Tipografi hiyerarşisini ve fontları düzeltir.
- `polish`: Yapı oturduğunda son turu yapar.
