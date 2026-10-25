---
skill: ci-cd-pipeline-builder
title: CI/CD pipeline oluşturma
source: skills/ci-cd-pipeline-builder/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Projenin dosyalarına bakarak kullandığı dili, çalışma ortamını ve araçları tespit eder, buna uygun bir CI/CD pipeline'ı üretir. Tahmin yerine repodaki gerçek sinyallere dayanır: lockfile'lar ve tanımlı build komutları pipeline'ın temelini oluşturur. İki script var. İlki stack'i tespit edip metin ya da JSON olarak raporlar, ikincisi bu sonuçtan GitHub Actions ya da GitLab CI için başlangıç YAML'ı yazar. Önerilen aşamalar lint, test, build ve deploy; tespit edilen stack'e göre önbellek ve matrix stratejisi de eklenir. Dağıtımı kademeli eklemeyi önerir: önce sadece CI, sonra açık ortam bilgisiyle staging, en son elle onay gerektiren production. Merge öncesinde komutların projede gerçekten var olduğunu, gizli değişkenlerin belgelendiğini ve deploy işlerinin korumalı dallara bağlı olduğunu kontrol etmeni ister.

## Ne zaman kullanılır
- Yeni bir repo için CI kurarken
- Başka projeden kopyalanmış, kırılgan pipeline dosyalarını değiştirirken
- GitHub Actions ile GitLab CI arasında geçiş yaparken
- Pipeline adımlarının projenin gerçek stack'iyle uyuşup uyuşmadığını denetlerken

## Örnek
```
Bu repoyu incele ve lint, test, build aşamaları olan bir GitHub Actions workflow'u oluştur
```

## İlgili skill'ler
- `changelog-generator`: Commit denetimini ve sürüm notlarını pipeline'a eklemek için.
- `dependency-auditor`: Pipeline'a bağımlılık güvenlik kapısı koymak için.
- `ship-gate`: Production'a çıkmadan önce kapsamlı bir hazırlık denetimi için.
