---
skill: monorepo-navigator
title: Monorepo yönetimi
source: skills/monorepo-navigator/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Turborepo, Nx, pnpm workspaces ve Lerna ile kurulmuş monorepo'larda yol göstermek ve onları hızlandırmak için kullanılır. Ortak bir paket değiştiğinde hangi uygulamaların etkileneceğini çıkarır, build ve testleri sadece etkilenen paketlerde çalıştırmayı, remote cache'i ve paralel çalıştırmayı anlatır. Paket ilişkilerini Mermaid diyagramı olarak gösterebilir. Birden çok depoyu git geçmişini kaybetmeden tek depoda birleştirmeyi ve Changesets ile sürümleme ve npm yayınını kapsar. Çoğu modern kurulum için pnpm workspaces, Turborepo ve Changesets üçlüsünü önerir. `monorepo_analyzer.py` betiği bir workspace'i analiz eder. Claude Code için kökte paket haritasını, her pakette de o pakete özel kuralları tutan CLAUDE.md düzeni önerir.

## Ne zaman kullanılır
- Yeni bir monorepo kurarken
- Her değişiklikte her şey yeniden build edildiği için CI yavaşsa
- Paketler arası bağımlılık sorunlarını çözerken
- Birden çok depoyu tek depoda birleştirmeyi planlarken

## Örnek
```
packages/ui değişirse hangi uygulamalar etkilenir, CI'da sadece onları build edecek şekilde ayarla
```

## İlgili skill'ler
- `ci-cd-pipeline-builder`: Etkilenen paketlere göre çalışan bir pipeline kurmak için.
- `changelog-generator`: Paket sürümleri ve changelog için.
- `dependency-auditor`: Workspace genelinde bağımlılık güvenliği için.
