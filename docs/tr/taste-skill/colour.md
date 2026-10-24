---
topic: colour
title: Renk kullanımı
source: references/colour.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Direction sheet'in verdiği paleti sayfaya nasıl uygulayacağını anlatır, amaç rastgele boyanmış değil bilinçli seçilmiş bir görünüm. Renkleri `--bg`, `--surface`, `--ink`, `--muted` ve `--accent` gibi rollere bağlar, bileşen içinde ham hex kullanmamanı ister. Oranları verir: zemin sayfanın %70-90'ı, vurgu rengi herhangi bir ekranın %5'inden azı; vurgu sadece ana aksiyonu ve en fazla bir şeyi daha işaretler. Çizgi ve gölge yasak olduğu için yüzeyler zeminden sadece ton farkıyla ayrılır. Bölüm bölüm değişen renk alanlarını, koyu sayfaları, fotoğraf üstündeki metni ve kontrast eşiklerini ele alır. Krem zemin ile terracotta vurgu ve mor ile indigo yasaklı ailelerdir, sıcaklık başka yollardan verilir.

## Ne zaman işine yarar
- Paletin var ama sayfa dağınık ve "boyanmış" görünüyorsa
- Vurgu rengini nerede kullanacağına karar veremediğinde
- Koyu temalı bir sayfa kurarken
- Sıcak bir his istiyorsan ama bej ve terracotta klişesine düşmek istemiyorsan

## Örnek
```
Butik otelimin sitesi için sıcak ama klişe olmayan renkler kullan, bir bölüm de koyu olsun
```

## İlgili konular
- `imagery`: Rengi fotoğraflar taşıdığında görsellerin nasıl seçileceğini anlatır.
- `tells`: Yasaklı renk ailelerini diğer şablon izleriyle birlikte listeler.
- `layout`: Bölümlerin zemin rengiyle ayrılmasını düzen tarafında ele alır.
