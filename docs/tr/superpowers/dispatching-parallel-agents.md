---
skill: dispatching-parallel-agents
title: Paralel alt ajan dağıtımı
source: skills/dispatching-parallel-agents/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Birbirinden bağımsız birden fazla sorunu sırayla tek tek çözmek yerine her birini ayrı bir alt ajana verip aynı anda çalıştırır. Önce hataları neyin bozulduğuna göre gruplar, örneğin farklı test dosyalarındaki farklı kök nedenler. Her alt ajana dar bir kapsam, net bir hedef, kısıtlar ("başka koda dokunma" gibi) ve ne raporlayacağı verilir. Alt ajanlar senin oturum geçmişini almaz, ihtiyaç duydukları bağlam onlar için ayrıca yazılır, bu da ana oturumun bağlamını koordinasyona saklar. Tüm görevler aynı yanıtta gönderilince paralel çalışır. Dönüşte her özet okunur, değişikliklerin çakışıp çakışmadığı kontrol edilir ve tam test paketi çalıştırılır. Sorunlar birbirine bağlıysa, sistemin bütününü anlamak gerekiyorsa ya da ajanlar aynı dosyaları düzenleyecekse bu yöntem kullanılmaz.

## Ne zaman kullanılır
- Büyük bir refactor sonrası farklı dosyalarda farklı nedenlerle test kırıldığında
- Birbirinden bağımsız birkaç alt sistem aynı anda bozuk olduğunda
- Her sorun diğerlerinin bağlamı olmadan anlaşılabiliyorsa
- Ana oturumun bağlamını korumak istediğinde

## Örnek
```
üç farklı test dosyasında birbirinden bağımsız hatalar var, her birini ayrı bir ajana ver ve paralel çöz
```

## İlgili skill'ler
- `systematic-debugging`: Neyin bozuk olduğu henüz belli değilse önce bu gelir.
- `subagent-driven-development`: Plan görevleri için alt ajan kullanımı, ama sıralı.
- `verification-before-completion`: Ajanların "başardım" raporunu doğrulamak için.
