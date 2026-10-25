---
skill: browser-automation
title: Playwright ile tarayıcı otomasyonu
source: skills/browser-automation/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Playwright ile veri çekme, form doldurma, ekran görüntüsü ya da PDF alma gibi tarayıcı işlerini otomatikleştirir. Seçicileri güvenilirlik sırasına koyar: önce data attribute'ları, en son sıra numarasına dayalı seçiciler. Sayfalama, sonsuz kaydırma, çok adımlı formlar, dosya yükleme, tabloları JSON'a çevirme ve iç içe veri çıkarma için kalıplar verir. Oturum açtıktan sonra cookie ve storage durumunu kaydedip tekrar kullanmayı, SPA'larda sayfa yüklenmesini değil içeriği beklemeyi, hatalarda üstel geri çekilmeyle yeniden denemeyi anlatır. Otomasyonun tespit edilmesini azaltan ayarları da içerir. Üç script iskelet bir scraping script'i, alan listesinden form doldurma script'i ve mevcut bir script için tespit riski raporu üretir. Sabit beklemeler, robots.txt'yi yok saymak ve parolayı koda yazmak açıkça kötü örnek olarak geçer.

## Ne zaman kullanılır
- Bir siteden liste, tablo ya da arama sonucu gibi yapılandırılmış veri çekerken
- Giriş yapıp form doldurup rapor indiren bir akışı otomatikleştirirken
- JavaScript ağırlıklı sayfalardan veri alırken
- Test yazmak için değil: E2E testler bu skill'in kapsamı dışında

## Örnek
```
Bu ilan sitesindeki tüm sayfaları gez, başlık, fiyat ve linki JSON olarak kaydeden bir Playwright script'i yaz
```

## İlgili skill'ler
- `full-page-screenshot`: Sadece bir sayfanın tam boy ekran görüntüsü gerekiyorsa.
- `api-test-suite-builder`: Sitenin bir API'si varsa sayfayı kazımak yerine doğrudan API'yi kullanmak için.
- `env-secrets-manager`: Otomasyonda kullanılan giriş bilgilerini güvenle saklamak için.
