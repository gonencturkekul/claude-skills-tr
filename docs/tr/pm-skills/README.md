---
tagline: Jira, Confluence, sprint analitiği ve ekip iletişimi için dokuz proje yönetimi skill'ini bir arada sunar.
---
# pm-skills

Orijinal skill: [Alireza Rezvani](https://alirezarezvani.com) ([GitHub](https://github.com/alirezarezvani/claude-skills), MIT)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, pm-skills paketinin Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'lerin kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## pm-skills nedir?

pm-skills, proje teslimatı yapan ekipler için hazırlanmış dokuz skill'lik bir paket. Kıdemli proje yöneticisi, Scrum Master, Jira uzmanı, Confluence uzmanı, Atlassian yöneticisi ve şablon tasarımcısı gibi rolleri ayrı skill'ler olarak veriyor. Bunlara toplantı transkriptlerini analiz eden ve şirket içi yazışmaları hazırlayan iki skill daha ekleniyor. En üstte duran `pm-skills` ise bir yönlendirici: sorunu okuyup doğru alt skill'e gönderiyor, istersen hedefi doğrulanmış adımlarla ilerleyen bir teslimat döngüsüne çeviriyor.

Paketle birlikte Atlassian'ın resmi uzak MCP sunucusu (`https://mcp.atlassian.com/v1/sse`) da geliyor. İlk kullanımda tarayıcıda Atlassian'a OAuth ile giriş yapıp erişim vereceğin siteleri seçiyorsun, ortam değişkeni ya da API anahtarı gerekmiyor. Ücretsiz Jira veya Confluence Cloud hesabı yeterli. Proje, sprint, alan (space) oluşturma ve yönetici ayarları gibi işler MCP'de yok. Skill'ler bunlar için seni web arayüzüne ya da REST API'ye yönlendiriyor.

Birçok skill, analiz için paketle gelen Python script'lerini çalıştırıyor, bu yüzden makinende Python 3 olması işine yarar.

## Claude bunları ne zaman kullanır?

Her skill'in kendi tetikleyicileri var: sprint hızı, JQL sorgusu, Confluence alan yapısı, SSO kurulumu, toplantı kaydı ya da haftalık güncelleme gibi bir konu açtığında Claude ilgili skill'i kendiliğinden devreye alır. Elle çağırmak istersen biçim şu:

```
/pm-skills:<skill-adı>
```

Örneğin `/pm-skills:scrum-master` ya da hangi skill'in uygun olduğundan emin değilsen yönlendiriciyi çağıran `/pm-skills:pm-skills`.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install pm-skills@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

## Skill'ler

| Skill | Ne yapar |
|------|------------|
| [atlassian-admin](./atlassian-admin.md) | Atlassian kullanıcıları, grupları, izinleri, SSO ve uygulamaları yönetir. |
| [atlassian-templates](./atlassian-templates.md) | Jira ve Confluence için yeniden kullanılabilir şablonlar ve blueprint'ler hazırlar. |
| [confluence-expert](./confluence-expert.md) | Confluence alanlarını, sayfa ağacını, makroları ve içerik yönetişimini kurar. |
| [jira-expert](./jira-expert.md) | JQL, iş akışları, dashboard'lar ve otomasyon kurallarıyla Jira'yı yapılandırır. |
| [meeting-analyzer](./meeting-analyzer.md) | Toplantı transkriptlerinden iletişim alışkanlıklarına dair kanıtlı geri bildirim çıkarır. |
| [pm-skills](./pm-skills.md) | İsteği doğru alt skill'e yönlendirir, istenirse doğrulamalı bir teslimat döngüsü yürütür. |
| [scrum-master](./scrum-master.md) | Sprint verisinden hız tahmini, ekip sağlığı puanı ve retro analizi üretir. |
| [senior-pm](./senior-pm.md) | Portföy sağlığı, nicel risk analizi, kapasite planı ve yönetici raporları hazırlar. |
| [team-communications](./team-communications.md) | 3P güncellemeleri, bülten, SSS ve durum raporu gibi şirket içi metinleri yazar. |

## Hata ve öneriler

- Skill'lerin kendisiyle ilgili hata ya da özellik istekleri: [alirezarezvani/claude-skills issues](https://github.com/alirezarezvani/claude-skills/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

pm-skills, Alireza Rezvani tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
