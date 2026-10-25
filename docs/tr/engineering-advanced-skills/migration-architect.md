---
skill: migration-architect
title: Kesintisiz göç planlama
source: skills/migration-architect/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Veritabanı, servis ve altyapı göçlerini işi en az etkileyecek şekilde planlar. Üç betikle zincir halinde çalışır: göç tanımından aşamalar, riskler ve tahmini süre içeren bir plan çıkarır, önceki ve sonraki şema ya da API'yi karşılaştırıp kırıcı değişiklikleri raporlar, plandaki her aşama için geri alma kılavuzu üretir. Uyumluluk kontrolü temiz geçmeden ya da kırıcı değişiklikler sahibi tarafından yazılı olarak kabul edilmeden ve her aşamanın geri alma planı yokken göçü onaylanmış saymaz. Expand-contract, dual write, CDC, strangler fig, paralel çalıştırma ve canary gibi desenleri, veri doğrulama ve uzlaştırma yöntemlerini, risk kategorilerini ve göç öncesi, sırası ve sonrası kontrol listelerini anlatır.

## Ne zaman kullanılır
- Veritabanı şeması ya da veri göçü planlarken
- Eski bir sistemi yenisiyle değiştirirken
- Buluttan buluta ya da yerinden buluta altyapı taşırken
- Açık bir geri alma yolu gerektiren riskli her geçişte

## Örnek
```
Kullanıcılar tablosunu yeni şemaya kesintisiz taşımak için aşamalı plan ve geri alma kılavuzu hazırla
```

## İlgili skill'ler
- `database-designer`: Hedef şemayı ve index'leri tasarlamak için.
- `feature-flags-architect`: Trafiği yeni sisteme kademeli kaydırmak için.
- `runbook-generator`: Göç gününün operasyon kılavuzunu yazmak için.
