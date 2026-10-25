---
skill: api-test-suite-builder
title: API test paketi üretimi
source: skills/api-test-suite-builder/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Kod tabanındaki API route'larını tarar ve bunlar için çalışmaya hazır test dosyaları yazar. Next.js App Router, Express, FastAPI ve Django REST Framework'te route'ları bulmak için komutlar içerir. Node projeleri için Vitest ile Supertest, Python projeleri için Pytest ile httpx kullanır. Sadece mutlu yolu test etmez: kimlik doğrulamada eksik, geçersiz ve süresi dolmuş token ile yanlış rol durumlarını, gövdeli isteklerde boş gövde, eksik alan, yanlış tip, sınır değerleri ve SQL injection ya da XSS denemelerini ayrı ayrı kapsar. Sayfalama, dosya yükleme ve rate limit testleri de üretir. Testlere açıklayıcı isimler verir, sabit ID yerine fixture kullanır, sadece durum kodunu değil yanıtın şeklini de kontrol eder ve parola gibi hassas alanların yanıtta görünmediğini doğrular.

## Ne zaman kullanılır
- Yeni bir API için, uygulamadan önce test iskeleti istediğinde
- Hiç testi olmayan eski bir API'ye temel kapsam eklerken
- Yayın öncesi her route'un en azından bir duman testi olduğundan emin olmak için
- Güvenlik denetimine hazırlanırken kötü niyetli girdi testleri üretmek için

## Örnek
```
app/api altındaki tüm route'lar için Vitest ve Supertest ile auth ve validasyon testleri yaz
```

## İlgili skill'ler
- `api-design-reviewer`: Testlerden önce API tasarımının kendisini incelemek için.
- `spec-driven-workflow`: Testleri bir spesifikasyondan türetmek istediğinde.
- `ci-cd-pipeline-builder`: Üretilen testleri her PR'da çalıştırmak için.
