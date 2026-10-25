---
skill: slides
title: Stratejik HTML sunumlar
source: .claude/skills/slides/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Pazarlama sunumları ve yatırımcı destesi gibi ikna amaçlı HTML sunumlar hazırlar. Grafikler Chart.js ile çizilir, renk ve fontlar tasarım token'larından gelir, yerleşimler farklı ekran boyutlarına uyum sağlar. Tek alt komutu `create`: konu ve slayt sayısını alıp sunumu kurar. Arkasında dört başvuru dosyası var: slayt yerleşim kalıpları, bir HTML şablonu, metin yazımı formülleri ve slaytın destedeki yerine göre strateji. Amaç, her slaytın destedeki rolüne göre kurulduğu ve metninin hazır yazım formüllerine dayandığı bir deste. Script yolları skill'in kendi klasörüne göre çözülür, script'ler ise projedeki marka kılavuzu ve token dosyalarını okuyup yazar.

## Ne zaman kullanılır
- Bir yatırımcı ya da satış sunumu hazırlarken
- Veriye dayalı, grafikli slaytlar gerektiğinde
- Slayt metinlerinin daha ikna edici olmasını istediğinde
- Sunumu tarayıcıda açılan tek bir HTML dosyası olarak istediğinde

## Örnek
```
/ui-ux-pro-max:slides create "B2B yazılım ürünü için yatırımcı sunumu" 10
```

## İlgili skill'ler
- `design-system`: Token'a bağlı slayt sisteminin ayrıntıları ve doğrulayıcı için.
- `brand`: Sunumda kullanılacak marka kılavuzu için.
- `design`: Sunuma logo ve kurumsal kimlik de eklenecekse.
