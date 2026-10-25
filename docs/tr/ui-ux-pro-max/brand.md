---
skill: brand
title: Marka kimliği ve tutarlılık
source: .claude/skills/brand/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Marka sesini, görsel kimliği, mesaj çerçevesini ve marka varlıklarını yönetir. Tek doğruluk kaynağı projedeki `docs/brand-guidelines.md` dosyasıdır. Bir script bu dosyayı `assets/design-tokens.json` ve `assets/design-tokens.css` dosyalarına eşitler. Projede zaten token dosyaları, CSS değişkenleri ya da Tailwind tema renkleri varsa eşitleme durur ve bulduğunu sana gösterir, üzerine yazmak için açık bir onay bayrağı gerekir. Diğer script'ler marka bağlamını bir prompt'a eklemek için çıkarır, bir varlığın adını, boyutunu ve formatını kontrol eder, bir görseldeki renkleri marka paletiyle karşılaştırır. `update` alt komutu marka kimliğini günceller ve tüm tasarım sistemlerine yayar. Ses çerçevesi, logo kullanımı, renk ve tipografi tanımları, onay kontrol listesi ve yeni markalar için bir kılavuz şablonu gibi başvuru dosyaları içerir. Script'ler Node.js ile çalışır.

## Ne zaman kullanılır
- Markanın ses tonunu ve içerik dilini tanımlarken
- Yeni bir marka için stil kılavuzu yazarken
- Bir içeriğin ya da görselin markaya uyup uymadığını denetlemek için
- Marka renklerini tasarım token'larına aktarmak istediğinde

## Örnek
```
/ui-ux-pro-max:brand update ana rengi lacivert yap ve token'ları güncelle
```

## İlgili skill'ler
- `design-system`: Marka renklerinden token katmanları kurmak için.
- `banner-design`: Marka kurallarıyla banner hazırlamak için.
- `design`: Logo ve kurumsal kimlik işleri için.
