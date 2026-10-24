---
command: document
title: DESIGN.md oluşturma
source: reference/document.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Projedeki mevcut görsel tasarım sistemini proje kökünde bir DESIGN.md dosyasına döker. CSS değişkenleri, Tailwind config, theme/token dosyaları ve bileşenlerden renk, tipografi, boşluk, köşe yarıçapı ve bileşen kalıplarını otomatik çıkarır. Atmosfer ve renk karakteri gibi otomatik çıkarılamayan dili sana sorarak netleştirir. Dosya Google Stitch DESIGN.md formatına uyar ve yanına `.impeccable/design.json` dosyasını da yazar. Henüz kod yoksa seed mode ile yönsel bir taslak DESIGN.md üretebilir.

## Ne zaman kullanılır
- Tutarlı bir arayüz var ama DESIGN.md yoksa.
- Mevcut DESIGN.md tasarımın gerisinde kaldıysa.
- Büyük bir redesign öncesinde mevcut durumu referans olarak kaydetmek için.
- Yapay zekâ ajanlarının yeni ekranlarda markaya sadık kalmasını istiyorsan.

## Örnek
```
/impeccable document
```

## İlgili komutlar
- `init`: Ürün bağlamını PRODUCT.md'ye yazar, seed mode için ön koşuldur.
- `extract`: Tekrar eden token ve bileşenleri tasarım sistemine toplar.
