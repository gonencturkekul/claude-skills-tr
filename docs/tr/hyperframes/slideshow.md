---
skill: slideshow
title: Canlı sunum için slayt destesi
source: skills/slideshow/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Render edilmiş bir video yerine canlı sunulacak bir slayt destesi kurar. Her slayt normal bir HyperFrames sahnesidir, hangi sahnelerin slayt olduğunu ve nasıl bağlandığını tek bir JSON bloğu tanımlar. Slaytlara adım adım açılan parçalar, yalnızca sunucunun gördüğü notlar ve tıklanınca yan bir slayt dizisine dallanan alanlar eklenebilir. Seyircinin okuması gereken metin 1920×1080'de en az 40 piksel olur. Var olan bir web sayfasını da desteye çevirebilir: görünüm, hareket ve etkileşimler korunur, kaydırmayla ilerleyen hareketler slayt geçişinde kamera hareketine dönüşür. Deste `hyperframes present` ile sunulur. Sunum modu, ileri geri, sayaç, tam ekran ve notlar hazır bileşenden gelir. Desteyi MP4'e render etmek yasak, çünkü yalnızca ilk sahne kalır.

## Ne zaman kullanılır
- Video yerine canlı sunacağın bir pitch deck ya da sunum istediğinde
- Sunucu notları ve adım adım açılan maddeler gerektiğinde
- Sorulara göre dallanan, etkileşimli bir sunum için
- Var olan bir sayfayı sunuma çevirmek istediğinde

## Örnek
```
Yatırımcı toplantısı için 8 slaytlık, sunucu notlu bir sunum hazırla
```

## İlgili skill'ler
- `hyperframes`: Slaytların da uyduğu sahne kuralları için.
- `hyperframes-cli`: `present`, `check` ve `snapshot` komutları için.
