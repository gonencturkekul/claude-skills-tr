---
skill: focused-fix
title: Bozuk bir özelliği baştan sona onarma
source: skills/focused-fix/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Tek bir hatayı değil, komple çalışmayan bir özelliği ya da modülü onarmak için sıkı bir beş aşamalı süreç uygular. Önce özelliğin sınırını çizer ve klasördeki her dosyayı okur. Sonra içeri ve dışarı giden bütün bağımlılıkları çıkarır: import'lar, ortam değişkenleri, config dosyaları, veritabanı modelleri, özelliği kullanan diğer dosyalar. Üçüncü aşamada kod, çalışma zamanı, testler, loglar ve konfigürasyonu tarar, her sorunun kök nedenini kanıtla doğrular ve risk etiketi koyar. Bu üç aşama bitmeden düzeltme önermez. Düzeltmeleri sırayla yapar: bağımlılıklar, tipler, iş mantığı, testler, entegrasyon. Üç düzeltme art arda yeni sorun doğurursa durur ve mimariyi seninle tartışmayı önerir. Sonunda tüm testleri ve özelliği kullanan dosyaları doğrular.

## Ne zaman kullanılır
- "Şu özelliği çalışır hale getir" ya da "bu modül bozuk" dediğinde
- Sorun birden çok dosyaya ve bağımlılığa yayılmışsa
- Tek tek yamalar sorunu çözmüyor, yenilerini doğuruyorsa

## Örnek
```
/engineering-advanced-skills:focused-fix src/features/auth klasöründeki giriş akışı uçtan uca çalışsın
```

## İlgili skill'ler
- `self-eval`: Onarım bittikten sonra işi dürüstçe puanlamak için.
- `codebase-onboarding`: Hiç tanımadığın bir kod tabanında önce genel resmi görmek için.
- `pr-review-expert`: Yapılan düzeltmeleri PR olarak gözden geçirmek için.
