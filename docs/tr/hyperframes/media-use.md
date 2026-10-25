---
skill: media-use
title: Video için medya bulma ve üretme
source: skills/media-use/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Videonun ihtiyaç duyduğu her türlü medyayı tek bir `media-use resolve` komutuyla bulur ya da üretir ve projenin `assets/` klasörüne kayıt altında yerel dosya olarak koyar. İki yol sunar. HeyGen yolu en iyi kaliteyi verir: geniş müzik kataloğu, görsel ve ikon araması, ses klonlama ve konuşan avatar videosu. Bunun için `heygen` CLI'ı kurup giriş yapman gerekir. Ücretsiz yol hesap istemez: ses efektleri için Openverse ve paketle gelen offline sesler, logolar için theSVG ya da favicon, seslendirme için cihazda çalışan Kokoro, yazıya dökme ve arka plan temizleme için yerel araçlar. Karanlık, soluk ya da donuk görünen görüntüler için renk düzeltme ve stil uygulamayı da üstlenir. Kendi seçtiği ücretli bir işlemden önce onay ister. Eksik müzik ya da seslendirme gibi boşlukları bir kez önerir, kendiliğinden eklemez.

## Ne zaman kullanılır
- Videoya müzik, ses efekti ya da seslendirme eklemek istediğinde
- Konuşan bir sunucu veya avatar gerektiğinde
- Logo, ikon ya da görsel ararken
- Çekim çok karanlık veya soluk duruyorsa, ya da bir yüzü gizlemen gerekiyorsa

## Örnek
```
Videoya sakin bir arka plan müziği ve seslendirme ekle, ücretli bir şey kullanma
```

## İlgili skill'ler
- `hyperframes`: Medyanın yerleştiği sahne ve ses kuralları için.
- `hyperframes-cli`: `tts`, `transcribe` ve `media-treatment` komutları için.
