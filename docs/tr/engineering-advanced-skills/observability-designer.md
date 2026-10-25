---
skill: observability-designer
title: Dashboard ve alarm tasarımı
source: skills/observability-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Metrik, log ve trace'i birlikte ele alan bir gözlemlenebilirlik stratejisi kurar. Asıl alanı iki iştir: dashboard üretmek ve gürültülü alarmları azaltmak. `dashboard_generator.py` servis türüne, kritikliğine ve kullanıcı rolüne göre Grafana uyumlu dashboard JSON'ı ve dokümanı üretir. `alert_optimizer.py` mevcut alarm tanımlarını gürültü, tekrar ve kapsama boşlukları için analiz eder, rapor gözden geçirildikten sonra iyileştirilmiş tanımı yazar. `slo_designer.py` sadece hızlı bir SLO iskeleti verir; ciddi SLO ve error budget işi için `slo-architect` skill'ine yönlendirir. Golden signals, RED ve USE yöntemleri, alarm yorgunluğunu önleme, trace örnekleme, log toplama ve gözlemlenebilirlik maliyetini düşürme konularını da özetler.

## Ne zaman kullanılır
- Yeni bir servise gözlemlenebilirlik eklerken
- Nöbetçiler sürekli anlamsız alarmlarla uyanıyorsa
- Bir servis için dashboard'u sıfırdan tasarlarken
- Production yükü artmadan önce izleme düzenini toparlamak istediğinde

## Örnek
```
payments API'si için Grafana dashboard'u üret ve alerts.json'daki gürültülü alarmları analiz et
```

## İlgili skill'ler
- `slo-architect`: SLO, error budget ve burn-rate alarmları için asıl skill.
- `runbook-generator`: Her alarm için müdahale kılavuzu yazmak için.
- `performance-profiler`: Dashboard'da görülen yavaşlığın kaynağını bulmak için.
