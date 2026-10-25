---
skill: git-worktree-manager
title: Paralel çalışma için Git worktree'leri
source: skills/git-worktree-manager/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Aynı depoda birden çok branch'i aynı anda, birbirine karışmadan çalıştırmak için Git worktree'lerini düzenler. Her worktree bağımsız bir yerel uygulama gibi davranır. Yönetim betiği belirli bir isimlendirmeyle worktree açar, branch yoksa oluşturur, uygulama, Postgres ve Redis için çakışmayan portlar atayıp bunları `.worktree-ports.json` dosyasına yazar, ana depodaki `.env` dosyalarını kopyalar ve istersen lockfile'a bakarak bağımlılıkları kurar. Temizlik betiği eskimiş, commit edilmemiş değişiklik içeren ve merge edilmiş worktree'leri bulur; sadece temiz ve merge edilmiş olanları siler. Docker Compose için port eşlemesi, oluşturma ve silme öncesi kontrol listeleri ve hata durumunda ne yapılacağı da anlatılır. Her agent'ın kendi worktree'sinde çalıştığı çok agent'lı düzenler için tasarlanmıştır.

## Ne zaman kullanılır
- Aynı anda iki ya da daha fazla branch açık tutman gerekiyorsa
- Feature üzerinde çalışırken araya acil bir hotfix girdiyse
- Birden çok agent aynı depoda paralel çalışacaksa
- Worktree temizliğini elle `rm -rf` yerine güvenli yapmak istiyorsan

## Örnek
```
feature/new-auth için ayrı portlarla çalışan bir worktree aç ve bağımlılıkları kur
```

## İlgili skill'ler
- `agent-workflow-designer`: Paralel çalışan agent'ların iş akışını tasarlamak için.
- `monorepo-navigator`: Büyük bir monorepo'da paket bazlı çalışmak için.
