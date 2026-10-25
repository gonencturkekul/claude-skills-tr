---
skill: pr-review-expert
title: Yapılandırılmış PR incelemesi
source: skills/pr-review-expert/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
GitHub PR'larını ve GitLab MR'larını sistemli biçimde inceler. Diff'i `gh` veya `glab` ile çeker, sonra adım adım ilerler: değişen dosyaları kimin import ettiğine bakarak etki alanını (blast radius) ölçer, diff üzerinde SQL injection, XSS, gömülü sır, zayıf hash ve auth atlatma kalıplarını arar, kaynak ve test dosyası oranından test kapsamı farkını çıkarır. API sözleşmesi, veritabanı şeması ve ortam değişkeni değişikliklerinde kırıcı değişiklikleri yakalar, N+1 sorgu ve ağır bağımlılık gibi performans risklerini işaretler. Bağlı Jira veya Linear kaydının varlığını da kontrol eder. Sonuç, 30'dan fazla maddelik kontrol listesine dayanan ve bulguları "mutlaka düzelt", "düzeltilmeli", "öneri" ve "iyi olanlar" diye ayıran bir rapordur.

## Ne zaman kullanılır
- Ortak kütüphane, API veya DB şemasına dokunan bir PR'ı merge etmeden önce
- 200 satırı aşan büyük bir PR yapılandırılmış inceleme gerektirdiğinde
- Auth, ödeme veya kişisel veri işleyen kod yollarında
- Yeni katkıcılara ayrıntılı geri bildirim vermek istediğinde

## Örnek
```
/engineering-advanced-skills:pr-review-expert 482 numaralı PR'ı incele, özellikle güvenlik ve kırıcı değişikliklere bak
```

## İlgili skill'ler
- `ship-gate`: PR değil, yayın öncesi tüm kod tabanını taramak için.
- `api-design-reviewer`: API sözleşmesi değişikliklerini daha derin incelemek için.
- `dependency-auditor`: PR'ın eklediği yeni bağımlılıkları denetlemek için.
