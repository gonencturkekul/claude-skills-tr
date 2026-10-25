---
skill: finishing-a-development-branch
title: Geliştirme dalını tamamlama
source: skills/finishing-a-development-branch/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Uygulama bittiğinde dalı nasıl kapatacağına karar vermeni düzenli bir akışa bağlar. Önce projenin tüm test paketini çalıştırır, testler kırmızıysa seçenek sunmadan durup hataları gösterir. Sonra normal bir repoda mı, bir worktree'de mi ya da başsız (detached HEAD) bir çalışma alanında mı olduğunu tespit eder ve dalın hangi ana daldan ayrıldığını teyit eder. Ardından sana üç seçenek sunar: yerelde birleştirmek, push edip PR açmak ya da dalı olduğu gibi bırakmak. Başsız durumda birleştirme seçeneği yoktur. Birleştirirse sonucu tekrar test eder, sadece yeşilse worktree'yi ve dalı temizler. PR açarsa worktree, gelecek geri bildirimler için korunur. Çalışmayı silmek menüde yoktur, sadece sen açıkça istersen ve "discard" yazarak onaylarsan yapılır. Kaydedilmemiş dosyalar varsa zorla silmez, ne yapılacağını sorar.

## Ne zaman kullanılır
- Tüm görevler bitti ve testler geçiyorsa
- İşi ana dala almak ya da PR açmak istediğinde
- Bir worktree'yi güvenle temizlemek için
- Plan uygulamasının son adımı olarak

## Örnek
```
/superpowers:finishing-a-development-branch
```

## İlgili skill'ler
- `using-git-worktrees`: Bu skill'in temizlediği çalışma alanını kurar.
- `verification-before-completion`: Testlerin gerçekten geçtiğini kanıtlamak için.
- `requesting-code-review`: Birleştirmeden önce inceleme almak için.
