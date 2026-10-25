---
topic: tracing
title: Çalışma izi kaydetmek
source: references/tracing.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Hata ayıklama ve analiz için ayrıntılı çalışma izi (trace) kaydetmeyi anlatır. `tracing-start` ile kayıt başlar, işlemler yapılır, `tracing-stop` ile biter. Çıktı `.playwright-cli/traces/` klasörüne yazılır: ana iz dosyası her işlemi, işlemlerden önceki ve sonraki DOM görüntülerini, ekran görüntülerini, zamanlamayı ve konsol mesajlarını tutar. Ayrı bir ağ dosyası tüm istek ve yanıtları başlıkları, gövdeleri ve zamanlamalarıyla saklar. Bir de sayfayı yeniden kurmak için gereken görsel, font ve script'lerin durduğu bir kaynak klasörü oluşur.

Rehber izin videoyla ve ekran görüntüsüyle farkını da tablolaştırır: DOM incelemesi ve ağ ayrıntısı yalnızca izde var, bu yüzden iz hata ayıklamaya, video tanıtıma, ekran görüntüsü hızlı bir kayda uygun. Öneriler: kaydı sorunlu adımdan değil akışın başından başlat, eski izleri düzenli temizle. Sınırlamalar: kayıt işlemleri biraz yavaşlatır, büyük izler disk doldurur ve bazı dinamik içerikler birebir yeniden oynatılamayabilir.

## Ne zaman işine yarar
- Bir tıklamanın neden başarısız olduğunu o anki DOM'a bakarak anlamak istediğinde
- Yavaş bir sayfada hangi kaynağın beklettiğini görmek için
- Bir kullanıcı akışının adım adım kanıtını saklamak istediğinde

## Örnek
```
Ödeme akışını trace kaydıyla baştan sona çalıştır, sonra hangi istek hata verdi söyle
```

## İlgili konular
- `video-recording`: Görsel bir kayıt gerektiğinde izin yerine video.
- `playwright-tests`: Kırılan bir testte canlı hata ayıklama.
