---
topic: running-code
title: Doğrudan Playwright kodu çalıştırmak
source: references/running-code.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Hazır komutların karşılamadığı durumlarda `run-code` ile serbest Playwright kodu çalıştırmayı anlatır. Kod, `page` nesnesini alan tek bir async fonksiyon olmalı. Komut satırında yazılabilir ya da `--filename` ile bir dosyadan okunabilir. `import`, `export` ve `require` desteklenmez. Kod tam bir Node.js ortamında değil, yalıtılmış bir bağlamda çalışır: `process` ve Node modülleri yok, ama zamanlayıcılar, `fetch`, `URL`, `Buffer` ve `crypto` gibi temel araçlar var.

Rehber hazır tarifler içerir: konum izni verip sahte bir konum ayarlamak, kamera ya da pano gibi izinleri tanımak, koyu tema ve azaltılmış hareket emülasyonu, bir öğenin kaybolmasını ya da bir koşulun gerçekleşmesini beklemek, iframe içinde çalışmak, dosya indirmek, panoyu okumak ve yazmak, sayfa başlığı ve görünüm alanı gibi bilgileri almak. Ayrıca hata yakalama, giriş yapıp oturumu dosyaya kaydetme ve birkaç sayfadan veri toplama gibi çok adımlı örnekler de var.

## Ne zaman işine yarar
- Bir izin, konum ya da medya ayarı gerektiren bir özelliği denerken
- Dosya indirme gibi tek komutla yapılamayan bir akışı yürütürken
- Birkaç sayfadan veri toplamak ya da sonucu tek seferde döndürmek istediğinde

## Örnek
```
Mağaza bulucu sayfasını konum Londra'daymış gibi aç ve en yakın şubeyi söyle
```

## İlgili konular
- `request-mocking`: Gelişmiş ağ taklidi de `run-code` üzerinden yapılır.
- `storage-state`: Çoklu çerez ve IndexedDB işlemleri için `run-code` örnekleri.
- `video-recording`: Açıklamalı tanıtım videoları `run-code` ile çalışan script'lerle kaydedilir.
