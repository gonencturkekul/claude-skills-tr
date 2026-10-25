---
skill: figma
title: Figma'dan videoya
source: skills/figma/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Figma'daki tasarımı HyperFrames videosuna taşır. Logo ve görselleri SVG ya da PNG olarak dışa aktarır, marka renk ve tipografisini token olarak alır, bir frame'i tam geometrisiyle düzenlenebilir HTML bileşenine çevirir. Her şey derleme sırasında yerel dosyaya dondurulur, render sırasında Figma'ya hiç bağlanılmaz. Bunun için `FIGMA_TOKEN` ortam değişkeni gerekir. Token'ı Figma ayarlarından salt okunur izinlerle sen oluşturursun, sohbete yapıştırman istenmez. Hareket ve shader verisi için bir Figma connector'ı ya da senin vereceğin bir dışa aktarım gerekir. Storyboard'larda frame'leri art arda gösterilen slaytlar gibi değil, aynı öğenin zaman içindeki halleri olarak okur ve öğeyi bu haller arasında canlandırır. Hareket çevirisini Figma'nın kendi dışa aktardığı videoyla karşılaştırarak doğrular.

## Ne zaman kullanılır
- Sohbete bir figma.com linki yapıştırdığında
- Videoda Figma'daki logoyu, marka renklerini ya da bir bileşeni kullanmak istediğinde
- Figma'da hazırlanmış bir storyboard'u hareketli videoya çevirmek için
- Figma'daki bir animasyonu videoda aynen yeniden üretmek istediğinde

## Örnek
```
Şu Figma storyboard'unu 15 saniyelik bir ürün animasyonuna çevir: https://www.figma.com/design/...
```

## İlgili skill'ler
- `hyperframes`: İçe aktarılan parçaların yerleştiği proje yapısı için.
- `media-use`: Figma'dan alınan logoyu sonra tekrar bulmak için.
