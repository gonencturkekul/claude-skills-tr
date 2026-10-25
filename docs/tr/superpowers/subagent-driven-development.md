---
skill: subagent-driven-development
title: Alt ajan odaklı geliştirme
source: skills/subagent-driven-development/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Bir uygulama planını, her görev için taze bir uygulayıcı alt ajan açarak yürütür. Her görevden sonra ayrı bir inceleyici hem spesifikasyona uyumu hem kod kalitesini kontrol eder, en sonda da tüm dal için kapsamlı bir inceleme yapılır. Ana oturum koordinatör gibi çalışır: her görev için planın sadece o kısmını bir dosyaya çıkarır, alt ajana bu dosyayı ve önceki görevlerden gelen arayüz bilgisini verir, tüm oturum geçmişini yapıştırmaz. İnceleme bulgu çıkarırsa sınırlı sayıda turdan oluşan bir düzeltme döngüsü işler. İlerleme bir defter dosyasında tutulur, böylece bağlam sıkıştırıldığında tamamlanmış görevler yeniden yaptırılmaz. Kararlar gerekçesiyle deftere yazılır, Claude görevler arasında durup sormaz. Maliyeti düşürmek için her rol için işi kaldırabilecek en ucuz modelin seçilmesini ve modelin her zaman açıkça belirtilmesini önerir. Uygulayıcılar asla paralel çalıştırılmaz.

## Ne zaman kullanılır
- Plan hazır ve her görevin ardından bir inceleme kapısı istediğinde
- Plan uzun ve son görevlerin sıkışmış bir bağlamda yapılmasını istemediğinde
- Görevler büyük ölçüde birbirinden bağımsızsa
- Saatlerce kendi başına ilerleyen bir uygulama istediğinde

## Örnek
```
/superpowers:subagent-driven-development docs/superpowers/plans/2026-10-20-bildirimler.md
```

## İlgili skill'ler
- `executing-plans`: Daha ucuz, satır içi uygulama alternatifi.
- `requesting-code-review`: Görev ve son incelemede kullanılan inceleyici şablonu.
- `writing-plans`: Bu skill'in yürüttüğü planı üretir.
