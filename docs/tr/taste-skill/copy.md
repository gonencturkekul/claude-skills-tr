---
topic: copy
title: Önce metin, sonra tasarım
source: references/copy.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Metni ilk tasarım kararı olarak ele alır: sayfayı işaretlemeden önce düz metin olarak yaz. Önce okuyucuyu, tek ana iddiayı ve onu neyin kanıtlayacağını not edersin; her bölüm bir iddia ve kanıt taşır, iddiası olmayan bölüm silinir. Sayfanın sırası argümanın sırasıdır. Başlıklar her ekran genişliğinde en fazla iki satıra sığmalı; kaynak bunun için bir karakter bütçesi verir (hero için yaklaşık 32 karakter) ve `inspect.mjs` bunu 1440, 768 ve 390 pikselde ölçer. İşe yarayan başlık kalıplarını, kaçınılacak klişeleri (üçlü slogan, "X, yeniden tasarlandı"), buton ve navigasyon metinlerini, uydurma müşteri ve yorum yasağını, üretilmiş gibi okunan kelimeleri ve mikro tipografiyi de anlatır.

## Ne zaman işine yarar
- Başlığın üç dört satıra taşıyor ve küçültmek çözüm olmuyorsa
- Sayfa hero, logolar, özellikler, yorumlar sırasına takılıp kaldıysa
- Elinde gerçek referans yoksa ve sahte yorum yazmadan güven vermek istiyorsan
- Metin "seamless", "elevate" gibi kalıplarla dolduysa ve `lint.mjs` uyarı veriyorsa

## Örnek
```
Mobilya atölyemin açılış sayfası için metni yaz, başlıklar telefonda iki satırı geçmesin
```

## İlgili konular
- `type`: Başlık boyutu ve satır kırılması karakter bütçesiyle birlikte çalışır.
- `tells`: Metinden kaynaklanan klişelerin tam listesi orada.
- `imagery`: Kanıt olarak ürünün kendisini büyük göstermek için.
