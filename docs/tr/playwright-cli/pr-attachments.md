---
topic: pr-attachments
title: Pull request'e görsel kanıt eklemek
source: references/pr-attachments.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Ekran görüntülerinin ve videoların GitHub pull request'lerine ve issue'lara nasıl ekleneceğini anlatır. `gh` aracının 2.99 ve üstü sürümleri `pr create`, `pr comment`, `issue comment` gibi komutlarda tekrarlanabilir bir `--attach` bayrağı sunuyor. PNG, JPEG, GIF, WebP, SVG, MP4, MOV ve WebM kabul edildiği için playwright-cli'nin ürettiği dosyalar olduğu gibi eklenebilir. Görsellerde dosya yolundan sonra `#` ile alternatif metin yazılabilir. Gövdede `![alt](./dosya.png)` diye anılan dosya yerinde gösterilir, anılmayanlar sona eklenir.

Rehber ne zaman ek yapılacağını da söyler: bir arayüz düzeltmesi, önce ve sonra karşılaştırması, yeni bir kullanıcı akışı ya da hata durumu. Refactor ve sadece backend değişikliklerinde gerek yok. Sınırlar: görseller 10 MB, videolar ücretsiz planda 10 MB, ücretli planda 100 MB. Yükleme için repoya push yetkisi gerekiyor ve özellik yalnızca GitHub.com ile GitHub Enterprise Cloud'da var. CI'da başarısız testlerin ekran görüntülerini otomatik ekleyen bir iş akışı örneği de içerir.

## Ne zaman işine yarar
- Bir arayüz düzeltmesini inceleyenin repoyu çekmeden görmesini istediğinde
- Bir hata raporuna hatanın ekran görüntüsünü eklerken
- CI'da kırılan testlerin görsellerini PR'a yorum olarak bırakmak istediğinde

## Örnek
```
Ayarlar sayfasındaki düzeltmenin ekran görüntüsünü al ve 123 numaralı PR'a yorum olarak ekle
```

## İlgili konular
- `video-recording`: PR'a eklenecek kısa ve açıklamalı bir tanıtım videosu hazırlamak için.
- `playwright-tests`: CI'da ekran görüntüsü üreten testlerin nasıl çalıştığı.
