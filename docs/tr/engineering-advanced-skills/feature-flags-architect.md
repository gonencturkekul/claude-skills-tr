---
skill: feature-flags-architect
title: Feature flag yaşam döngüsü
source: skills/feature-flags-architect/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Feature flag'leri sıradan bir `if` olarak değil, talep, tasarım, yayın, kademeli açılış, temizlik ve arşiv adımlarından geçen bir yaşam döngüsü olarak ele alır. Flag'leri dört türe ayırır: release, experiment, operational ve permission. Her türün ömrü ve sahibi farklıdır. Üç Python betiği vardır: biri eski ve az kullanılan flag'leri bulup temizlik adayı olarak listeler, biri ring, linear, log ya da cohort stratejisiyle tarihli bir açılış planı ve iptal kriterleri üretir, üçüncüsü koddaki her flag'in dokümanda sahibi, türü ve kill switch tanımı olup olmadığını denetler. LaunchDarkly, GrowthBook, Statsig, Unleash, Flipt ve kendi çözümünü yazma seçeneklerini karşılaştırır.

## Ne zaman kullanılır
- Yeni bir özelliği flag arkasında yayınlayıp açılış planı istiyorsan
- Kod tabanında unutulmuş flag borcunu temizlemek için
- Riskli bir lansman öncesi kill switch tasarlarken
- Flag sağlayıcısı seçerken ya da bir özelliğin flag'e gerçekten ihtiyacı olup olmadığını tartarken

## Örnek
```
Yeni ödeme akışını flag arkasında 14 günde %100'e çıkaracak bir ring planı hazırla
```

## İlgili skill'ler
- `migration-architect`: Göç sırasında trafiği flag'lerle kademeli kaydırmak için.
- `observability-designer`: İptal kriterlerini izleyecek dashboard ve alarmlar için.
- `tech-debt-tracker`: Flag borcunu genel teknik borç takibine katmak için.
