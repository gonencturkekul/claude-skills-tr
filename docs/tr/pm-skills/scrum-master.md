---
skill: scrum-master
title: Veriye dayalı Scrum Master
source: skills/scrum-master/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Sprint verisini sayılarla analiz edip ekibe koçluk yapmana yardım eder. Üç Python script'i var. Hız analizcisi, sprint geçmişinden trend ve değişkenlik çıkarır, Monte Carlo ile önümüzdeki altı sprint için yüzde 50, 70, 85 ve 95 güven aralıklarında tahmin üretir. Sağlık puanlayıcısı ekibi taahhüt güvenilirliği, kapsam istikrarı, engel çözüm süresi ve tören katılımı gibi altı ağırlıklı boyutta 0 ile 100 arasında puanlar. Retro analizcisi aksiyon maddelerinin ne kadarının yapıldığını, tekrar eden temaları ve ekibin olgunluk aşamasını izler. Planlamada yüzde 70 güven aralığını taahhüt tavanı olarak önerir, aksiyon tamamlama oranı düşükse yeni aksiyon sayısını üçle sınırlamayı söyler. Hız analizi için en az üç sprint ister, daha az veriyle tek rakam yerine aralık verir.

## Ne zaman kullanılır
- Sprint planlamasında ne kadar iş alınacağına karar verirken
- Retrodan önce ekibin durumunu verilerle görmek için
- Paydaşlara "ne zaman biter" sorusuna aralıklı bir cevap vermen gerektiğinde
- Ekip sağlığının zaman içinde iyileşip iyileşmediğini izlemek için

## Örnek
```
/pm-skills:scrum-master sprint_data.json dosyasındaki son 6 sprinte göre gelecek sprint için kaç puan almalıyız?
```

## İlgili skill'ler
- `senior-pm`: Portföy bağlamı sprint önceliklerini etkilediğinde.
- `jira-expert`: Sprint verisini Jira'dan çıkarmak ve pano kurmak için.
- `meeting-analyzer`: Retro toplantılarının kalitesini incelemek için.
