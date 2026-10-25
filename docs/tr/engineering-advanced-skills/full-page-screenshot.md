---
skill: full-page-screenshot
title: Tam sayfa ekran görüntüsü
source: skills/full-page-screenshot/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir web sayfasının kaydırma gerektiren kısımları dahil tamamını tek bir PNG olarak yakalar. Chrome DevTools Protocol üzerinden çalışır; Node.js 22 ve uzaktan hata ayıklaması açık bir Chrome dışında bağımlılık istemez. İki yolu vardır: zaten açık bir sekmeyi seçip yakalamak (giriş gerektiren sayfalar için önerilen yol) ya da bir URL'yi arka planda yeni sekmede açıp yakalamak. Tek sayfalık uygulamalardaki kaydırma kutularını genişletir, lazy-load görselleri tetiklemek için sayfayı aşağı kaydırır, DOM sabitlenene kadar bekler. 16.000 pikselden uzun sayfaları parçalar halinde çekip Python Pillow ile birleştirir. Genişlik, piksel yoğunluğu, bekleme süresi ve öncesinde enjekte edilecek CSS ayarlanabilir.

## Ne zaman kullanılır
- Uzun bir makalenin, dashboard'un ya da landing page'in tam görüntüsü lazımsa
- Normal ekran görüntüsü sayfanın sadece görünen kısmını alıyorsa
- Oturum açılmış bir sekmedeki içeriği olduğu gibi kaydetmek istiyorsan

## Örnek
```
https://example.com sayfasının 1440 genişlikte tam sayfa ekran görüntüsünü al
```

## İlgili skill'ler
- `browser-automation`: Tıklama, form doldurma gibi daha genel tarayıcı otomasyonu için.
- `performance-profiler`: Görsel yakalamayı performans analiziyle tamamlamak için.
