---
skill: tech-debt-tracker
title: Teknik borç tarama ve önceliklendirme
source: skills/tech-debt-tracker/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Kod tabanındaki teknik borcu bulur, ciddiyetini puanlar, zaman içindeki eğilimini izler ve önceliklendirilmiş bir temizlik planı çıkarır. Borcu yalnızca dağınık kod olarak değil, mimari kısayollar, eksik testler, eskimiş bağımlılıklar ve dokümantasyon boşlukları olarak da ele alır. Üç araç zincir halinde çalışır. `debt_scanner.py` kod tabanını tarayıp bir borç envanteri üretir. `debt_prioritizer.py` bu envanteri cost of delay, WSJF veya RICE çerçevesiyle sıralar, ekip büyüklüğü ve sprint kapasitesine göre sprint dağılımı önerir. `debt_dashboard.py` tarihli anlık görüntülerden aylık eğilimi ve yöneticilere uygun özetleri çıkarır. Bir temizlik sprintinden sonra tarama ve dashboard yeniden çalıştırılır; hedeflenen kategorilerdeki sayı düşmediyse borç ödenmemiş sayılır. Analizde boğulmamayı ve borç işini iş sonuçlarına bağlamayı önerir.

## Ne zaman kullanılır
- Teknik borcun nerede biriktiğini görmek istediğinde
- Refactor işlerini neye göre sıralayacağına karar verirken
- Bir temizlik sprinti planlarken veya sonucunu ölçerken
- Eski bir kod tabanını modernleştirmeyi planlarken

## Örnek
```
Bu depodaki teknik borcu tara ve 6 kişilik ekip için WSJF ile önceliklendirilmiş bir plan çıkar
```

## İlgili skill'ler
- `tc-tracker`: Borç kalemleri yerine tekil kod değişikliklerini izlemek için.
- `dependency-auditor`: Eskimiş bağımlılıklardan kaynaklanan borcu derinlemesine incelemek için.
- `performance-profiler`: Performansa dokunan borcun etkisini ölçmek için.
