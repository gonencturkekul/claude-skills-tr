---
skill: spec-driven-workflow
title: Önce spesifikasyon, sonra kod
source: skills/spec-driven-workflow/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Tek bir kuralı uygular: onaylanmış bir spesifikasyon olmadan kod yazılmaz. Spec dokuz zorunlu bölümden oluşur: bağlam, numaralı fonksiyonel ve fonksiyonel olmayan gereksinimler, Given/When/Then biçiminde kabul kriterleri, uç durumlar, API sözleşmeleri, veri modelleri ve kapsam dışı maddeler. Gereksinimler MUST, SHOULD, MAY gibi RFC 2119 kelimeleriyle yazılır ve her kabul kriteri bir gereksinime bağlanır. Akış altı aşamadır: gereksinimleri topla, spec'i yaz, `spec_validator.py` ile doğrula, `test_extractor.py` ile kabul kriterlerinden başarısız test iskeletleri çıkar, testleri tek tek geçirerek uygula, sonunda öz inceleme listesini tamamla. Kapsam kayması, belirsizlik, kırıcı değişiklik veya güvenlik etkisi gibi durumlarda durup seçenekler ve bir öneriyle soru sorulmasını ister. Spec'te olmayan hiçbir şey kodlanmaz.

## Ne zaman kullanılır
- Bir özelliği koda geçmeden önce planlamak istediğinde
- Ölçülebilir kabul kriterleri yazman gerektiğinde
- Spesifikasyondan test üretmek istediğinde
- Uygulama sırasında kapsamın kaymasını engellemek için

## Örnek
```
Şifre sıfırlama özelliği için önce bir spec yaz, kabul kriterlerinden pytest testlerini çıkar
```

## İlgili skill'ler
- `focused-fix`: Spec'e göre yazılmış bir özellikte sistematik sorunları onarmak için.
- `rag-architect`: Özellik retrieval içeriyorsa teknik tasarımı spec içinde yapmak için.
- `api-design-reviewer`: Spec'teki API sözleşmelerini gözden geçirmek için.
