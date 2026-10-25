---
skill: hyperframes
title: HyperFrames ile video yapımı
source: skills/hyperframes/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Herhangi bir video işinde ilk okunan ana skill. Projenin yapısını anlatır: kök `index.html` videonun değişkenlerini tanımlar ve her sahneyi `compositions/` altındaki ayrı bir dosyadan bağlar, medya ve fontlar `assets/` içinde durur. Render'ın birebir tekrarlanabilmesi için kuralları sıralar: her zamanlı öğenin başlangıç ve süresi saniye cinsinden yazılır, rastgelelik ve saat kullanılmaz, her sahne duraklatılmış tek bir zaman çizelgesi kurar. Düzenlenebilirliği korumak için metin, marka renkleri ve değiştirilebilir medya değişken olarak tutulur. Çalışma döngüsü şöyle: 15 saniyeyi aşan bir film için önce üç farklı hikaye önerisi, sonra sayılarla yazılmış bir SPEC.md, son düzenlemeden sonra `check` ve ekran görüntüsüyle inceleme. Render, sen önizlemeyi onaylayınca alınır. Varsayılan video 1920×1080 ve 30 fps.

## Ne zaman kullanılır
- Tanıtım, açıklayıcı, müzik ya da veri videosu yapmak istediğinde
- Dikey sosyal medya klibi, altyazı ya da konuşan kişinin üstüne kart eklemek için
- Var olan bir HyperFrames projesinde değişiklik yapacağında
- Bir web sitesini videonun konusu yapmak istediğinde

## Örnek
```
Kahve dükkanım için 20 saniyelik, müzikli bir Instagram tanıtım videosu yap
```

## İlgili skill'ler
- `hyperframes-cli`: Kontrol, önizleme ve render komutlarının ayrıntısı için.
- `hyperframes-registry`: Bir efekti elle yazmadan önce hazırını aramak için.
- `media-use`: Müzik, seslendirme ve görsel gerektiğinde.
