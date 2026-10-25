---
skill: dependency-auditor
title: Bağımlılık ve lisans denetimi
source: skills/dependency-auditor/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Farklı dillerdeki projelerin üçüncü taraf bağımlılıklarını güvenlik açıkları, lisans çakışmaları ve güncelleme riskleri açısından denetler. Node, Python, Go, Rust, Ruby, Java, PHP ve .NET manifest ve lockfile'larını okur. Üç script var: biri bağımlılıkları dolaylı olanlarla birlikte çıkarıp bilinen açık kalıplarına göre tarar, biri lisansları sınıflandırıp örneğin izin verici bir projeye GPL bulaşması gibi çakışmaları bulur, biri de güncellemeleri riske göre sıralayan bir plan yazar. Önemli bir not: script'ler internete çıkmaz, içlerindeki açık listesi küçük bir ön kontrol katmanıdır. Güncel CVE kapsamı için `npm audit`, `pip-audit` ya da `cargo audit` ile birlikte kullanılmalı. Güncellemelerden sonra taramayı tekrar çalıştırıp yüksek önemde bulgu kalmadığını doğrulamadan denetim kapanmaz.

## Ne zaman kullanılır
- Yayın öncesi üçüncü taraf paketleri denetlerken
- Belirli bir CVE'nin projeyi etkileyip etkilemediğini araştırırken
- Büyük bir sürüm yükseltmesi planlarken
- Lisans uyumluluğu incelemesi yaparken

## Örnek
```
npm bağımlılıklarımızı denetle, GPL bulaşması var mı bak ve React 19'a geçiş planı çıkar
```

## İlgili skill'ler
- `ci-cd-pipeline-builder`: Taramayı her commit'te çalışan bir güvenlik kapısına çevirmek için.
- `ship-gate`: Bağımlılıkları da içeren kapsamlı bir yayın öncesi denetim için.
- `tech-debt-tracker`: Eskimiş bağımlılıkları teknik borç olarak takip etmek için.
