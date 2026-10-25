---
skill: executing-plans
title: Planı aynı oturumda uygulama
source: skills/executing-plans/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Hazır bir uygulama planını, her görev için ayrı alt ajan açmadan, Claude'un kendisinin aynı oturumda görev görev uygulamasını sağlar. Böylece görev başına ayrı uygulayıcı ve inceleyici maliyeti ödenmez, bunun yerine en sonda tüm dal için tek bir taze inceleme yapılır. Her görevde önce görev özeti okunur, adımlar TDD sırasıyla yürütülür, her komutun çıktısı planın beklediği sonuçla karşılaştırılır. İlerleme bir defter (ledger) dosyasına yazılır, böylece bağlam sıkıştırılsa bile tamamlanan görevler yeniden yapılmaz. Planda bir çelişki ya da hata çıkarsa Claude durup sormaz, karar verir ve gerekçesiyle deftere yazar. Sadece geri alınamaz işlemler, güvenlik açısından hassas adımlar, merge ya da push gibi dışa dönük işler ve tamamen bozuk bir plan onu durdurur. Son incelemede kritik ve önemli bulgular tek bir düzeltme turunda testle kapatılır. Sonunda verdiği tüm kararlar ve ertelenen küçük bulgular sana listelenir.

## Ne zaman kullanılır
- Plan hazır ve daha ucuz, hızlı bir uygulama istediğinde
- Kullandığın ortamda alt ajan aracı yoksa
- Görevler büyük ölçüde birbirinden bağımsızsa
- Plan ayrıntılı olduğu için orta seviye bir modelle çalışmak istediğinde

## Örnek
```
/superpowers:executing-plans docs/superpowers/plans/2026-10-20-sepet.md planını uygula
```

## İlgili skill'ler
- `subagent-driven-development`: Her görevin ardından inceleme istiyorsan alternatif.
- `test-driven-development`: Her adımı yöneten zorunlu alt skill.
- `finishing-a-development-branch`: Plan bittikten sonraki adım.
