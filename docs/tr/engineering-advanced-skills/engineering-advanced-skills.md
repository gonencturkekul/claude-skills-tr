---
skill: engineering-advanced-skills
title: Paketin içindekiler rehberi
source: skills/engineering-advanced-skills/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Paketteki ileri seviye mühendislik skill'lerinin dizinidir. Kendi başına bir iş yapmaz; hangi skill'in hangi konuya baktığını tek tabloda gösterir ve doğru olanı seçmene yardım eder. Konular geniş: agent ve iş akışı tasarımı, RAG, MCP sunucuları, CI/CD, veritabanı tasarımı, gözlemlenebilirlik, güvenlik taramaları, changelog ve sürüm yönetimi, SLO, chaos testleri, feature flag'ler, Kubernetes operator'leri ve platform operasyonları. Temel kuralı basit: sadece ihtiyacın olan skill'in dosyasını yükle, hepsini birden açma. Sürüm yönetiminin ayrı bir skill olmadığını, `changelog-generator` içine taşındığını da not düşer. Dizindeki tablo 37 skill sayar; pakette bunun dışında birkaç yeni skill daha bulunur.

## Ne zaman kullanılır
- Paketi yeni kurduysan ve neler olduğunu görmek istiyorsan
- Bir iş için hangi skill'i çağıracağından emin değilsen
- Birbirine yakın iki skill arasında (örneğin gözlemlenebilirlik ile SLO) seçim yapman gerekiyorsa
- Ekibine paketi kısaca tanıtacaksan

## Örnek
```
/engineering-advanced-skills:engineering-advanced-skills prod'daki yavaş bir endpoint için hangi skill'i kullanmalıyım?
```

## İlgili skill'ler
- `performance-profiler`: Yavaşlık ve bellek sorunları için doğrudan başlanacak yer.
- `observability-designer`: Dashboard ve alarm gürültüsü için.
- `slo-architect`: SLO ve error budget hesapları için asıl skill.
