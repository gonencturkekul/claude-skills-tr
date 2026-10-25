---
skill: diagnosing-superpowers
title: Ters giden oturumu teşhis etme
source: skills/diagnosing-superpowers/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Bir superpowers oturumu kötü gittiğinde neyin olduğunu kanıtlarla raporlar: tekrarlanan işler, görmezden gelinen plan, çalışmayan bir skill, beklenenden uzun süre ya da yüksek maliyet. Önce sana tek tek sorular sorup sorunu netleştirir, cevabını almadan analize başlamaz. Sonra oturumun transkript dosyalarını bulur, salt okunur şekilde inceler ve skill zaman çizelgesi, plana uyum, tekrarlanan iş, takılmalar, kalite, çelişen istekler ve maliyet gibi yedi boyut için paralel analiz alt ajanları çalıştırır. Her bulgu dosya ve satır numarasıyla kanıtlanmak zorunda, kanıtsız bulgu atılır. Rapor `~/.superpowers/diagnosing-superpowers/` altına yazılır. superpowers'ta bir kusur teşhis etmez ya da düzeltme önermez, sadece olanı raporlar. İstersen benzer GitHub issue'larını arar, onayınla yeni issue açar ya da kişisel bilgileri temizlenmiş bir paket hazırlar. Paylaşmadan önce her dosyayı kendinin gözden geçirmesi gerektiğini hatırlatır.

## Ne zaman kullanılır
- Bir oturum çok uzun sürdüğünde ya da pahalıya patladığında
- Beklediğin bir skill hiç devreye girmediğinde
- Ajan planı görmezden gelip aynı işi tekrar ettiğinde
- superpowers geliştiricilerine kanıtlı bir hata raporu göndermek istediğinde

## Örnek
```
bu oturumda superpowers'ta neyin ters gittiğini bul
```

## İlgili skill'ler
- `using-superpowers`: Skill'lerin ne zaman devreye girmesi gerektiğini belirleyen kural.
- `dispatching-parallel-agents`: Analizin paralel alt ajanlarla nasıl dağıtıldığını açıklar.
- `verification-before-completion`: Kanıt olmadan iddia etmeme ilkesinin aynısı.
