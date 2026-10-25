---
skill: slo-architect
title: SLO ve error budget tasarımı
source: skills/slo-architect/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Google SRE Workbook disiplinine göre anlamlı SLO'lar tanımlamana yardım eder: doğru SLI'yi seçmek, kullanıcının gerçekten önemsediği bir hedef koymak, error budget'ı hesaplamak, çok pencereli burn rate alarmları kurmak ve bütçe tükendiğinde ne olacağını yazılı bir politikaya bağlamak. Üç Python aracı vardır. `slo_designer.py` eksiksiz bir SLO tanımı üretir, zorunlu alan eksikse çalışmayı reddeder. `error_budget_calculator.py` izin verilen kesinti süresini, hızlı ve yavaş yanma eşiklerini ve PromQL biçiminde alarm kurallarını çıkarır. `slo_review.py` mevcut SLO dokümanlarında fazla yüksek veya düşük hedef, çok kısa veya uzun pencere, eksik SLI tanımı, bütçe politikası olmaması ve CPU'yu SLI olarak kullanmak gibi hataları yakalar. Hedefi son 30 günün ölçülen değerine göre seçmeyi önerir. Genel gözlemlenebilirlik veya yasal SLA yazımı için değildir.

## Ne zaman kullanılır
- Bir servis için yeni SLO tanımlarken
- Mevcut SLO'ları yaygın hatalara karşı gözden geçirirken
- Error budget ve burn rate alarm eşiklerini hesaplarken
- Üç aylık SLO incelemesi yaparken

## Örnek
```
checkout servisi için 30 günlük yüzde 99,9 SLO tanımla ve burn rate alarmlarını çıkar
```

## İlgili skill'ler
- `observability-designer`: Metrik, log ve trace stratejisinin geneli için.
- `feature-flags-architect`: Rollout'u burn rate eşiğine göre durdurmak için.
- `chaos-engineering`: Deney etki alanını aylık error budget'a göre sınırlamak için.
