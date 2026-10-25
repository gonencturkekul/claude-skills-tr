---
skill: remotion-to-hyperframes
title: Başka araçlardan HyperFrames'e taşıma
source: skills/remotion-to-hyperframes/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Başka bir araçla yapılmış video kodunu ya da çıktısını HyperFrames'e taşır. Her parçayı desteklediği en üst seviyede alır. Yerel seviyede kod HTML ve GSAP'a çevrilir, her öğe düzenlenebilir kalır: Remotion'ın çoğu ve düz HTML/CSS animasyonları buraya girer. Barındırma seviyesinde canvas, p5.js, Three.js ya da Lottie kodu korunur ve zamanı HyperFrames yönetir. Medya seviyesinde Manim, After Effects veya Blender çıktısı video dosyası olarak klip yapılır. Remotion kaynağında önce çevrilemeyecek yapıları bulan bir kontrol script'i çalışır. Çeviriden sonra sonuç, orijinal videoyla belirli anlarda yan yana karşılaştırılır, istenirse kare başına benzerlik puanı da çıkarılır. Temiz çevrilemeyen detaylar `TRANSLATION_NOTES.md` dosyasına yazılır.

## Ne zaman kullanılır
- Remotion projeni HyperFrames'e geçirmek istediğinde
- Lottie, Three.js veya canvas animasyonunu bir videoda kullanacağında
- After Effects ya da Blender render'larını videoya yerleştirmek için
- Taşınan videonun orijinaliyle aynı göründüğünü kanıtlaman gerektiğinde

## Örnek
```
/hyperframes:remotion-to-hyperframes ./remotion-intro klasöründeki projeyi taşı ve orijinalle karşılaştır
```

## İlgili skill'ler
- `hyperframes`: Çevrilen kodun uyması gereken kurallar için.
- `hyperframes-registry`: Kaynaktaki bir efektin hazırı katalogda varsa onu kullanmak için.
