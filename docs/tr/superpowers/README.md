---
tagline: Kodlama ajanına beyin fırtınası, plan, TDD ve kod incelemesiyle disiplinli bir geliştirme yöntemi kazandırır.
---
# superpowers

Orijinal skill: [Jesse Vincent](https://blog.fsck.com) ([GitHub](https://github.com/obra/superpowers), MIT)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, superpowers'ın Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'lerin kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## superpowers nedir?

superpowers, kodlama ajanları için baştan sona bir yazılım geliştirme yöntemi. Birbirine bağlanan skill'lerden oluşuyor ve ajanın bunları gerçekten kullanmasını sağlayan bir başlangıç talimatıyla geliyor. Bir şey yapmak istediğini söylediğinde Claude hemen koda atlamıyor. Önce gerçekte ne istediğini sorularla netleştiriyor, anlaşılan tasarımı okunabilir parçalar halinde sana gösteriyor. Onayladığında tasarımı küçük, test edilebilir görevlerden oluşan bir uygulama planına çeviriyor. Sen "başla" deyince her görev ya ayrı bir alt ajana verilip arkasından incelenerek ya da aynı oturumda sırayla uygulanıp sonda tek bir incelemeden geçirilerek tamamlanıyor. Bütün süreç boyunca gerçek kırmızı-yeşil TDD, YAGNI ve DRY ilkeleri geçerli.

Temel akış şu sırayı izliyor: beyin fırtınası, izole bir git worktree, plan yazımı, alt ajanlarla ya da satır içi uygulama, TDD, kod incelemesi ve dalı bitirme. Hata ayıklama, doğrulama ve yeni skill yazma için de ayrı skill'ler var.

Beyin fırtınasındaki isteğe bağlı görsel yardımcı, Prime Radiant logosunu yazarın sitesinden yüklüyor ve bu istekte superpowers sürümünü gönderiyor. Proje ya da prompt bilgisi gönderilmiyor. Kapatmak için `SUPERPOWERS_DISABLE_TELEMETRY` ortam değişkenini açabilirsin. Claude Code'un `DISABLE_TELEMETRY` ve `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` ayarları da dikkate alınıyor.

## Claude bunları ne zaman kullanır?

Plugin, oturum başladığında, temizlendiğinde ve sıkıştırıldığında çalışan bir hook ile `using-superpowers` talimatını yüklüyor. Bu sayede Claude her işten önce uygun bir skill olup olmadığına bakıyor ve skill'ler kendiliğinden devreye giriyor. Bir şey inşa etmek istediğinde beyin fırtınası, bir hata bildirdiğinde sistematik hata ayıklama başlar. Elle çağırmak istersen biçim şu:

```
/superpowers:<skill-adı>
```

Örneğin `/superpowers:brainstorming` ya da `/superpowers:systematic-debugging`.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install superpowers@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

superpowers, Anthropic'in resmi marketplace'inde de bulunuyor. Zaten oradan (`/plugin install superpowers@claude-plugins-official`) ya da yazarın kendi marketplace'inden (`obra/superpowers-marketplace`) kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulumlar için de geçerli.

## Skill'ler

| Skill | Ne yapar |
|------|------------|
| [brainstorming](./brainstorming.md) | Bir şey inşa etmeden önce gerçekte ne istendiğini sorularla ortaya çıkarır. |
| [diagnosing-superpowers](./diagnosing-superpowers.md) | Ters giden bir oturumu transkriptten kanıtlarla inceler, istersen hata raporu hazırlar. |
| [dispatching-parallel-agents](./dispatching-parallel-agents.md) | Birbirinden bağımsız sorunları paralel çalışan alt ajanlara dağıtır. |
| [executing-plans](./executing-plans.md) | Planı alt ajan kullanmadan aynı oturumda uygular, sonda tek inceleme yapar. |
| [finishing-a-development-branch](./finishing-a-development-branch.md) | Testleri doğrulayıp dalı birleştirme, PR açma ya da bekletme seçenekleriyle kapatır. |
| [receiving-code-review](./receiving-code-review.md) | Gelen inceleme yorumlarını körü körüne değil, teknik doğrulamayla ele alır. |
| [requesting-code-review](./requesting-code-review.md) | İşi bir inceleme alt ajanına doğru bağlamla gönderip bulgulara göre davranır. |
| [subagent-driven-development](./subagent-driven-development.md) | Her görevi taze bir alt ajana yaptırır, her görevin ardından inceleme ister. |
| [systematic-debugging](./systematic-debugging.md) | Düzeltme önermeden önce kök nedeni dört aşamada bulur. |
| [test-driven-development](./test-driven-development.md) | Önce başarısız test, sonra en az kod: kırmızı, yeşil, refactor döngüsü. |
| [using-git-worktrees](./using-git-worktrees.md) | Çalışmayı ana daldan ayrı, izole bir worktree'de başlatır. |
| [using-superpowers](./using-superpowers.md) | Her işten önce uygun skill'i bulup kullanma kuralını koyar. |
| [verification-before-completion](./verification-before-completion.md) | "Bitti" demeden önce doğrulama komutunu çalıştırıp kanıt ister. |
| [writing-plans](./writing-plans.md) | Tasarımı küçük, test edilebilir görevlerden oluşan bir uygulama planına çevirir. |
| [writing-skills](./writing-skills.md) | Yeni skill yazmayı TDD mantığıyla, önce başarısız senaryoyla yürütür. |

## Hata ve öneriler

- Skill'lerin kendisiyle ilgili hata ya da özellik istekleri: [obra/superpowers issues](https://github.com/obra/superpowers/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

superpowers, Jesse Vincent ve Prime Radiant ekibi tarafından geliştiriliyor ve MIT lisansıyla yayınlanıyor. Emekleri ve paylaştıkları için teşekkürler.
