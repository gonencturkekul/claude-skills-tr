---
skill: writing-skills
title: Skill yazma
source: skills/writing-skills/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Yeni bir skill yazmayı ya da var olanı düzenlemeyi test güdümlü geliştirme gibi ele alır. Temel kural: önce başarısız bir test olmadan skill yazılmaz. Burada test, alt ajanlarla çalıştırılan baskı senaryolarıdır. Kırmızı aşamada senaryo skill olmadan çalıştırılır ve ajanın hangi kuralı nasıl çiğnediği, hangi bahaneleri kullandığı kelimesi kelimesine not edilir. Yeşil aşamada sadece bu davranışları hedefleyen en küçük skill yazılır ve senaryo tekrar çalıştırılır. Refactor aşamasında ajanın bulduğu yeni açıklar kapatılır. Hatanın türüne göre doğru biçimi seçmeyi öğretir: kuralı baskı altında çiğneyen ajana yasak ve bahane tablosu, çıktının şekli yanlışsa olumlu bir tarif işe yarar. Skill açıklamasının iş akışını özetlememesi, sadece ne zaman kullanılacağını söylemesi gerektiğini anlatır. Ayrıntılı bir oluşturma kontrol listesi içerir ve skill'lerin toplu olarak, test edilmeden yazılmamasını ister.

## Ne zaman kullanılır
- Yeni bir skill yazmak istediğinde
- Var olan bir skill'i düzenlerken
- Bir skill'in ajanlar üzerinde gerçekten işe yaradığını doğrulamak için
- Ajanların bir kuralı neden atladığını anlayıp kapatmak için

## Örnek
```
/superpowers:writing-skills ekibimizin migration kurallarını anlatan bir skill yazalım
```

## İlgili skill'ler
- `test-driven-development`: Bu skill'in temel aldığı kırmızı-yeşil-refactor döngüsü.
- `using-superpowers`: Skill'lerin nasıl bulunup çağrıldığını belirler.
- `dispatching-parallel-agents`: Senaryoları alt ajanlarla çalıştırırken işe yarar.
