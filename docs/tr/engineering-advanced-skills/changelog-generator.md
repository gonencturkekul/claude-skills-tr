---
skill: changelog-generator
title: Commit'lerden sürüm notları
source: skills/changelog-generator/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Conventional Commits formatındaki commit mesajlarından tutarlı sürüm notları ve CHANGELOG.md girdileri üretir. Commit'leri ayrıştırma, sürüm numarası artışına karar verme ve notları yazma adımlarını birbirinden ayırır, böylece otomasyon yaparken metin üzerinde kontrolü kaybetmezsin. Kırıcı değişiklik major, yeni özellik minor, geri kalan her şey patch artışı demek. Bir script bir sonraki sürümü hesaplar, biri Keep a Changelog bölümleriyle notu yazar ya da dosyanın başına ekler, biri de commit mesajlarını denetleyip hatalı formatta PR'ı engeller. Monorepo'larda paket bazında filtreleme önerir. Bir sürüm ters gittiğinde ne yapılacağını da anlatır: hotfix'leri önem derecesine göre sınıflandırma ve hangi eşiklerde geri alınacağını önceden belirleme. Notlar yayınlanmadan önce bir insanın gözden geçirmesini ister.

## Ne zaman kullanılır
- Yeni bir sürüm etiketi atmadan önce
- Git geçmişinden CHANGELOG.md oluştururken
- Bir sonraki sürüm numarasının ne olması gerektiğini bilmediğinde
- CI'da sürüm notlarını otomatik üretmek ya da commit formatını zorunlu kılmak için
- Acil bir hotfix ya da geri alma süreci planlarken

## Örnek
```
v1.3.0'dan bu yana yapılan commit'lere bakıp sıradaki sürümü hesapla ve CHANGELOG.md'ye ekle
```

## İlgili skill'ler
- `ci-cd-pipeline-builder`: Commit denetimini ve not üretimini pipeline'a bağlamak için.
- `api-design-reviewer`: API'deki kırıcı değişiklikleri sürüm notundan önce tespit etmek için.
- `feature-flags-architect`: Geri alma yerine bir özelliği bayrakla kapatmak için.
