---
command: distill
title: Tasarımı sadeleştirme
source: reference/distill.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Tasarımı özüne indirger ve yerini hak etmeyen her şeyi kaldırır. Önce karmaşanın kaynağını bulur: fazla eleman, gereksiz renk ve font çeşitliliği, bilgi yükü, dekoratif gürültü, belirsiz hiyerarşi. Sonra ekranın tek bir ana amacını belirleyip bilgi mimarisi, görsel stil, layout, etkileşim, metin ve kod seviyesinde sadeleştirme yapar. Kaldırılan özellikleri ve gerekçelerini de not eder.

## Ne zaman kullanılır
- Ekran kalabalık görünüyor ve neye bakılacağı belli değilse
- Birbiriyle yarışan çok sayıda buton veya seçenek varsa
- İç içe kartlar, gereksiz border ve gölgeler birikmişse
- Metinler uzun ve tekrarlı hale geldiyse

## Örnek
```
/impeccable distill ayarlar sayfası
```

## İlgili komutlar
- `quieter`: Fazla agresif ya da yorucu tasarımların tonunu düşürür.
- `layout`: Boşluk, gruplama ve görsel ritmi düzeltir.
- `polish`: Kesintiler bittiğinde son düzeltme turunu yapar.
