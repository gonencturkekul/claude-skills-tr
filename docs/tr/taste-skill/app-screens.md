---
topic: app-screens
title: Uygulama ekranı kuralları
source: references/app-screens.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Dashboard, admin, analitik, ayarlar, gelen kutusu ve cüzdan gibi içinde çalışılan ekranlar için ayrı bir akış anlatır; sayfa akışı burada geçerli değildir. 23 gerçek ürün ekranının ölçümlerinden çıkar. Önce veriyi ve işleri envanterler, ekranın tek sorusunu ve en önemli bulgusunu yazarsın, sonra `draw.mjs --app` ile yedi stilden birini seçersin. Renk chrome'a değil veriye gider, KPI'lar ikonlu kart değil tipografidir, tablolar zebra yerine çizgi ve hizayla kurulur. Toplamlar satırlardan hesaplanır, sıfır sıfır olarak yazılır. Boş, yükleme ve hata durumları ile telefon görünümü de burada. Son kontrolü `lint.mjs --app` ve `inspect.mjs --app` yapar.

## Ne zaman işine yarar
- Şablon gibi duran bir dashboard'u ürüne ait hale getirmek istiyorsan
- Grafik, KPI ve tablo için ölçülü varsayılanlar arıyorsan
- Rakamların birbiriyle tutmasını ve ızgaranın kenarlara oturmasını istiyorsan
- Ekranın telefonda da düzgün katlanmasını istiyorsan

## Örnek
```
Fırın zincirim için günlük satış dashboard'u yap, üç şubenin cirosu ve tükenen ürünler görünsün
```

## İlgili konular
- `colour`: Renk tokenlarının genel mantığı için.
- `type`: Yazı karakteri seçimi ve ölçek için.
- `tells`: Üretilmiş arayüzlerin tipik izlerini tanımak için.
