---
skill: writing-plans
title: Uygulama planı yazma
source: skills/writing-plans/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Bir spesifikasyonu ya da onaylanmış tasarımı, kod tabanını hiç görmemiş bir geliştiricinin izleyebileceği ayrıntılı bir uygulama planına çevirir. Önce hangi dosyaların oluşturulacağını ya da değişeceğini ve her birinin sorumluluğunu belirler. Sonra işi küçük görevlere böler: her görev kendi test döngüsü olan ve bir inceleyicinin tek başına onaylayıp reddedebileceği bir birimdir. Her görevde dosya yolları, önceki ve sonraki görevlerle paylaşılan arayüzler ve sırayla başarısız testi yaz, başarısız olduğunu gör, kodu yaz, geçtiğini gör, commit at adımları bulunur. Planın başında hedef, mimari, teknoloji, spesifikasyon yolu, proje geneli kısıtlar ve testlerin kapsamadığı riskli girdileri listeleyen bir inceleme odağı yer alır. Plan kodu baştan yazmaz, uygulayıcının kendi veremeyeceği kararları içerir. Yazdıktan sonra kendi kontrolünü yapar ve planı varsayılan olarak `docs/superpowers/plans/` altına kaydeder. Sonunda planı gözden geçirmeni ve alt ajanlı ya da satır içi uygulama arasında seçim yapmanı ister.

## Ne zaman kullanılır
- Beyin fırtınasında bir tasarım onaylandığında
- Çok adımlı bir iş için elinde bir spesifikasyon olduğunda
- Kod yazmaya başlamadan önce işi bölmek istediğinde
- Uzun süre kendi başına ilerleyecek bir uygulama hazırlarken

## Örnek
```
/superpowers:writing-plans docs/superpowers/specs/2026-10-20-sepet-design.md için uygulama planı yaz
```

## İlgili skill'ler
- `brainstorming`: Planın dayandığı tasarımı üretir.
- `subagent-driven-development`: Planı alt ajanlarla uygular.
- `executing-plans`: Planı aynı oturumda uygular.
