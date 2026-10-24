---
topic: critique
title: Render edilmiş sayfayı yargılama
source: references/critique.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
`inspect.mjs` testinin geçmesi sayfanın iyi olduğunu göstermez, sadece yasak ya da bozuk bir şey ölçülmediğini söyler. Bu rehber sayfayı nasıl yargılayacağını anlatır ve bunu kod üzerinden değil ekran görüntüleri üzerinden yaptırır, çünkü kodu okurken kendi niyetini görürsün. On dört ayrı bakış turu tanımlar: bir ve beş saniye testi, gözü kısma, logoyu kapatma, kenar hizaları, boşluk ve çerçeve, tipografi, renk, görseller, tekdüzelik, telefon, doluluk, içerik, çakışmalar ve rakip testi. Sonra Awwwards jürisi gibi puanlar: tasarım %40, kullanılabilirlik %30, yaratıcılık %20, içerik %10. Bazı hatalar puana tavan koyar. Eleştiri sabit bir formatta yazılır, düzeltme sırası fikirden başlar, hareket en sona kalır. En fazla üç tur yapılır.

## Ne zaman işine yarar
- Sayfa testleri geçiyor ama gerçekten iyi olup olmadığından emin değilsen
- Tasarımı karşılaştırılabilir bir puanla değerlendirmek istediğinde
- Hangi sorunu önce düzelteceğini bilmek için
- Turlar arasında ilerlemeyi takip etmek için

## Örnek
```
Yaptığın ana sayfanın ekran görüntülerine bak, dürüstçe puanla ve en büyük üç sorunu düzelt
```

## İlgili konular
- `tells`: Puana tavan koyan şablon izlerini listeler.
- `layout`: Kenar, boşluk ve çerçeve turlarının kurallarını verir.
- `motion`: Düzeltme sırasında en sona bırakılır.
