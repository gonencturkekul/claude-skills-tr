---
skill: receiving-code-review
title: Kod incelemesini doğru karşılama
source: skills/receiving-code-review/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Gelen kod incelemesi yorumlarına göstermelik bir onayla değil, teknik bir değerlendirmeyle yaklaşmayı sağlar. Akış şöyle: yorumu sonuna kadar oku, gereksinimi kendi cümlelerinle yeniden ifade et ya da sor, kod tabanında gerçekten öyle mi diye kontrol et, bu proje için doğru olup olmadığını değerlendir, sonra teknik bir onay ya da gerekçeli itirazla cevap ver. Maddelerden biri bile belirsizse hiçbirini uygulamadan önce netleştirir, çünkü maddeler birbiriyle bağlantılı olabilir. Dış inceleyicilerden gelen önerilere temkinli yaklaşır: mevcut işlevi bozuyor mu, inceleyici tüm bağlamı biliyor mu, sizin daha önceki mimari kararlarınızla çelişiyor mu diye bakar. "Düzgünce uygula" denen bir özellik hiç kullanılmıyorsa YAGNI gereği kaldırmayı önerir. Düzeltmeleri tek tek, her birini test ederek yapar. "Harika fikir" veya teşekkür gibi kalıplar yerine yapılan düzeltmeyi kısaca söyler.

## Ne zaman kullanılır
- Bir PR'a inceleme yorumları geldiğinde
- Bir öneri teknik olarak şüpheli göründüğünde
- Birden fazla maddelik geri bildirimi sıraya koyman gerektiğinde
- GitHub'daki satır içi yorumlara cevap verirken

## Örnek
```
PR'daki inceleme yorumlarına bak, hangileri gerçekten doğru, hangilerine itiraz etmeliyiz?
```

## İlgili skill'ler
- `requesting-code-review`: İncelemeyi isteyen taraf.
- `test-driven-development`: Her düzeltmeyi testle doğrulamak için.
- `verification-before-completion`: Düzeltmenin işe yaradığını kanıtlamak için.
