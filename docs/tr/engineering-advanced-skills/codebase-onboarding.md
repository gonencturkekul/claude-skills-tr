---
skill: codebase-onboarding
title: Kod tabanı için onboarding dokümanı
source: skills/codebase-onboarding/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir kod tabanını analiz edip ekibe yeni katılan mühendisler, teknik liderler ya da dışarıdan çalışanlar için onboarding dokümanı hazırlar. Önce bir script repoyu tarar: dosya sayıları, kullanılan diller, yapılandırma dosyaları ve üst düzey klasör yapısı gibi gerçekleri çıkarır, istersen JSON olarak da verir. Bu bilgiler hazır bir onboarding şablonuna yerleştirilir. Dokümanın derinliği okuyucuya göre ayarlanır: yeni başlayan biri için kurulum ve dikkat edilecek noktalar, kıdemli biri için mimari ve operasyonel konular, dışarıdan çalışan biri için sorumluluk alanı ve entegrasyon sınırları. Kurulum komutlarının temiz bir ortamda gerçekten çalıştığını doğrulamayı, sorun giderme adımlarını eklemeyi ve önemli mimari kararların nedenini yazmayı önerir. Dokümanı davranış değişiklikleriyle aynı PR'da güncel tutmanı ister.

## Ne zaman kullanılır
- Ekibe yeni bir mühendis ya da dış kaynak katılırken
- Büyük bir refactor sonrasında eskimiş proje dokümanlarını yeniden yazarken
- Bir projeyi başka bir ekibe devrederken
- Tanımadığın bir repo hakkında teknik lider için özet hazırlarken

## Örnek
```
Bu repo için yeni gelen bir junior geliştiriciye yönelik onboarding dokümanı hazırla
```

## İlgili skill'ler
- `monorepo-navigator`: Repo bir monorepo ise paketler arası yapıyı anlamak için.
- `runbook-generator`: Operasyon ekibi için çalıştırma ve olay müdahale dokümanı gerekiyorsa.
- `tech-debt-tracker`: Yeni gelenlere teknik borcun nerede olduğunu göstermek için.
