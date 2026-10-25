---
skill: pm-skills
title: Proje yönetimi yönlendiricisi ve teslimat döngüsü
source: skills/pm-skills/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Paketin giriş kapısı. İki işi var. Birincisi yönlendirme: isteğini bir script ile sınıflandırıp sekiz alt skill'den tam olarak birine gönderir ve sonucu kısa bir özetle getirir. Sinyal belirsizse tahmin etmek yerine tek bir netleştirme sorusu sorar, ikinci bir skill'e geçmeden önce onayını alır. İkincisi teslimat döngüsü: "sprint 14'ü doğrulanmış şekilde kapat" gibi bir hedefi gözlem, seçim, uygulama ve doğrulama adımlarına böler. Canlı Jira verisini MCP ile çekip WIP, çevrim süresi ve Monte Carlo tahmini gibi akış metriklerine dönüştürür. Kuralları sıkı: her görevin bir insan sahibi olur, kabul kriteri makineyle kontrol edilebilir olmalı, izin değişikliği ve silme gibi geri alınamaz işler onaysız yapılmaz, tahminler tek tarih değil güven aralığı olarak verilir. Görev başına en fazla üç deneme, hedef başına on iki tur sınırı var.

## Ne zaman kullanılır
- Sorunun hangi alanda olduğundan emin değilsen
- "Sprintlerimiz bir tuhaf" ya da "ne zaman biter" gibi genel bir soruyla başladığında
- Canlı Jira verisinden proje sağlığı raporu istediğinde
- Bir teslimat hedefini adım adım doğrulanarak yürütmek için

## Örnek
```
/pm-skills:pm-skills ekibimizin sprintleri sürekli kayıyor, nereden başlamalıyız?
```

## İlgili skill'ler
- `scrum-master`: Sprint ve akış metrikleri sorularının gittiği yer.
- `senior-pm`: Portföy sağlığı ve risk soruları için.
- `jira-expert`: Döngünün Jira verisini çektiği ve yapılandırma işlerinin gittiği yer.
