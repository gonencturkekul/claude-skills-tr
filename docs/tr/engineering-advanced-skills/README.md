---
tagline: Ajanlardan veritabanına, CI/CD'den güvenilirliğe kadar 43 ileri seviye mühendislik skill'i tek pakette.
---
# engineering-advanced-skills

Orijinal skill: [Alireza Rezvani](https://github.com/alirezarezvani) ([GitHub](https://github.com/alirezarezvani/claude-skills), MIT)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, engineering-advanced-skills paketinin Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'lerin kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## engineering-advanced-skills nedir?

engineering-advanced-skills, Alireza Rezvani'nin geniş claude-skills reposundaki mühendislik bölümünün plugin hali. Tek bir skill değil, birbirinden bağımsız 43 skill'lik bir koleksiyon. Konular geniş: çok ajanlı sistem tasarımı ve ajan testleri, RAG ve MCP sunucuları, veritabanı tasarımı ve migration'lar, API inceleme ve test üretimi, CI/CD ve sürüm notları, gözlemlenebilirlik, SLO, kaos deneyleri ve feature flag'ler, gizli bilgi yönetimi, bağımlılık ve skill güvenliği denetimi.

Skill'lerin çoğu sadece talimat değil, yanında Python script'leri getiriyor. Claude analizi gözle yapmak yerine bu script'leri çalıştırıp çıktılarına göre ilerliyor, birçok skill de "doğrulama geçmeden iş bitmedi" diyen bir kontrol adımıyla bitiyor.

## Claude bunu ne zaman kullanır?

Her skill'in kendi açıklaması var ve Claude, isteğin bir skill'in alanına girdiğinde onu kendiliğinden devreye alır. "Bu şemaya hangi index'ler lazım" ya da "bir kaos deneyi planlayalım" demen yeter. İstersen bir skill'i adıyla elle de çağırabilirsin:

```
/engineering-advanced-skills:<skill-adı>
```

Örneğin `/engineering-advanced-skills:changelog-generator`. Hangi skill'i seçeceğinden emin değilsen `engineering-advanced-skills` adlı dizin skill'i paketin tamamını özetler.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install engineering-advanced-skills@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

Bu paketi zaten yazarın kendi marketplace'inden (`/plugin marketplace add alirezarezvani/claude-skills`) kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Skill'ler

Her skill'in Türkçe özeti:

| Skill | Ne yapar |
|-------|----------|
| [agent-designer](./agent-designer.md) | Çok ajanlı sistem mimarisi tasarlar, araç şemaları üretir, çalışma loglarını değerlendirir. |
| [agent-regression-evals](./agent-regression-evals.md) | Ajan değişikliklerinin kaliteyi düşürmediğini tekrarlı denemeler ve istatistikle kanıtlar. |
| [agent-workflow-designer](./agent-workflow-designer.md) | Çok adımlı ajan akışları için desen seçer, aktarım sözleşmeleri ve hata kuralları kurar. |
| [api-design-reviewer](./api-design-reviewer.md) | REST API tasarımını lint, kırıcı değişiklik tespiti ve notlu karneyle inceler. |
| [api-test-suite-builder](./api-test-suite-builder.md) | API route'larını tarayıp auth, validasyon ve hata durumlarını kapsayan testler yazar. |
| [boost-asio-pro](./boost-asio-pro.md) | Boost.Asio ile, senin Boost sürümünde derlenen asenkron C++ ağ kodu yazar. |
| [browser-automation](./browser-automation.md) | Playwright ile veri çekme, form doldurma ve ekran görüntüsü işlerini otomatikleştirir. |
| [changelog-generator](./changelog-generator.md) | Conventional Commits'ten sürüm notları üretir ve sıradaki sürüm numarasını hesaplar. |
| [chaos-engineering](./chaos-engineering.md) | Etki alanı ve iptal kriterleri belli, güvenli kaos deneyleri planlar. |
| [ci-cd-pipeline-builder](./ci-cd-pipeline-builder.md) | Projenin stack'ini tespit edip GitHub Actions ya da GitLab CI pipeline'ı üretir. |
| [codebase-onboarding](./codebase-onboarding.md) | Kod tabanını analiz edip okuyucuya göre ayarlanmış onboarding dokümanı hazırlar. |
| [coding-agent-rollout](./coding-agent-rollout.md) | Claude Code'u ekibe yayarken ayarları, MCP sunucularını ve CLAUDE.md katmanlarını denetler. |
| [database-designer](./database-designer.md) | Şemayı analiz eder, index önerir ve kesintisiz migration üretir. |
| [database-schema-designer](./database-schema-designer.md) | Gereksinimlerden ilişkisel şema, tipler, RLS politikaları ve ERD çıkarır. |
| [dependency-auditor](./dependency-auditor.md) | Bağımlılıkları güvenlik açığı, lisans çakışması ve güncelleme riski açısından denetler. |
| [engineering-advanced-skills](./engineering-advanced-skills.md) | Paketteki skill'lerin dizini, doğru skill'i seçmene yardım eder. |
| [env-secrets-manager](./env-secrets-manager.md) | .env dosyalarını sızmış gizli bilgilere karşı denetler, rotasyon ve ortam farklarını yönetir. |
| [feature-flags-architect](./feature-flags-architect.md) | Feature flag ekleme, kademeli açma, kill switch ve eskimiş bayrak temizliği. |
| [focused-fix](./focused-fix.md) | Bozuk bir özelliği ya da modülü tüm dosyaları ve bağımlılıklarıyla sistematik onarır. |
| [full-page-screenshot](./full-page-screenshot.md) | Uzun ve tembel yüklenen sayfaların tam boy ekran görüntüsünü ek bağımlılık olmadan alır. |
| [git-worktree-manager](./git-worktree-manager.md) | Git worktree'leriyle paralel çalışmayı port, ortam ve temizlik kurallarıyla düzenler. |
| [interview-system-designer](./interview-system-designer.md) | Role özel mülakat süreçleri, yetkinlik matrisleri ve puanlama rubrikleri tasarlar. |
| [kubernetes-operator](./kubernetes-operator.md) | CRD tasarımı ve reconcile döngüsüyle Kubernetes Operator geliştirmeye odaklanır. |
| [mcp-server-builder](./mcp-server-builder.md) | OpenAPI sözleşmelerinden Python ya da TypeScript ile MCP sunucusu kurar. |
| [migration-architect](./migration-architect.md) | Kesintisiz geçiş planı, uyumluluk kontrolü ve geri alma stratejisi üretir. |
| [minimalist](./minimalist.md) | Gereksiz soyutlama ve bağımlılık eklemeden, önce var olanı kullanan kod yazdırır. |
| [monorepo-navigator](./monorepo-navigator.md) | Turborepo, Nx, pnpm ve Lerna monorepo'larında etki analizi ve seçici build sağlar. |
| [observability-designer](./observability-designer.md) | Metrik, log ve trace'i birleştiren izleme stratejisi, SLO ve uyarı tasarımı yapar. |
| [performance-profiler](./performance-profiler.md) | Node.js, Python ve Go uygulamalarında CPU, bellek ve I/O darboğazlarını ölçerek bulur. |
| [pr-review-expert](./pr-review-expert.md) | Pull request'leri güvenlik ve kod kalitesi açısından inceler. |
| [rag-architect](./rag-architect.md) | RAG hattı için parçalama, embedding ve vektör veritabanı seçer, arama kalitesini ölçer. |
| [runbook-generator](./runbook-generator.md) | Bir servis için dağıtım, olay müdahalesi ve geri alma runbook'ları üretir. |
| [secrets-vault-manager](./secrets-vault-manager.md) | HashiCorp Vault ve bulut gizli bilgi depolarını kurar, rotasyonu ve erişim denetimini yönetir. |
| [self-eval](./self-eval.md) | Yapılan işi iki eksenli puanlamayla dürüstçe değerlendirir, not şişirmeyi yakalar. |
| [ship-gate](./ship-gate.md) | Production öncesi sekiz başlıkta denetim yapar, kritik sorun varken deploy'u durdurur. |
| [skill-security-auditor](./skill-security-auditor.md) | Bir skill'i kurmadan önce zararlı kod ve prompt injection'a karşı tarar. |
| [skill-tester](./skill-tester.md) | Skill'lerin yapısını doğrular, script'lerini test eder ve kalite notu verir. |
| [slo-architect](./slo-architect.md) | SLO, SLI ve hata bütçesi tanımlar, çok pencereli burn rate uyarıları hesaplar. |
| [spec-driven-workflow](./spec-driven-workflow.md) | Koddan önce spesifikasyon ve kabul kriterleri yazdırır, testleri spec'ten türetir. |
| [sql-database-assistant](./sql-database-assistant.md) | SQL sorguları, performans iyileştirme, migration ve ORM işlerinde yardım eder. |
| [strict-api](./strict-api.md) | Kurulu sürümde gerçekten var olmayan fonksiyon ve import'ların uydurulmasını engeller. |
| [tc-tracker](./tc-tracker.md) | Teknik değişiklik kayıtları tutar ve AI oturumları arasında iş devrini kolaylaştırır. |
| [tech-debt-tracker](./tech-debt-tracker.md) | Teknik borcu tarar, önem derecesine göre puanlar ve öncelikli temizlik planı çıkarır. |

## Hata ve öneriler

- Skill'lerin kendisiyle ilgili hata ya da özellik istekleri: [alirezarezvani/claude-skills issues](https://github.com/alirezarezvani/claude-skills/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

engineering-advanced-skills, Alireza Rezvani tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
