---
skill: using-git-worktrees
title: İzole git worktree kullanma
source: skills/using-git-worktrees/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Özellik çalışmasının mevcut çalışma alanından ayrı, izole bir yerde yapılmasını sağlar. İlk iş olarak zaten izole bir worktree içinde olup olmadığını komutlarla kontrol eder ve git submodule'leri worktree ile karıştırmamak için ayrıca doğrular. Zaten izoleyse yeni bir tane açmaz. Normal bir repodaysa ve talimatlarında bir tercih yoksa worktree açmak için önce senin onayını ister. Ortamın kendi worktree aracı varsa (Claude Code'daki EnterWorktree gibi) onu kullanır, çünkü elle açılan worktree ortamın göremediği bir durum yaratır. Böyle bir araç yoksa `git worktree add` ile `.worktrees/` gibi proje içi bir klasöre açar ve klasörün .gitignore'da olduğunu doğrular, değilse ekleyip commit eder. Ardından npm, cargo, pip, poetry ya da go ile bağımlılıkları kurar ve testleri çalıştırarak temiz bir başlangıç noktası olduğunu teyit eder. Testler baştan kırıksa devam edip etmeyeceğini sana sorar.

## Ne zaman kullanılır
- Ana dalı etkilemeden yeni bir özelliğe başlarken
- Bir uygulama planını yürütmeden önce
- Aynı anda birden fazla dalda çalışmak istediğinde
- Başlangıçta testlerin temiz olduğundan emin olmak için

## Örnek
```
/superpowers:using-git-worktrees bildirim özelliği için izole bir çalışma alanı aç
```

## İlgili skill'ler
- `finishing-a-development-branch`: İş bittiğinde worktree'yi kapatıp temizler.
- `executing-plans`: Kurulumda bu skill'i kullanır.
- `subagent-driven-development`: Aynı şekilde izole bir çalışma alanında başlar.
