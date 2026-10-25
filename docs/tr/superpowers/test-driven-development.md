---
skill: test-driven-development
title: Test güdümlü geliştirme
source: skills/test-driven-development/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Her yeni özellik, hata düzeltmesi ve refactor için önce testi yazdırır. Temel kural: başarısız bir test olmadan üretim kodu yazılmaz. Döngü üç adımdan oluşur. Kırmızı aşamada tek bir davranışı anlatan, net isimli ve mümkünse mock kullanmayan küçük bir test yazılır ve testin gerçekten, özellik eksik olduğu için başarısız olduğu izlenir. Yeşil aşamada testi geçirecek en basit kod yazılır, fazladan seçenek ya da özellik eklenmez, ardından projenin tüm test paketi çalıştırılır. Refactor aşamasında testler yeşil kalırken tekrarlar temizlenir ve isimler iyileştirilir. Testten önce yazılmış kod varsa "referans" diye saklanmaz, silinip testten başlanır. Hemen geçen bir test, yanlış şeyi test ettiğinin işareti sayılır. Geçici prototipler, üretilmiş kod ve yapılandırma dosyaları için istisna ancak sana sorularak yapılır. "Sonra test ederim" gibi bahanelerin neden işe yaramadığını tek tek açıklar.

## Ne zaman kullanılır
- Yeni bir özellik ya da fonksiyon yazmaya başlarken
- Bir hatayı düzeltmeden önce onu yeniden üreten testi yazmak için
- Var olan kodu güvenle refactor etmek istediğinde
- Testleri olmayan eski bir kodu değiştirirken

## Örnek
```
/superpowers:test-driven-development başarısız istekleri üç kez yeniden deneyen bir yardımcı fonksiyon yaz
```

## İlgili skill'ler
- `systematic-debugging`: Hatanın kök nedenini bulup sonra testle sabitlemek için.
- `verification-before-completion`: Testlerin gerçekten geçtiğini göstermek için.
- `writing-skills`: Aynı döngüyü skill yazımına uygular.
