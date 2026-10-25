---
skill: api-design-reviewer
title: REST API tasarım incelemesi
source: skills/api-design-reviewer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
REST API tasarımlarını OpenAPI ya da Swagger dosyası üzerinden inceler. Üç script çalıştırır. Linter isimlendirme, HTTP metodu kullanımı, URL yapısı, durum kodları, hata formatları ve eksik dokümantasyon gibi kural ihlallerini bulur. İkinci script iki spec sürümünü karşılaştırıp istemcileri bozacak değişiklikleri yakalar: silinen endpoint ya da alan, değişen tip, yeni zorunlu alan. Üçüncüsü tutarlılık, dokümantasyon, güvenlik, kullanılabilirlik ve performans başlıklarında A ile F arası bir not verir. İnceleme bu üç çıktıyla yapılır, sadece yorumla onay verilmez. Bunun yanında sürümleme stratejileri, sayfalama biçimleri, hata yanıtı yapısı, rate limit başlıkları, idempotency ve geriye uyumluluk için başvuru bilgisi de içerir. Araçlar CI'ya ya da pre-commit hook'una bağlanabilir.

## Ne zaman kullanılır
- Yeni endpoint ekleyen ya da değiştiren bir PR'ı incelerken
- Mevcut bir API'yi v2 geçişi öncesinde denetlerken
- Ekip için ortak API standartları belirlerken
- İki spec sürümü arasında kırıcı değişiklik olup olmadığını öğrenmek istediğinde

## Örnek
```
openapi.yaml dosyamı incele, kırıcı değişiklik var mı ve tasarım notu kaç çıkıyor söyle
```

## İlgili skill'ler
- `api-test-suite-builder`: İncelenen API için test paketi üretmek için.
- `pr-review-expert`: API dışındaki kod değişikliklerini de kapsayan PR incelemesi için.
- `changelog-generator`: Kırıcı değişiklikleri sürüm notlarına doğru şekilde yansıtmak için.
