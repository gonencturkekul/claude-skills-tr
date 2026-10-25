---
skill: requesting-code-review
title: Kod incelemesi isteme
source: skills/requesting-code-review/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Hatalar birikip yayılmadan önce işi bir inceleme alt ajanına gönderir. İncelemenin başlangıç ve bitiş commit'leri belirlenir, alt ajana paketteki inceleme şablonu doldurularak ne yapıldığı, neyi karşılaması gerektiği ve bu iki commit verilir. İnceleyici oturum geçmişini almaz, sadece iş ürününe odaklanacak şekilde hazırlanmış bağlamı görür. Bu, ana oturumun bağlamını da korur, çünkü diff ve değerlendirme alt ajanın bağlamında kalır, sadece bulgular geri gelir. Dönen bulgulara göre kritik sorunlar hemen, önemli sorunlar devam etmeden önce düzeltilir, küçük sorunlar sonraya not edilir. İnceleyici yanılıyorsa kod ve testlerle gerekçeli itiraz edilir. İnceleme alt ajan odaklı geliştirmede her görevden sonra, büyük bir özellik bittiğinde ve ana dala birleştirmeden önce zorunlu sayılır. Takıldığında ya da karmaşık bir hatayı düzelttikten sonra da işe yarar. "Basit bir değişiklik" diye atlanmaz.

## Ne zaman kullanılır
- Bir görevi ya da büyük bir özelliği bitirdiğinde
- Ana dala birleştirmeden önce
- Takılıp taze bir göze ihtiyaç duyduğunda
- Karmaşık bir hatayı düzelttikten sonra

## Örnek
```
/superpowers:requesting-code-review son iki commit'teki ödeme doğrulama değişikliğini incelet
```

## İlgili skill'ler
- `receiving-code-review`: Gelen bulgulara nasıl yaklaşılacağı.
- `subagent-driven-development`: Her görevden sonra incelemenin zorunlu olduğu akış.
- `finishing-a-development-branch`: İncelemeden sonra dalı kapatmak için.
