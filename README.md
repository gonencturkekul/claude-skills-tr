# Claude Code için Türkçe Skill Marketplace

Bu repo, Claude Code için bir plugin marketplace'i: `skills-tr`. İşe yarar skill'leri Türk geliştiricilere daha kolay ulaştırmak için kurdum. Her skill için kısa Türkçe özetler yazıyorum, böylece İngilizce dokümantasyonu baştan sona okumadan neyin ne işe yaradığını görebilirsin.

Web sayfası: [gonencturkekul.com/skills.html](https://gonencturkekul.com/skills.html)

## İlke

- **Kod kopyalanmıyor.** Marketplace'teki her giriş doğrudan orijinal yazarın reposunu gösteriyor. Kurduğun şey orijinal plugin'in kendisi ve her zaman güncel sürümü.
- **Emek sahibinin.** Her skill'in yazarı ve lisansı açıkça belirtiliyor. Skill'ler kendi lisanslarıyla kalıyor.
- **Claude'un okuduğu İngilizce kalıyor.** Skill dosyaları, talimatlar ve referanslar orijinal halleriyle çalışıyor. Çeviri yüzünden skill'in davranışı değişmiyor.
- **İnsanların okuduğu Türkçe.** Benim katkım `docs/tr/` altındaki Türkçe özetler ve web sayfası.

## Hızlı başlangıç

Claude Code içinde marketplace'i ekle:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
```

İstediğin skill'i kur:

```
/plugin install impeccable@skills-tr
/plugin install taste-skill@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalı. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. Ya da ara ara elle güncelle:

```
/plugin marketplace update skills-tr
```

## Skill'ler

| Skill | Yazar | Lisans | Türkçe rehber | Orijinal repo |
|-------|-------|--------|---------------|---------------|
| impeccable | Paul Bakaus | Apache-2.0 | [docs/tr/impeccable](docs/tr/impeccable/README.md) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| taste-skill | Leonxlnx | MIT | [docs/tr/taste-skill](docs/tr/taste-skill/README.md) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) |

impeccable, `/impeccable polish` gibi alt komutlarla çalışır. taste-skill'in alt komutu yok: sayfa kurduğunda ya da yeniden tasarladığında Claude onu kendiliğinden kullanır, istersen `/taste-skill:design-taste-frontend` ile elle de çağırırsın.

## Güncellemeler nasıl işliyor?

Skill'in kendisi her zaman orijinal repodan geliyor, o yüzden kod tarafında senkronlanacak bir şey yok. Güncel tutulması gereken kısım Türkçe metinler.

Her gün çalışan bir Claude Code rutini orijinal skill'deki değişiklikleri kontrol ediyor. Bir değişiklik varsa ilgili Türkçe özetleri ve web sayfasını yeniliyor. Her özet dosyasının frontmatter'ında, metnin hangi upstream commit'e göre yazıldığı kayıtlı. Böylece bir özetin orijinalin hangi haline dayandığını her zaman görebilirsin.

## Skill'i orijinal marketplace'ten zaten kurdum

Sorun değil. Örneğin impeccable'ı `/plugin marketplace add pbakaus/impeccable` ya da taste-skill'i `/plugin marketplace add Leonxlnx/taste-skill` ile kurduysan bu marketplace'teki girişe ihtiyacın yok, aynı plugin'i ikinci kez kurmana gerek yok. Türkçe rehberler senin kurulumun için de aynen geçerli.

## Sorun bildirme

- Skill'in kendisiyle ilgili hata ve özellik istekleri orijinal reponun issue sayfasına gider. impeccable için: [pbakaus/impeccable issues](https://github.com/pbakaus/impeccable/issues), taste-skill için: [Leonxlnx/taste-skill issues](https://github.com/Leonxlnx/taste-skill/issues)
- Türkçe metinlerdeki hatalar, eksikler veya öneriler için: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

## Lisans

Bu repodaki kendi içeriğim (Türkçe dokümanlar ve script'ler) MIT lisanslı, ayrıntılar [LICENSE](LICENSE) dosyasında. Marketplace'te listelenen her skill kendi lisansına tabi. Örneğin impeccable Apache-2.0, taste-skill MIT lisanslı.

## English

This is `skills-tr`, a Claude Code plugin marketplace for the Turkish developer community. It does not copy or fork any skill code: every entry points straight at the original author's repository, so you always install the original, current plugin. What Claude reads stays in the original English; the only additions here are short Turkish guides for humans in `docs/tr/` and a Turkish page at [gonencturkekul.com/skills.html](https://gonencturkekul.com/skills.html). Please report skill bugs to the original repositories. Many thanks to the skill authors, [Paul Bakaus](https://github.com/pbakaus/impeccable) for impeccable and [Leonxlnx](https://github.com/Leonxlnx/taste-skill) for taste-skill, for building and sharing their work.
