---
topic: video-recording
title: Açıklamalı video kaydı
source: references/video-recording.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Tarayıcı oturumunu WebM video olarak kaydetmeyi anlatır. `video-start` kaydı başlatır, `video-chapter` bölüm geçişlerine başlık ve açıklama içeren bir kart ekler, `video-stop` kaydı bitirir. `--cursor` her işlem noktasına giden hareketli bir fare imleci çizer. `video-show-actions` ise her işleme bir başlık etiketi, tıklama noktasına bir işaret ve hedef öğenin çevresine bir çerçeve ekler. Hepsi düz CSS ile biçimlendirilir.

Kullanıcıya ya da iş kanıtı olarak gösterilecek videolar için önerilen yol bir "hero script" yazmak: senaryo önce komutlarla denenip locator'lar not edilir, sonra duraklamaları, doğal yazma hızını ve açıklamaları içeren bir script `run-code` ile çalıştırılır. Bu script'te `page.screencast` API'siyle bölüm kartları, sayfanın üstünde kalan HTML notları ve belirli öğeleri vurgulayan katmanlar eklenebilir. Bu katmanlar tıklamaları engellemez. Kaydı açıklayıcı bir dosya adıyla saklamak ve bitince pull request'e eklemek önerilir.

## Ne zaman işine yarar
- Yeni bir özelliğin kısa bir tanıtım videosunu hazırlarken
- Bir hatanın yeniden üretim adımlarını görsel olarak paylaşmak istediğinde
- Bir PR'da yapılan değişikliği yazıyla anlatmak yerine göstermek istediğinde

## Örnek
```
Yapılacaklar listesine öğe ekleme akışını bölüm kartlarıyla birlikte videoya kaydet
```

## İlgili konular
- `pr-attachments`: Kaydedilen videoyu pull request'e eklemek ve boyut sınırları.
- `running-code`: Hero script'lerin çalıştırıldığı `run-code` komutu.
- `tracing`: Görsel kayıt yerine ayrıntılı hata ayıklama izi gerektiğinde.
