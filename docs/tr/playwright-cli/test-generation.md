---
topic: test-generation
title: Test planlamak, üretmek ve onarmak
source: references/test-generation.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Playwright testlerini yazmak ve bakımını yapmak için üç aşamalı bir akış anlatır. Temeli şu: playwright-cli ile yapılan her işlem karşılık gelen Playwright TypeScript kodunu yazdırır, testler bu koddan derlenir. Üretilen kod işlemleri yakalar ama doğrulamaları yakalamaz, onlar `toBeVisible` ya da `toHaveText` gibi eşleştiricilerle elle eklenir. `generate-locator` bunun için kalıcı bir locator verir.

**Planla:** Önce projede Playwright kurulu mu bakılır, sonra her senaryonun başladığı durumu kuran bir seed testi hazırlanır. Uygulama bu test üzerinden açılıp keşfedilir ve senaryolar adım ve beklenti listeleriyle `specs/` altında bir plan dosyasına yazılır.

**Üret:** Her senaryo sırayla canlı uygulamada yürütülür, plan belirsiz ya da eskiyse güncellenir ve her senaryo için ayrı bir test dosyası yazılır.

**Onar:** Kırılan testler tek tek debug modunda açılır, neden bulunur, düzeltme yapılır. Uygulamadaki değişikliğin bilinçli mi yoksa bir hata mı olduğu belli değilse Claude durup sana sorar. Bekleme süresi eklemek düzeltme sayılmaz.

## Ne zaman işine yarar
- Sıfırdan bir özellik için uçtan uca test seti kurmak istediğinde
- Elindeki bir test planını gerçek test dosyalarına çevirmek istediğinde
- Arayüz değiştiği için kırılan testleri toplu olarak onarırken

## Örnek
```
Sepet özelliği için bir test planı çıkar, sonra planı Playwright testlerine dönüştür
```

## İlgili konular
- `playwright-tests`: Debug modunda çalıştırma ve `attach` ayrıntıları.
- `element-attributes`: Doğrulamalar için öğelerden değer okumak.
- `request-mocking`: Keşif ve üretim sırasında istekleri taklit etmek.
