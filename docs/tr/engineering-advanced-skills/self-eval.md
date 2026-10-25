---
skill: self-eval
title: Dürüst iş değerlendirmesi
source: skills/self-eval/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir oturumda yapılan işi şişirmeden puanlar. Yapay zekanın her şeye 5 üzerinden 4 verme eğilimini kırmak için iki ayrı eksen kullanır: görevin iddiası (düşük, orta, yüksek) ve uygulamanın kalitesi (zayıf, yeterli, güçlü). Nihai puanı bu iki eksenden sabit bir matris belirler, model sayıyı doğrudan seçemez. Düşük iddialı iş en fazla 2 alır, 5 için hem yüksek iddia hem güçlü uygulama gerekir. Puanı yazmadan önce hem daha düşük hem daha yüksek puan için gerekçe yazmak ve ikisini uzlaştırmak zorunludur. Her sonuç çalışma klasöründeki `.self-eval-scores.jsonl` dosyasına eklenir. Son beş puanın dördü aynıysa puanların tek bir değere yığıldığı konusunda uyarır. Argüman vermezsen konuşma geçmişinden ne yapıldığını kendisi çıkarır.

## Ne zaman kullanılır
- Bir görevi, refactor'ü veya oturumu bitirdikten sonra
- Yapılan işin gerçekten ne kadar iyi olduğunu tarafsız görmek istediğinde
- Oturumlar boyunca puanların şişip şişmediğini takip etmek için

## Örnek
```
/engineering-advanced-skills:self-eval az önce bitirdiğimiz kimlik doğrulama refactor'ü
```

## İlgili skill'ler
- `skill-tester`: İş yerine bir skill'in kalitesini puanlamak için.
- `pr-review-expert`: Yapılan değişikliği ayrıca kod incelemesinden geçirmek için.
- `tc-tracker`: Değerlendirilen işi bir değişiklik kaydına bağlamak için.
