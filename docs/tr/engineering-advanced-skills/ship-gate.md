---
skill: ship-gate
title: Yayın öncesi kontrol kapısı
source: skills/ship-gate/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Kod tabanını üretime çıkmadan önce sekiz kategoride tarar: güvenlik, veritabanı, kod kalitesi, bağımlılıklar, AI/LLM güvenliği, deployment, frontend ve gözlemlenebilirlik. Önce framework, veritabanı, deploy hedefi, auth ve LLM sağlayıcısını dosyalardan tespit eder, ilgisiz kontrolleri atlar. Her kontrolü geçti, kaldı veya uygulanamaz diye raporlar, bulunan sorunları dosya yolu ve satır numarasıyla verir. Otomatik taranamayan maddeleri (yedekten geri dönüş denendi mi, geri alma planı var mı) sana tek tek onaylatır. Sonuçlar kritik, yüksek ve tavsiye diye ayrılır, karar da "yayınlama", "dikkatle yayınla" veya "yayına hazır" olur. "Deploy et" veya "canlıya al" dediğinde hemen deploy etmek yerine önce taramayı önerir. Sadece denetler, düzeltmez; CI/CD kurulumu ve altyapı hazırlığı kapsamı dışındadır.

## Ne zaman kullanılır
- "Yayına hazır mıyım?" sorusuna somut bir cevap istediğinde
- İlk lansmandan önce kapsamlı bir kontrol listesi gerektiğinde
- Kod değiştikten sonra son taramanın üzerinden zaman geçtiyse

## Örnek
```
Canlıya almadan önce ship gate çalıştır, kritik bir şey var mı bak
```

## İlgili skill'ler
- `pr-review-expert`: Tek bir değişikliği merge öncesi incelemek için.
- `dependency-auditor`: Bağımlılık bulgularını derinlemesine incelemek için.
- `focused-fix`: Çıkan kritik bulguları düzeltmek için.
